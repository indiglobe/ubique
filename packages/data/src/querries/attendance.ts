import { Table__Attendence, Table__Users } from "@/schema";
import { id } from "@repo/utils/id";
import { and, eq, getTableColumns, gte, inArray, lte, SQL } from "drizzle-orm";
import { db } from "..";
import { tryCatch } from "@repo/utils/try-catch";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TDataToInsert = Omit<
  typeof Table__Attendence.$inferInsert,
  "createdAt" | "updatedAt" | "tableIdentifierToken" | "id"
>;

type TCreate__Attendence = {
  dataToInsert: TDataToInsert | TDataToInsert[];
};

async function create__Attendence(options: TCreate__Attendence) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, ...rest } =
    getTableColumns(Table__Attendence);
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

  const baseQuery = db.insert(Table__Attendence).values(insertData);

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.error("Error in queryError in create__Attendence");
    console.error(queryError);
    throw queryError;
  }

  if (queryResponse[0].affectedRows !== dataToInsertIntoDB.length) {
    throw new Error("Unexpected number of affected rows in create__Attendence");
  }

  // Fetch all inserted records
  const [fetchInsertedDataError, fetchedInsertedData] = await tryCatch(
    db
      .select({ ...rest })
      .from(Table__Attendence)
      .where(inArray(Table__Attendence.id, generatedIds)),
  );

  if (fetchInsertedDataError) {
    console.error("Error in fetchInsertedDataError in create__Attendence");
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

type TRead__OneAttendence = {
  identifier: {
    id: (typeof Table__Attendence.$inferSelect)["id"];
  };
};

async function read__OneAttendence(options: TRead__OneAttendence) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    createdAt: createdAtAttendence,
    updatedAt: updatedAtAttendence,
    tableIdentifierToken: tableIdentifierTokenAttendence,
    ...restAttendence
  } = getTableColumns(Table__Attendence);

  const {
    password: passwordUser,
    createdAt: createdAtUser,
    updatedAt: updatedAtUser,
    tableIdentifierToken: tableIdentifierTokenUser,
    ...restUser
  } = getTableColumns(Table__Users);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const conditions: SQL[] = [];

  if (options.identifier.id) {
    conditions.push(eq(Table__Attendence.id, options.identifier.id));
  }

  const baseQuery = db
    .select({
      ...restAttendence,
      employee: {
        ...restUser,
      },
    })
    .from(Table__Attendence)
    .innerJoin(Table__Users, eq(Table__Attendence.employeeId, Table__Users.id));

  const query =
    conditions.length > 0 ? baseQuery.where(and(...conditions)) : baseQuery;

  const [queryError, queryResponse] = await tryCatch(query);

  if (queryError) {
    console.log("Error in queryError in read__OneAttendence");
    throw queryError;
  }

  const [attendence] = queryResponse;

  return attendence ?? null;
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TRead__AllAttendence = {
  identifier?: {
    employeeId?:
      | (typeof Table__Attendence.$inferSelect)["employeeId"]
      | (typeof Table__Attendence.$inferSelect)["employeeId"][];

    attendanceStatus?:
      | (typeof Table__Attendence.$inferSelect)["attendanceStatus"]
      | (typeof Table__Attendence.$inferSelect)["attendanceStatus"][];

    attendanceDate?: Date;
    fromDate?: Date;
    toDate?: Date;
  };
};

async function read__AllAttendence(options?: TRead__AllAttendence) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    createdAt: createdAtAttendence,
    updatedAt: updatedAtAttendence,
    tableIdentifierToken: tableIdentifierTokenAttendence,
    ...restAttendence
  } = getTableColumns(Table__Attendence);

  const {
    password: passwordUser,
    createdAt: createdAtUser,
    updatedAt: updatedAtUser,
    tableIdentifierToken: tableIdentifierTokenUser,
    ...restUser
  } = getTableColumns(Table__Users);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const conditions: SQL[] = [];

  // Filter by one or multiple employees
  if (options?.identifier?.employeeId) {
    conditions.push(
      inArray(
        Table__Attendence.employeeId,
        Array.isArray(options.identifier.employeeId)
          ? options.identifier.employeeId
          : [options.identifier.employeeId],
      ),
    );
  }

  // Filter by one or multiple attendance statuses
  if (options?.identifier?.attendanceStatus) {
    conditions.push(
      inArray(
        Table__Attendence.attendanceStatus,
        Array.isArray(options.identifier.attendanceStatus)
          ? options.identifier.attendanceStatus
          : [options.identifier.attendanceStatus],
      ),
    );
  }

  // Filter by an exact attendance date
  if (options?.identifier?.attendanceDate) {
    const startOfDay = new Date(options.identifier.attendanceDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(options.identifier.attendanceDate);
    endOfDay.setHours(23, 59, 59, 999);

    conditions.push(
      gte(Table__Attendence.attendanceDate, startOfDay),
      lte(Table__Attendence.attendanceDate, endOfDay),
    );
  }

  // Filter by date range
  if (options?.identifier?.fromDate) {
    conditions.push(
      gte(Table__Attendence.attendanceDate, options.identifier.fromDate),
    );
  }

  if (options?.identifier?.toDate) {
    conditions.push(
      lte(Table__Attendence.attendanceDate, options.identifier.toDate),
    );
  }

  const baseQuery = db
    .select({
      ...restAttendence,
      employee: {
        ...restUser,
      },
    })
    .from(Table__Attendence)
    .innerJoin(Table__Users, eq(Table__Attendence.employeeId, Table__Users.id));

  const query =
    conditions.length > 0 ? baseQuery.where(and(...conditions)) : baseQuery;

  const [queryError, queryResponse] = await tryCatch(query);

  if (queryError) {
    console.log("Error in queryError in read__AllAttendence");
    throw queryError;
  }

  return queryResponse;
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export {
  //

  create__Attendence,
  read__AllAttendence,
  read__OneAttendence,
};
