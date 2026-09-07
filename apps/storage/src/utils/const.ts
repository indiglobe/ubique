import path from "node:path";
import { cwd } from "node:process";

/**
 * Absolute path to the local S3 storage directory.
 *
 * The path is resolved relative to the current working directory.
 *
 */
export const S3_PATH = path.join(cwd(), "../../s3");

/**
 * Relative path used for storing uploaded avatar files.
 *
 */
export const AVATAR_PATH = "upload/avatar";
