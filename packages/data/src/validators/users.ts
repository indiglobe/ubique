import z from "zod";

export const Tread__OneUserSchema = z.object({
  queryOptions: z.union([
    z.object({
      userEmail: z.string(),
    }),
    z.object({
      userId: z.string(),
    }),
    z.object({
      userName: z.string(),
    }),
  ]),
  selectedFields: z
    .object({
      id: z.literal(true).optional(),
      name: z.literal(true).optional(),
      organizationId: z.literal(true).optional(),
      role: z.literal(true).optional(),
      email: z.literal(true).optional(),
      username: z.literal(true).optional(),
      phone: z.literal(true).optional(),
      passwordHash: z.literal(true).optional(),
      employeeCode: z.literal(true).optional(),
      status: z.literal(true).optional(),
      avatarUrl: z.literal(true).optional(),
      lastLoginAt: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
      tableIdentifierToken: z.literal(true).optional(),
    })
    .optional(),
});
