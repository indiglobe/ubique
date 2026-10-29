import { useRouteContext } from "@tanstack/react-router";
import { SuperAdminDashboard } from "@/components/main/dashboard-group/super-admin/dashboard";
import { AdminDashboard } from "@/components/main/dashboard-group/admin/dashboard";
import { ZSMDashboard } from "@/components/main/dashboard-group/zsm/dashboard";
import { RSMDashboard } from "@/components/main/dashboard-group/rsm/dashboard";
import { ManagerDashboard } from "@/components/main/dashboard-group/manager/dashboard";
import { ASMDashboard } from "@/components/main/dashboard-group/asm/dashboard";
import { MRDashboard } from "@/components/main/dashboard-group/mr/dashboard";

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

  if (role === "RSM") {
    return <RSMDashboard />;
  }

  if (role === "MANAGER") {
    return <ManagerDashboard />;
  }

  if (role === "ASM") {
    return <ASMDashboard />;
  }

  if (role === "MR") {
    return <MRDashboard />;
  }

  return null;
}
