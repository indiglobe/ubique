import { useRouteContext } from "@tanstack/react-router";
import { SuperAdminDashboard } from "@/components/main/dashboard-group/super-admin/dashboard";
import { AdminDashboard } from "./admin/dashboard";
import { ZSMDashboard } from "./zsm/dashboard";

export function Dashboard() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(authenticated-routes)/dashboard/",
  });

  const { role } = userDetailsFromCookie;

  if (role === "SUPER_ADMIN") {
    return <SuperAdminDashboard />;
  }

  if (role === "ADMIN") {
    return <AdminDashboard />;
  }

  if (role === "ZSM") {
    return <ZSMDashboard />;
  }

  return null;
}
