import { createServerFn } from "@tanstack/react-start";
import {
  create__User,
  read__AllUsers,
  read__OneUser,
  update__OneUser,
} from "@repo/data/querries/users";
import {
  create__UserSchema,
  read__AllUsersSchema,
  read__OneUserSchema,
  update__OneUserSchema,
} from "@repo/data/validators/users";
import { tryCatch } from "@repo/utils/try-catch";

// ========================
// ========================
// ========================
// ========================
// ========================

const serverFn__createUser = createServerFn()
  .validator(create__UserSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      create__User(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__createUser`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResposne;
  });

// ========================
// ========================
// ========================
// ========================
// ========================

const serverFn__readAllUsers = createServerFn()
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

// ========================
// ========================
// ========================
// ========================
// ========================

const serverFn__readOneUser = createServerFn()
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

// ========================
// ========================
// ========================
// ========================
// ========================

const serverFn__updateOneUser = createServerFn()
  .validator(update__OneUserSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      update__OneUser(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__updateOneUser`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResposne;
  });

export {
  serverFn__createUser,
  serverFn__readAllUsers,
  serverFn__readOneUser,
  serverFn__updateOneUser,
};
