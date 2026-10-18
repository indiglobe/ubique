import { createServerFn } from "@tanstack/react-start";
import {
  getCookie,
  setCookie,
  deleteCookie,
} from "@tanstack/react-start/server";
import { USER_DETAILS } from "@repo/utils/const/cookie-names";
import { tryCatch } from "@repo/utils/try-catch";
import { signJWT, verifyJWT } from "@repo/utils/jwt";
import { userDetailsCookieSchema } from "@/integrations/auth/cookie.schema";

/**
 * Retrieves and verifies the user details stored in the client cookie.
 *
 * The cookie is expected to contain a signed JWT. If the cookie is missing,
 * invalid, or fails verification, `null` is returned.
 *
 * The decoded user details or `null` if unavailable or invalid.
 */
export const fetchUserDetailsCookie = createServerFn().handler(async () => {
  const cookie = getCookie(USER_DETAILS);

  if (!cookie) return null;

  const [err, data] = await tryCatch(verifyJWT(cookie));

  if (err) return null;

  const {
    avatarUrl,
    email,
    employeeCode,
    fullName,
    organizationId,
    phone,
    role,
    status,
    userId,
    username,
  } = data;

  return {
    avatarUrl,
    email,
    employeeCode,
    fullName,
    organizationId,
    phone,
    role,
    status,
    userId,
    username,
  };
});

/**
 * Signs the provided user details as a JWT and stores them
 * in a secure client cookie.
 *
 * The payload is validated against `userDetailsCookieSchema`
 * before being signed and persisted.
 *
 * @param {object} params - Server function arguments.
 * @param {import("zod").infer<typeof userDetailsCookieSchema>} params.data
 * The validated user details to store.
 * @returns {Promise<void>}
 */
export const setUserDetailsCookie = createServerFn()
  .validator(userDetailsCookieSchema)
  .handler(async ({ data }) => {
    const {
      avatarUrl,
      email,
      employeeCode,
      fullName,
      organizationId,
      phone,
      role,
      status,
      userId,
      username,
    } = data;
    const generatedTokenToStoreToClientCookie = await signJWT({
      avatarUrl,
      email,
      employeeCode,
      fullName,
      organizationId,
      phone,
      role,
      status,
      userId,
      username,
    });

    setCookie(USER_DETAILS, generatedTokenToStoreToClientCookie);
  });

/**
 * Removes the user details cookie from the client.
 *
 * This is typically used during logout or when the cached
 * user information should be cleared.
 *
 * @returns {Promise<void>}
 */
export const deleteUserDetailsCookie = createServerFn().handler(async () => {
  deleteCookie(USER_DETAILS);
});
