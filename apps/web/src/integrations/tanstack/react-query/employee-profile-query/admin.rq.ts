import { serverFn__createOnroleUserProfile } from "@/integrations/tanstack/server-function/db-query/employee-profile.sfn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { EMPLOYEE_ROLE, PARTNER_ROLE } from "@repo/utils/db-enums";

const USER_ROLE = [...EMPLOYEE_ROLE, ...PARTNER_ROLE];

export const onroleUserProfileQueryKeys = {
  __: () => ["admin", "onrole-user-profile"] as const,
};

function useCreateOnroleUserProfile() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)/dashboard/",
  });
  const queryClient = useQueryClient();

  const createOnroleUserProfile = useServerFn(
    serverFn__createOnroleUserProfile,
  );

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationFn: createOnroleUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: onroleUserProfileQueryKeys.__(),
      });
    },
  });
}

export { useCreateOnroleUserProfile };
