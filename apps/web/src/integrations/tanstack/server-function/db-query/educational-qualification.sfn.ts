import { create__EducationalQualification } from "@repo/data/querries/educational-qualification";
import { create__EducationalQualificationSchema } from "@repo/data/validators/educational-qualification";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

const serverFn__createEducationalQualification = createServerFn()
  .validator(create__EducationalQualificationSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      create__EducationalQualification(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__createEducationalQualification`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResposne;
  });

export { serverFn__createEducationalQualification };
