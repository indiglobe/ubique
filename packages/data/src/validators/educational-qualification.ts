import z from "zod";

const dataToInsertSchema = z.object({
  qualification: z.string(),
  institution: z.string(),
  year: z.string(),
  assciatedProfile: z.string(),
});

const create__EducationalQualificationSchema = z.object({
  dataToInsert: z.union([dataToInsertSchema, z.array(dataToInsertSchema)]),
});

export { create__EducationalQualificationSchema };
