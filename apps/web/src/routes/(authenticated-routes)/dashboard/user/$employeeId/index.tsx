import { EmployeeProfileError } from "@/components/main/user/employee-id/employee-error";
import { EmployeeNotFound } from "@/components/main/user/employee-id/employee-not-found";
import { serverFn__readOneUser } from "@/integrations/tanstack/server-function/db-query/users.sfn";
import { tryCatch } from "@repo/utils/try-catch";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { hasAccess } from "@repo/utils/authorization";
import { EmployeeAccessDenied } from "@/components/main/user/employee-id/access-denied";
import { IndividualUserDashboard } from "@/components/main/user/employee-id/individual-user-dashboard";

export const Route = createFileRoute(
  "/(authenticated-routes)/dashboard/user/$employeeId/",
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

    const userDetails = serverFnResult;

    if (!userDetails) {
      throw notFound();
    }

    return { userDetails };
  },

  notFoundComponent: () => <EmployeeNotFound />,

  errorComponent: () => <EmployeeProfileError />,
});

function RouteComponent() {
  const { userDetails } = Route.useLoaderData();
  const { userDetailsFromCookie } = Route.useRouteContext();
  
  // SUPER_ADMIN and ADMIN can access any individual user's dashboard.
  const isAdmin = hasAccess({
    requiredRole: ["SUPER_ADMIN", "ADMIN"],
    currentRole: userDetailsFromCookie.role,
  });

  // Other users can only access users with lower privileges
  // who were referred by them.
  const hasInsufficientAccess =
    hasAccess({
      requiredRole: userDetailsFromCookie.role,
      currentRole: userDetails.role,
      shouldAllowEqualLevelRole: false,
    }) ||
    userDetails.referrerId !== userDetailsFromCookie.userId;

  if (!isAdmin && hasInsufficientAccess) {
    return <EmployeeAccessDenied />;
  }

  return <IndividualUserDashboard />;
}
