export const USER_ROLE = [
  "SUPER_ADMIN",
  "ADMIN",
  "ZSM",
  "RSM",
  "MANAGER",
  "ASM",
  "MR",
  "STOCKIST",
  "DISTRIBUTOR",
] as const;

export const USER_STATUS = [
  "ACTIVE",
  "INACTIVE",
  "SUSPENDED",
  "UNDER_VERIFICATION",
] as const;

export const CUSTOMER_TYPE = [
  "DOCTOR",
  "CHEMIST",
  "CUSTOMER",
  "PHARMACY",
  "RMP",
  "VILLAGE_CLINIC",
  "MEDICAL_OUTLET",
] as const;

export const VISIT_OUTCOME = [
  "SUCCESSFUL",
  "ORDER_COLLECTED",
  "FOLLOW_UP",
  "NOT_AVAILABLE",
  "NO_ORDER",
  "CLOSED",
  "OTHER",
] as const;

export const TRAVEL_MODE = ["TWO_WHEELER", "BUS", "TRAIN", "OTHER"] as const;

export const DAY_STATUS = ["OPEN", "CLOSED", "LOCKED", "REOPENED"] as const;

export const ROUTE_OWNERSHIP = ["MR", "DISTRIBUTOR"] as const;

export const ORDER_TYPE = ["COUNTER_SALE", "DOCTOR_PRESCRIPTION"] as const;

export const ORDER_STATUS = [
  "DRAFT",
  "SUBMITTED",
  "CONFIRMED",
  "PARTIALLY_FULFILLED",
  "FULFILLED",
  "CANCELLED",
] as const;

export const FULFILLMENT_STATUS = [
  "PENDING",
  "PROCESSING",
  "DISPATCHED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "PARTIALLY_DELIVERED",
  "FAILED",
  "CANCELLED",
] as const;

export const PAYMENT_STATUS = [
  "PENDING",
  "PARTIAL",
  "PAID",
  "FAILED",
  "CANCELLED",
] as const;

export const PAYMENT_METHOD = [
  "CASH",
  "UPI",
  "BANK_TRANSFER",
  "CHEQUE",
  "OTHER",
] as const;

export const INVENTORY_MOVEMENT_TYPE = [
  "OPENING",
  "PURCHASE",
  "SALE",
  "TRANSFER_IN",
  "TRANSFER_OUT",
  "RETURN",
  "DAMAGE",
  "EXPIRY",
  "WASTAGE",
  "ADJUSTMENT",
] as const;

export const STOCK_TRANSFER_STATUS = [
  "DRAFT",
  "PENDING",
  "APPROVED",
  "REJECTED",
  "COMPLETED",
  "CANCELLED",
] as const;

export const BATCH_STATUS = [
  "ACTIVE",
  "EXPIRED",
  "BLOCKED",
  "DEPLETED",
] as const;

export const APPROVAL_STATUS = ["PENDING", "APPROVED", "REJECTED"] as const;

export const COLLECTION_STATUS = [
  "PENDING",
  "HANDED_OVER",
  "VERIFIED",
] as const;

export const VEHICLE_TYPE = ["TWO_WHEELER", "BUS", "TRAIN", "OTHER"] as const;
