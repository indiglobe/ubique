import { z } from "zod";

const dataToInsertSchema = z.object({
  qualification: z.string(),
  year: z.string(),
  assciatedProfile: z.string(),
  issuer: z.string(),
});

const create__ProfessionalQualificationSchema = z.object({
  dataToInsert: z.union([dataToInsertSchema, z.array(dataToInsertSchema)]),
});

export { create__ProfessionalQualificationSchema };
