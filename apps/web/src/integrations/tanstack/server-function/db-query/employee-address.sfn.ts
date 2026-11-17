import { create__EmployeeAddress } from "@repo/data/querries/employee-address";
import { create__EmployeeAddressSchema } from "@repo/data/validators/employee-address";
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

export {
  //
  serverFn__createEmployeeAddress,
};
