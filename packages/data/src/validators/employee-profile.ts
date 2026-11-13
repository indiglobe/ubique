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

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const create__EmployeeProfileSchema = z.object({
  dataToInsert: z.union([dataToInsertSchema, z.array(dataToInsertSchema)]),
});

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const read__OneEmployeeProfileSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      associatedUserId: z.string(),
    }),
  ]),
});

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const update__OneEmployeeProfileSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      associatedUserId: z.string(),
    }),
  ]),
  dataToUpdate: z.object({
    dateOfBirth: z.date().optional(),
    joiningDate: z.date().optional(),
    alternatePhone: z.string().nullish(),
  }),
});

export {
  //
  create__EmployeeProfileSchema,
  read__OneEmployeeProfileSchema,
  update__OneEmployeeProfileSchema,
};
