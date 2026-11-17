import z from "zod";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const dataToInsertSchema = z.object({
  employeeId: z.string(),
  attendanceDate: z.date().optional(),
});

const create__AttendenceSchema = z.object({
  dataToInsert: z.union([dataToInsertSchema, z.array(dataToInsertSchema)]),
});

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export {
  //
  create__AttendenceSchema,
};
