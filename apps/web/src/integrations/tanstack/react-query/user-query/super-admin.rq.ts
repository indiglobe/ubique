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
import type {
  read__AllUsersSchema,
  read__OneUserSchema,
  read__UserCountByRoleSchema,
} from "@repo/data/validators/users";
import type z from "zod";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TAllUsersSchema = z.infer<typeof read__AllUsersSchema>;
type TOneUserSchema = z.infer<typeof read__OneUserSchema>;
type TUserCountByRoleSchema = z.infer<typeof read__UserCountByRoleSchema>;

type TAllUsersIdentifier = NonNullable<TAllUsersSchema>["identifier"];
type TOneUserIdentifier = TOneUserSchema["identifier"];
type TUserCountRole = NonNullable<TUserCountByRoleSchema["identifier"]>["role"];

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const USER_ROLE = [...EMPLOYEE_ROLE, ...PARTNER_ROLE];

const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

const USERS_WITH_ROLES_TO_FETCH: (typeof USER_ROLE)[number][] = [
  "ADMIN",
  "ZSM",
  "RSM",
  "MANAGER",
  "ASM",
  "MR",
];

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export const usersQueryKeys = {
  __: () => ["super-admin", "users"] as const,

  list: {
    __: () => [...usersQueryKeys.__(), "list"] as const,

    readAll: {
      __: () => [...usersQueryKeys.list.__(), "read-all"] as const,

      withIdentifier: (identifier?: TAllUsersIdentifier) =>
        [
          ...usersQueryKeys.list.readAll.__(),
          "identifier",
          identifier ?? "all",
        ] as const,
    },
  },

  one: {
    __: () => [...usersQueryKeys.__(), "one"] as const,

    readOne: {
      __: () => [...usersQueryKeys.one.__(), "read-one"] as const,

      withIdentifier: (identifier: TOneUserIdentifier) =>
        [...usersQueryKeys.one.readOne.__(), "identifier", identifier] as const,
    },
  },

  countByRole: {
    __: () => [...usersQueryKeys.__(), "count-by-role"] as const,

    withRoles: (role?: TUserCountRole) =>
      [...usersQueryKeys.countByRole.__(), "roles", role ?? "all"] as const,
  },
};

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const invalidateUsersQueries = async (
  queryClient: ReturnType<typeof useQueryClient>,
) => {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: usersQueryKeys.list.__(),
    }),

    queryClient.invalidateQueries({
      queryKey: usersQueryKeys.one.__(),
    }),

    queryClient.invalidateQueries({
      queryKey: usersQueryKeys.countByRole.__(),
    }),
  ]);
};

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useCreateUser() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const queryClient = useQueryClient();
  const createUser = useServerFn(serverFn__createUser);

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationKey: [...usersQueryKeys.__(), "create"],

    mutationFn: createUser,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: usersQueryKeys.list.__(),
        }),

        queryClient.invalidateQueries({
          queryKey: usersQueryKeys.countByRole.__(),
        }),
      ]);
    },
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useReadAllUsers(identifier?: TAllUsersIdentifier) {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const readAllUsers = useServerFn(serverFn__readAllUsers);

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  const resolvedIdentifier = identifier ?? {
    role: USERS_WITH_ROLES_TO_FETCH,
  };

  return useQuery({
    queryKey: usersQueryKeys.list.readAll.withIdentifier(resolvedIdentifier),

    queryFn: () =>
      readAllUsers({
        data: {
          identifier: resolvedIdentifier,
        },
      }),
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useReadOneUser(identifier: TOneUserIdentifier) {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const readOneUser = useServerFn(serverFn__readOneUser);

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useQuery({
    queryKey: usersQueryKeys.one.readOne.withIdentifier(identifier),

    queryFn: () =>
      readOneUser({
        data: {
          identifier,
        },
      }),

    enabled:
      "id" in identifier
        ? !!identifier.id
        : "email" in identifier
          ? !!identifier.email
          : !!identifier.employeeCode,
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useReadUserCountByRole(role?: TUserCountRole) {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const readUserCountByRole = useServerFn(serverFn__readUserCountByRole);

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useQuery({
    queryKey: usersQueryKeys.countByRole.withRoles(role),

    queryFn: () =>
      readUserCountByRole({
        data: role
          ? {
              identifier: {
                role,
              },
            }
          : {},
      }),
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useUpdateUser() {
  const queryClient = useQueryClient();
  const updateUser = useServerFn(serverFn__updateOneUser);

  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationKey: [...usersQueryKeys.__(), "update"],

    mutationFn: updateUser,

    onSuccess: async () => {
      await invalidateUsersQueries(queryClient);
    },
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export {
  useCreateUser,
  useReadAllUsers,
  useReadOneUser,
  useReadUserCountByRole,
  useUpdateUser,
};
