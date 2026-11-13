import { serverFn__createExperience } from "@/integrations/tanstack/server-function/db-query/experience.sfn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { EMPLOYEE_ROLE, PARTNER_ROLE } from "@repo/utils/db-enums";

const USER_ROLE = [...EMPLOYEE_ROLE, ...PARTNER_ROLE];

export const experienceQueryKeys = {
  __: () => ["admin", "experience"] as const,
};

function useCreateExperience() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)/dashboard/",
  });
  const queryClient = useQueryClient();

  const createExperience = useServerFn(serverFn__createExperience);

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: experienceQueryKeys.__(),
      });
    },
  });
}

export{
  useCreateExperience
}