import {
  serverFn__createUser,
  serverFn__readAllUsers,
  serverFn__updateOneUser,
  serverFn__readOneUser,
} from "@/integrations/tanstack/server-function/db-query/users.sfn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ONROLE_USER_ROLE, OFFROLE_USER_ROLE } from "@repo/utils/db-enums";

const USER_ROLE = [...ONROLE_USER_ROLE, ...OFFROLE_USER_ROLE];

export const usersQueryKeys = {
  __: () => ["super-admin", "user"],

  list: { __: () => [...usersQueryKeys.__(), "list"] },

  one: {
    __: () => [...usersQueryKeys.__(), "one"],

    withUserId: (userId: string) => [...usersQueryKeys.one.__(), userId],
  },
} as const;

function useCreateNewUser() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });
  const queryClient = useQueryClient();

  const createOneUser = useServerFn(serverFn__createUser);

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

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
    from: "/(authenticated-routes)",
  });

  const readAllUser = useServerFn(serverFn__readAllUsers);

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];
  const USERS_WITH_ROLES_TO_FETCH: (typeof USER_ROLE)[number][] = [
    "ADMIN",
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

function useReadOneUserWithUserId(userId: string) {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const readOneUser = useServerFn(serverFn__readOneUser);

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useQuery({
    queryFn: () =>
      readOneUser({
        data: {
          identifier: {
            id: userId,
          },
        },
      }),

    queryKey: usersQueryKeys.one.withUserId(userId),
  });
}

function useUpdateOneUser() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const queryClient = useQueryClient();

  const updateOneUser = useServerFn(serverFn__updateOneUser);

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationFn: updateOneUser,

    onSuccess: (data) => {
      // Invalidate users list
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.list.__(),
      });

      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.one.withUserId(data.id),
      });
    },
  });
}

export {
  //
  useCreateNewUser,
  useReadAllUsers,
  useUpdateOneUser,
  useReadOneUserWithUserId,
};
