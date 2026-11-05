import { Table__EmployeeProfile, Table__Users } from "@/schema";
import { and, eq, getTableColumns, inArray, SQL } from "drizzle-orm";
import { db } from "@/index";
import { tryCatch } from "@repo/utils/try-catch";
import { id } from "@repo/utils/id";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TDataToInsert = Omit<
  typeof Table__EmployeeProfile.$inferInsert,
  "createdAt" | "updatedAt" | "tableIdentifierToken" | "id"
>;

type TCreate__OnroleUserProfile = {
  dataToInsert: TDataToInsert | TDataToInsert[];
};

async function create__OnroleUserProfile(options: TCreate__OnroleUserProfile) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, ...rest } =
    getTableColumns(Table__EmployeeProfile);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const isDataToInsertAnArray = Array.isArray(options.dataToInsert);

  const dataToInsertIntoDB = Array.isArray(options.dataToInsert)
    ? options.dataToInsert
    : [options.dataToInsert];

  if (dataToInsertIntoDB.length === 0) {
    throw new Error("Cannot create OnroleUserProfile with empty data");
  }

  // Generate a unique ID for each record
  const generatedIds = dataToInsertIntoDB.map(() => id());

  const insertData = dataToInsertIntoDB.map((data, index) => ({
    ...data,
    id: generatedIds[index]!,
  }));

  const baseQuery = db.insert(Table__EmployeeProfile).values(insertData);

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.error("Error in queryError in create__OnroleUserProfile");
    console.error(queryError);
    throw queryError;
  }

  if (queryResponse[0].affectedRows !== dataToInsertIntoDB.length) {
    throw new Error(
      "Unexpected number of affected rows in create__OnroleUserProfile",
    );
  }

  // Fetch all inserted records
  const [fetchInsertedDataError, fetchedInsertedData] = await tryCatch(
    db
      .select({ ...rest })
      .from(Table__EmployeeProfile)
      .where(inArray(Table__EmployeeProfile.id, generatedIds)),
  );

  if (fetchInsertedDataError) {
    console.error(
      "Error in fetchInsertedDataError in create__OnroleUserProfile",
    );
    console.error(fetchInsertedDataError);
    throw fetchInsertedDataError;
  }

  // Preserve the original input order
  const dataMap = new Map(fetchedInsertedData.map((item) => [item.id, item]));

  const result = generatedIds.map((generatedId) => {
    const insertedData = dataMap.get(generatedId);

    if (!insertedData) {
      throw new Error(
        `Could not find inserted OnroleUserProfile with id: ${generatedId}`,
      );
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

type TRead__OneOnroleUserProfile = {
  identifier:
    | {
        id: (typeof Table__EmployeeProfile.$inferSelect)["id"];
      }
    | {
        associatedUserId: (typeof Table__EmployeeProfile.$inferSelect)["associatedUserId"];
      };
};

async function read__OneOnroleUserProfile(
  options: TRead__OneOnroleUserProfile,
) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    createdAt: createdAtOnroleUserProfile,
    updatedAt: updatedAtOnroleUserProfile,
    tableIdentifierToken: tableIdentifierTokenOnroleUserProfile,
    ...restOnroleUserProfile
  } = getTableColumns(Table__EmployeeProfile);

  const {
    createdAt: createdAtUsers,
    updatedAt: updatedAtUsers,
    tableIdentifierToken: tableIdentifierTokenUsers,
    ...restUsers
  } = getTableColumns(Table__Users);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const conditions: SQL[] = [];

  const baseQuery = db
    .select({ ...restOnroleUserProfile, userDetails: { ...restUsers } })
    .from(Table__EmployeeProfile)
    .leftJoin(
      Table__Users,
      eq(Table__Users.id, Table__EmployeeProfile.associatedUserId),
    );

  if ("id" in options.identifier) {
    conditions.push(eq(Table__EmployeeProfile.id, options.identifier.id));
  }

  if ("associatedUserId" in options.identifier) {
    conditions.push(eq(Table__Users.id, options.identifier.associatedUserId));
  }

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.log(`Error in queryError in read__OneOnroleUserProfile`);
    throw queryError;
  }

  const [profile] = queryResponse;

  return profile ? profile : null;
}

export {
  //
  create__OnroleUserProfile,
  read__OneOnroleUserProfile,
};
