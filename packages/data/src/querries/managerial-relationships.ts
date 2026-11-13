import { Table__ManagerialRelationships, Table__Users } from "@/schema";
import { and, eq, getTableColumns, sql, SQL } from "drizzle-orm";
import { db } from "..";
import { tryCatch } from "@repo/utils/try-catch";
import { alias } from "drizzle-orm/mysql-core";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TRead__OneManagerials = {
  identifier:
    | {
        id: (typeof Table__ManagerialRelationships.$inferSelect)["id"];
      }
    | {
        subordinateId: (typeof Table__ManagerialRelationships.$inferSelect)["subordinateId"];
      }
    | {
        managerId: (typeof Table__ManagerialRelationships.$inferSelect)["managerId"];
      };
};

async function read__OneManagerials(options: TRead__OneManagerials) {
  const Table__Manager = alias(Table__Users, "manager");
  const Table__SubOrdinate = alias(Table__Users, "sub_ordinate");

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    createdAt: createdAtManagerials,
    updatedAt: updatedAtManagerials,
    tableIdentifierToken: tableIdentifierTokenManagerials,
    ...restManagerials
  } = getTableColumns(Table__ManagerialRelationships);
  const {
    createdAt: createdAtManager,
    updatedAt: updatedAtManager,
    password: passwordManager,
    tableIdentifierToken: tableIdentifierTokenManager,
    ...restManager
  } = getTableColumns(Table__Manager);
  const {
    createdAt: createdAtSubOrdinate,
    updatedAt: updatedAtSubOrdinate,
    password: passwordSubOrdinate,
    tableIdentifierToken: tableIdentifierTokenSubOrdinate,
    ...restSubOrdinate
  } = getTableColumns(Table__SubOrdinate);

  /* eslint-enable @typescript-eslint/no-unused-vars */

  const conditions: SQL[] = [];

  if ("id" in options.identifier) {
    conditions.push(
      eq(Table__ManagerialRelationships.id, options.identifier.id),
    );
  }

  if ("subordinateId" in options.identifier) {
    conditions.push(
      eq(
        Table__ManagerialRelationships.subordinateId,
        options.identifier.subordinateId,
      ),
    );
  }

  if ("managerId" in options.identifier) {
    conditions.push(
      eq(
        Table__ManagerialRelationships.managerId,
        options.identifier.managerId,
      ),
    );
  }

  const baseQuery = db
    .select({
      ...restManagerials,
      manager: { ...restManager },
      subordinates: sql`
        COALESCE(
          JSON_ARRAYAGG(
            JSON_OBJECT(
              ${sql.join(
                Object.entries(restSubOrdinate).flatMap(([key, column]) => [
                  sql.raw(`'${key}'`),
                  sql`${column}`,
                ]),
                sql`, `,
              )}
            )
          ),
          JSON_ARRAY()
        )
      `.as("subordinates"),
    })
    .from(Table__ManagerialRelationships)
    .innerJoin(
      Table__Manager,
      eq(Table__Manager.id, Table__ManagerialRelationships.managerId),
    )
    .leftJoin(
      Table__SubOrdinate,
      eq(Table__SubOrdinate.id, Table__ManagerialRelationships.subordinateId),
    )
    .groupBy(
      Table__ManagerialRelationships.id,
      Table__Manager.id,
      Table__SubOrdinate.reportingManagerId,
    );

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
