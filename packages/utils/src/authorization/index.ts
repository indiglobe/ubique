import { USER_ROLE } from "../db-enums";

type ROLE = (typeof USER_ROLE)[number];

export const allowSepcifity: Record<ROLE, number> = {
  SUPER_ADMIN: 0,
  ADMIN: 1,
  ZSM: 2,
  RSM: 3,
  MANAGER: 4,
  ASM: 5,
  MR: 6,
  DISTRIBUTOR: 7,
  STOCKIST: 7,
};

/**
 * Checks whether a user's role has sufficient privileges to access a resource
 * or perform an action based on the application's role hierarchy.
 *
 * Roles with lower specificity values have higher privileges. When multiple
 * required roles are provided, access is granted if the user's role satisfies
 * the access requirement for at least one of them.
 *
 * @param requiredRole - A single role or an array of roles that are permitted
 * to access the resource or perform the action.
 * @param currentRole - The role of the current user.
 * @param shouldAllowEqualLevelRole - Whether users with the same role level
 * as a required role are allowed access. Defaults to `true`.
 * When `false`, the user's role must have strictly higher privileges than
 * the required role.
 *
 * @returns `true` if the user's role satisfies at least one of the required
 * role constraints; otherwise, `false`.
 */

export function hasAccess({
  currentRole,
  requiredRole,
  shouldAllowEqualLevelRole = true,
}: {
  requiredRole: ROLE | ROLE[];
  currentRole: ROLE;
  shouldAllowEqualLevelRole?: boolean;
}): boolean {
  const requiredRoles = Array.isArray(requiredRole)
    ? requiredRole
    : [requiredRole];

  return requiredRoles.some((role) => {
    if (!shouldAllowEqualLevelRole) {
      return allowSepcifity[currentRole] < allowSepcifity[role];
    }

    return allowSepcifity[currentRole] <= allowSepcifity[role];
  });
}
