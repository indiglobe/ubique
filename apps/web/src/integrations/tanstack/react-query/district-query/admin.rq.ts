import {
  serverFn__readAllDistrict,
  serverFn__readOneDistrict,
} from "@/integrations/tanstack/server-function/db-query/district.sfn";
import { useQuery } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import type {
  read__AllDistrictSchema,
  read__OneDistrictSchema,
} from "@repo/data/validators/district";
import type z from "zod";
import type { USER_ROLE } from "@repo/utils/const/roles";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TReadAllDistrictSchema = z.infer<typeof read__AllDistrictSchema>;
type TReadAllDistrictSchemaIdentifier =
  NonNullable<TReadAllDistrictSchema>["identifier"];

type TReadOneDistrictSchema = z.infer<typeof read__OneDistrictSchema>;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["ADMIN"] as const;

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
  all: () => ["admin", "district"],

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

    readOne: {
      all: () => [...districtQueryKeys.list.all(), "read-one"],

      withIdentifier: (identifier: TReadOneDistrictSchema["identifier"]) => [
        ...districtQueryKeys.list.readOne.all(),
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

function useReadOneDistrict(identifier: TReadOneDistrictSchema["identifier"]) {
  useAllowedRolesUserCookie();

  const readOneDistrict = useServerFn(serverFn__readOneDistrict);

  return useQuery({
    queryKey: districtQueryKeys.list.readOne.withIdentifier(identifier),

    queryFn: () =>
      readOneDistrict({
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

  useReadAllDistrict,
  useReadOneDistrict,
};
