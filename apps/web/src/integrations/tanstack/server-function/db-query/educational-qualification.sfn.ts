import {
  create__EducationalQualification,
  delete__EducationalQualification,
  read__AllEducationalQualification,
  update__EducationalQualification,
  read__OneEducationalQualification,
} from "@repo/data/querries/educational-qualification";
import {
  create__EducationalQualificationSchema,
  delete__EducationalQualificationSchema,
  read__AllEducationalQualificationSchema,
  update__EducationalQualificationSchema,
  read__OneEducationalQualificationSchema,
} from "@repo/data/validators/educational-qualification";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

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

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const serverFn__readOneEducationalQualification = createServerFn()
  .validator(read__OneEducationalQualificationSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      read__OneEducationalQualification(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readOneEducationalQualification`,
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

const serverFn__readAllEducationalQualification = createServerFn()
  .validator(read__AllEducationalQualificationSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      read__AllEducationalQualification(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readAllEducationalQualification`,
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

const serverFn__updateEducationalQualification = createServerFn()
  .validator(update__EducationalQualificationSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      update__EducationalQualification(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__updateEducationalQualification`,
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

const serverFn__deleteEducationalQualification = createServerFn()
  .validator(delete__EducationalQualificationSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResposne] = await tryCatch(
      delete__EducationalQualification(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__deleteEducationalQualification`,
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
  serverFn__createEducationalQualification,
  serverFn__readOneEducationalQualification,
  serverFn__readAllEducationalQualification,
  serverFn__updateEducationalQualification,
  serverFn__deleteEducationalQualification,
};
