import { Table__ProfessionalQualification } from "@/schema";
import { getTableColumns, inArray } from "drizzle-orm";
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

export { create__ProfessionalQualification };
