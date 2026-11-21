import z from "zod";
import { ATTENDANCE_STATUS } from "@repo/utils/db-enums";

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

const read__OneAttendenceSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
});

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const read__AllAttendenceSchema = z.object({
  identifier: z
    .object({
      employeeId: z.union([z.string(), z.array(z.string())]).optional(),
      attendanceStatus: z
        .union([z.enum(ATTENDANCE_STATUS), z.array(z.enum(ATTENDANCE_STATUS))])
        .optional(),
      attendanceDate: z.date().optional(),
      fromDate: z.date().optional(),
      toDate: z.date().optional(),
    })
    .optional(),
});

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export {
  //
  create__AttendenceSchema,
  read__OneAttendenceSchema,
  read__AllAttendenceSchema,
};
