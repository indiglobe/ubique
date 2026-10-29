import {
  serverFn__createOneUser,
  serverFn__readAllUsers,
} from "@/integrations/tanstack/server-function/db-query/users.sfn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import type { USER_ROLE } from "@repo/utils/db-enums";

export const usersQueryKeys = {
  all: (role: (typeof USER_ROLE)[number]) =>
    ["asistant-sales-manager", "user", role] as const,
  list: (role: (typeof USER_ROLE)[number]) =>
    [...usersQueryKeys.all(role), "list"] as const,
};

export function useCreateNewUser() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)/dashboard/",
  });
  const queryClient = useQueryClient();

  const createOneUser = useServerFn(serverFn__createOneUser);

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["ASM"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationKey: usersQueryKeys.list(userDetailsFromCookie.role),
    mutationFn: createOneUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.list(userDetailsFromCookie.role),
      });
    },
  });
}

export function useReadAllUsers() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)/dashboard/",
  });

  const readAllUser = useServerFn(serverFn__readAllUsers);

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["ASM"];
  const USERS_WITH_ROLES_TO_FETCH: (typeof USER_ROLE)[number][] = [
    "MR",
    "STOCKIST",
    "DISTRIBUTOR",
  ];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useQuery({
    queryFn: () =>
      readAllUser({
        data: {
          identifier: {
            referrerId: userDetailsFromCookie.userId,
            role: USERS_WITH_ROLES_TO_FETCH,
          },
        },
      }),
    queryKey: usersQueryKeys.list(userDetailsFromCookie.role),
  });
}
