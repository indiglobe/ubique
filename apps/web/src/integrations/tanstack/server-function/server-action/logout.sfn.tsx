import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { deleteUserDetailsCookie } from "@/integrations/auth/session";

export const serverFn__logoutUser = createServerFn().handler(async () => {
  await deleteUserDetailsCookie();

  throw redirect({ to: "/" });
});
