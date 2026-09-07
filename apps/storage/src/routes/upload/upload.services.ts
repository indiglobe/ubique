import { AVATAR_PATH, S3_PATH } from "@/utils/const";
import { env } from "@repo/env/server";
import { id } from "@repo/utils/id";
import { tryCatch } from "@repo/utils/try-catch";
import { Context } from "hono";
import { BlankEnv, BlankInput } from "hono/types";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

/**
 * Maximum allowed size for an uploaded avatar.
 *
 * @constant
 */
const MAX_AVATAR_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * Validation schema for avatar upload form data.
 *
 * The avatar must:
 * - Be a valid {@link File} instance.
 * - Have an image MIME type.
 * - Not exceed {@link MAX_AVATAR_FILE_SIZE}.
 *
 * @example
 * ```ts
 * const result = formSchema.safeParse({
 *   avatar: file,
 * });
 * ```
 */
export const formSchema = z.object({
  avatar: z
    .instanceof(File, { message: "Avatar is required" })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Avatar must be an image",
    })
    .refine((file) => file.size <= MAX_AVATAR_FILE_SIZE, {
      message: "Avatar must be less than 5 MB",
    }),
});

/**
 * Schema describing the successful avatar upload response.
 *
 * The response contains:
 * - `success`, which is always `true`.
 * - `publicUrl`, containing the publicly accessible URL of the uploaded avatar.
 */
export const uploadsuccessResponseSchema = z.object({
  success: true,
  publicUrl: z.url(),
});

/**
 * Type representing a successful avatar upload response.
 *
 * @property {true} success Indicates that the upload completed successfully.
 * @property {string} publicUrl Public URL of the uploaded avatar.
 */
export type TUploadSuccessResponse = z.infer<
  typeof uploadsuccessResponseSchema
>;

/**
 * Error thrown when the uploaded form data is missing or invalid.
 *
 * This error represents client-side input/validation failures rather than
 * failures that occur while writing the uploaded file to storage.
 */
export class FormDataError extends Error {
  /**
   * Creates a form data validation error.
   */
  constructor(message = "Invalid form data") {
    super(message);
    this.name = "FormDataError";
  }

  /**
   * Converts the error into a JSON-serializable object.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
    };
  }
}

/**
 * Error thrown when an internal failure occurs while uploading an avatar.
 *
 * This error is used for failures related to directory creation, file writing,
 * or other storage operations.
 */
export class UploadError extends Error {
  /**
   * Creates an upload error.
   */
  constructor(message = "Some internal error happened.") {
    super(message);
    this.name = "UploadError";
  }

