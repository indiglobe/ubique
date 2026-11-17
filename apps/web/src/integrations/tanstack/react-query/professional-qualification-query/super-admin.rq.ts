import {
  serverFn__createProfessionalQualification,
  serverFn__deleteProfessionalQualification,
  serverFn__readAllProfessionalQualification,
  serverFn__readOneProfessionalQualification,
  serverFn__updateProfessionalQualification,
} from "@/integrations/tanstack/server-function/db-query/professional-qualification.sfn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { EMPLOYEE_ROLE, PARTNER_ROLE } from "@repo/utils/db-enums";
import type {
  read__OneProfessionalQualificationSchema,
  read__AllProfessionalQualificationSchema,
} from "@repo/data/validators/professional-qualification";
import type z from "zod";

type TOneProfessionalQualificationSchema = z.infer<
  typeof read__OneProfessionalQualificationSchema
>;

type TAllProfessionalQualificationSchema = z.infer<
  typeof read__AllProfessionalQualificationSchema
>;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

const USER_ROLE = [...EMPLOYEE_ROLE, ...PARTNER_ROLE];

const ALLOWED_ROLES: (typeof USER_ROLE)[number][] = ["SUPER_ADMIN"];

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

export const professionalQualificationQueryKeys = {
  all: () => ["super-admin", "professional-qualification"],

  list: {
    all: () => [...professionalQualificationQueryKeys.all(), "list"],

    readOne: {
      all: () => [...professionalQualificationQueryKeys.list.all(), "read-one"],

      withIdentifier: (
        identifier: TOneProfessionalQualificationSchema["identifier"],
      ) => [
        ...professionalQualificationQueryKeys.list.readOne.all(),
        "identifier",
        identifier,
      ],
    },

    readAll: {
      all: () => [...professionalQualificationQueryKeys.list.all(), "read-all"],

      withIdentifier: (
        identifier?: NonNullable<TAllProfessionalQualificationSchema>["identifier"],
      ) => [
        ...professionalQualificationQueryKeys.list.readAll.all(),
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

function useCreateProfessionalQualification() {
  useAllowedRolesUserCookie();

  const queryClient = useQueryClient();

  const createProfessionalQualification = useServerFn(
    serverFn__createProfessionalQualification,
  );

  return useMutation({
    mutationFn: createProfessionalQualification,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: professionalQualificationQueryKeys.all(),
      });
    },
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useReadOneProfessionalQualification(
  identifier: TOneProfessionalQualificationSchema["identifier"],
) {
  useAllowedRolesUserCookie();

  const readOneProfessionalQualification = useServerFn(
    serverFn__readOneProfessionalQualification,
  );

  return useQuery({
    queryKey:
      professionalQualificationQueryKeys.list.readOne.withIdentifier(
        identifier,
      ),

    queryFn: () =>
      readOneProfessionalQualification({
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

function useReadAllProfessionalQualification(
  identifier?: NonNullable<TAllProfessionalQualificationSchema>["identifier"],
) {
  useAllowedRolesUserCookie();

  const readAllProfessionalQualification = useServerFn(
    serverFn__readAllProfessionalQualification,
  );

  return useQuery({
    queryKey:
      professionalQualificationQueryKeys.list.readAll.withIdentifier(
        identifier,
      ),

    queryFn: () =>
      readAllProfessionalQualification({
        data: identifier ? { identifier } : {},
      }),
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useUpdateProfessionalQualification() {
  useAllowedRolesUserCookie();

  const queryClient = useQueryClient();

  const updateProfessionalQualification = useServerFn(
    serverFn__updateProfessionalQualification,
  );

  return useMutation({
    mutationFn: updateProfessionalQualification,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: professionalQualificationQueryKeys.all(),
      });
    },
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useDeleteProfessionalQualification() {
  useAllowedRolesUserCookie();

  const queryClient = useQueryClient();

  const deleteProfessionalQualification = useServerFn(
    serverFn__deleteProfessionalQualification,
  );

  return useMutation({
    mutationFn: deleteProfessionalQualification,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: professionalQualificationQueryKeys.all(),
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
  useCreateProfessionalQualification,
  useReadOneProfessionalQualification,
  useReadAllProfessionalQualification,
  useUpdateProfessionalQualification,
  useDeleteProfessionalQualification,
};
