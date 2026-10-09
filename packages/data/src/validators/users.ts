import z from "zod";

export const read__OneUserSchema = z.object({
  identifier: z.object({
    email: z.string(),
  }),
});
