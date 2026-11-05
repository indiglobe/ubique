import { serverFn__createEducationalQualification } from "@/integrations/tanstack/server-function/db-query/educational-qualification.sfn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { EMPLOYEE_ROLE, PARTNER_ROLE } from "@repo/utils/db-enums";

const USER_ROLE = [...EMPLOYEE_ROLE, ...PARTNER_ROLE];

export const educationalQualificationQueryKeys = {
  __: () => ["admin", "educational-qualification"] as const,
};

function useCreateEducationalQualification() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)/dashboard/",
  });
  const queryClient = useQueryClient();

  const createEducationalQualification = useServerFn(
    serverFn__createEducationalQualification,
  );

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationFn: createEducationalQualification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: educationalQualificationQueryKeys.__(),
      });
    },
  });
}


export{
  useCreateEducationalQualification
}