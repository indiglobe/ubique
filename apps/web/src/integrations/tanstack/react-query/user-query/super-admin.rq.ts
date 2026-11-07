import {
  serverFn__createUser,
  serverFn__readAllUsers,
  serverFn__updateOneUser,
  serverFn__readOneUser,
  serverFn__readUserCountByRole,
} from "@/integrations/tanstack/server-function/db-query/users.sfn";
import { skipToken, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { EMPLOYEE_ROLE, PARTNER_ROLE } from "@repo/utils/db-enums";
import type {
  read__OneUserSchema,
  read__AllUsersSchema,
  read__UserCountByRoleSchema,
} from "@repo/data/validators/users";
import type z from "zod";

type TOneUserSchema = z.infer<typeof read__OneUserSchema>;

type TAllUsersSchema = z.infer<typeof read__AllUsersSchema>;

type TUserCountByRoleSchema = z.infer<typeof read__UserCountByRoleSchema>;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const USER_ROLE = [...EMPLOYEE_ROLE, ...PARTNER_ROLE];

// Roles the users list shows when no identifier is passed (same as the old hook)
const DEFAULT_ROLES_TO_FETCH: (typeof USER_ROLE)[number][] = [
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
  __: () => ["super-admin", "user"] as const,

  list: {
    __: () => [...usersQueryKeys.__(), "list"] as const,

    readOne: {
      __: () => [...usersQueryKeys.list.__(), "read-one"] as const,

      withIdentifier: (identifier?: TOneUserSchema["identifier"]) =>
        [
          ...usersQueryKeys.list.readOne.__(),
          "identifier",
          identifier ?? {},
        ] as const,
    },

    readAll: {
      __: () => [...usersQueryKeys.list.__(), "read-all"] as const,

      withIdentifier: (
        identifier?: NonNullable<TAllUsersSchema>["identifier"],
      ) =>
        [
          ...usersQueryKeys.list.readAll.__(),
          "identifier",
          identifier ?? {},
        ] as const,
    },
  },

  countByRole: {
    __: () => [...usersQueryKeys.__(), "count-by-role"] as const,

    withRoles: (
      role?: NonNullable<TUserCountByRoleSchema["identifier"]>["role"],
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

    onSuccess: async () => {
      await Promise.all([
        // New user(s) can appear in any list variant
        queryClient.invalidateQueries({
          queryKey: usersQueryKeys.list.readAll.__(),
        }),

        // Count for the new user's role went up
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

function useReadAllUsers(
  identifier: NonNullable<TAllUsersSchema>["identifier"] = {
    role: DEFAULT_ROLES_TO_FETCH,
  },
) {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const readAllUsers = useServerFn(serverFn__readAllUsers);

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useQuery({
    queryKey: usersQueryKeys.list.readAll.withIdentifier(identifier),

    queryFn: () =>
      readAllUsers({
        data: {
          identifier,
        },
      }),
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useReadOneUser(identifier: TOneUserSchema["identifier"] | undefined) {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const readOneUser = useServerFn(serverFn__readOneUser);

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useQuery({
    queryKey: usersQueryKeys.list.readOne.withIdentifier(identifier),

    // Won't run until an identifier exists (e.g. route param not ready yet)
    queryFn: identifier
      ? () =>
          readOneUser({
            data: {
              identifier,
            },
          })
      : skipToken,
  });
}

/** Kept so existing imports keep working — same as useReadOneUser({ id }). */
function useReadOneUserWithUserId(userId: string | undefined) {
  return useReadOneUser(userId ? { id: userId } : undefined);
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useReadUserCountByRole(
  role?: NonNullable<TUserCountByRoleSchema["identifier"]>["role"],
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
        data: role ? { identifier: { role } } : {},
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

    onSuccess: async (_updatedUser, variables) => {
      const roleChanged = variables.data.dataToUpdate.role !== undefined;

      await Promise.all([
        // Lists show this user (and their name as "manager" on reportees)
        queryClient.invalidateQueries({
          queryKey: usersQueryKeys.list.readAll.__(),
        }),

        // Whole read-one subtree, not just { id }: the user may be cached
        // under { email } / { employeeCode } too, employeeCode can change,
        // and reportees' read-one results embed this user as `manager`
        queryClient.invalidateQueries({
          queryKey: usersQueryKeys.list.readOne.__(),
        }),

        // Counts only move when the role changes
        roleChanged
          ? queryClient.invalidateQueries({
              queryKey: usersQueryKeys.countByRole.__(),
            })
          : Promise.resolve(),
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
  //
  useCreateNewUser,
  useReadAllUsers,
  useReadOneUser,
  useReadOneUserWithUserId,
  useReadUserCountByRole,
  useUpdateOneUser,
};