import {
  serverFn__createEducationalQualification,
  serverFn__deleteEducationalQualification,
  serverFn__readAllEducationalQualification,
  serverFn__readOneEducationalQualification,
} from "@/integrations/tanstack/server-function/db-query/educational-qualification.sfn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { EMPLOYEE_ROLE, PARTNER_ROLE } from "@repo/utils/db-enums";
import type {
  read__OneEducationalQualificationSchema,
  read__AllEducationalQualificationSchema,
} from "@repo/data/validators/educational-qualification";
import type z from "zod";

type TOneEducationalQualificationSchema = z.infer<
  typeof read__OneEducationalQualificationSchema
>;

type TAllEducationalQualificationSchema = z.infer<
  typeof read__AllEducationalQualificationSchema
>;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const USER_ROLE = [...EMPLOYEE_ROLE, ...PARTNER_ROLE];

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export const educationalQualificationQueryKeys = {
  __: () => ["super-admin", "educational-qualification"] as const,

  list: {
    __: () => [...educationalQualificationQueryKeys.__(), "list"] as const,

    readOne: {
      __: () =>
        [...educationalQualificationQueryKeys.list.__(), "read-one"] as const,

      withIdentifier: (
        identifier: TOneEducationalQualificationSchema["identifier"],
      ) =>
        [
          ...educationalQualificationQueryKeys.list.readOne.__(),
          "identifier",
          identifier,
        ] as const,
    },

    readAll: {
      __: () =>
        [...educationalQualificationQueryKeys.list.__(), "read-all"] as const,

      withIdentifier: (
        identifier?: NonNullable<TAllEducationalQualificationSchema>["identifier"],
      ) =>
        [
          ...educationalQualificationQueryKeys.list.readAll.__(),
          "identifier",
          identifier,
        ] as const,
    },
  },
} as const;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useCreateEducationalQualification() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const queryClient = useQueryClient();

  const createEducationalQualification = useServerFn(
    serverFn__createEducationalQualification,
  );

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationFn: createEducationalQualification,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: educationalQualificationQueryKeys.__(),
      });
    },
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useReadOneEducationalQualification(
  identifier: TOneEducationalQualificationSchema["identifier"],
) {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const readOneEducationalQualification = useServerFn(
    serverFn__readOneEducationalQualification,
  );

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useQuery({
    queryKey:
      educationalQualificationQueryKeys.list.readOne.withIdentifier(identifier),

    queryFn: () =>
      readOneEducationalQualification({
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

function useReadAllEducationalQualification(
  identifier?: NonNullable<TAllEducationalQualificationSchema>["identifier"],
) {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const readAllEducationalQualification = useServerFn(
    serverFn__readAllEducationalQualification,
  );

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useQuery({
    queryKey:
      educationalQualificationQueryKeys.list.readAll.withIdentifier(identifier),

    queryFn: () =>
      readAllEducationalQualification({
        data: identifier ? { identifier } : {},
      }),
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useDeleteEducationalQualification() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const queryClient = useQueryClient();

  const deleteEducationalQualification = useServerFn(
    serverFn__deleteEducationalQualification,
  );

  const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationFn: deleteEducationalQualification,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: educationalQualificationQueryKeys.__(),
      });
    },
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export {
  useCreateEducationalQualification,
  useReadOneEducationalQualification,
  useReadAllEducationalQualification,
  useDeleteEducationalQualification,
};
