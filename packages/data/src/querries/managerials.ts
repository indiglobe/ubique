import { Table__Managerials, Table__Users } from "@/schema";
import { and, eq, getTableColumns, SQL } from "drizzle-orm";
import { db } from "..";
import { tryCatch } from "@repo/utils/try-catch";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TRead__OneManagerials = {
  identifier:
    | {
        id: (typeof Table__Managerials.$inferSelect)["id"];
      }
    | {
        subordinateId: (typeof Table__Managerials.$inferSelect)["subordinateId"];
      }
    | {
        managerId: (typeof Table__Managerials.$inferSelect)["managerId"];
      };
};

async function read__OneManagerials(options: TRead__OneManagerials) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    createdAt: createdAtManagerials,
    updatedAt: updatedAtManagerials,
    tableIdentifierToken: tableIdentifierTokenManagerials,
    ...restManagerials
  } = getTableColumns(Table__Managerials);
  const {
    createdAt: createdAtUsers,
    updatedAt: updatedAtUsers,
    tableIdentifierToken: tableIdentifierTokenUsers,
    ...restUsers
  } = getTableColumns(Table__Users);

  /* eslint-enable @typescript-eslint/no-unused-vars */

  const conditions: SQL[] = [];

  if ("id" in options.identifier) {
    conditions.push(eq(Table__Managerials.id, options.identifier.id));
  }

  if ("subordinateId" in options.identifier) {
    conditions.push(
      eq(Table__Managerials.subordinateId, options.identifier.subordinateId),
    );
  }

  if ("managerId" in options.identifier) {
    conditions.push(
      eq(Table__Managerials.managerId, options.identifier.managerId),
    );
  }

  const baseQuery = db
    .select({ ...restManagerials, manager: { ...restUsers } })
    .from(Table__Managerials)
    .innerJoin(Table__Users, eq(Table__Users.id, Table__Managerials.managerId));

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.log(`Error in queryError in read__Managerials`);
    throw queryError;
  }

  const [managerials] = queryResponse;

  return managerials ? managerials : null;
}

export {
  //
  read__OneManagerials,
};
