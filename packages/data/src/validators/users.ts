import { USER_ROLE, USER_STATUS } from "@repo/utils/db-enums";
import z from "zod";

export const read__OneUserSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      email: z.string(),
    }),
    z.object({
      employeeCode: z.string(),
    }),
  ]),
  include: z
    .object({
      password: z.string(),
    })
    .optional(),
});

export const create__OneUserSchema = z.object({
  dataToInsert: z.object({
    organizationId: z.string().length(10).nullable().optional(),
    name: z.string(),
    email: z.email(),
    role: z.enum(USER_ROLE),
    password: z.string().optional(),
    username: z.string(),
    phone: z.string(),
    employeeCode: z.string().length(16),
    status: z.enum(USER_STATUS).optional(),
    avatarUrl: z.string().nullable().optional(),
    lastLoginAt: z.date().nullable().optional(),
    referrerId: z.string().length(10).nullable().optional(),
  }),
});

export const read__AllUsersSchema = z
  .object({
    identifier: z.object({
      organizationId: z.string().nullish(),
      role: z.union([z.enum(USER_ROLE), z.array(z.enum(USER_ROLE))]).optional(),
      status: z
        .union([z.enum(USER_STATUS), z.array(z.enum(USER_STATUS))])
        .optional(),
      referrerId: z.string().nullish(),
    }),
    include: z
      .object({
        password: z.string(),
      })
      .optional(),
  })
  .optional();
