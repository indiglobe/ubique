import { AuthenticationCookieSchema } from "@repo/utils/jwt";
import type z from "zod";

export const userDetailsCookieSchema = AuthenticationCookieSchema;

export type TUserDetailsCookieSchema = z.infer<typeof userDetailsCookieSchema>;
