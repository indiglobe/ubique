import { z } from "zod";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const dataToInsertSchema = z.object({
  qualification: z.string(),
  year: z.string(),
  associatedProfileId : z.string(),
  issuer: z.string(),
});

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const create__ProfessionalQualificationSchema = z.object({
  dataToInsert: z.union([dataToInsertSchema, z.array(dataToInsertSchema)]),
});

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const read__OneProfessionalQualificationSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
});

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const read__AllProfessionalQualificationSchema = z
  .object({
    identifier: z
      .union([
        z.object({
          userId: z.string(),
        }),
        z.object({
          employeeCode: z.string(),
        }),
        z.object({
          profileId: z.string(),
        }),
      ])
      .optional(),
  })
  .optional();

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const delete__ProfessionalQualificationSchema = z.object({
  identifier: z.object({ id: z.union([z.string(), z.array(z.string())]) }),
});

export {
  //
  create__ProfessionalQualificationSchema,
  read__OneProfessionalQualificationSchema,
  read__AllProfessionalQualificationSchema,
  delete__ProfessionalQualificationSchema,
};
