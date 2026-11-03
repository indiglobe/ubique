import { serverFn__createProfessionalQualification } from "@/integrations/tanstack/server-function/db-query/professional-qualification.sfn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ONROLE_USER_ROLE, OFFROLE_USER_ROLE } from "@repo/utils/db-enums";

const USER_ROLE = [...ONROLE_USER_ROLE, ...OFFROLE_USER_ROLE];

export const professionalQualificationQueryKeys = {
  __: () => ["super-admin", "professional-qualification"] as const,
};

function useCreateProfessionalQualification() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)/dashboard/",
  });
  const queryClient = useQueryClient();

  const createProfessionalQualification = useServerFn(
    serverFn__createProfessionalQualification,
  );

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationFn: createProfessionalQualification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: professionalQualificationQueryKeys.__(),
      });
    },
  });
}

export { useCreateProfessionalQualification };
