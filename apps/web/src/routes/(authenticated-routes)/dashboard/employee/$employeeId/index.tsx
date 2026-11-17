import { EmployeeProfileError } from "@/components/main/employee/employee-id/employee-error";
import { serverFn__readOneUser } from "@/integrations/tanstack/server-function/db-query/users.sfn";
import { tryCatch } from "@repo/utils/try-catch";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { IndividualUserForSuperAdmin } from "@/components/main/employee/employee-id/individual-employee/role-based-access/super-admin";
import { EmployeeNotFound } from "@/components/main/employee/employee";

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
  const {
    userDetailsFromCookie: { role },
  } = Route.useRouteContext();

  if (role === "SUPER_ADMIN") {
    return <IndividualUserForSuperAdmin />;
  }

  return null;
}
