import { DashboardNav } from "@/components/main/employee/dashboard-nav";
import Main from "@/components/main/main";
import { cn } from "@repo/styles/cn";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated-routes)/dashboard/employee",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Main className={cn(`py-6`)}>
    <section>
      <DashboardNav />
    </section>

    <Outlet/>
    </Main>
  );
}
