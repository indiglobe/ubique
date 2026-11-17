import {
  read__AllDistrict,
  read__OneDistrict,
} from "@repo/data/querries/district";
import {
  read__AllDistrictSchema,
  read__OneDistrictSchema,
} from "@repo/data/validators/district";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const serverFn__readAllDistrict = createServerFn()
  .validator(read__AllDistrictSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      read__AllDistrict(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__readAllDistrict`);
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

const serverFn__readOneDistrict = createServerFn()
  .validator(read__OneDistrictSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      read__OneDistrict(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__readOneDistrict`);
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

  serverFn__readAllDistrict,
  serverFn__readOneDistrict,
};
