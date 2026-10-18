import { uid } from "uid/secure";

/**
 * Generates a cryptographically secure, random identifier.
 *
 * @param options - Optional configuration for the generated identifier.
 * @param options.length - The length of the identifier. Defaults to `10`.
 * @returns A randomly generated identifier of the requested length.
 */

export function id(options?: { length: number }) {
  const length = options?.length ?? 10;

  return uid(length).toUpperCase();
}

const ROLE_PREFIX = {
  MR: "MR",
  ASM: "AS",
  RSM: "RS",
  ZSM: "ZS",
  STOCKIST: "ST",
  SUPER_ADMIN: "SA",
  ADMIN: "AD",
  DISTRIBUTOR: "DI",
  MANAGER: "MA",
} as const;

const EMPLOYEE_CODE_PREFIX = "UB";

/**
 * Generates a unique employee code using the employee's role and a
 * randomly generated identifier.
 *
 * The generated employee code follows the format:
 *
 * `UB_{ROLE_PREFIX}_{GENERATED_ID}`
 *
 * @param params - Parameters required to generate the employee code.
 * @param params.role - The role assigned to the employee.
 *
 * @returns A unique employee code containing the application prefix,
 * role prefix, and generated identifier.
 *
 * @example
 * ```ts
 * const employeeCode = generateEmployeeCode({
 *   role: "ADMIN",
 * });
 *
 * // Example result:
 * // "UB_AD_x7K92LmP"
 * ```
 *
 * @example
 * ```ts
 * const employeeCode = generateEmployeeCode({
 *   role: "MEDICAL_REP",
 * });
 *
 * // Example result:
 * // "UB_MR_a82Kx91P"
 * ```
 */
export function generateEmployeeCode({
  role,
}: {
  role: keyof typeof ROLE_PREFIX;
}): string {
  const rolePrefix = ROLE_PREFIX[role];
  const generatedId = id();

  return `${EMPLOYEE_CODE_PREFIX}_${rolePrefix}_${generatedId}`;
}

/**
 * Generates a username from an email address by extracting the local part
 * (the portion before `@`), converting it to lowercase, and removing all
 * non-alphanumeric characters.
 *
 * @param email - The email address from which to generate the username.
 *
 * @returns A normalized username containing only lowercase letters and
 * numbers.
 *
 * @example
 * ```ts
 * const username = generateUsernameFromEmail({
 *   email: "John.Doe@example.com",
 * });
 *
 * // "johndoe"
 * ```
 *
 * @example
 * ```ts
 * const username = generateUsernameFromEmail({
 *   email: "Sales_Team42@company.com",
 * });
 *
 * // "salesteam42"
 * ```
 */

export function generateUsernameFromEmail({
  email,
}: {
  email: string;
}): string {
  const username = email
    .trim()
    .toLowerCase()
    .split("@")[0]!
    .replace(/[^a-z0-9]/g, "");

  return username;
}
