import {
  serverFn__createEmployeeAddress,
  serverFn__readOneEmployeeAddress,
  serverFn__updateEmployeeAddress,
} from "@/integrations/tanstack/server-function/db-query/employee-address.sfn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import type { read__OneEmployeeAddressSchema } from "@repo/data/validators/employee-address";
import type z from "zod";
import type { USER_ROLE } from "@repo/utils/const/roles";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TOneEmployeeAddressSchema = z.infer<typeof read__OneEmployeeAddressSchema>;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"] as const;

function useAllowedRolesUserCookie() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return { userDetailsFromCookie };
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export const employeeAddressQueryKeys = {
  all: () => ["super-admin", "employee-address"],

  list: {
    all: () => [...employeeAddressQueryKeys.all(), "list"],

    readOne: {
      all: () => [...employeeAddressQueryKeys.list.all(), "read-one"],

      withIdentifier: (identifier: TOneEmployeeAddressSchema["identifier"]) => [
        ...employeeAddressQueryKeys.list.readOne.all(),
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

function useCreateEmployeeAddress() {
  useAllowedRolesUserCookie();

  const queryClient = useQueryClient();

  const createEmployeeAddress = useServerFn(serverFn__createEmployeeAddress);

  return useMutation({
    mutationFn: createEmployeeAddress,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: employeeAddressQueryKeys.all(),
      });
    },
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useReadOneEmployeeAddress(
  identifier: TOneEmployeeAddressSchema["identifier"],
) {
  useAllowedRolesUserCookie();

  const readOneEmployeeAddress = useServerFn(serverFn__readOneEmployeeAddress);

  return useQuery({
    queryKey: employeeAddressQueryKeys.list.readOne.withIdentifier(identifier),

    queryFn: () =>
      readOneEmployeeAddress({
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

function useUpdateEmployeeAddress() {
  useAllowedRolesUserCookie();

  const queryClient = useQueryClient();

  const updateEmployeeAddress = useServerFn(serverFn__updateEmployeeAddress);

  return useMutation({
    mutationFn: updateEmployeeAddress,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: employeeAddressQueryKeys.all(),
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
  useCreateEmployeeAddress,
  useReadOneEmployeeAddress,
  useUpdateEmployeeAddress,
};
