import { createAuthClient } from "better-auth/react";
import { env } from "@repo/env/client";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: env.VITE_WEB_APP_HOST,
});
