import * as ftp from "basic-ftp";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { tryCatch } from "@repo/utils/try-catch";
import { env } from "@repo/env/server";
import { STORAGE_LOCATION } from "@repo/utils/const/storage-location";

export type TUploadFile = {
  file: File;
  subPath?: `/${string}`;
};

export async function uploadFile({
  file,
  subPath = "/",
}: TUploadFile): Promise<string> {
  const GENERATED_FILENAME = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;

  // Normalize and validate subPath
  const normalizedSubPath = subPath.replace(/^\/+|\/+$/g, "");

  if (
    normalizedSubPath
      .split("/")
      .some((segment) => segment === ".." || segment === ".") ||
    normalizedSubPath.includes("\\") ||
    normalizedSubPath.includes("\0")
  ) {
    throw new Error("Invalid subPath");
  }

  const ext = path.extname(file.name) || ".jpg";
  const fileName = `${GENERATED_FILENAME}${ext}`;

  // ====================================================================
  // THIS IS JUST FOR SIMULATION IN DEV ENV, NEVER USE THIS IN PRODUCTION
  // ====================================================================
  if (process.env.NODE_ENV === "development") {
    const CWD = process.cwd();

    const uploadDir = path.resolve(CWD, "../../s3", normalizedSubPath);

    const BASE_DIR = path.resolve(CWD, "../../s3");

    // Prevent directory traversal
    if (
      uploadDir !== BASE_DIR &&
      !uploadDir.startsWith(`${BASE_DIR}${path.sep}`)
    ) {
      throw new Error("Invalid upload directory");
    }

    await fs.mkdir(uploadDir, { recursive: true });

    await fs.writeFile(
      path.join(uploadDir, fileName),
      Buffer.from(await file.arrayBuffer()),
    );

    return `${env.STORAGE_APP_HOST.replace(/\/+$/, "")}${
      normalizedSubPath ? `/${normalizedSubPath}` : ""
    }/${fileName}`;
  }
  // ====================================================================
  // THIS IS JUST FOR SIMULATION IN DEV ENV, NEVER USE THIS IN PRODUCTION
  // ====================================================================

  const tempPath = path.join(os.tmpdir(), fileName);

  const ftpDirectory = path.posix.join(STORAGE_LOCATION, normalizedSubPath);

  const ftpFilePath = path.posix.join(ftpDirectory, fileName);

  const publicPath = STORAGE_LOCATION.replace(/\/public_html\/storage\/?$/, "");

  const client = new ftp.Client();

  try {
    const [writeFileError] = await tryCatch(
      fs.writeFile(tempPath, Buffer.from(await file.arrayBuffer())),
    );

    if (writeFileError) {
      console.error("Error in writeFileError in uploadFile");
      throw writeFileError;
    }

    const [sharedHostingAccessError] = await tryCatch(
      client.access({
        host: env.FTP_HOST,
        port: env.FTP_PORT,
        user: env.FTP_USER,
        password: env.FTP_PASSWORD,
        secure: false,
      }),
    );

    if (sharedHostingAccessError) {
      console.error("Error in sharedHostingAccessError in uploadFile");
      throw sharedHostingAccessError;
    }

    const [ensureDirError] = await tryCatch(client.ensureDir(ftpDirectory));

    if (ensureDirError) {
      console.error("Error in ensureDirError in uploadFile");
      throw ensureDirError;
    }

    const [uploadFromError] = await tryCatch(
      client.uploadFrom(tempPath, ftpFilePath),
    );

    if (uploadFromError) {
      console.error("Error in uploadFromError in uploadFile");
      throw uploadFromError;
    }

    return `${env.STORAGE_APP_HOST.replace(/\/+$/, "")}${
      path.posix.join(publicPath, normalizedSubPath, fileName).startsWith("/")
        ? path.posix.join(publicPath, normalizedSubPath, fileName)
        : `/${path.posix.join(publicPath, normalizedSubPath, fileName)}`
    }`;
  } finally {
    client.close();

    await fs.unlink(tempPath).catch(() => {});
  }
}
