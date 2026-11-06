import { DashboardNav } from "@/components/main/user/employee-id/individual-user/dashboard-nav";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated-routes)/dashboard/employee/$employeeId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <DashboardNav />
      <Outlet />
    </>
  );
}
