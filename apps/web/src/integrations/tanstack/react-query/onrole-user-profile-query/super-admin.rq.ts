import {
  serverFn__createOnroleUserProfile,
  serverFn__readOneOnroleUserProfile,
} from "@/integrations/tanstack/server-function/db-query/onrole-user-profile.sfn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ONROLE_USER_ROLE, OFFROLE_USER_ROLE } from "@repo/utils/db-enums";

const USER_ROLE = [...ONROLE_USER_ROLE, ...OFFROLE_USER_ROLE];

export const onroleUserProfileQueryKeys = {
  __: () => ["super-admin", "onrole-user-profile"],

  one: (userId: string) => [...onroleUserProfileQueryKeys.__(), "one", userId],
} as const;

function useCreateOnroleUserProfile() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });
  const queryClient = useQueryClient();

  const createOnroleUserProfile = useServerFn(
    serverFn__createOnroleUserProfile,
  );

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

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

function useReadOneOnroleUserProfileOfUserId(userId: string) {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const readOneOnroleUserProfile = useServerFn(
    serverFn__readOneOnroleUserProfile,
  );

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useQuery({
    queryKey: onroleUserProfileQueryKeys.one(userId),
    queryFn: () =>
      readOneOnroleUserProfile({
        data: {
          identifier: {
            associatedUserId: userId,
          },
        },
      }),
    enabled: !!userId,
  });
}

export { useCreateOnroleUserProfile, useReadOneOnroleUserProfileOfUserId };
