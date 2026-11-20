import {
  read__AllAttendence,
  read__OneAttendence,
} from "@repo/data/querries/attendance";
import {
  read__AllAttendenceSchema,
  read__OneAttendenceSchema,
} from "@repo/data/validators/attendance";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const serverFn__readAllAttendence = createServerFn()
  .validator(read__AllAttendenceSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      read__AllAttendence(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__readAllAttendence`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResposne;
  });

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const serverFn__readOneAttendence = createServerFn()
  .validator(read__OneAttendenceSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      read__OneAttendence(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__readOneAttendence`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResposne;
  });

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export {
  //

  serverFn__readAllAttendence,
  serverFn__readOneAttendence,
};
