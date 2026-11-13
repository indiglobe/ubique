import { PARTNER_ROLE, EMPLOYEE_ROLE } from "@/db-enums";
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

type ROLE = (typeof EMPLOYEE_ROLE)[number] | (typeof PARTNER_ROLE)[number];

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
  SUB_DISTRIBUTOR: "SD",
  SUB_STOCKIST: "SS",
} as const satisfies Record<ROLE, string>;

const EMPLOYEE_CODE_PREFIX = "UB";

/**
 * Generates a unique employee code based on the employee's role,
 * current year, and existing employee count.
 *
 * The generated employee code follows the format:
 *
 * `UB{YEAR}{ROLE_PREFIX}{SEQUENCE_NUMBER}`
 *
 * @param params - Parameters required to generate the employee code.
 * @param params.role - The role assigned to the employee, used to determine
 * the corresponding role prefix.
 * @param params.existingEmployeeCount - The current number of existing
 * employees. The generated sequence number will be incremented by one.
 *
 * @returns A unique employee code consisting of the application prefix,
 * current year, role prefix, and sequential employee number.
 *
 * @example
 * ```ts
 * const employeeCode = generateEmployeeCode({
 *   role: "ADMIN",
 *   existingEmployeeCount: 0,
 * });
 *
 * // Example result:
 * // "UB2026AD1"
 * ```
 *
 * @example
 * ```ts
 * const employeeCode = generateEmployeeCode({
 *   role: "MR",
 *   existingEmployeeCount: 12,
 * });
 *
 * // Example result:
 * // "UB2026MR13"
 * ```
 */
export function generateEmployeeCode({
  role,
  existingEmployeeCount,
}: {
  role: keyof typeof ROLE_PREFIX;
  existingEmployeeCount: number;
}): string {
  const rolePrefix = ROLE_PREFIX[role];
  const year = new Date(Date.now()).getFullYear();
  const sequenceNumber = String(existingEmployeeCount + 1).padStart(3, "0");

  return `${EMPLOYEE_CODE_PREFIX}${year}${rolePrefix}${(sequenceNumber)}`;
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
