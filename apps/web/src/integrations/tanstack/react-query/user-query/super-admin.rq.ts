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

function useAllowedRolesUserCookie() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return { userDetailsFromCookie };
}

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
  all: () => ["super-admin", "users"],

  list: {
    all: () => [...usersQueryKeys.all(), "list"],

    readAll: {
      all: () => [...usersQueryKeys.list.all(), "read-all"],

      withIdentifier: (identifier?: TAllUsersIdentifier) => [
        ...usersQueryKeys.list.readAll.all(),
        "identifier",
        identifier ?? "all",
      ],
    },
  },

  one: {
    all: () => [...usersQueryKeys.all(), "one"],

    readOne: {
      all: () => [...usersQueryKeys.one.all(), "read-one"],

      withIdentifier: (identifier: TOneUserIdentifier) => [
        ...usersQueryKeys.one.readOne.all(),
        "identifier",
        identifier,
      ],
    },
  },

  countByRole: {
    all: () => [...usersQueryKeys.all(), "count-by-role"],

    withRoles: (role?: TUserCountRole) => [
      ...usersQueryKeys.countByRole.all(),
      "roles",
      role ?? "all",
    ],
  },
} as const;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useCreateUser() {
  useAllowedRolesUserCookie();

  const queryClient = useQueryClient();
  const createUser = useServerFn(serverFn__createUser);

  return useMutation({
    mutationKey: [...usersQueryKeys.all(), "create"],

    mutationFn: createUser,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: usersQueryKeys.list.all(),
        }),

        queryClient.invalidateQueries({
          queryKey: usersQueryKeys.countByRole.all(),
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
  useAllowedRolesUserCookie();

  const readAllUsers = useServerFn(serverFn__readAllUsers);

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
  useAllowedRolesUserCookie();

  const readOneUser = useServerFn(serverFn__readOneUser);

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
  useAllowedRolesUserCookie();

  const readUserCountByRole = useServerFn(serverFn__readUserCountByRole);

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
  useAllowedRolesUserCookie();

  const queryClient = useQueryClient();

  const updateUser = useServerFn(serverFn__updateOneUser);

  return useMutation({
    mutationKey: [...usersQueryKeys.all(), "update"],

    mutationFn: updateUser,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: usersQueryKeys.list.all(),
        }),

        queryClient.invalidateQueries({
          queryKey: usersQueryKeys.one.all(),
        }),

        queryClient.invalidateQueries({
          queryKey: usersQueryKeys.countByRole.all(),
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

export {
  useCreateUser,
  useReadAllUsers,
  useReadOneUser,
  useReadUserCountByRole,
  useUpdateUser,
};
