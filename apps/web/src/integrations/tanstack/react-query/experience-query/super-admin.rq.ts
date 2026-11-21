import { serverFn__createExperience } from "@/integrations/tanstack/server-function/db-query/experience.sfn";
import type { USER_ROLE } from "@repo/utils/const/roles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

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

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export const experienceQueryKeys = {
  all: () => ["super-admin", "experience"],

  list: {
    all: () => [...experienceQueryKeys.all(), "list"],
  },
} as const;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useCreateExperience() {
  useAllowedRolesUserCookie();

  const queryClient = useQueryClient();

  const createExperience = useServerFn(serverFn__createExperience);

  return useMutation({
    mutationFn: createExperience,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: experienceQueryKeys.all(),
      });
    },
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export { useCreateExperience };
