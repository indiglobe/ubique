import {
  serverFn__readAllAttendence,
  serverFn__readOneAttendence,
} from "@/integrations/tanstack/server-function/db-query/attendance.sfn";

import { useQuery } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

import { EMPLOYEE_ROLE, PARTNER_ROLE } from "@repo/utils/db-enums";

import type {
  read__AllAttendenceSchema,
  read__OneAttendenceSchema,
} from "@repo/data/validators/attendance";

import type z from "zod";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TReadAllAttendenceSchema = z.infer<typeof read__AllAttendenceSchema>;

type TReadAllAttendenceSchemaIdentifier =
  NonNullable<TReadAllAttendenceSchema>["identifier"];

type TReadOneAttendenceSchema = z.infer<typeof read__OneAttendenceSchema>;

type TReadOneAttendenceSchemaIdentifier =
  TReadOneAttendenceSchema["identifier"];

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

export const attendenceQueryKeys = {
  all: () => ["super-admin", "attendence"],

  list: {
    all: () => [...attendenceQueryKeys.all(), "list"],

    readAll: {
      all: () => [...attendenceQueryKeys.list.all(), "read-all"],

      withIdentifier: (identifier?: TReadAllAttendenceSchemaIdentifier) => [
        ...attendenceQueryKeys.list.readAll.all(),
        "identifier",
        identifier,
      ],
    },
  },

  detail: {
    all: () => [...attendenceQueryKeys.all(), "detail"],

    readOne: {
      all: () => [...attendenceQueryKeys.detail.all(), "read-one"],

      withIdentifier: (identifier: TReadOneAttendenceSchemaIdentifier) => [
        ...attendenceQueryKeys.detail.readOne.all(),
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

function useReadAllAttendence(identifier?: TReadAllAttendenceSchemaIdentifier) {
  useAllowedRolesUserCookie();

  const readAllAttendence = useServerFn(serverFn__readAllAttendence);

  return useQuery({
    queryKey: attendenceQueryKeys.list.readAll.withIdentifier(identifier),

    queryFn: () =>
      readAllAttendence({
        data: identifier ? { identifier } : {},
      }),
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useReadOneAttendence(identifier: TReadOneAttendenceSchemaIdentifier) {
  useAllowedRolesUserCookie();

  const readOneAttendence = useServerFn(serverFn__readOneAttendence);

  return useQuery({
    queryKey: attendenceQueryKeys.detail.readOne.withIdentifier(identifier),

    queryFn: () =>
      readOneAttendence({
        data: { identifier },
      }),
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export { useReadAllAttendence, useReadOneAttendence };
