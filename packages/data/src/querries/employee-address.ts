import {
  Table__EmployeeAddress,
  Table__EmployeeProfile,
  Table__Users,
} from "@/schema";
import { id } from "@repo/utils/id";
import { and, eq, getTableColumns, inArray, SQL } from "drizzle-orm";
import { db } from "..";
import { tryCatch } from "@repo/utils/try-catch";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TDataToInsert = Omit<
  typeof Table__EmployeeAddress.$inferInsert,
  "createdAt" | "updatedAt" | "tableIdentifierToken" | "id"
>;

type TCreate__EmployeeAddress = {
  dataToInsert: TDataToInsert | TDataToInsert[];
};

async function create__EmployeeAddress(options: TCreate__EmployeeAddress) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, ...rest } =
    getTableColumns(Table__EmployeeAddress);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const isDataToInsertAnArray = Array.isArray(options.dataToInsert);

  const dataToInsertIntoDB = Array.isArray(options.dataToInsert)
    ? options.dataToInsert
    : [options.dataToInsert];

  if (dataToInsertIntoDB.length === 0) {
    throw new Error("Cannot create Attendence with empty data");
  }

  // Generate a unique ID for each record
  const generatedIds = dataToInsertIntoDB.map(() => id());

  const insertData = dataToInsertIntoDB.map((data, index) => ({
    ...data,
    id: generatedIds[index],
  }));

  const baseQuery = db.insert(Table__EmployeeAddress).values(insertData);

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.error("Error in queryError in create__EmployeeAddress");
    console.error(queryError);
    throw queryError;
  }

  if (queryResponse[0].affectedRows !== dataToInsertIntoDB.length) {
    throw new Error(
      "Unexpected number of affected rows in create__EmployeeAddress",
    );
  }

  // Fetch all inserted records
  const [fetchInsertedDataError, fetchedInsertedData] = await tryCatch(
    db
      .select({ ...rest })
      .from(Table__EmployeeAddress)
      .where(inArray(Table__EmployeeAddress.id, generatedIds)),
  );

  if (fetchInsertedDataError) {
    console.error("Error in fetchInsertedDataError in create__EmployeeAddress");
    console.error(fetchInsertedDataError);
    throw fetchInsertedDataError;
  }

  // Preserve the original input order
  const dataMap = new Map(fetchedInsertedData.map((item) => [item.id, item]));

  const result = generatedIds.map((generatedId) => {
    const insertedData = dataMap.get(generatedId);

    if (!insertedData) {
      throw new Error(
        `Could not find inserted Attendence with id: ${generatedId}`,
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

type TRead__OneEmployeeAddress = {
  identifier:
    | {
        id: (typeof Table__EmployeeAddress.$inferSelect)["id"];
      }
    | {
        profileId: (typeof Table__EmployeeProfile.$inferSelect)["id"];
      }
    | {
        employeeEmail: (typeof Table__Users.$inferSelect)["email"];
      }
    | {
        employeeCode: (typeof Table__Users.$inferSelect)["employeeCode"];
      }
    | {
        employeeId: (typeof Table__Users.$inferSelect)["id"];
      };
};

async function read__OneEmployeeAddress(options: TRead__OneEmployeeAddress) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, ...rest } =
    getTableColumns(Table__EmployeeAddress);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const conditions: SQL[] = [];

  const baseQuery = db.select({ ...rest }).from(Table__EmployeeAddress);

  baseQuery
    .innerJoin(
      Table__EmployeeProfile,
      eq(Table__EmployeeProfile.id, Table__EmployeeAddress.associatedProfileId),
    )
    .innerJoin(
      Table__Users,
      eq(Table__Users.id, Table__EmployeeProfile.associatedUserId),
    );

  if ("id" in options.identifier) {
    conditions.push(eq(Table__EmployeeAddress.id, options.identifier.id));
  }

  if ("employeeCode" in options.identifier) {
    conditions.push(
      eq(Table__Users.employeeCode, options.identifier.employeeCode),
    );
  }

  if ("employeeId" in options.identifier) {
    conditions.push(eq(Table__Users.id, options.identifier.employeeId));
  }

  if ("employeeEmail" in options.identifier) {
    conditions.push(eq(Table__Users.email, options.identifier.employeeEmail));
  }

  if ("profileId" in options.identifier) {
    conditions.push(
      eq(Table__EmployeeProfile.id, options.identifier.profileId),
    );
  }

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.log(`Error in queryError in read__OneEmployeeAddress`);
    throw queryError;
  }

  const [employeeAddress] = queryResponse;

  return employeeAddress ? employeeAddress : null;
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TUpdate__EmployeeAddress = {
  identifier: {
    id:
      | (typeof Table__EmployeeAddress.$inferSelect)["id"]
      | (typeof Table__EmployeeAddress.$inferSelect)["id"][];
  };
  dataToUpdate: Partial<
    Omit<
      typeof Table__EmployeeAddress.$inferInsert,
      "createdAt" | "updatedAt" | "tableIdentifierToken" | "id"
    >
  >;
};

async function update__EmployeeAddress(options: TUpdate__EmployeeAddress) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, ...rest } =
    getTableColumns(Table__EmployeeAddress);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const isIdAnArray = Array.isArray(options.identifier.id);

  const idsToUpdate = Array.isArray(options.identifier.id)
    ? options.identifier.id
    : [options.identifier.id];

  if (idsToUpdate.length === 0) {
    throw new Error("Cannot update EmployeeAddress with empty IDs");
  }

  // Fetch records before updating
  const [fetchError, fetchedData] = await tryCatch(
    db
      .select({ ...rest })
      .from(Table__EmployeeAddress)
      .where(inArray(Table__EmployeeAddress.id, idsToUpdate)),
  );

  if (fetchError) {
    console.error("Error in fetchError in update__EmployeeAddress");
    console.error(fetchError);
    throw fetchError;
  }

  if (fetchedData.length !== idsToUpdate.length) {
    throw new Error("Some EmployeeAddress records were not found");
  }

  // Update records
  const [queryError] = await tryCatch(
    db
      .update(Table__EmployeeAddress)
      .set(options.dataToUpdate)
      .where(inArray(Table__EmployeeAddress.id, idsToUpdate)),
  );

  if (queryError) {
    console.error("Error in queryError in update__EmployeeAddress");
    console.error(queryError);
    throw queryError;
  }

  // Fetch updated records
  const [fetchUpdatedDataError, fetchedUpdatedData] = await tryCatch(
    db
      .select({ ...rest })
      .from(Table__EmployeeAddress)
      .where(inArray(Table__EmployeeAddress.id, idsToUpdate)),
  );

  if (fetchUpdatedDataError) {
    console.error("Error in fetchUpdatedDataError in update__EmployeeAddress");
    console.error(fetchUpdatedDataError);
    throw fetchUpdatedDataError;
  }

  // Preserve the original input ID order
  const dataMap = new Map(fetchedUpdatedData.map((item) => [item.id, item]));

  const result = idsToUpdate.map((updatedId) => {
    const updatedData = dataMap.get(updatedId);

    if (!updatedData) {
      throw new Error(
        `Could not find updated EmployeeAddress with id: ${updatedId}`,
      );
    }

    return updatedData;
  });

  return isIdAnArray ? result : result[0]!;
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export {
  //

  create__EmployeeAddress,
  read__OneEmployeeAddress,
  update__EmployeeAddress,
};
