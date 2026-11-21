import z from "zod";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const dataToInsertSchema = z.object({
  associatedProfileId: z.string(),
  area: z.string(),
  landmark: z.string().nullish(),
  postOffice: z.string(),
  policeStation: z.string(),
  city: z.string(),
  districtId: z.string(),
  pinCode: z.string(),
  stateId: z.string(),
});

const create__EmployeeAddressSchema = z.object({
  dataToInsert: z.union([dataToInsertSchema, z.array(dataToInsertSchema)]),
});

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const read__OneEmployeeAddressSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      profileId: z.string(),
    }),
    z.object({
      employeeEmail: z.string(),
    }),
    z.object({
      employeeCode: z.string(),
    }),
    z.object({
      employeeId: z.string(),
    }),
  ]),
});

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const update__EmployeeAddressSchema = z.object({
  identifier: z.object({
    id: z.union([z.string(), z.array(z.string())]),
  }),
  dataToUpdate: z.object({
    associatedProfileId: z.string().optional(),
    area: z.string().optional(),
    landmark: z.string().nullish(),
    postOffice: z.string().optional(),
    policeStation: z.string().optional(),
    city: z.string().optional(),
    districtId: z.string().optional(),
    pinCode: z.string().optional(),
    stateId: z.string().optional(),
  }),
});

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export {
  //
  create__EmployeeAddressSchema,
  read__OneEmployeeAddressSchema,
  update__EmployeeAddressSchema,
};
