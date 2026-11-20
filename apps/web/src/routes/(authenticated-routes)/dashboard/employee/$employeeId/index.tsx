import { EmployeeProfileError } from "@/components/main/employee/employee-id/employee-error";
import { serverFn__readOneUser } from "@/integrations/tanstack/server-function/db-query/users.sfn";
import { tryCatch } from "@repo/utils/try-catch";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { EmployeeNotFound } from "@/components/main/employee/employee-not-found";
import { IndividualUserForSuperAdmin } from "@/components/main/employee/employee-id/role-based-access/super-admin/employee-id";
import { IndividualUserForAdmin } from "@/components/main/employee/employee-id/role-based-access/admin/employee-id";
import type { ComponentType } from "react";

export const Route = createFileRoute(
  "/(authenticated-routes)/dashboard/employee/$employeeId/",
)({
  component: RouteComponent,

  loader: async ({ params }) => {
    const { employeeId } = params;

    const [serverFnError, serverFnResult] = await tryCatch(
      serverFn__readOneUser({
        data: { identifier: { employeeCode: employeeId } },
      }),
    );

    if (serverFnError) {
      throw serverFnError;
    }

    const employeeDetails = serverFnResult;

    if (!employeeDetails) {
      throw notFound();
    }

    return { employeeDetails };
  },

  notFoundComponent: () => <EmployeeNotFound />,

  errorComponent: () => <EmployeeProfileError />,
});

function RouteComponent() {
  const { userDetailsFromCookie } = Route.useRouteContext();

  const { role } = userDetailsFromCookie;

  let EmployeePage: ComponentType | null = null;

  switch (role) {
    case "SUPER_ADMIN":
      EmployeePage = IndividualUserForSuperAdmin;
      break;

    case "ADMIN":
      EmployeePage = IndividualUserForAdmin;
      break;

    default:
      EmployeePage = null;
      break;
  }

  if (!EmployeePage) return null;

  return <EmployeePage />;
}
