import { Table__Users } from "@/schema";
import { db } from "@/index";
import { and, eq, getTableColumns, inArray, SQL } from "drizzle-orm";
import { tryCatch } from "@repo/utils/try-catch";
import { id } from "@repo/utils/id";
import { hashPassword } from "@repo/utils/password";
import { DEFAULT_PASSWORD } from "@repo/utils/const/default-password";
// import {hashPassword} from '@repo/utils/password'

type TCreate__OneUser = {
  dataToInsert: Omit<
    typeof Table__Users.$inferInsert,
    "createdAt" | "updatedAt" | "tableIdentifierToken" | "id"
  >;
};

export async function create__OneUser(options: TCreate__OneUser) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, password, ...rest } =
    getTableColumns(Table__Users);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const generatedId = id();

  const hashedPassword = await hashPassword(
    options.dataToInsert.password ?? DEFAULT_PASSWORD,
  );

  const baseQuery = db.insert(Table__Users).values({
    ...options.dataToInsert,
    id: generatedId,
    password: hashedPassword,
  });

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.error(`Error in queryError in create__OneUser`);
    console.error(queryError);
    throw queryError;
  }

  if (queryResponse[0].affectedRows === 1) {
    const [fetchInsetedDataError, fetchInsetedData] = await tryCatch(
      db
        .select({ ...rest })
        .from(Table__Users)
        .where(eq(Table__Users.id, generatedId))
        .limit(1)
        .offset(0),
    );

    if (fetchInsetedDataError) {
      console.error(`Error in fetchInsetedDataError in create__OneUser`);
      console.error(fetchInsetedDataError);
      throw fetchInsetedDataError;
    }

    const [newData] = fetchInsetedData;

    return newData!;
  }

  throw new Error(`Unexpected block reached in create__OneUser`);
}

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
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, password, ...rest } =
    getTableColumns(Table__Users);
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
    .select({ ...rest, ...(options.include?.password ? { password } : {}) })
    .from(Table__Users);

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

type TRead__AllUsers = {
  identifier: Partial<
    Pick<typeof Table__Users.$inferSelect, "organizationId" | "referrerId"> & {
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

export async function read__AllUsers(options?: TRead__AllUsers) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, password, ...rest } =
    getTableColumns(Table__Users);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const baseQuery = db
    .select({ ...rest, ...(options?.include?.password ? { password } : {}) })
    .from(Table__Users);

  const conditions: SQL[] = [];

  if (options?.identifier.organizationId) {
    conditions.push(
      eq(Table__Users.organizationId, options.identifier.organizationId),
    );
  }

  if (options?.identifier.referrerId) {
    conditions.push(eq(Table__Users.referrerId, options.identifier.referrerId));
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
