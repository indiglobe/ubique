import { serverFn__readAllState } from "@/integrations/tanstack/server-function/db-query/state.sfn";
import { useQuery } from "@tanstack/react-query";
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

export const stateQueryKeys = {
  all: () => ["super-admin", "state"],

  list: {
    all: () => [...stateQueryKeys.all(), "list"],

    readAll: () => [...stateQueryKeys.list.all(), "read-all"],
  },
};

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useReadAllState() {
  useAllowedRolesUserCookie();

  const readAllState = useServerFn(serverFn__readAllState);

  return useQuery({
    queryKey: stateQueryKeys.list.readAll(),

    queryFn: () => readAllState(),
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export { useReadAllState };
