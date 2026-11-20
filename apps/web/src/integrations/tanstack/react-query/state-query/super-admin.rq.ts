import {
  serverFn__readAllState,
  serverFn__readOneState,
} from "@/integrations/tanstack/server-function/db-query/state.sfn";
import { useQuery } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import type { read__OneStateSchema } from "@repo/data/validators/state";
import type z from "zod";
import type { USER_ROLE } from "@repo/utils/const/roles";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TOneStateSchema = z.infer<typeof read__OneStateSchema>;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

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

    readOne: {
      all: () => [...stateQueryKeys.list.all(), "read-one"],

      withIdentifier: (identifier: TOneStateSchema["identifier"]) => [
        ...stateQueryKeys.list.readOne.all(),
        "identifier",
        identifier,
      ],
    },
  },
} as const;

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

function useReadOneState(identifier: TOneStateSchema["identifier"]) {
  useAllowedRolesUserCookie();

  const readOneState = useServerFn(serverFn__readOneState);

  return useQuery({
    queryKey: stateQueryKeys.list.readOne.withIdentifier(identifier),

    queryFn: () =>
      readOneState({
        data: {
          identifier,
        },
      }),
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export {
  //

  useReadAllState,
  useReadOneState,
};
