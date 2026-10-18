import { JwtPayloadSchema } from "@repo/utils/jwt";
import type z from "zod";

export const userDetailsCookieSchema = JwtPayloadSchema;

export type TUserDetailsCookieSchema = z.infer<typeof userDetailsCookieSchema>;
