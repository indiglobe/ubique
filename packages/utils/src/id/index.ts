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

  return uid(length);
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
  const generatedId = id().toUpperCase();

  return `${EMPLOYEE_CODE_PREFIX}_${rolePrefix}_${generatedId}`;
}
