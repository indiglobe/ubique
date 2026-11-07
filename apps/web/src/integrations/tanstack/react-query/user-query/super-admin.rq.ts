import {
  serverFn__createUser,
  serverFn__readAllUsers,
  serverFn__updateOneUser,
  serverFn__readOneUser,
  serverFn__readUserCountByRole,
} from "@/integrations/tanstack/server-function/db-query/users.sfn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { EMPLOYEE_ROLE, PARTNER_ROLE } from "@repo/utils/db-enums";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const USER_ROLE = [...EMPLOYEE_ROLE, ...PARTNER_ROLE];

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export const usersQueryKeys = {
  __: () => ["super-admin", "user"] as const,

  list: {
    __: () => [...usersQueryKeys.__(), "list"] as const,
  },

  one: {
    __: () => [...usersQueryKeys.__(), "one"] as const,

    withUserId: (userId: string) =>
      [...usersQueryKeys.one.__(), userId] as const,
  },

  countByRole: {
    __: () => [...usersQueryKeys.__(), "count-by-role"] as const,

    withRoles: (
      role?: (typeof USER_ROLE)[number] | (typeof USER_ROLE)[number][],
    ) => [...usersQueryKeys.countByRole.__(), role ?? "all"] as const,
  },
} as const;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

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

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

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

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

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

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useReadUserCountByRole(
  role?: (typeof USER_ROLE)[number] | (typeof USER_ROLE)[number][],
) {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const readUserCountByRole = useServerFn(serverFn__readUserCountByRole);

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useQuery({
    queryKey: usersQueryKeys.countByRole.withRoles(role),

    queryFn: () =>
      readUserCountByRole({
        data: {
          identifier: {
            role,
          },
        },
      }),
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

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

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export {
  //
  useCreateNewUser,
  useReadAllUsers,
  useUpdateOneUser,
  useReadOneUserWithUserId,
  useReadUserCountByRole,
};
