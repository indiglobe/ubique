import { createServerFn } from "@tanstack/react-start";
import { read__OneUser, create__OneUser } from "@repo/data/querries/users";
import {
  read__OneUserSchema,
  create__OneUserSchema,
} from "@repo/data/validators/users";

export const serverFn__createOneUser = createServerFn()
  .validator(create__OneUserSchema)
  .handler(async ({ data }) => {
    return await create__OneUser({ ...data });
  });

export const serverFn__readOneUser = createServerFn()
  .validator(read__OneUserSchema)
  .handler(async ({ data }) => {
    return await read__OneUser({ ...data });
  });
