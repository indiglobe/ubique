import { serverFn__readAllDistrict } from "@/integrations/tanstack/server-function/db-query/district.sfn";
import { useQuery } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { EMPLOYEE_ROLE, PARTNER_ROLE } from "@repo/utils/db-enums";
import type { read__AllDistrictSchema } from "@repo/data/validators/district";
import type z from "zod";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TReadAllDistrictSchema = z.infer<typeof read__AllDistrictSchema>;
type TReadAllDistrictSchemaIdentifier =
  NonNullable<TReadAllDistrictSchema>["identifier"];

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

export const districtQueryKeys = {
  all: () => ["super-admin", "district"],

  list: {
    all: () => [...districtQueryKeys.all(), "list"],

    readAll: {
      all: () => [...districtQueryKeys.list.all(), "read-all"],

      withIdentifier: (identifier?: TReadAllDistrictSchemaIdentifier) => [
        ...districtQueryKeys.list.readAll.all(),
        "identifier",
        identifier,
      ],
    },
  },
};

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useReadAllDistrict(identifier?: TReadAllDistrictSchemaIdentifier) {
  useAllowedRolesUserCookie();

  const readAllDistrict = useServerFn(serverFn__readAllDistrict);

  return useQuery({
    queryKey: districtQueryKeys.list.readAll.withIdentifier(identifier),

    queryFn: () =>
      readAllDistrict({
        data: identifier ? { identifier } : {},
      }),
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export { useReadAllDistrict };
