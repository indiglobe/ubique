import { serverFn__createEmployeeProfile } from "@/integrations/tanstack/server-function/db-query/employee-profile.sfn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { EMPLOYEE_ROLE, PARTNER_ROLE } from "@repo/utils/db-enums";

const USER_ROLE = [...EMPLOYEE_ROLE, ...PARTNER_ROLE];

export const employeeProfileQueryKeys = {
  __: () => ["admin", "onrole-user-profile"] as const,
};

function useCreateEmployeeProfile() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)/dashboard/",
  });
  const queryClient = useQueryClient();

  const createEmployeeProfile = useServerFn(
    serverFn__createEmployeeProfile,
  );

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationFn: createEmployeeProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: employeeProfileQueryKeys.__(),
      });
    },
  });
}

export { useCreateEmployeeProfile };
