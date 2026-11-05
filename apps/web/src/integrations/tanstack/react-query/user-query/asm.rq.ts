import {
  serverFn__createUser,
  serverFn__readAllUsers,
} from "@/integrations/tanstack/server-function/db-query/users.sfn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { OFFROLE_USER_ROLE, ONROLE_USER_ROLE } from "@repo/utils/db-enums";

const USER_ROLE = [...ONROLE_USER_ROLE, ...OFFROLE_USER_ROLE];

export const usersQueryKeys = {
  __: () => ["asistant-sales-manager", "user"] as const,
  list: () => [...usersQueryKeys.__(), "list"] as const,
};

function useCreateNewUser() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)/dashboard/",
  });
  const queryClient = useQueryClient();

  const createOneUser = useServerFn(serverFn__createUser);

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["ASM"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationKey: usersQueryKeys.list(),
    mutationFn: createOneUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.list(),
      });
    },
  });
}

function useReadAllUsers() {
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
            role: USERS_WITH_ROLES_TO_FETCH,
          },
        },
      }),
    queryKey: usersQueryKeys.list(),
  });
}

export { useCreateNewUser, useReadAllUsers };
