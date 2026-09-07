import { Hono } from "hono";
import { tryCatch } from "@repo/utils/try-catch";
import {
  FormDataError,
  getUploadedAvatar,
  saveUploadedAvatar,
  UploadError,
} from "@/routes/upload/upload.services";
import path from "node:path";

export const uploadRoutes = new Hono();

// GET /upload/avatar/:fileName
uploadRoutes.get("/avatar/:fileName", async (c) => {
  const { fileName } = c.req.param();

  /**
   * Retrieve the requested avatar from local storage.
   */
  const [error, avatar] = await tryCatch(getUploadedAvatar(c));

  if (error) {
    if (error instanceof UploadError) {
      return c.json(error.toJSON(), 404);
    }

    return c.text("Something went wrong, try again", 500);
  }

  /**
   * Determine the MIME type from the file extension so the browser
   * can correctly render the returned image.
   */
  const extension = path.extname(fileName).toLowerCase();

  const contentTypeMap: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".avif": "image/avif",
  };

  const contentType = contentTypeMap[extension] ?? "application/octet-stream";

  return c.body(avatar, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
});

// POST /upload/avatar
uploadRoutes.post("/avatar", async (c) => {
  const [error, uploadResponse] = await tryCatch(saveUploadedAvatar(c));

  if (error) {
    if (error instanceof FormDataError) {
      return c.json(error.toJSON(), 406);
    }

    if (error instanceof UploadError) {
      return c.json(error.toJSON(), 500);
    }
    return c.text("Something went wrong, try again", 500);
  }

  return c.json(uploadResponse);
});
