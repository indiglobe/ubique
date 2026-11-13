import {
  serverFn__createEmployeeProfile,
  serverFn__readOneEmployeeProfile,
  serverFn__updateOneEmployeeProfile,
} from "@/integrations/tanstack/server-function/db-query/employee-profile.sfn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { EMPLOYEE_ROLE, PARTNER_ROLE } from "@repo/utils/db-enums";
import type { read__OneEmployeeProfileSchema } from "@repo/data/validators/employee-profile";
import type z from "zod";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TOneEmployeeProfileSchema = z.infer<typeof read__OneEmployeeProfileSchema>;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const USER_ROLE = [...EMPLOYEE_ROLE, ...PARTNER_ROLE];

const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export const employeeProfileQueryKeys = {
  all: () => ["super-admin", "employee-profile"],

  list: {
    all: () => [...employeeProfileQueryKeys.all(), "list"],

    readOne: {
      all: () => [...employeeProfileQueryKeys.list.all(), "read-one"],

      withIdentifier: (identifier: TOneEmployeeProfileSchema["identifier"]) => [
        ...employeeProfileQueryKeys.list.readOne.all(),
        "identifier",
        identifier,
      ],
    },
  },
} as const;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useCreateEmployeeProfile() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const queryClient = useQueryClient();

  const createEmployeeProfile = useServerFn(serverFn__createEmployeeProfile);

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationFn: createEmployeeProfile,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: employeeProfileQueryKeys.all(),
      });
    },
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useReadOneEmployeeProfile(
  identifier: TOneEmployeeProfileSchema["identifier"],
) {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const readOneEmployeeProfile = useServerFn(serverFn__readOneEmployeeProfile);

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useQuery({
    queryKey: employeeProfileQueryKeys.list.readOne.withIdentifier(identifier),

    queryFn: () =>
      readOneEmployeeProfile({
        data: {
          identifier,
        },
      }),

    enabled:
      "id" in identifier ? !!identifier.id : !!identifier.associatedUserId,
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useUpdateEmployeeProfile() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const queryClient = useQueryClient();

  const updateEmployeeProfile = useServerFn(serverFn__updateOneEmployeeProfile);

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationFn: updateEmployeeProfile,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: employeeProfileQueryKeys.all(),
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
  useCreateEmployeeProfile,
  useReadOneEmployeeProfile,
  useUpdateEmployeeProfile,
};
