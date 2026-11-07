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

type TCreate__EmployeeProfile = {
  dataToInsert: TDataToInsert | TDataToInsert[];
};

async function create__EmployeeProfile(options: TCreate__EmployeeProfile) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, ...rest } =
    getTableColumns(Table__EmployeeProfile);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const isDataToInsertAnArray = Array.isArray(options.dataToInsert);

  const dataToInsertIntoDB = Array.isArray(options.dataToInsert)
    ? options.dataToInsert
    : [options.dataToInsert];

  if (dataToInsertIntoDB.length === 0) {
    throw new Error("Cannot create EmployeeProfile with empty data");
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
    console.error("Error in queryError in create__EmployeeProfile");
    console.error(queryError);
    throw queryError;
  }

  if (queryResponse[0].affectedRows !== dataToInsertIntoDB.length) {
    throw new Error(
      "Unexpected number of affected rows in create__EmployeeProfile",
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
    console.error("Error in fetchInsertedDataError in create__EmployeeProfile");
    console.error(fetchInsertedDataError);
    throw fetchInsertedDataError;
  }

  // Preserve the original input order
  const dataMap = new Map(fetchedInsertedData.map((item) => [item.id, item]));

  const result = generatedIds.map((generatedId) => {
    const insertedData = dataMap.get(generatedId);

    if (!insertedData) {
      throw new Error(
        `Could not find inserted EmployeeProfile with id: ${generatedId}`,
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

type TRead__OneEmployeeProfile = {
  identifier:
    | {
        id: (typeof Table__EmployeeProfile.$inferSelect)["id"];
      }
    | {
        associatedUserId: (typeof Table__EmployeeProfile.$inferSelect)["associatedUserId"];
      };
};

async function read__OneEmployeeProfile(options: TRead__OneEmployeeProfile) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    createdAt: createdAtEmployeeProfile,
    updatedAt: updatedAtEmployeeProfile,
    tableIdentifierToken: tableIdentifierTokenEmployeeProfile,
    ...restEmployeeProfile
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
    .select({ ...restEmployeeProfile, userDetails: { ...restUsers } })
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
    console.log(`Error in queryError in read__OneEmployeeProfile`);
    throw queryError;
  }

  const [profile] = queryResponse;

  return profile ? profile : null;
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TUpdate__OneEmployeeProfile = {
  identifier:
    | {
        id: (typeof Table__EmployeeProfile.$inferSelect)["id"];
      }
    | {
        associatedUserId: (typeof Table__EmployeeProfile.$inferSelect)["associatedUserId"];
      };
  dataToUpdate: Partial<
    Omit<
      typeof Table__EmployeeProfile.$inferInsert,
      | "tableIdentifierToken"
      | "createdAt"
      | "updatedAt"
      | "id"
      | "associatedUserId"
    >
  >;
};

async function update__OneEmployeeProfile(
  options: TUpdate__OneEmployeeProfile,
) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    createdAt: createdAtEmployeeProfile,
    updatedAt: updatedAtEmployeeProfile,
    tableIdentifierToken: tableIdentifierTokenEmployeeProfile,
    ...restEmployeeProfile
  } = getTableColumns(Table__EmployeeProfile);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const conditions: SQL[] = [];

  if ("id" in options.identifier) {
    conditions.push(eq(Table__EmployeeProfile.id, options.identifier.id));
  }

  if ("associatedUserId" in options.identifier) {
    conditions.push(
      eq(
        Table__EmployeeProfile.associatedUserId,
        options.identifier.associatedUserId,
      ),
    );
  }

  if (conditions.length === 0) {
    throw new Error(
      "EmployeeProfile identifier is required in update__OneEmployeeProfile",
    );
  }

  if (Object.keys(options.dataToUpdate).length === 0) {
    throw new Error("No data provided to update EmployeeProfile");
  }

  const updateData = {
    ...options.dataToUpdate,
    updatedAt: new Date(),
  };

  // Fetch existing EmployeeProfile ID
  const [fetchError, existingEmployeeProfiles] = await tryCatch(
    db
      .select({ id: Table__EmployeeProfile.id })
      .from(Table__EmployeeProfile)
      .where(and(...conditions))
      .limit(1),
  );

  if (fetchError) {
    console.error(
      "Error fetching EmployeeProfile in update__OneEmployeeProfile",
      fetchError,
    );
    throw fetchError;
  }

  const existingEmployeeProfile = existingEmployeeProfiles[0];

  if (!existingEmployeeProfile) {
    throw new Error("EmployeeProfile not found in update__OneEmployeeProfile");
  }

  // Update EmployeeProfile
  const [updateError] = await tryCatch(
    db
      .update(Table__EmployeeProfile)
      .set(updateData)
      .where(eq(Table__EmployeeProfile.id, existingEmployeeProfile.id)),
  );

  if (updateError) {
    console.error(
      "Error updating EmployeeProfile in update__OneEmployeeProfile",
      updateError,
    );
    throw updateError;
  }

  // Fetch updated EmployeeProfile
  const [fetchUpdatedDataError, fetchUpdatedData] = await tryCatch(
    db
      .select({ ...restEmployeeProfile })
      .from(Table__EmployeeProfile)
      .where(eq(Table__EmployeeProfile.id, existingEmployeeProfile.id))
      .limit(1),
  );

  if (fetchUpdatedDataError) {
    console.error(
      "Error fetching updated EmployeeProfile in update__OneEmployeeProfile",
      fetchUpdatedDataError,
    );
    throw fetchUpdatedDataError;
  }

  const updatedEmployeeProfile = fetchUpdatedData[0];

  if (!updatedEmployeeProfile) {
    throw new Error("Updated EmployeeProfile could not be retrieved");
  }

  return updatedEmployeeProfile;
}

export {
  //
  create__EmployeeProfile,
  read__OneEmployeeProfile,
  update__OneEmployeeProfile,
};
