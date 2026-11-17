import {
  AccessDenied,
  PageGenerationError,
} from "@/components/main/employee/employee-error-boundary";
import { DashboardNav } from "@/components/main/dashboard/dashboard-nav";
import type { USER_ROLE } from "@repo/utils/const/roles";
import { createFileRoute, Outlet } from "@tanstack/react-router";

const ALLOWED_ROLES_TO_ACCESS_THIS_PAGE: (typeof USER_ROLE)[number][] = [
  "SUPER_ADMIN",
  "ADMIN",
];

export const Route = createFileRoute(
  "/(authenticated-routes)/dashboard/employee",
)({
  beforeLoad: async ({ context }) => {
    const {
      userDetailsFromCookie: { role },
    } = context;

    if (!ALLOWED_ROLES_TO_ACCESS_THIS_PAGE.includes(role)) {
      throw new Error("NO_PERM");
    }
  },

  component: RouteComponent,

  errorComponent: ({ error }) => {
    if (error instanceof Error && error.message === "NO_PERM")
      return <AccessDenied />;

    return <PageGenerationError />;
  },
});

function RouteComponent() {
  return (
    <>
      <section>
        <DashboardNav />
      </section>

      <Outlet />
    </>
  );
}
