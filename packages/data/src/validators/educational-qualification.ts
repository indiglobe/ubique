import z from "zod";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const dataToInsertSchema = z.object({
  qualification: z.string(),
  institution: z.string(),
  year: z.string(),
  associatedProfileId: z.string(),
});

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const create__EducationalQualificationSchema = z.object({
  dataToInsert: z.union([dataToInsertSchema, z.array(dataToInsertSchema)]),
});

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const read__OneEducationalQualificationSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
});

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const read__AllEducationalQualificationSchema = z
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

const delete__EducationalQualificationSchema = z.object({
  identifier: z.object({ id: z.union([z.string(), z.array(z.string())]) }),
});

export {
  //

  create__EducationalQualificationSchema,
  read__OneEducationalQualificationSchema,
  read__AllEducationalQualificationSchema,
  delete__EducationalQualificationSchema,
};
