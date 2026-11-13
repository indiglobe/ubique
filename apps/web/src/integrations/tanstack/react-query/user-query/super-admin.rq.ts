import {
  serverFn__createUser,
  serverFn__readAllUsers,
  serverFn__updateOneUser,
  serverFn__readOneUser,
  serverFn__readUserCount,
} from "@/integrations/tanstack/server-function/db-query/users.sfn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { EMPLOYEE_ROLE, PARTNER_ROLE } from "@repo/utils/db-enums";
import type {
  read__AllUsersSchema,
  read__OneUserSchema,
  read__UserCountSchema,
} from "@repo/data/validators/users";
import type z from "zod";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TAllUsersSchema = z.infer<typeof read__AllUsersSchema>;
type TOneUserSchema = z.infer<typeof read__OneUserSchema>;
type TUserCountSchema = z.infer<typeof read__UserCountSchema>;

type TAllUsersIdentifier = NonNullable<TAllUsersSchema>["identifier"];
type TOneUserIdentifier = TOneUserSchema["identifier"];
type TUserCountIdentifier = NonNullable<TUserCountSchema["identifier"]>;

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
        identifier,
      ],
    },
  },

  count: {
    all: () => [...usersQueryKeys.all(), "count"],

    withIdentifier: (identifier?: TUserCountIdentifier) => [
      ...usersQueryKeys.count.all(),
      identifier ?? "all",
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
          queryKey: usersQueryKeys.count.all(),
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

function useReadUserCount(identifier?: TUserCountIdentifier) {
  useAllowedRolesUserCookie();

  const readUserCount = useServerFn(serverFn__readUserCount);

  return useQuery({
    queryKey: usersQueryKeys.count.withIdentifier(identifier),

    queryFn: () =>
      readUserCount({
        data: identifier ? { identifier } : {},
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
          queryKey: usersQueryKeys.count.all(),
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
  useReadUserCount,
  useUpdateUser,
};
