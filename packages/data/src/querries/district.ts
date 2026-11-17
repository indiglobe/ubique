import { and, eq, getTableColumns, inArray, SQL } from "drizzle-orm";
import { Table__District } from "@/schema";
import { db } from "@/index";
import { tryCatch } from "@repo/utils/try-catch";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TRead__OneDistrict = {
  identifier: {
    id: (typeof Table__District.$inferSelect)["id"];
  };
};

async function read__OneDistrict(options: TRead__OneDistrict) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    createdAt: createdAtDistrict,
    updatedAt: updatedAtDistrict,
    tableIdentifierToken: tableIdentifierTokenDistrict,
    ...restDistrict
  } = getTableColumns(Table__District);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const conditions: SQL[] = [];

  if (options.identifier.id) {
    conditions.push(eq(Table__District.id, options.identifier.id));
  }

  const baseQuery = db
    .select({
      ...restDistrict,
    })
    .from(Table__District);

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.log(`Error in queryError in read__AllDistrict`);
    throw queryError;
  }

  const [district] = queryResponse;

  return district ? district : null;
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TRead__AllDistrict = {
  identifier?: {
    stateId:
      | (typeof Table__District.$inferSelect)["stateId"]
      | (typeof Table__District.$inferSelect)["stateId"][];
  };
};

async function read__AllDistrict(options?: TRead__AllDistrict) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    createdAt: createdAtDistrict,
    updatedAt: updatedAtDistrict,
    tableIdentifierToken: tableIdentifierTokenDistrict,
    ...restDistrict
  } = getTableColumns(Table__District);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const conditions: SQL[] = [];

  if (options?.identifier?.stateId) {
    conditions.push(
      inArray(
        Table__District.stateId,
        Array.isArray(options.identifier.stateId)
          ? options.identifier.stateId
          : [options.identifier.stateId],
      ),
    );
  }

  const baseQuery = db
    .select({
      ...restDistrict,
    })
    .from(Table__District);

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.log(`Error in queryError in read__AllDistrict`);
    throw queryError;
  }

  const allDistrict = queryResponse;

  return allDistrict;
}

export {
  //

  read__AllDistrict,
  read__OneDistrict,
};
