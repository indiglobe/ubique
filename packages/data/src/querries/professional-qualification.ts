import {
  Table__EmployeeProfile,
  Table__ProfessionalQualification,
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
  typeof Table__ProfessionalQualification.$inferInsert,
  "createdAt" | "updatedAt" | "tableIdentifierToken" | "id"
>;

type TCreate__ProfessionalQualification = {
  dataToInsert: TDataToInsert | TDataToInsert[];
};

async function create__ProfessionalQualification(
  options: TCreate__ProfessionalQualification,
) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, ...rest } =
    getTableColumns(Table__ProfessionalQualification);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const isDataToInsertAnArray = Array.isArray(options.dataToInsert);

  const dataToInsertIntoDB = Array.isArray(options.dataToInsert)
    ? options.dataToInsert
    : [options.dataToInsert];

  if (dataToInsertIntoDB.length === 0) {
    throw new Error("Cannot create ProfessionalQualification with empty data");
  }

  // Generate a unique ID for each record
  const generatedIds = dataToInsertIntoDB.map(() => id());

  const insertData = dataToInsertIntoDB.map((data, index) => ({
    ...data,
    id: generatedIds[index],
  }));

  const baseQuery = db
    .insert(Table__ProfessionalQualification)
    .values(insertData);

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.error("Error in queryError in create__ProfessionalQualification");
    console.error(queryError);
    throw queryError;
  }

  if (queryResponse[0].affectedRows !== dataToInsertIntoDB.length) {
    throw new Error(
      "Unexpected number of affected rows in create__ProfessionalQualification",
    );
  }

  // Fetch all inserted records
  const [fetchInsertedDataError, fetchedInsertedData] = await tryCatch(
    db
      .select({ ...rest })
      .from(Table__ProfessionalQualification)
      .where(inArray(Table__ProfessionalQualification.id, generatedIds)),
  );

  if (fetchInsertedDataError) {
    console.error(
      "Error in fetchInsertedDataError in create__ProfessionalQualification",
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
        `Could not find inserted ProfessionalQualification with id: ${generatedId}`,
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

type TRead__OneProfessionalQualification = {
  identifier: {
    id: (typeof Table__ProfessionalQualification.$inferSelect)["id"];
  };
};

async function read__OneProfessionalQualification(
  options: TRead__OneProfessionalQualification,
) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, ...rest } =
    getTableColumns(Table__ProfessionalQualification);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const conditions: SQL[] = [];

  const baseQuery = db
    .select({ ...rest })
    .from(Table__ProfessionalQualification);

  if ("id" in options.identifier) {
    conditions.push(
      eq(Table__ProfessionalQualification.id, options.identifier.id),
    );
  }

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.log(`Error in queryError in read__OneProfessionalQualification`);
    throw queryError;
  }

  const [professionalQualification] = queryResponse;

  return professionalQualification ? professionalQualification : null;
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TRead__AllProfessionalQualification = {
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

async function read__AllProfessionalQualification(
  options?: TRead__AllProfessionalQualification,
) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, ...rest } =
    getTableColumns(Table__ProfessionalQualification);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const conditions: SQL[] = [];

  const baseQuery = db
    .select({ ...rest })
    .from(Table__ProfessionalQualification)
    .orderBy(desc(Table__ProfessionalQualification.year));

  if (options?.identifier) {
    if ("userId" in options.identifier) {
      baseQuery
        .leftJoin(
          Table__EmployeeProfile,
          eq(
            Table__EmployeeProfile.id,
            Table__ProfessionalQualification.associatedProfileId,
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
            Table__ProfessionalQualification.associatedProfileId,
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
          Table__ProfessionalQualification.associatedProfileId,
        ),
      );

      conditions.push(
        eq(
          Table__ProfessionalQualification.associatedProfileId,
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
    console.log(`Error in queryError in read__OneProfessionalQualification`);
    throw queryError;
  }

  const professionalQualifications = queryResponse;

  return professionalQualifications;
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TDelete__ProfessionalQualification = {
  identifier: {
    id:
      | (typeof Table__ProfessionalQualification.$inferSelect)["id"]
      | (typeof Table__ProfessionalQualification.$inferSelect)["id"][];
  };
};

async function delete__ProfessionalQualification(
  options: TDelete__ProfessionalQualification,
) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, ...rest } =
    getTableColumns(Table__ProfessionalQualification);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const isIdAnArray = Array.isArray(options.identifier.id);

  const idsToDelete = Array.isArray(options.identifier.id)
    ? options.identifier.id
    : [options.identifier.id];

  if (idsToDelete.length === 0) {
    throw new Error("Cannot delete ProfessionalQualification with empty IDs");
  }

  // Fetch records before deletion
  const [fetchError, fetchedData] = await tryCatch(
    db
      .select({ ...rest })
      .from(Table__ProfessionalQualification)
      .where(inArray(Table__ProfessionalQualification.id, idsToDelete)),
  );

  if (fetchError) {
    console.error("Error in fetchError in delete__ProfessionalQualification");
    console.error(fetchError);
    throw fetchError;
  }

  // Delete records
  const [queryError, queryResponse] = await tryCatch(
    db
      .delete(Table__ProfessionalQualification)
      .where(inArray(Table__ProfessionalQualification.id, idsToDelete)),
  );

  if (queryError) {
    console.error("Error in queryError in delete__ProfessionalQualification");
    console.error(queryError);
    throw queryError;
  }

  if (queryResponse[0].affectedRows !== fetchedData.length) {
    throw new Error(
      "Unexpected number of affected rows in delete__ProfessionalQualification",
    );
  }

  // Preserve the original input ID order
  const dataMap = new Map(fetchedData.map((item) => [item.id, item]));

  const result = idsToDelete.map((deletedId) => {
    const deletedData = dataMap.get(deletedId);

    if (!deletedData) {
      throw new Error(
        `Could not find ProfessionalQualification with id: ${deletedId}`,
      );
    }

    return deletedData;
  });

  return isIdAnArray ? result : result[0]!;
}

export {
  //
  create__ProfessionalQualification,
  read__OneProfessionalQualification,
  read__AllProfessionalQualification,
  delete__ProfessionalQualification,
};
