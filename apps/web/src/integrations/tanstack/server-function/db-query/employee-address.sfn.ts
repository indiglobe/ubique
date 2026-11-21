import {
  create__EmployeeAddress,
  read__OneEmployeeAddress,
  update__EmployeeAddress,
} from "@repo/data/querries/employee-address";
import {
  create__EmployeeAddressSchema,
  read__OneEmployeeAddressSchema,
  update__EmployeeAddressSchema,
} from "@repo/data/validators/employee-address";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const serverFn__createEmployeeAddress = createServerFn()
  .validator(create__EmployeeAddressSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      create__EmployeeAddress(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__createEmployeeAddress`,
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

const serverFn__readOneEmployeeAddress = createServerFn()
  .validator(read__OneEmployeeAddressSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      read__OneEmployeeAddress(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readOneEmployeeAddress`,
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

const serverFn__updateEmployeeAddress = createServerFn()
  .validator(update__EmployeeAddressSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      update__EmployeeAddress(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__updateEmployeeAddress`,
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
  serverFn__createEmployeeAddress,
  serverFn__readOneEmployeeAddress,
  serverFn__updateEmployeeAddress,
};
