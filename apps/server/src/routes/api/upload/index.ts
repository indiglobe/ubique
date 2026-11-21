import { Hono } from "hono";
import { uploadFile } from "@/integrations/uploader/file";
import { tryCatch } from "@repo/utils/try-catch";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const route = new Hono();

route.post("/", async (c) => {
  const [formDataError, formData] = await tryCatch(c.req.formData());

  if (formDataError) {
    return c.json({ message: "Invalid multipart form data." }, 400);
  }

  const file = formData.get("file");
  const subPath = formData.get("subPath");

  // Validate file
  if (!(file instanceof File)) {
    return c.json({ message: "Image file is required." }, 400);
  }

  // Validate subPath type
  if (subPath !== null && typeof subPath !== "string") {
    return c.json({ message: "Invalid subPath." }, 400);
  }

  // Validate subPath format
  if (
    subPath &&
    (!subPath.startsWith("/") ||
      subPath.includes("..") ||
      subPath.includes("\\") ||
      subPath.includes("\0"))
  ) {
    return c.json({ message: "Invalid subPath format." }, 400);
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    return c.json({ message: "Only image files are allowed." }, 400);
  }

  // Validate file size
  if (file.size === 0 || file.size > MAX_FILE_SIZE) {
    return c.json(
      {
        message: "Image must be greater than 0 bytes and no larger than 5 MB.",
      },
      400,
    );
  }

  // Upload file
  const [uploadError, publicURL] = await tryCatch(
    uploadFile({
      file,
      subPath: subPath ? (subPath as `/${string}`) : undefined,
    }),
  );

  if (uploadError) {
    console.error("Static file upload failed:", uploadError);

    return c.json({ message: "Failed to upload static file." }, 500);
  }

  return c.json({ publicURL }, 200);
});

export { route };
