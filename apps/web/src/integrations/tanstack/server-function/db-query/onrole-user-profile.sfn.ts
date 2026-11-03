import { create__OnroleUserProfile } from "@repo/data/querries/onrole-user-profile";
import { create__OnroleUserProfileSchema } from "@repo/data/validators/onrole-user-profile";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

const serverFn__createOnroleUserProfile = createServerFn()
  .validator(create__OnroleUserProfileSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      create__OnroleUserProfile(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__createOnroleUserProfile`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResposne;
  });

export { serverFn__createOnroleUserProfile };