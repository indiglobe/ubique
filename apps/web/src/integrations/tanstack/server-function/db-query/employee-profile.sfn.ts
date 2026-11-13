import {
  create__EmployeeProfile,
  read__OneEmployeeProfile,
  update__OneEmployeeProfile,
} from "@repo/data/querries/employee-profile";
import {
  create__EmployeeProfileSchema,
  read__OneEmployeeProfileSchema,
  update__OneEmployeeProfileSchema,
} from "@repo/data/validators/employee-profile";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const serverFn__createEmployeeProfile = createServerFn()
  .validator(create__EmployeeProfileSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      create__EmployeeProfile(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__createEmployeeProfile`,
      );
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

const serverFn__readOneEmployeeProfile = createServerFn()
  .validator(read__OneEmployeeProfileSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      read__OneEmployeeProfile(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readOneEmployeeProfile`,
      );
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

const serverFn__updateOneEmployeeProfile = createServerFn()
  .validator(update__OneEmployeeProfileSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      update__OneEmployeeProfile(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__updateOneEmployeeProfile`,
      );
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
  serverFn__createEmployeeProfile,
  serverFn__readOneEmployeeProfile,
  serverFn__updateOneEmployeeProfile,
};
