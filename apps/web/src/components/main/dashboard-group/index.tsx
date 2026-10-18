import { useRouteContext } from "@tanstack/react-router";
import { SuperAdminDashboard } from "@/components/main/dashboard-group/super-admin/dashboard";
import Main from "@/components/main/main";
import { cn } from "@repo/styles/cn";

export function Dashboard() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)/dashboard/",
  });

  const { role } = userDetailsFromCookie;

  if (role === "SUPER_ADMIN") {
    return (
      <Main className={cn(`py-6`)}>
        <SuperAdminDashboard />
      </Main>
    );
  }

  return null;
}