  /**
   * Converts the error into a JSON-serializable object.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
    };
  }
}

/**
 * Validates and saves an uploaded avatar to local S3-compatible storage.
 *
 * The upload process performs the following steps:
 *
 * 1. Reads the request body as `FormData`.
 * 2. Converts the form data into a plain object.
 * 3. Validates the object against {@link formSchema}.
 * 4. Extracts the uploaded avatar and determines its file extension.
 * 5. Generates a unique filename using the current timestamp and a generated ID.
 * 6. Creates the avatar storage directory if it does not already exist.
 * 7. Converts the uploaded file into a {@link Buffer}.
 * 8. Writes the buffer to the generated file path.
 * 9. Removes the partially written file if the write operation fails.
 * 10. Returns the public URL of the uploaded avatar.
 *
 * @param {Context<BlankEnv, "/", BlankInput>} c - Hono request context containing the incoming FormData request.
 *
 * @throws {FormDataError} If the request body cannot be parsed as FormData.
 * @throws {FormDataError} If the submitted form data does not satisfy {@link formSchema}.
 * @throws {UploadError} If the avatar storage directory cannot be created.
 * @throws {UploadError} If the avatar cannot be written to the storage directory.
 *
 *
 * @example
 * ```ts
 * const result = await saveUploadedAvatar(c);
 *
 * // {
 * //   success: true,
 * //   publicUrl: "https://example.com/upload/avatar/1720000000000-abc123.png"
 * // }
 * ```
 */
export async function saveUploadedAvatar(
  c: Context<BlankEnv, "/", BlankInput>,
) {
  /**
   * Attempt to extract FormData from the incoming request.
   *
   * `tryCatch` prevents request parsing failures from becoming unhandled
   * promise rejections and allows them to be converted into a domain-specific
   * {@link FormDataError}.
   */
  const [formDataError, formDataValue] = await tryCatch(c.req.formData());

  if (formDataError) {
    throw new FormDataError("You need to pass FormData.");
  }

  /**
   * Convert FormData entries into a plain object so that the resulting value
   * can be validated by the Zod schema.
   */
  const formDataObject = Object.fromEntries(formDataValue);

  /**
   * Validate the submitted form data against the avatar upload schema.
   */
  const { error: parsedFormDataError, data: parsedFormData } =
    formSchema.safeParse(formDataObject);

  if (parsedFormDataError) {
    /**
     * Extract the first validation error associated with the avatar field.
     *
     * `treeifyError` converts Zod's validation error into a nested structure,
     * making it possible to retrieve field-specific validation messages.
     */
    const parsedTreefiedFirstError =
      z.treeifyError(parsedFormDataError).properties?.avatar?.errors[0];

    throw new FormDataError(
      `Provide proper form data. ${parsedTreefiedFirstError}`,
    );
  }

  /**
   * Extract the validated avatar file.
   */
  const { avatar } = parsedFormData;

  /**
   * Determine the file extension from the avatar's MIME type.
   *
   * For example, `image/png` produces the `png` extension.
   */
  const extension = avatar.type.split("/")[1];

  /**
   * Generate a unique filename using the current timestamp and application ID.
   */
  const generatedFileName = `${Date.now()}-${id()}.${extension}`;

  /**
   * Resolve the directory and complete file path where the avatar will be stored.
   */
  const fileDir = path.join(S3_PATH, AVATAR_PATH);
  const filePath = path.join(fileDir, generatedFileName);

  /**
   * Create the avatar directory recursively if it does not already exist.
   */
  const [dirCreationError] = await tryCatch(
    mkdir(fileDir, { recursive: true }),
  );

  if (dirCreationError) {
    throw new UploadError("Some error happened while uploading the file.");
  }

  /**
   * Convert the uploaded File into a Node.js Buffer for filesystem storage.
   */
  const buffer = Buffer.from(await avatar.arrayBuffer());

  /**
   * Write the avatar contents to the generated file path.
   */
  const [uploadingError] = await tryCatch(writeFile(filePath, buffer));

  if (uploadingError) {
    /**
     * Remove the file if the write operation failed.
     *
     * `force: true` prevents an additional error if the file does not exist
     * or could not be created completely.
     */
    await rm(filePath, { force: true, recursive: true });

    throw new UploadError("Some error happened while uploading the file.");
  }

  /**
   * Return the public URL of the successfully uploaded avatar.
   */
  return {
    publicUrl: `${env.STORAGE_APP_HOST}/${AVATAR_PATH}/${generatedFileName}`,
    success: true,
  } satisfies TUploadSuccessResponse;
}

// ==================================================
// ==================================================
// ==================================================
// ==================================================

/**
 * Retrieves an uploaded avatar from local S3-compatible storage.
 *
 * The avatar is resolved from the configured S3 storage directory and
 * avatar-specific directory using the provided file name.
 *
 * The file name is validated to prevent path traversal attacks and must
 * reference a file directly inside the avatar storage directory.
 *
 * @param {string} fileName - Name of the avatar file to retrieve.
 *
 * @throws {UploadError} If the file name is invalid or the avatar cannot
 * be read from storage.
 *
 * @example
 * ```ts
 * const avatar = await getUploadedAvatar("1720000000000-abc123.png");
 * ```
 */
export async function getUploadedAvatar(
  c: Context<BlankEnv, "/avatar/:fileName", BlankInput>,
) {
  const { fileName } = c.req.param();

  /**
   * Resolve the directory containing uploaded avatars.
   */
  const fileDir = path.resolve(S3_PATH, AVATAR_PATH);

  /**
   * Resolve the requested file against the avatar directory.
   */
  const filePath = path.resolve(fileDir, fileName);

  /**
   * Ensure the resolved file path remains inside the avatar directory.
   *
   * This prevents malicious file names such as `../../.env` from accessing
   * files outside the intended storage directory.
   */
  if (filePath !== fileDir && !filePath.startsWith(`${fileDir}${path.sep}`)) {
    throw new UploadError("Invalid avatar file name.");
  }

  /**
   * Read the requested avatar from local storage.
   */
  const [error, file] = await tryCatch(readFile(filePath));

  if (error) {
    throw new UploadError("Avatar not found.");
  }

  return file;
}
