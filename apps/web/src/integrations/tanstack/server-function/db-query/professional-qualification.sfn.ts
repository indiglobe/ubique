import {
  create__ProfessionalQualification,
  delete__ProfessionalQualification,
  read__AllProfessionalQualification,
  read__OneProfessionalQualification,
} from "@repo/data/querries/professional-qualification";
import {
  create__ProfessionalQualificationSchema,
  delete__ProfessionalQualificationSchema,
  read__AllProfessionalQualificationSchema,
  read__OneProfessionalQualificationSchema,
} from "@repo/data/validators/professional-qualification";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

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

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const serverFn__readOneProfessionalQualification = createServerFn()
  .validator(read__OneProfessionalQualificationSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      read__OneProfessionalQualification(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readOneProfessionalQualification`,
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

const serverFn__readAllProfessionalQualification = createServerFn()
  .validator(read__AllProfessionalQualificationSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      read__AllProfessionalQualification(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readAllProfessionalQualification`,
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

const serverFn__deleteProfessionalQualification = createServerFn()
  .validator(delete__ProfessionalQualificationSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      delete__ProfessionalQualification(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__deleteProfessionalQualification`,
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

  serverFn__createProfessionalQualification,
  serverFn__readOneProfessionalQualification,
  serverFn__readAllProfessionalQualification,
  serverFn__deleteProfessionalQualification,
};
