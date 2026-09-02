import { env } from "@repo/env/server";
import * as jose from "jose";
import { z } from "zod";

const secret = new TextEncoder().encode(env.TOKEN_SECRET);

/**
 * Authorization roles supported by the application.
 */
export const JwtRoleSchema = z.enum([
  "SUPER_ADMIN",
  "ADMIN",
  "MR",
  "DISTRIBUTOR",
  "STOCKIST",
  "MANAGER",
]);

/**
 * Authorization role assigned to an authenticated user.
 */
export type JwtRole = z.infer<typeof JwtRoleSchema>;

/**
 * User account statuses supported by the application.
 */
export const JwtStatusSchema = z.enum([
  "ACTIVE",
  "INACTIVE",
  "SUSPENDED",
  "UNDER_VERIFICATION",
]);

/**
 * User account status of an authenticated user.
 */
export type JwtStatus = z.infer<typeof JwtStatusSchema>;

/**
 * Zod schema for application-specific JWT claims.
 *
 * This schema is the single source of truth for the application's
 * custom JWT payload fields. The corresponding TypeScript type is
 * automatically inferred from this schema.
 *
 * JWT-standard claims such as `iss`, `sub`, `aud`, `iat`, `exp`,
 * `nbf`, and `jti` are intentionally not defined here. Those claims
 * are part of {@link jose.JWTPayload} and are handled by `jose`.
 */
export const JwtPayloadSchema = z.object({
  /**
   * Organization associated with the authenticated user.
   */
  organizationId: z.string().nullable(),

  /**
   * Unique username of the user.
   */
  username: z.string().min(1),

  /**
   * Unique employee code of the user.
   */
  employeeCode: z.string().nullable(),

  /**
   * Unique identifier of the authenticated user.
   */
  userId: z.string().min(1),

  /**
   * Email address associated with the authenticated user.
   */
  email: z.email(),

  /**
   * Full name of the authenticated user.
   */
  fullName: z.string().min(1),

  /**
   * URL of the user's avatar image.
   *
   * `null` is allowed when the user does not have an avatar.
   */
  avatarUrl: z.url().nullable(),

  /**
   * Authorization role assigned to the user.
   */
  role: JwtRoleSchema,

  /**
   * Phone number associated with the authenticated user.
   */
  phone: z.string().min(1),

  /**
   * Current status of the user account.
   */
  status: JwtStatusSchema,
});

/**
 * Application-specific JWT claims.
 *
 * This type is automatically inferred from {@link JwtPayloadSchema}.
 *
 * It intentionally contains only application-specific claims.
 * Standard JWT claims are represented separately by `jose.JWTPayload`.
 */
export type JwtPayload = z.infer<typeof JwtPayloadSchema>;

/**
 * A verified JWT payload containing both the standard JWT claims
 * provided by `jose` and the application's custom claims.
 *
 * No JWT-standard fields are manually duplicated here. The standard
 * claims come directly from `jose.JWTPayload`, while application
 * claims come from the Zod-inferred {@link JwtPayload} type.
 */
export type VerifiedJwtPayload = JwtPayload & jose.JWTPayload;

/**
 * Signs an application JWT using the configured secret.
 *
 * The JWT is signed using the HS256 algorithm. The `iat` (issued at)
 * claim is automatically added, and an `exp` (expiration) claim is
 * generated using the supplied expiration duration.
 *
 * The application-specific payload is validated with
 * {@link JwtPayloadSchema} before the token is signed.
 *
 * @param payload - Application-specific claims to include in the JWT.
 * @param expiresIn - Token lifetime in seconds or a supported duration
 * string such as `"2h"` or `"7d"`. Defaults to `"2h"`.
 *
 * @returns A promise resolving to the signed JWT string.
 *
 * @throws {z.ZodError}
 * If the supplied payload does not satisfy {@link JwtPayloadSchema}.
 *
 * @example
 * ```ts
 * const token = await signJWT({
 *   organizationId: "org_123",
 *   username: "john.doe",
 *   employeeCode: "EMP001",
 *   userId: "user_123",
 *   email: "john@example.com",
 *   fullName: "John Doe",
 *   avatarUrl: null,
 *   role: "ADMIN",
 *   phone: "+919876543210",
 *   status: "ACTIVE",
 * });
 * ```
 */
