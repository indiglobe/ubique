import {
  serverFn__createEmployeeProfile,
  serverFn__readOneEmployeeProfile,
} from "@/integrations/tanstack/server-function/db-query/employee-profile.sfn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { EMPLOYEE_ROLE, PARTNER_ROLE } from "@repo/utils/db-enums";

const USER_ROLE = [...EMPLOYEE_ROLE, ...PARTNER_ROLE];

export const onroleUserProfileQueryKeys = {
  __: () => ["super-admin", "onrole-user-profile"],

  one: (userId: string) => [...onroleUserProfileQueryKeys.__(), "one", userId],
} as const;

function useCreateEmployeeProfile() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });
  const queryClient = useQueryClient();

  const createEmployeeProfile = useServerFn(
    serverFn__createEmployeeProfile,
  );

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationFn: createEmployeeProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: onroleUserProfileQueryKeys.__(),
      });
    },
  });
}

function useReadOneEmployeeProfileOfUserId(userId: string) {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const readOneEmployeeProfile = useServerFn(
    serverFn__readOneEmployeeProfile,
  );

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useQuery({
    queryKey: onroleUserProfileQueryKeys.one(userId),
    queryFn: () =>
      readOneEmployeeProfile({
        data: {
          identifier: {
            associatedUserId: userId,
          },
        },
      }),
    enabled: !!userId,
  });
}

export { useCreateEmployeeProfile, useReadOneEmployeeProfileOfUserId };
