import { read__AllState, read__OneState } from "@repo/data/querries/state";
import { read__OneStateSchema } from "@repo/data/validators/state";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const serverFn__readAllState = createServerFn().handler(async () => {
  const [serverFnError, serverFnResposne] = await tryCatch(read__AllState());

  if (serverFnError) {
    console.error(`Error in serverFnError in serverFn__readAllState`);
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

const serverFn__readOneState = createServerFn()
  .validator(read__OneStateSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      read__OneState(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__readOneState`);
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

  serverFn__readAllState,
  serverFn__readOneState,
};
