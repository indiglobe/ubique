import { Table__Users } from "@/schema";
import { db } from "@/index";
import { and, count, eq, getTableColumns, inArray, SQL } from "drizzle-orm";
import { tryCatch } from "@repo/utils/try-catch";
import { id } from "@repo/utils/id";
import { hashPasswordSync } from "@repo/utils/password";
import { DEFAULT_PASSWORD } from "@repo/utils/const/default-password";
import { alias } from "drizzle-orm/mysql-core";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TDataToInsert = Omit<
  typeof Table__Users.$inferInsert,
  "createdAt" | "updatedAt" | "tableIdentifierToken" | "id"
>;

type TCreate__User = {
  dataToInsert: TDataToInsert | TDataToInsert[];
};

async function create__User(options: TCreate__User) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, password, ...rest } =
    getTableColumns(Table__Users);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const isDataToInsertAnArray = Array.isArray(options.dataToInsert);

  const dataToInsertIntoDB = Array.isArray(options.dataToInsert)
    ? options.dataToInsert
    : [options.dataToInsert];

  if (dataToInsertIntoDB.length === 0) {
    throw new Error("Cannot create User with empty data");
  }

  // Generate a unique ID for each user
  const generatedIds = dataToInsertIntoDB.map(() => id());

  // Hash passwords individually
  const insertData = dataToInsertIntoDB.map((data, index) => ({
    ...data,
    id: generatedIds[index]!,
    password: hashPasswordSync(data.password ?? DEFAULT_PASSWORD),
  }));

  const baseQuery = db.insert(Table__Users).values(insertData);

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.error("Error in queryError in create__User");
    console.error(queryError);
    throw queryError;
  }

  if (queryResponse[0].affectedRows !== dataToInsertIntoDB.length) {
    throw new Error("Unexpected number of affected rows in create__User");
  }

  // Fetch all inserted users (excluding password)
  const [fetchInsertedDataError, fetchedInsertedData] = await tryCatch(
    db
      .select({ ...rest })
      .from(Table__Users)
      .where(inArray(Table__Users.id, generatedIds)),
  );

  if (fetchInsertedDataError) {
    console.error("Error in fetchInsertedDataError in create__User");
    console.error(fetchInsertedDataError);
    throw fetchInsertedDataError;
  }

  // Preserve the original input order
  const dataMap = new Map(fetchedInsertedData.map((item) => [item.id, item]));

  const result = generatedIds.map((generatedId) => {
    const insertedData = dataMap.get(generatedId);

    if (!insertedData) {
      throw new Error(`Could not find inserted User with id: ${generatedId}`);
    }

    return insertedData;
  });

  return isDataToInsertAnArray ? result : result[0]!;
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TRead__OneUser = {
  identifier:
    | {
        id: (typeof Table__Users.$inferSelect)["id"];
      }
    | {
        email: (typeof Table__Users.$inferSelect)["email"];
      }
    | {
        employeeCode: (typeof Table__Users.$inferSelect)["employeeCode"];
      };
  include?: Pick<typeof Table__Users.$inferSelect, "password">;
};

export async function read__OneUser(options: TRead__OneUser) {
  const Table__Managers = alias(Table__Users, "manager");

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    createdAt: createdAtUsers,
    updatedAt: updatedAtUsers,
    tableIdentifierToken: tableIdentifierTokenUsers,
    password,
    ...restUsers
  } = getTableColumns(Table__Users);
  const {
    createdAt: createdAtManagers,
    updatedAt: updatedAtManagers,
    tableIdentifierToken: tableIdentifierTokenManagers,
    ...restManagers
  } = getTableColumns(Table__Managers);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const conditions: SQL[] = [];

  if ("email" in options.identifier) {
    conditions.push(eq(Table__Users.email, options.identifier.email));
  }

  if ("id" in options.identifier) {
    conditions.push(eq(Table__Users.id, options.identifier.id));
  }

  if ("employeeCode" in options.identifier) {
    conditions.push(
      eq(Table__Users.employeeCode, options.identifier.employeeCode),
    );
  }

  const baseQuery = db
    .select({
      ...restUsers,
      ...(options.include?.password ? { password } : {}),
      manager: { ...restManagers },
    })
    .from(Table__Users)
    .leftJoin(
      Table__Managers,
      eq(Table__Managers.id, Table__Users.reportingManagerId),
    );

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.log(`Error in queryError in read__OneUser`);
    throw queryError;
  }

  const [user] = queryResponse;

  return user ? user : null;
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TRead__AllUsers = {
  identifier: Partial<
    Pick<typeof Table__Users.$inferSelect, "reportingManagerId"> & {
      role:
        | typeof Table__Users.$inferSelect.role
        | (typeof Table__Users.$inferSelect.role)[];
      status:
        | typeof Table__Users.$inferSelect.status
        | (typeof Table__Users.$inferSelect.status)[];
    }
  >;
  include?: Pick<typeof Table__Users.$inferSelect, "password">;
};

