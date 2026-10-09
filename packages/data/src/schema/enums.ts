import {
  APPROVAL_STATUS,
  BATCH_STATUS,
  COLLECTION_STATUS,
  CUSTOMER_TYPE,
  DAY_STATUS,
  FULFILLMENT_STATUS,
  INVENTORY_MOVEMENT_TYPE,
  ORDER_STATUS,
  ORDER_TYPE,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  ROUTE_OWNERSHIP,
  STOCK_TRANSFER_STATUS,
  TRAVEL_MODE,
  USER_ROLE,
  USER_STATUS,
  VEHICLE_TYPE,
  VISIT_OUTCOME,
} from "@repo/utils/db-enums";
import { mysqlEnum } from "drizzle-orm/mysql-core";

export const userRoleEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "user_role", USER_ROLE);

export const userStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "user_status", USER_STATUS);

export const customerTypeEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "customer_type", CUSTOMER_TYPE);

export const visitOutcomeEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "visit_outcome", VISIT_OUTCOME);

export const travelModeEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "travel_mode", TRAVEL_MODE);

export const dayStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "day_status", DAY_STATUS);

export const routeOwnershipEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "route_ownership", ROUTE_OWNERSHIP);

export const orderTypeEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "order_type", ORDER_TYPE);

export const orderStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "order_status", ORDER_STATUS);

export const fulfillmentStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "fulfillment_status", FULFILLMENT_STATUS);

export const paymentStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "payment_status", PAYMENT_STATUS);

export const paymentMethodEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "payment_method", PAYMENT_METHOD);

export const inventoryMovementTypeEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "inventory_movement_type", INVENTORY_MOVEMENT_TYPE);

export const stockTransferStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "stock_transfer_status", STOCK_TRANSFER_STATUS);

export const batchStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "batch_status", BATCH_STATUS);

export const approvalStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "approval_status", APPROVAL_STATUS);

export const collectionStatusEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "collection_status", COLLECTION_STATUS);

export const vehicleTypeEnum = (tableName?: string) =>
  mysqlEnum(tableName ?? "vehicle_type", VEHICLE_TYPE);
