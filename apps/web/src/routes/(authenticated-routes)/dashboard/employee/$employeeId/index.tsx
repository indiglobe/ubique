import { EmployeeProfileError } from "@/components/main/employee/employee-id/employee-error";
import { EmployeeNotFound } from "@/components/main/employee/employee-id/employee-not-found";
import { serverFn__readOneUser } from "@/integrations/tanstack/server-function/db-query/users.sfn";
import { tryCatch } from "@repo/utils/try-catch";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { hasAccess } from "@repo/utils/authorization";
import { EmployeeAccessDenied } from "@/components/main/employee/employee-id/access-denied";
import { IndividualUserDashboard } from "@/components/main/employee/employee-id/individual-employee/for-administrations/super-admin";

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
  const { employeeDetails } = Route.useLoaderData();
  const { userDetailsFromCookie } = Route.useRouteContext();

  // SUPER_ADMIN and ADMIN can access any individual user's dashboard.
  const IS_ADMIN_PREVILEDGED = hasAccess({
    requiredRole: ["SUPER_ADMIN", "ADMIN"],
    currentRole: userDetailsFromCookie.role,
  });

  const HAS_SUFFICIENT_ACCESS = hasAccess({
    requiredRole: userDetailsFromCookie.role,
    currentRole: employeeDetails.role,
    shouldAllowEqualLevelRole: false,
  });

  if (IS_ADMIN_PREVILEDGED || HAS_SUFFICIENT_ACCESS) {
    return <IndividualUserDashboard />;
  }

  return <EmployeeAccessDenied />;
}
