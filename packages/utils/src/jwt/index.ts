import { EMPLOYEE_ROLE, PARTNER_ROLE, USER_STATUS } from "@/db-enums";
import { env } from "@repo/env/server";
import * as jose from "jose";
import { z } from "zod";

const secret = new TextEncoder().encode(env.TOKEN_SECRET);

/**
 * Supported authorization roles.
 */
const JwtRoleSchema = z.union([z.enum(PARTNER_ROLE), z.enum(EMPLOYEE_ROLE)]);

type JwtRole = z.infer<typeof JwtRoleSchema>;

/**
 * Supported user account statuses.
 */
const JwtStatusSchema = z.enum(USER_STATUS);

type JwtStatus = z.infer<typeof JwtStatusSchema>;

/**
 * Default authentication payload schema.
 */
const AuthenticationCookieSchema = z.object({
  username: z.string().min(1),
  employeeCode: z.string(),
  userId: z.string().min(1),
  email: z.email(),
  fullName: z.string().min(1),
  profilePicture: z.url().nullable(),
  role: JwtRoleSchema,
  phone: z.string().min(1),
  status: JwtStatusSchema,
});

/**
 * Verified JWT payload containing application-specific and standard claims.
 */
type VerifiedJwtPayload<TSchema extends z.ZodType> = z.output<TSchema> &
  jose.JWTPayload;

type JwtSchema = z.ZodType<jose.JWTPayload>;

/**
 * Validates and signs a JWT using the supplied Zod schema.
 *
 * @param payload - Application-specific JWT payload.
 * @param schema - Zod schema used to validate the payload.
 * @param expiresIn - Token expiration duration. Defaults to 12 hours.
 * @returns A signed JWT string.
 * @throws {z.ZodError} If the payload fails validation.
 */
const signJWT = async <TSchema extends JwtSchema>(
  payload: z.input<TSchema>,
  schema: TSchema,
  expiresIn: string | number = "12h",
): Promise<string> => {
  const validatedPayload = schema.parse(payload);

  return new jose.SignJWT(validatedPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
};

/**
 * Verifies a JWT and validates its application-specific claims.
 *
 * @param token - JWT string to verify.
 * @param schema - Zod schema used to validate the payload.
 * @returns The verified and validated JWT payload.
 * @throws {jose.errors.JOSEError} If JWT verification fails.
 * @throws {z.ZodError} If the payload fails validation.
 */
const verifyJWT = async <TSchema extends JwtSchema>(
  token: string,
  schema: TSchema,
): Promise<VerifiedJwtPayload<TSchema>> => {
  const { payload } = await jose.jwtVerify(token, secret, {
    algorithms: ["HS256"],
  });

  const applicationPayload = schema.parse(payload);

  return {
    ...payload,
    ...applicationPayload,
  } as VerifiedJwtPayload<TSchema>;
};

/**
 * Decodes a JWT without verifying its signature or authenticity.
 *
 * Must not be used for authentication or authorization decisions.
 *
 * @param token - JWT string to decode.
 * @param schema - Zod schema used to validate the decoded payload.
 * @returns The decoded and validated application payload.
 * @throws {jose.errors.JOSEError} If the token is malformed.
 * @throws {z.ZodError} If the payload fails validation.
 */
const decodeJWT = <TSchema extends z.ZodType>(
  token: string,
  schema: TSchema,
): z.output<TSchema> => {
  const payload = jose.decodeJwt(token);

  return schema.parse(payload);
};

/**
 * Validates and encrypts data into a JWE using AES-256-GCM.
 *
 * @param data - Data to encrypt.
 * @param schema - Zod schema used to validate the data.
 * @param expiresIn - Token expiration duration. Defaults to 2 hours.
 * @returns An encrypted JWE string.
 * @throws {z.ZodError} If the data fails validation.
 */
const encrypt = async <TSchema extends z.ZodType>(
  data: z.input<TSchema>,
  schema: TSchema,
  expiresIn: string | number = "2h",
): Promise<string> => {
  const validatedData = schema.parse(data);

  return new jose.EncryptJWT({
    data: validatedData,
  })
    .setProtectedHeader({
      alg: "dir",
      enc: "A256GCM",
    })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .encrypt(secret);
};

/**
 * Decrypts a JWE and validates its contents using the supplied Zod schema.
 *
 * @param token - Encrypted JWE string.
 * @param schema - Zod schema used to validate the decrypted data.
 * @returns The decrypted and validated data.
 * @throws {jose.errors.JOSEError} If decryption or verification fails.
 * @throws {z.ZodError} If the decrypted data fails validation.
 */
const decrypt = async <TSchema extends z.ZodType>(
  token: string,
  schema: TSchema,
): Promise<z.output<TSchema>> => {
  const { payload } = await jose.jwtDecrypt(token, secret, {
    keyManagementAlgorithms: ["dir"],
    contentEncryptionAlgorithms: ["A256GCM"],
  });

  return schema.parse(payload.data);
};

export {
  JwtRoleSchema,
  JwtStatusSchema,
  AuthenticationCookieSchema,
  signJWT,
  verifyJWT,
  decodeJWT,
  encrypt,
  decrypt,
};

export type { JwtRole, JwtStatus, VerifiedJwtPayload };
