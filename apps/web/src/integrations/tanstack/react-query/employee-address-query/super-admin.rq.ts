import { serverFn__createEmployeeAddress } from "@/integrations/tanstack/server-function/db-query/employee-address.sfn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { EMPLOYEE_ROLE, PARTNER_ROLE } from "@repo/utils/db-enums";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const USER_ROLE = [...EMPLOYEE_ROLE, ...PARTNER_ROLE];

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
};

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

export { useCreateEmployeeAddress };
