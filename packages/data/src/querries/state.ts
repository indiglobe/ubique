import { and, eq, getTableColumns, SQL } from "drizzle-orm";
import { Table__State } from "@/schema";
import { db } from "@/index";
import { tryCatch } from "@repo/utils/try-catch";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TRead__OneState = {
  identifier: {
    id: (typeof Table__State.$inferSelect)["id"];
  };
};

async function read__OneState(options: TRead__OneState) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    createdAt: createdAtState,
    updatedAt: updatedAtState,
    tableIdentifierToken: tableIdentifierTokenState,
    ...restState
  } = getTableColumns(Table__State);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const conditions: SQL[] = [];

  if (options.identifier.id) {
    conditions.push(eq(Table__State.id, options.identifier.id));
  }

  const baseQuery = db
    .select({
      ...restState,
    })
    .from(Table__State);

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.log(`Error in queryError in read__OneState`);
    throw queryError;
  }

  const [state] = queryResponse;

  return state ? state : null;
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

async function read__AllState() {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    createdAt: createdAtState,
    updatedAt: updatedAtState,
    tableIdentifierToken: tableIdentifierTokenState,
    ...restState
  } = getTableColumns(Table__State);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const baseQuery = db
    .select({
      ...restState,
    })
    .from(Table__State);

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.log(`Error in queryError in read__AllState`);
    throw queryError;
  }

  const allState = queryResponse;

  return allState;
}

export {
  //

  read__AllState,
  read__OneState,
};
