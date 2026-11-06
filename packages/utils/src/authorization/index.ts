import { PARTNER_ROLE, EMPLOYEE_ROLE } from "../db-enums";

type ROLE = (typeof EMPLOYEE_ROLE)[number] | (typeof PARTNER_ROLE)[number];

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
  SUB_DISTRIBUTOR: 8,
  SUB_STOCKIST: 8,
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

type Actions = "create" | "read" | "update" | "delete";
type Entity =
  | "user"
  | "employee_profile"
  | "partner_profile"
  | "partner_business_details"
  | "partner_bank_details"
  | "partner_address"
  | "partner_contact_person"
  | "partner_document"
  | "partner_assigned_personnel"
  | "partner_coverage_area"
  | "partner_distribution_facility"
  | "experience"
  | "educational_qualification"
  | "professional_qualification"
  | "managerial_relationships"
  | "state"
  | "district";

type EntityActions = `${Actions}:${Entity}`;

const ACCESS_PERMISSIONS: Record<ROLE, EntityActions[]> = {
  SUPER_ADMIN: [
    "create:user",
    "read:user",
    "update:user",
    "delete:user",

    "create:employee_profile",
    "read:employee_profile",
    "update:employee_profile",
    "delete:employee_profile",

    "create:partner_profile",
    "read:partner_profile",
    "update:partner_profile",
    "delete:partner_profile",

    "create:partner_business_details",
    "read:partner_business_details",
    "update:partner_business_details",
    "delete:partner_business_details",

    "create:partner_bank_details",
    "read:partner_bank_details",
    "update:partner_bank_details",
    "delete:partner_bank_details",

    "create:partner_address",
    "read:partner_address",
    "update:partner_address",
    "delete:partner_address",

    "create:partner_contact_person",
    "read:partner_contact_person",
    "update:partner_contact_person",
    "delete:partner_contact_person",

    "create:partner_document",
    "read:partner_document",
    "update:partner_document",
    "delete:partner_document",

    "create:partner_assigned_personnel",
    "read:partner_assigned_personnel",
    "update:partner_assigned_personnel",
    "delete:partner_assigned_personnel",

    "create:partner_coverage_area",
    "read:partner_coverage_area",
    "update:partner_coverage_area",
    "delete:partner_coverage_area",

    "create:partner_distribution_facility",
    "read:partner_distribution_facility",
    "update:partner_distribution_facility",
    "delete:partner_distribution_facility",

    "create:experience",
    "read:experience",
    "update:experience",
    "delete:experience",

    "create:educational_qualification",
    "read:educational_qualification",
    "update:educational_qualification",
    "delete:educational_qualification",

    "create:professional_qualification",
    "read:professional_qualification",
    "update:professional_qualification",
    "delete:professional_qualification",

    "create:managerial_relationships",
    "read:managerial_relationships",
    "update:managerial_relationships",
    "delete:managerial_relationships",

    "create:state",
    "read:state",
    "update:state",
    "delete:state",

    "create:district",
    "read:district",
    "update:district",
    "delete:district",
  ],

  ADMIN: [
    "create:user",
    "read:user",
    "update:user",
    "delete:user",

    "create:employee_profile",
    "read:employee_profile",
    "update:employee_profile",
    "delete:employee_profile",

    "create:partner_profile",
    "read:partner_profile",
    "update:partner_profile",
    "delete:partner_profile",

    "create:partner_business_details",
    "read:partner_business_details",
    "update:partner_business_details",
    "delete:partner_business_details",

    "create:partner_bank_details",
    "read:partner_bank_details",
    "update:partner_bank_details",
    "delete:partner_bank_details",

    "create:partner_address",
    "read:partner_address",
    "update:partner_address",
    "delete:partner_address",

    "create:partner_contact_person",
    "read:partner_contact_person",
    "update:partner_contact_person",
    "delete:partner_contact_person",

    "create:partner_document",
    "read:partner_document",
    "update:partner_document",
    "delete:partner_document",

    "create:partner_assigned_personnel",
    "read:partner_assigned_personnel",
    "update:partner_assigned_personnel",
    "delete:partner_assigned_personnel",

    "create:partner_coverage_area",
    "read:partner_coverage_area",
    "update:partner_coverage_area",
    "delete:partner_coverage_area",

    "create:partner_distribution_facility",
    "read:partner_distribution_facility",
    "update:partner_distribution_facility",
    "delete:partner_distribution_facility",

    "create:experience",
    "read:experience",
    "update:experience",
    "delete:experience",

    "create:educational_qualification",
    "read:educational_qualification",
    "update:educational_qualification",
    "delete:educational_qualification",

    "create:professional_qualification",
    "read:professional_qualification",
    "update:professional_qualification",
    "delete:professional_qualification",

    "create:managerial_relationships",
    "read:managerial_relationships",
    "update:managerial_relationships",
    "delete:managerial_relationships",

    "read:state",
    "read:district",
  ],

  ZSM: [
    "create:user",
    "read:user",
    "update:user",

    "create:employee_profile",
    "read:employee_profile",
    "update:employee_profile",

    "create:partner_profile",
    "read:partner_profile",
    "update:partner_profile",

    "create:partner_business_details",
    "read:partner_business_details",
    "update:partner_business_details",

    "read:partner_bank_details",

    "create:partner_address",
    "read:partner_address",
    "update:partner_address",

    "create:partner_contact_person",
    "read:partner_contact_person",
    "update:partner_contact_person",

    "create:partner_document",
    "read:partner_document",
    "update:partner_document",

    "create:partner_assigned_personnel",
    "read:partner_assigned_personnel",
    "update:partner_assigned_personnel",
    "delete:partner_assigned_personnel",

    "create:partner_coverage_area",
    "read:partner_coverage_area",
    "update:partner_coverage_area",

    "create:partner_distribution_facility",
    "read:partner_distribution_facility",
    "update:partner_distribution_facility",

    "read:experience",
    "read:educational_qualification",
    "read:professional_qualification",

    "create:managerial_relationships",
    "read:managerial_relationships",
    "update:managerial_relationships",
    "delete:managerial_relationships",

    "read:state",
    "read:district",
  ],

  RSM: [
    "create:user",
    "read:user",
    "update:user",

    "create:employee_profile",
    "read:employee_profile",
    "update:employee_profile",

    "create:partner_profile",
    "read:partner_profile",
    "update:partner_profile",

    "create:partner_business_details",
    "read:partner_business_details",
    "update:partner_business_details",

    "read:partner_bank_details",

    "create:partner_address",
    "read:partner_address",
    "update:partner_address",

    "create:partner_contact_person",
    "read:partner_contact_person",
    "update:partner_contact_person",

    "create:partner_document",
    "read:partner_document",
    "update:partner_document",

    "create:partner_assigned_personnel",
    "read:partner_assigned_personnel",
    "update:partner_assigned_personnel",

    "create:partner_coverage_area",
    "read:partner_coverage_area",
    "update:partner_coverage_area",

    "create:partner_distribution_facility",
    "read:partner_distribution_facility",
    "update:partner_distribution_facility",

    "read:experience",
    "read:educational_qualification",
    "read:professional_qualification",

    "create:managerial_relationships",
    "read:managerial_relationships",
    "update:managerial_relationships",

    "read:state",
    "read:district",
  ],

  MANAGER: [
    "create:user",
    "read:user",
    "update:user",

    "read:employee_profile",
    "read:partner_profile",
    "update:partner_profile",

    "create:partner_business_details",
    "read:partner_business_details",
    "update:partner_business_details",

    "read:partner_bank_details",

    "create:partner_address",
    "read:partner_address",
    "update:partner_address",

    "create:partner_contact_person",
    "read:partner_contact_person",
    "update:partner_contact_person",

    "create:partner_document",
    "read:partner_document",
    "update:partner_document",

    "create:partner_assigned_personnel",
    "read:partner_assigned_personnel",
    "update:partner_assigned_personnel",

    "create:partner_coverage_area",
    "read:partner_coverage_area",
    "update:partner_coverage_area",

    "create:partner_distribution_facility",
    "read:partner_distribution_facility",
    "update:partner_distribution_facility",

    "read:experience",
    "read:educational_qualification",
    "read:professional_qualification",

    "read:managerial_relationships",

    "read:state",
    "read:district",
  ],

  ASM: [
    "create:user",
    "read:user",
    "update:user",

    "read:employee_profile",
    "read:partner_profile",
    "update:partner_profile",

    "create:partner_business_details",
    "read:partner_business_details",
    "update:partner_business_details",

    "read:partner_bank_details",

    "create:partner_address",
    "read:partner_address",
    "update:partner_address",

    "create:partner_contact_person",
    "read:partner_contact_person",
    "update:partner_contact_person",

    "create:partner_document",
    "read:partner_document",
    "update:partner_document",

    "create:partner_assigned_personnel",
    "read:partner_assigned_personnel",
    "update:partner_assigned_personnel",

    "create:partner_coverage_area",
    "read:partner_coverage_area",
    "update:partner_coverage_area",

    "create:partner_distribution_facility",
    "read:partner_distribution_facility",
    "update:partner_distribution_facility",

    "read:experience",
    "read:educational_qualification",
    "read:professional_qualification",

    "read:managerial_relationships",

    "read:state",
    "read:district",
  ],

  MR: [
    "read:user",

    "read:employee_profile",
    "update:employee_profile",

    "read:partner_profile",
    "read:partner_business_details",
    "read:partner_address",
    "read:partner_contact_person",
    "read:partner_document",
    "read:partner_assigned_personnel",
    "read:partner_coverage_area",
    "read:partner_distribution_facility",

    "read:experience",
    "create:experience",
    "update:experience",
    "delete:experience",

    "read:educational_qualification",
    "create:educational_qualification",
    "update:educational_qualification",
    "delete:educational_qualification",

    "read:professional_qualification",
    "create:professional_qualification",
    "update:professional_qualification",
    "delete:professional_qualification",

    "read:state",
    "read:district",
  ],

  DISTRIBUTOR: [
    "create:user",
    "read:user",

    "read:partner_profile",
    "update:partner_profile",

    "create:partner_business_details",
    "read:partner_business_details",
    "update:partner_business_details",

    "read:partner_bank_details",

    "create:partner_address",
    "read:partner_address",
    "update:partner_address",

    "create:partner_contact_person",
    "read:partner_contact_person",
    "update:partner_contact_person",

    "create:partner_document",
    "read:partner_document",
    "update:partner_document",

    "create:partner_assigned_personnel",
    "read:partner_assigned_personnel",
    "update:partner_assigned_personnel",

    "create:partner_coverage_area",
    "read:partner_coverage_area",
    "update:partner_coverage_area",

    "create:partner_distribution_facility",
    "read:partner_distribution_facility",
    "update:partner_distribution_facility",

    "read:state",
    "read:district",
  ],

  STOCKIST: [
    "create:user",
    "read:user",

    "read:partner_profile",
    "update:partner_profile",

    "create:partner_business_details",
    "read:partner_business_details",
    "update:partner_business_details",

    "read:partner_bank_details",

    "create:partner_address",
    "read:partner_address",
    "update:partner_address",

    "create:partner_contact_person",
    "read:partner_contact_person",
    "update:partner_contact_person",

    "create:partner_document",
    "read:partner_document",
    "update:partner_document",

    "create:partner_assigned_personnel",
    "read:partner_assigned_personnel",
    "update:partner_assigned_personnel",

    "create:partner_coverage_area",
    "read:partner_coverage_area",
    "update:partner_coverage_area",

    "create:partner_distribution_facility",
    "read:partner_distribution_facility",
    "update:partner_distribution_facility",

    "read:state",
    "read:district",
  ],

  SUB_DISTRIBUTOR: [
    "read:user",

    "read:partner_profile",
    "update:partner_profile",

    "read:partner_business_details",
    "update:partner_business_details",

    "read:partner_address",
    "update:partner_address",

    "read:partner_contact_person",
    "update:partner_contact_person",

    "read:partner_document",

    "read:partner_assigned_personnel",
    "read:partner_coverage_area",
    "read:partner_distribution_facility",

    "read:state",
    "read:district",
  ],

  SUB_STOCKIST: [
    "read:user",

    "read:partner_profile",
    "update:partner_profile",

    "read:partner_business_details",
    "update:partner_business_details",

    "read:partner_address",
    "update:partner_address",

    "read:partner_contact_person",
    "update:partner_contact_person",

    "read:partner_document",

    "read:partner_assigned_personnel",
    "read:partner_coverage_area",
    "read:partner_distribution_facility",

    "read:state",
    "read:district",
  ],
} as const;

export function hasPermission({
  role,
  actionPermision,
}: {
  role: ROLE;
  actionPermision: EntityActions;
}) {
  return ACCESS_PERMISSIONS[role].includes(actionPermision);
}
