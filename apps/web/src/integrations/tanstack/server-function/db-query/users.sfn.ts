import { createServerFn } from "@tanstack/react-start";
import {
  create__OneUser,
  read__AllUsers,
  read__OneUser,
} from "@repo/data/querries/users";
import {
  create__OneUserSchema,
  read__AllUsersSchema,
  read__OneUserSchema,
} from "@repo/data/validators/users";
import { tryCatch } from "@repo/utils/try-catch";

export const serverFn__createOneUser = createServerFn()
  .validator(create__OneUserSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      create__OneUser(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__createOneUser`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResposne;
  });

export const serverFn__readAllUsers = createServerFn()
  .validator(read__AllUsersSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      read__AllUsers(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__readAllUsers`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResposne;
  });

export const serverFn__readOneUser = createServerFn()
  .validator(read__OneUserSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      read__OneUser(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__readOneUser`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResposne;
  });
