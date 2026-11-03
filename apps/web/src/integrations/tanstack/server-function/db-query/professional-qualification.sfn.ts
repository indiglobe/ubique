import { create__ProfessionalQualification } from "@repo/data/querries/professional-qualification";
import { create__ProfessionalQualificationSchema } from "@repo/data/validators/professional-qualification";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

const serverFn__createProfessionalQualification = createServerFn()
  .validator(create__ProfessionalQualificationSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      create__ProfessionalQualification(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__createProfessionalQualification`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResposne;
  });

export { serverFn__createProfessionalQualification };