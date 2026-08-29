import { mysqlEnum } from "drizzle-orm/mysql-core";

export const userRoleEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "user_role", [
    "SUPER_ADMIN",
    "ADMIN",
    "MR",
    "DISTRIBUTOR",
    "STOCKIST",
    "MANAGER",
  ]);

export const userStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "user_status", [
    "ACTIVE",
    "INACTIVE",
    "SUSPENDED",
    "UNDER_VERIFICATION",
  ]);

export const customerTypeEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "customer_type", [
    "DOCTOR",
    "CHEMIST",
    "CUSTOMER",
    "PHARMACY",
    "RMP",
    "VILLAGE_CLINIC",
    "MEDICAL_OUTLET",
  ]);

export const visitOutcomeEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "visit_outcome", [
    "SUCCESSFUL",
    "ORDER_COLLECTED",
    "FOLLOW_UP",
    "NOT_AVAILABLE",
    "NO_ORDER",
    "CLOSED",
    "OTHER",
  ]);

export const travelModeEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "travel_mode", [
    "TWO_WHEELER",
    "BUS",
    "TRAIN",
    "OTHER",
  ]);

export const dayStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "day_status", [
    "OPEN",
    "CLOSED",
    "LOCKED",
    "REOPENED",
  ]);

export const routeOwnershipEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "route_ownership", ["MR", "DISTRIBUTOR"]);

export const orderTypeEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "order_type", ["COUNTER_SALE", "DOCTOR_PRESCRIPTION"]);

export const orderStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "order_status", [
    "DRAFT",
    "SUBMITTED",
    "CONFIRMED",
    "PARTIALLY_FULFILLED",
    "FULFILLED",
    "CANCELLED",
  ]);

export const fulfillmentStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "fulfillment_status", [
    "PENDING",
    "PROCESSING",
    "DISPATCHED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "PARTIALLY_DELIVERED",
    "FAILED",
    "CANCELLED",
  ]);

export const paymentStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "payment_status", [
    "PENDING",
    "PARTIAL",
    "PAID",
    "FAILED",
    "CANCELLED",
  ]);

export const paymentMethodEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "payment_method", [
    "CASH",
    "UPI",
    "BANK_TRANSFER",
    "CHEQUE",
    "OTHER",
  ]);

export const inventoryMovementTypeEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "inventory_movement_type", [
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
  ]);

export const stockTransferStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "stock_transfer_status", [
    "DRAFT",
    "PENDING",
    "APPROVED",
    "REJECTED",
    "COMPLETED",
    "CANCELLED",
  ]);

export const batchStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "batch_status", [
    "ACTIVE",
    "EXPIRED",
    "BLOCKED",
    "DEPLETED",
  ]);

export const approvalStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "approval_status", [
    "PENDING",
    "APPROVED",
    "REJECTED",
  ]);

export const collectionStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "collection_status", [
    "PENDING",
    "HANDED_OVER",
    "VERIFIED",
  ]);

export const vehicleTypeEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "vehicle_type", [
    "TWO_WHEELER",
    "BUS",
    "TRAIN",
    "OTHER",
  ]);

// Organizations              "ORGN"
// Users                      "USER"
// MediaFiles                 "MDFL"
// Territories                "TRTS"
// Routes                     "ROUT"
// UserTerritories            "USTE"
// UserRoutes                 "USRT"
// RouteStops                 "RUST"
// Stockists                  "STKT"
// UserStockists              "USSK"
// Customers                  "CUST"
// CustomerAssignments        "CUAS"
// DoctorProfiles             "DOCS"
// DoctorAvailability         "DOAV"
// ProductCategories          "PRCT"
// Products                   "PROD"
// ProductMedia               "PRMD"
// DoctorProductPreferences   "DPPR"
// ProductPrices              "PRPR"
// ProductBatches             "PRBT"
// StockistInventory          "SKIV"
// MasterInventory            "MAIN"
// InventoryMovements         "INMV"
// StockTransfers             "STTR"
// StockTransferItems         "STIT"
// FieldDays                  "FLDY"
// DayUnlockRequests          "DURQ"
// Visits                     "VIST"
// Orders                     "ORDR"
// OrderItems                 "ORIT"
// OrderFulfillments          "ORFL"
// OrderStatusHistory         "ORSH"
// Payments                   "PYMT"
// CollectionHandovers        "COHO"
// ExpiryWastageEntries       "EXWS"
// CustomerFollowUps          "CUFU"
// AuditLogs                  "AUDL"
// OrganizationSettings       "ORST"
