import { env } from "node:process";

export const STORAGE_LOCATION = `/public_html/storage/ubique${!env.NODE_ENV || env.NODE_ENV === "production" ? "" : "/development"}`;
