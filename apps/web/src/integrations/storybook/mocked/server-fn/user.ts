import { mocked } from "storybook/test";
import { serverFn__createOneUser } from "@/integrations/server-function/query/user.sf";
import type { DeepPartial } from "@/utils/types/storybook";

export const mocked__serverFn__createOneUser = mocked(
  serverFn__createOneUser,
).mockResolvedValue({
  createdAt: new Date(),
  lastLoginAt: new Date(),
  updatedAt: new Date(),
  avatarUrl: "",
  email: "",
  employeeCode: "",
  id: "",
  name: "",
  organizationId: "",
  passwordHash: "",
  phone: "",
  role: "ADMIN",
  status: "ACTIVE",
  tableIdentifierToken: "",
  username: "",
} satisfies DeepPartial<Awaited<ReturnType<typeof serverFn__createOneUser>>>);
