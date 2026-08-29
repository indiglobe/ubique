import { env } from "@repo/env/server";
import * as jose from "jose";

const secret = new TextEncoder().encode(env.TOKEN_SECRET);

/**
 * Represents the application-specific claims included in a JSON Web Token.
 *
 * Extends the standard {@link jose.JWTPayload} with user-specific claims
 * used for authentication and authorization.
 */
export interface JwtPayload extends jose.JWTPayload {
  /** Unique identifier of the authenticated user. */
  userId: string;

  /** Email address associated with the authenticated user. */
  email: string;

  /** Full name of the authenticated user. */
  fullName: string;

  /** URL of the user's avatar image. */
  avatarUrl: string;

  /** Age of the authenticated user. */
  age: number;

  /** Authorization role assigned to the user. */
  role: "basic" | "admin";

  /** Phone number associated with the authenticated user. */
  phone: string;
}

/**
 * Signs a JWT using the application's secret key.
 *
 * The token uses the HS256 signing algorithm and includes `iat` and `exp`
 * claims automatically. By default, the token expires after two hours.
 *
 * @param payload - The claims to include in the JWT.
 * @param expiresIn - Token lifetime, expressed as a number of seconds or
 * a supported duration string such as `"2h"` or `"7d"`. Defaults to `"2h"`.
 * @returns A promise that resolves to the signed JWT.
 *
 * @example
 * ```ts
 * const token = await signJWT({
 *   userId: "user_123",
 *   email: "user@example.com",
 *   fullName: "John Doe",
 *   avatarUrl: "https://example.com/avatar.jpg",
 *   age: 30,
 *   role: "basic",
 *   phone: "+1234567890",
 * });
 * ```
 */
export const signJWT = async (
  payload: JwtPayload,
  expiresIn: string | number = "2h",
) => {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
};

/**
 * Verifies the signature and validity of a JWT.
 *
 * The token must have been signed with the application's secret key and
 * must not be expired or otherwise invalid. This function should be used
 * whenever the authenticity of the token matters.
 *
 * @typeParam T - Expected shape of the decoded JWT payload.
 * @param token - JWT string to verify.
 * @returns A promise that resolves to the verified JWT payload.
 * @throws {@link jose.errors.JOSEError} If the token is invalid, expired,
 * has an invalid signature, or cannot be verified.
 *
 * @example
 * ```ts
 * const payload = await verifyJWT(token);
 * console.log(payload.userId);
 * ```
 */
export const verifyJWT = async <T = JwtPayload>(token: string) => {
  const { payload } = await jose.jwtVerify(token, secret);

  return payload as T;
};

/**
 * Decodes a JWT without verifying its signature or validity.
 *
 * This function only parses the token and does **not** confirm that it was
 * issued by the application, has a valid signature, or is still valid.
 * Never use the returned data for authentication or authorization decisions.
 *
 * @typeParam T - Expected shape of the decoded JWT payload.
 * @param token - JWT string to decode.
 * @returns The decoded JWT payload.
 * @throws {@link jose.errors.JOSEError} If the token is malformed.
 *
 * @example
 * ```ts
 * const payload = decodeJWT(token);
 * console.log(payload.userId);
 * ```
 */
export const decodeJWT = <T = JwtPayload>(token: string) => {
  return jose.decodeJwt(token) as T;
};

/**
 * Encrypts arbitrary data into a signed and encrypted JWT (JWE).
 *
 * The payload is encrypted using direct symmetric encryption (`dir`) with
 * AES-256-GCM (`A256GCM`). The resulting token also contains issued-at and
 * expiration claims and expires after two hours.
 *
 * Unlike a signed JWT, the contents of an encrypted JWT cannot be read
 * without access to the encryption secret.
 *
 * @typeParam T - Type of the data being encrypted.
 * @param data - Arbitrary JSON-serializable data to encrypt.
 * @returns A promise that resolves to the encrypted JWT.
 *
 * @example
 * ```ts
 * const token = await encrypt({
 *   userId: "user_123",
 *   sessionId: "session_456",
 * });
 * ```
 */
export const encrypt = async <T>(data: T) => {
  return await new jose.EncryptJWT({
    data,
  })
    .setProtectedHeader({
      alg: "dir",
      enc: "A256GCM",
    })
    .setIssuedAt()
    .setExpirationTime("2h")
    .encrypt(secret);
};

/**
 * Decrypts an encrypted JWT and returns the original data.
 *
 * The token must have been encrypted using the application's secret key
 * and must be valid and unexpired.
 *
 * @typeParam T - Expected type of the decrypted data.
 * @param token - Encrypted JWT to decrypt.
 * @returns A promise that resolves to the decrypted data.
 * @throws {@link jose.errors.JOSEError} If the token is invalid, expired,
 * or cannot be decrypted.
 *
 * @example
 * ```ts
 * const data = await decrypt<{ userId: string; sessionId: string }>(token);
 * console.log(data.userId);
 * ```
 */
export const decrypt = async <T>(token: string) => {
  const { payload } = await jose.jwtDecrypt(token, secret);

  return payload.data as T;
};
