
import { uploadFile } from "@/integrations/uploader/file";
import { tryCatch } from "@repo/utils/try-catch";
import { createFileRoute } from "@tanstack/react-router";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const Route = createFileRoute("/api/upload/")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const [formDataError, formData] = await tryCatch(
          request.formData(),
        );

        if (formDataError) {
          return Response.json(
            { message: "Invalid multipart form data." },
            { status: 400 },
          );
        }

        const file = formData.get("file");
        const subPath = formData.get("subPath");

        // Validate file
        if (!(file instanceof File)) {
          return Response.json(
            { message: "Image file is required." },
            { status: 400 },
          );
        }

        // Validate subPath type
        if (subPath !== null && typeof subPath !== "string") {
          return Response.json(
            { message: "Invalid subPath." },
            { status: 400 },
          );
        }

        // Validate subPath format
        if (
          subPath &&
          (!subPath.startsWith("/") ||
            subPath.includes("..") ||
            subPath.includes("\\") ||
            subPath.includes("\0"))
        ) {
          return Response.json(
            { message: "Invalid subPath format." },
            { status: 400 },
          );
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
          return Response.json(
            { message: "Only image files are allowed." },
            { status: 400 },
          );
        }

        // Validate file size
        if (file.size === 0 || file.size > MAX_FILE_SIZE) {
          return Response.json(
            {
              message:
                "Image must be greater than 0 bytes and no larger than 5 MB.",
            },
            { status: 400 },
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

          return Response.json(
            { message: "Failed to upload static file." },
            { status: 500 },
          );
        }

        return Response.json(
          { publicURL },
          { status: 200 },
        );
      },
    },
  },
});
