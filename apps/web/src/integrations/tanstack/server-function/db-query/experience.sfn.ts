import { create__Experience, } from "@repo/data/querries/experience";
import { create__ExperienceSchema } from "@repo/data/validators/experience";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

const serverFn__createExperience = createServerFn()
  .validator(create__ExperienceSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      create__Experience(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__createExperience`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResposne;
  });

export { serverFn__createExperience };