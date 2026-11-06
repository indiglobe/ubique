import {
  Table__EducationalQualification,
  Table__EmployeeProfile,
  Table__Users,
} from "@/schema";
import { and, desc, eq, getTableColumns, inArray, SQL } from "drizzle-orm";
import { db } from "@/index";
import { tryCatch } from "@repo/utils/try-catch";
import { id } from "@repo/utils/id";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TDataToInsert = Omit<
  typeof Table__EducationalQualification.$inferInsert,
  "createdAt" | "updatedAt" | "tableIdentifierToken" | "id"
>;

type TCreate__EducationalQualification = {
  dataToInsert: TDataToInsert | TDataToInsert[];
};

async function create__EducationalQualification(
  options: TCreate__EducationalQualification,
) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, ...rest } =
    getTableColumns(Table__EducationalQualification);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const isDataToInsertAnArray = Array.isArray(options.dataToInsert);

  const dataToInsertIntoDB = Array.isArray(options.dataToInsert)
    ? options.dataToInsert
    : [options.dataToInsert];

  if (dataToInsertIntoDB.length === 0) {
    throw new Error("Cannot create EducationalQualification with empty data");
  }

  // Generate a unique ID for each record
  const generatedIds = dataToInsertIntoDB.map(() => id());

  const insertData = dataToInsertIntoDB.map((data, index) => ({
    ...data,
    id: generatedIds[index],
  }));

  const baseQuery = db
    .insert(Table__EducationalQualification)
    .values(insertData);

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.error("Error in queryError in create__EducationalQualification");
    console.error(queryError);
    throw queryError;
  }

  if (queryResponse[0].affectedRows !== dataToInsertIntoDB.length) {
    throw new Error(
      "Unexpected number of affected rows in create__EducationalQualification",
    );
  }

  // Fetch all inserted records
  const [fetchInsertedDataError, fetchedInsertedData] = await tryCatch(
    db
      .select({ ...rest })
      .from(Table__EducationalQualification)
      .where(inArray(Table__EducationalQualification.id, generatedIds)),
  );

  if (fetchInsertedDataError) {
    console.error(
      "Error in fetchInsertedDataError in create__EducationalQualification",
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
        `Could not find inserted EducationalQualification with id: ${generatedId}`,
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

type TRead__OneEducationalQualification = {
  identifier: {
    id: (typeof Table__EducationalQualification.$inferSelect)["id"];
  };
};

async function read__OneEducationalQualification(
  options: TRead__OneEducationalQualification,
) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, ...rest } =
    getTableColumns(Table__EducationalQualification);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const conditions: SQL[] = [];

  const baseQuery = db
    .select({ ...rest })
    .from(Table__EducationalQualification);

  if ("id" in options.identifier) {
    conditions.push(
      eq(Table__EducationalQualification.id, options.identifier.id),
    );
  }

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.log(`Error in queryError in read__OneEducationalQualification`);
    throw queryError;
  }

  const [educationalQualification] = queryResponse;

  return educationalQualification ? educationalQualification : null;
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TRead__AllEducationalQualification = {
  identifier?:
    | {
        userId: (typeof Table__Users.$inferSelect)["id"];
      }
    | {
        employeeCode: (typeof Table__Users.$inferSelect)["employeeCode"];
      }
    | {
        profileId: (typeof Table__EmployeeProfile.$inferSelect)["id"];
      };
};

async function read__AllEducationalQualification(
  options?: TRead__AllEducationalQualification,
) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, ...rest } =
    getTableColumns(Table__EducationalQualification);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const conditions: SQL[] = [];

  const baseQuery = db
    .select({ ...rest })
    .from(Table__EducationalQualification)
    .orderBy(desc(Table__EducationalQualification.year));

  if (options?.identifier) {
    if ("userId" in options.identifier) {
      baseQuery
        .leftJoin(
          Table__EmployeeProfile,
          eq(
            Table__EmployeeProfile.id,
            Table__EducationalQualification.associatedProfileId,
          ),
        )
        .leftJoin(
          Table__Users,
          eq(Table__Users.id, Table__EmployeeProfile.associatedUserId),
        );

      conditions.push(eq(Table__Users.id, options.identifier.userId));
    }

    if ("employeeCode" in options.identifier) {
      baseQuery
        .leftJoin(
          Table__EmployeeProfile,
          eq(
            Table__EmployeeProfile.id,
            Table__EducationalQualification.associatedProfileId,
          ),
        )
        .leftJoin(
          Table__Users,
          eq(Table__Users.id, Table__EmployeeProfile.associatedUserId),
        );

      conditions.push(
        eq(Table__Users.employeeCode, options.identifier.employeeCode),
      );
    }

    if ("profileId" in options.identifier) {
      baseQuery.leftJoin(
        Table__EmployeeProfile,
        eq(
          Table__EmployeeProfile.id,
          Table__EducationalQualification.associatedProfileId,
        ),
      );

      conditions.push(
        eq(
          Table__EducationalQualification.associatedProfileId,
          options.identifier.profileId,
        ),
      );
    }
  }

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.log(`Error in queryError in read__OneEducationalQualification`);
    throw queryError;
  }

  const educationalQualifications = queryResponse;

  return educationalQualifications;
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TDelete__EducationalQualification = {
  identifier: {
    id:
      | (typeof Table__EducationalQualification.$inferSelect)["id"]
      | (typeof Table__EducationalQualification.$inferSelect)["id"][];
  };
};

async function delete__EducationalQualification(
  options: TDelete__EducationalQualification,
) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, ...rest } =
    getTableColumns(Table__EducationalQualification);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const isIdAnArray = Array.isArray(options.identifier.id);

  const idsToDelete = Array.isArray(options.identifier.id)
    ? options.identifier.id
    : [options.identifier.id];

  if (idsToDelete.length === 0) {
    throw new Error("Cannot delete EducationalQualification with empty IDs");
  }

  // Fetch records before deletion
  const [fetchError, fetchedData] = await tryCatch(
    db
      .select({ ...rest })
      .from(Table__EducationalQualification)
      .where(inArray(Table__EducationalQualification.id, idsToDelete)),
  );

  if (fetchError) {
    console.error("Error in fetchError in delete__EducationalQualification");
    console.error(fetchError);
    throw fetchError;
  }

  // Delete records
  const [queryError, queryResponse] = await tryCatch(
    db
      .delete(Table__EducationalQualification)
      .where(inArray(Table__EducationalQualification.id, idsToDelete)),
  );

  if (queryError) {
    console.error("Error in queryError in delete__EducationalQualification");
    console.error(queryError);
    throw queryError;
  }

  if (queryResponse[0].affectedRows !== fetchedData.length) {
    throw new Error(
      "Unexpected number of affected rows in delete__EducationalQualification",
    );
  }

  // Preserve the original input ID order
  const dataMap = new Map(fetchedData.map((item) => [item.id, item]));

  const result = idsToDelete.map((deletedId) => {
    const deletedData = dataMap.get(deletedId);

    if (!deletedData) {
      throw new Error(
        `Could not find EducationalQualification with id: ${deletedId}`,
      );
    }

    return deletedData;
  });

  return isIdAnArray ? result : result[0]!;
}

export {
  //
  create__EducationalQualification,
  read__OneEducationalQualification,
  read__AllEducationalQualification,
  delete__EducationalQualification,
};
