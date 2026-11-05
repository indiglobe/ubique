import z from "zod";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const dataToInsertSchema = z.object({
  dateOfBirth: z.date().optional(),
  joiningDate: z.date().optional(),
  alternatePhone: z.string().nullish(),
  associatedUserId: z.string(),
});

const create__OnroleUserProfileSchema = z.object({
  dataToInsert: z.union([dataToInsertSchema, z.array(dataToInsertSchema)]),
});

const read__OneOnroleUserProfileSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      associatedUserId: z.string(),
    }),
  ]),
});

export {
  //
  create__OnroleUserProfileSchema,
  read__OneOnroleUserProfileSchema,
};
