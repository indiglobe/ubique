import z from "zod";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const dataToInsertSchema = z.object({
  associatedProfileId: z.string(),
  company: z.string(),
  designation: z.string(),
  startDate: z.string(),
  endDate: z.string().nullish(),
  description: z.string().nullish(),
});

const create__ExperienceSchema = z.object({
  dataToInsert: z.union([dataToInsertSchema, z.array(dataToInsertSchema)]),
});

export {
  //
  create__ExperienceSchema,
};