export const signJWT = async (
  payload: JwtPayload,
  expiresIn: string | number = "2h",
): Promise<string> => {
  const validatedPayload = JwtPayloadSchema.parse(payload);

  return await new jose.SignJWT(validatedPayload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
};

/**
 * Verifies and validates an application JWT.
 *
 * `jose.jwtVerify()` performs cryptographic verification and validates
 * standard JWT requirements such as the signature and expiration.
 *
 * After successful JWT verification, {@link JwtPayloadSchema} validates
 * all application-specific claims at runtime.
 *
 * The returned value is therefore both:
 *
 * - cryptographically verified by `jose`
 * - runtime validated by Zod
 *
 * @param token - JWT string to verify.
 *
 * @returns A promise resolving to a verified payload containing both
 * standard {@link jose.JWTPayload} claims and application-specific claims.
 *
 * @throws {jose.errors.JOSEError}
 * If the token has an invalid signature, unsupported algorithm,
 * invalid structure, or is expired/not yet valid.
 *
 * @throws {z.ZodError}
 * If the JWT does not contain valid application-specific claims.
 *
 * @example
 * ```ts
 * const payload = await verifyJWT(token);
 *
 * console.log(payload.userId);
 * console.log(payload.username);
 * console.log(payload.role);
 * console.log(payload.exp);
 * console.log(payload.iat);
 * ```
 */
export const verifyJWT = async (token: string): Promise<VerifiedJwtPayload> => {
  const { payload } = await jose.jwtVerify(token, secret, {
    algorithms: ["HS256"],
  });

  const applicationPayload = JwtPayloadSchema.parse(payload);

  return {
    ...payload,
    ...applicationPayload,
  };
};

/**
 * Decodes a JWT without verifying its signature or validity.
 *
 * This function only decodes and validates the shape of the
 * application-specific claims. It does NOT prove that the token
 * was issued by this application and MUST NOT be used for
 * authentication or authorization decisions.
 *
 * Use {@link verifyJWT} whenever token authenticity matters.
 *
 * @param token - JWT string to decode.
 *
 * @returns The validated application-specific JWT claims.
 *
 * @throws {jose.errors.JOSEError}
 * If the token is malformed or cannot be decoded.
 *
 * @throws {z.ZodError}
 * If the decoded payload does not satisfy {@link JwtPayloadSchema}.
 *
 * @example
 * ```ts
 * const payload = decodeJWT(token);
 *
 * console.log(payload.userId);
 * ```
 */
export const decodeJWT = (token: string): JwtPayload => {
  const payload = jose.decodeJwt(token);

  return JwtPayloadSchema.parse(payload);
};

/**
 * Encrypts arbitrary data into a JSON Web Encryption (JWE).
 *
 * Direct symmetric encryption (`dir`) with AES-256-GCM (`A256GCM`)
 * is used. The encrypted token automatically receives `iat` and
 * `exp` claims and expires after two hours.
 *
 * Unlike a signed JWT, the contents of a JWE cannot be read without
 * access to the encryption secret.
 *
 * @typeParam T - Type of the data being encrypted.
 *
 * @param data - JSON-serializable data to encrypt.
 *
 * @returns A promise resolving to the encrypted JWE string.
 *
 * @example
 * ```ts
 * const token = await encrypt({
 *   userId: "user_123",
 *   sessionId: "session_456",
 * });
 * ```
 */
export const encrypt = async <T>(data: T): Promise<string> => {
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
 * Decrypts an encrypted JWT and validates its decrypted data.
 *
 * The JWE signature/authentication and expiration are validated by
 * `jose`. The decrypted application data is then validated against
 * the supplied Zod schema.
 *
 * Passing a Zod schema instead of a TypeScript generic ensures that
 * the decrypted data is validated at runtime as well as being
 * correctly inferred by TypeScript.
 *
 * @typeParam TSchema - Zod schema used to validate the decrypted data.
 *
 * @param token - Encrypted JWE string.
 * @param schema - Zod schema describing the expected decrypted data.
 *
 * @returns A promise resolving to the schema-inferred and validated data.
 *
 * @throws {jose.errors.JOSEError}
 * If the JWE is invalid, expired, malformed, or cannot be decrypted.
 *
 * @throws {z.ZodError}
 * If the decrypted data does not satisfy the supplied schema.
 *
 * @example
 * ```ts
 * const SessionSchema = z.object({
 *   userId: z.string(),
 *   sessionId: z.string(),
 * });
 *
 * const session = await decrypt(token, SessionSchema);
 *
 * // Fully inferred:
 * session.userId;
 * session.sessionId;
 * ```
 */
export const decrypt = async <TSchema extends z.ZodType>(
  token: string,
  schema: TSchema,
): Promise<z.infer<TSchema>> => {
  const { payload } = await jose.jwtDecrypt(token, secret, {
    keyManagementAlgorithms: ["dir"],
    contentEncryptionAlgorithms: ["A256GCM"],
  });

  return schema.parse(payload.data);
};
