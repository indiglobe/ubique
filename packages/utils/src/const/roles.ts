import { ONROLE_USER_ROLE, OFFROLE_USER_ROLE } from "@/db-enums";

const USER_ROLE = [...OFFROLE_USER_ROLE, ...ONROLE_USER_ROLE];

const roleToDesignationMapper = new Map<(typeof USER_ROLE)[number], string>([
  ["ADMIN", "Admin"],
  ["ASM", "Assistant Sales Manager"],
  ["ZSM", "Zonal Sales Manager"],
  ["DISTRIBUTOR", "Distributor"],
  ["MANAGER", "Manager"],
  ["MR", "Medical Representative"],
  ["RSM", "Regional Sales Manager"],
  ["STOCKIST", "Stockist"],
  ["SUB_DISTRIBUTOR", "Sub Distributor"],
  ["SUB_STOCKIST", "Sub Stockist"],
  ["SUPER_ADMIN", "Super Admin"],
]);

export { USER_ROLE, roleToDesignationMapper };
