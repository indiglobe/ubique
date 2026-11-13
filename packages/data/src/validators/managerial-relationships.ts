import z from "zod";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const read__OneManagerialsSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      subordinateId: z.string(),
    }),
    z.object({
      managerId: z.string(),
    }),
  ]),
});

export {
  //
  read__OneManagerialsSchema,
};
