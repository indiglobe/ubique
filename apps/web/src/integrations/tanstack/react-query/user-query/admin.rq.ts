import {
  serverFn__createUser,
  serverFn__readAllUsers,
} from "@/integrations/tanstack/server-function/db-query/users.sfn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { EMPLOYEE_ROLE, PARTNER_ROLE } from "@repo/utils/db-enums";

const USER_ROLE = [...EMPLOYEE_ROLE, ...PARTNER_ROLE];

export const usersQueryKeys = {
  __: () => ["admin", "user"] as const,

  list: {
    __: () => [...usersQueryKeys.__(), "list"] as const,
  },

  one: {
    __: (userIdentifier: string) =>
      [...usersQueryKeys.__(), "one", userIdentifier] as const,
  },
};

function useCreateNewUser() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)/dashboard/",
  });
  const queryClient = useQueryClient();

  const createOneUser = useServerFn(serverFn__createUser);

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationFn: createOneUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.list.__(),
      });
    },
  });
}

function useReadAllUsers() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)/dashboard/",
  });

  const readAllUser = useServerFn(serverFn__readAllUsers);

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["ADMIN"];
  const USERS_WITH_ROLES_TO_FETCH: (typeof USER_ROLE)[number][] = [
    "ZSM",
    "RSM",
    "MANAGER",
    "ASM",
    "MR",
  ];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useQuery({
    queryFn: () =>
      readAllUser({
        data: {
          identifier: {
            role: USERS_WITH_ROLES_TO_FETCH,
          },
        },
      }),
    queryKey: usersQueryKeys.list.__(),
  });
}

export { useCreateNewUser, useReadAllUsers };
