import z from "zod";
import {
  ONROLE_USER_ROLE,
  OFFROLE_USER_ROLE,
  USER_STATUS,
} from "@repo/utils/db-enums";

const USER_ROLE = [...ONROLE_USER_ROLE, ...OFFROLE_USER_ROLE];

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const dataToInsertSchema = z.object({
  email: z.string(),
  employeeCode: z.string(),
  password: z.string().optional(),
  organizationId: z.string().nullish(),
  reportingManagerId: z.string().nullish(),
  name: z.string(),
  role: z.enum(USER_ROLE),
  username: z.string(),
  phone: z.string(),
  status: z.enum(USER_STATUS).optional(),
  profilePicture: z.string().nullish(),
  lastLoginAt: z.date().nullish(),
});

const create__UserSchema = z.object({
  dataToInsert: z.union([dataToInsertSchema, z.array(dataToInsertSchema)]),
});

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================
const read__OneUserSchema = z.object({
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

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const read__AllUsersSchema = z
  .object({
    identifier: z.object({
      organizationId: z.string().nullish(),
      reportingManagerId: z.string().nullish(),
      role: z.union([z.enum(USER_ROLE), z.array(z.enum(USER_ROLE))]).optional(),
      status: z
        .union([z.enum(USER_STATUS), z.array(z.enum(USER_STATUS))])
        .optional(),
    }),
    include: z
      .object({
        password: z.string(),
      })
      .optional(),
  })
  .optional();

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const update__OneUserSchema = z.object({
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

  dataToUpdate: z.object({
    name: z.string().optional(),
    organizationId: z.string().nullish(),
    reportingManagerId: z.string().nullish(),
    role: z.enum(USER_ROLE).optional(),
    password: z.string().optional(),
    username: z.string().optional(),
    phone: z.string().optional(),
    employeeCode: z.string().optional(),
    status: z.enum(USER_STATUS).optional(),
    profilePicture: z.string().nullish(),
    lastLoginAt: z.date().nullish(),
  }),
});

export {
  //
  read__OneUserSchema,
  create__UserSchema,
  read__AllUsersSchema,
  update__OneUserSchema,
};