async function read__AllUsers(options?: TRead__AllUsers) {
  const Table__Managers = alias(Table__Users, "manager");

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    createdAt: createdAtUsers,
    updatedAt: updatedAtUsers,
    tableIdentifierToken: tableIdentifierTokenUsers,
    password,
    ...restUsers
  } = getTableColumns(Table__Users);
  const {
    createdAt: createdAtManagers,
    updatedAt: updatedAtManagers,
    tableIdentifierToken: tableIdentifierTokenManagers,
    ...restManagers
  } = getTableColumns(Table__Managers);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const baseQuery = db
    .select({
      ...restUsers,
      ...(options?.include?.password ? { password } : {}),
      manager: { ...restManagers },
    })
    .from(Table__Users)
    .leftJoin(
      Table__Managers,
      eq(Table__Managers.id, Table__Users.reportingManagerId),
    );

  const conditions: SQL[] = [];

  if (options?.identifier.reportingManagerId) {
    conditions.push(
      eq(
        Table__Users.reportingManagerId,
        options.identifier.reportingManagerId,
      ),
    );
  }

  if (options?.identifier.role && Array.isArray(options.identifier.role)) {
    conditions.push(inArray(Table__Users.role, options.identifier.role));
  }

  if (options?.identifier.role && !Array.isArray(options.identifier.role)) {
    conditions.push(eq(Table__Users.role, options.identifier.role));
  }

  if (options?.identifier.status && Array.isArray(options.identifier.status)) {
    conditions.push(inArray(Table__Users.status, options.identifier.status));
  }

  if (options?.identifier.status && !Array.isArray(options.identifier.status)) {
    conditions.push(eq(Table__Users.status, options.identifier.status));
  }

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.log(`Error in queryError in read__AllUsers`);
    throw queryError;
  }

  const allUsers = queryResponse;

  return allUsers;
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TRead__UserCount = {
  identifier?: Partial<{
    role:
      | typeof Table__Users.$inferSelect.role
      | (typeof Table__Users.$inferSelect.role)[];
    status:
      | typeof Table__Users.$inferSelect.status
      | (typeof Table__Users.$inferSelect.status)[];
  }>;
};

async function read__UserCount(options?: TRead__UserCount) {
  const conditions: SQL[] = [];

  const baseQuery = db
    .select({
      role: Table__Users.role,
      count: count(Table__Users.id),
    })
    .from(Table__Users)
    .groupBy(Table__Users.role);

  if (options?.identifier?.role) {
    if (Array.isArray(options.identifier.role)) {
      conditions.push(inArray(Table__Users.role, options.identifier.role));
    } else {
      conditions.push(inArray(Table__Users.role, [options.identifier.role]));
    }
  }

  if (options?.identifier?.status) {
    if (Array.isArray(options.identifier.status)) {
      conditions.push(inArray(Table__Users.status, options.identifier.status));
    } else {
      conditions.push(
        inArray(Table__Users.status, [options.identifier.status]),
      );
    }
  }

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.error("Error in read__UserCount");
    throw queryError;
  }

  return queryResponse;
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TUpdate__OneUser = {
  identifier:
    | {
        id: (typeof Table__Users.$inferSelect)["id"];
      }
    | {
        email: (typeof Table__Users.$inferSelect)["email"];
      }
    | {
        employeeCode: (typeof Table__Users.$inferSelect)["employeeCode"];
      };
  dataToUpdate: Partial<
    Omit<
      typeof Table__Users.$inferInsert,
      "id" | "email" | "tableIdentifierToken" | "createdAt" | "updatedAt"
    >
  >;
};

async function update__OneUser(options: TUpdate__OneUser) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    createdAt: createdAtUsers,
    updatedAt: updatedAtUsers,
    tableIdentifierToken: tableIdentifierTokenUsers,
    password,
    ...restUsers
  } = getTableColumns(Table__Users);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const conditions: SQL[] = [];

  if ("email" in options.identifier) {
    conditions.push(eq(Table__Users.email, options.identifier.email));
  }

  if ("employeeCode" in options.identifier) {
    conditions.push(
      eq(Table__Users.employeeCode, options.identifier.employeeCode),
    );
  }

  if ("id" in options.identifier) {
    conditions.push(eq(Table__Users.id, options.identifier.id));
  }

  if (conditions.length === 0) {
    throw new Error("User identifier is required in update__OneUser");
  }

  if (Object.keys(options.dataToUpdate).length === 0) {
    throw new Error("No data provided to update User");
  }

  // Hash password only when supplied
  const updateData = {
    ...options.dataToUpdate,
    ...(options.dataToUpdate.password !== undefined
      ? {
          password: hashPasswordSync(options.dataToUpdate.password),
        }
      : {}),
    updatedAt: new Date(),
  };

  // Fetch existing user ID
  const [fetchError, existingUsers] = await tryCatch(
    db
      .select({ id: Table__Users.id })
      .from(Table__Users)
      .where(and(...conditions))
      .limit(1),
  );

  if (fetchError) {
    console.error("Error fetching user in update__OneUser", fetchError);
    throw fetchError;
  }

  const existingUser = existingUsers[0];

  if (!existingUser) {
    throw new Error("User not found in update__OneUser");
  }

  // Update user
  const [updateError] = await tryCatch(
    db
      .update(Table__Users)
      .set(updateData)
      .where(eq(Table__Users.id, existingUser.id)),
  );

  if (updateError) {
    console.error("Error updating user in update__OneUser", updateError);
    throw updateError;
  }

  // Fetch updated user (excluding password)
  const [fetchUpdatedDataError, fetchUpdatedData] = await tryCatch(
    db
      .select({ ...restUsers })
      .from(Table__Users)
      .where(eq(Table__Users.id, existingUser.id))
      .limit(1),
  );

  if (fetchUpdatedDataError) {
    console.error(
      "Error fetching updated user in update__OneUser",
      fetchUpdatedDataError,
    );
    throw fetchUpdatedDataError;
  }

  const updatedUser = fetchUpdatedData[0];

  if (!updatedUser) {
    throw new Error("Updated user could not be retrieved");
  }

  return updatedUser;
}

export {
  //
  create__User,
  read__AllUsers,
  read__UserCount,
  update__OneUser,
};
