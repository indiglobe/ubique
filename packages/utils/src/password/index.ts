import { tryCatch } from "@/try-catch";
import { env } from "@repo/env/server";
import bcrypt from "bcryptjs";

const { SALT_ROUND } = env;

/**
 * Hashes a plain-text password using bcrypt.
 *
 * Bcrypt automatically generates a cryptographically secure, unique salt
 * for each password. The generated salt is embedded in the resulting hash,
 * so the hash can be safely stored in a database without separately storing
 * the salt.
 *
 * This is the preferred asynchronous method for hashing passwords because
 * it does not block the Node.js event loop while bcrypt performs the
 * computationally expensive hashing operation.
 *
 * @param password - The plain-text password to hash.
 *
 * @returns A promise that resolves to the bcrypt password hash.
 *
 * @throws {Error} If bcrypt fails to hash the password.
 *
 * @example
 * ```ts
 * const hashedPassword = await hashPassword("my-password");
 *
 * await db.user.create({
 *   data: {
 *     password: hashedPassword,
 *   },
 * });
 * ```
 */
export async function hashPassword(password: string): Promise<string> {
  const [hashingError, hashedPassword] = await tryCatch(
    bcrypt.hash(password, SALT_ROUND),
  );

  if (hashingError) {
    console.log("Error in hashing password:", hashingError);
    throw hashingError;
  }

  return hashedPassword;
}

/**
 * Hashes a plain-text password using bcrypt synchronously.
 *
 * Bcrypt automatically generates a cryptographically secure, unique salt
 * for each password. The generated salt is embedded in the resulting hash,
 * so the hash can be safely stored in a database without separately storing
 * the salt.
 *
 * This method performs the hashing operation synchronously and therefore
 * blocks the Node.js event loop until hashing is complete. Prefer
 * {@link hashPassword} for server-side request handling and other
 * asynchronous code where possible.
 *
 * @param password - The plain-text password to hash.
 *
 * @returns The bcrypt password hash.
 *
 * @throws {Error} If bcrypt fails to hash the password.
 *
 * @example
 * ```ts
 * const hashedPassword = hashPasswordSync("my-password");
 *
 * await db.user.create({
 *   data: {
 *     password: hashedPassword,
 *   },
 * });
 * ```
 */
export function hashPasswordSync(password: string): string {
  const [hashingError, hashedPassword] = tryCatch(
    bcrypt.hashSync(password, SALT_ROUND),
  );

  if (hashingError) {
    console.log("Error in hashing password:", hashingError);
    throw hashingError;
  }

  return hashedPassword;
}

/**
 * Verifies a plain-text password against a bcrypt password hash.
 *
 * The password is compared against the hash using bcrypt's password
 * verification mechanism. The function returns `false` when the password
 * does not match the hash; an exception is thrown only if bcrypt encounters
 * an error while performing the comparison.
 *
 * This is the preferred asynchronous method for password verification
 * because it does not block the Node.js event loop while bcrypt performs
 * the computationally expensive comparison.
 *
 * @param password - The plain-text password to verify.
 * @param hashedPassword - The bcrypt password hash to compare against.
 *
 * @returns A promise that resolves to `true` when the password matches the
 * hash, or `false` when the password does not match.
 *
 * @throws {Error} If bcrypt fails while comparing the password.
 *
 * @example
 * ```ts
 * const isValid = await verifyPassword(
 *   "my-password",
 *   user.password,
 * );
 *
 * if (!isValid) {
 *   throw new Error("Invalid email or password");
 * }
 * ```
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const [validationError, isValid] = await tryCatch(
    bcrypt.compare(password, hashedPassword),
  );

  if (validationError) {
    console.log("Error in password verification:", validationError);
    throw validationError;
  }

  return isValid;
}

/**
 * Verifies a plain-text password against a bcrypt password hash
 * synchronously.
 *
 * The password is compared against the supplied bcrypt hash. The function
 * returns `false` when the password does not match the hash.
 *
 * This method performs the comparison synchronously and therefore blocks
 * the Node.js event loop until the operation is complete. Prefer
 * {@link verifyPassword} for server-side request handling and other
 * asynchronous code where possible.
 *
 * @param password - The plain-text password to verify.
 * @param hashedPassword - The bcrypt password hash to compare against.
 *
 * @returns `true` when the password matches the hash, or `false` when the
 * password does not match.
 *
 * @throws {Error} If bcrypt fails while comparing the password.
 *
 * @example
 * ```ts
 * const isValid = verifyPasswordSync(
 *   "my-password",
 *   user.password,
 * );
 *
 * if (!isValid) {
 *   throw new Error("Invalid email or password");
 * }
 * ```
 */
export function verifyPasswordSync(
  password: string,
  hashedPassword: string,
): boolean {
  const [validationError, isValid] = tryCatch(
    bcrypt.compareSync(password, hashedPassword),
  );

  if (validationError) {
    console.log("Error in password verification:", validationError);
    throw validationError;
  }

  return isValid;
}
