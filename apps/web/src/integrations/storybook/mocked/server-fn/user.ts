import { mocked } from "storybook/test";
import { serverFn__createOneUser } from "@/integrations/server-function/query/user.sf";

export const mocked__serverFn__createOneUser = mocked(
  serverFn__createOneUser,
).mockResolvedValue();
