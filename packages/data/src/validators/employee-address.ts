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

export {
  //
  create__EmployeeAddressSchema,
};
