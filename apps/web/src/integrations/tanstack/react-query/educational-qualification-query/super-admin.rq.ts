import {
  serverFn__createEducationalQualification,
  serverFn__deleteEducationalQualification,
  serverFn__readAllEducationalQualification,
  serverFn__readOneEducationalQualification,
  serverFn__updateEducationalQualification,
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

const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"] as const;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export const educationalQualificationQueryKeys = {
  all: () => ["super-admin", "educational-qualification"],

  list: {
    all: () => [...educationalQualificationQueryKeys.all(), "list"],

    readOne: {
      all: () => [...educationalQualificationQueryKeys.list.all(), "read-one"],

      withIdentifier: (
        identifier: TOneEducationalQualificationSchema["identifier"],
      ) => [
        ...educationalQualificationQueryKeys.list.readOne.all(),
        "identifier",
        identifier,
      ],
    },

    readAll: {
      all: () => [...educationalQualificationQueryKeys.list.all(), "read-all"],

      withIdentifier: (
        identifier?: NonNullable<TAllEducationalQualificationSchema>["identifier"],
      ) => [
        ...educationalQualificationQueryKeys.list.readAll.all(),
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

function useCreateEducationalQualification() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const queryClient = useQueryClient();

  const createEducationalQualification = useServerFn(
    serverFn__createEducationalQualification,
  );

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationFn: createEducationalQualification,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: educationalQualificationQueryKeys.all(),
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
function useUpdateEducationalQualification() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)",
  });

  const queryClient = useQueryClient();

  const updateEducationalQualification = useServerFn(
    serverFn__updateEducationalQualification,
  );

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationFn: updateEducationalQualification,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: educationalQualificationQueryKeys.all(),
      });
    },
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

  if (!ALLOWED_ROLES.includes(userDetailsFromCookie.role)) {
    throw redirect({ to: "/" });
  }

  return useMutation({
    mutationFn: deleteEducationalQualification,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: educationalQualificationQueryKeys.all(),
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
  useUpdateEducationalQualification,
  useDeleteEducationalQualification,
};
