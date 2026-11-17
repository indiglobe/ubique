import { DashboardSkeleton } from "@/components/main/dashboard/dashboard-skeleton";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import type { ComponentType } from "react";
import z from "zod";

const ASMDashboard = lazy(
  () => import("@/components/main/dashboard/role-based-access/asm/dashboard"),
);

const ManagerDashboard = lazy(
  () =>
    import("@/components/main/dashboard/role-based-access/manager/dashboard"),
);

const MRDashboard = lazy(
  () => import("@/components/main/dashboard/role-based-access/mr/dashboard"),
);

const RSMDashboard = lazy(
  () => import("@/components/main/dashboard/role-based-access/rsm/dashboard"),
);

const SuperAdminDashboard = lazy(
  () =>
    import("@/components/main/dashboard/role-based-access/super-admin/dashboard"),
);

const ZSMDashboard = lazy(
  () => import("@/components/main/dashboard/role-based-access/zsm/dashboard"),
);

const AdminDashboard = lazy(
  () => import("@/components/main/dashboard/role-based-access/admin/dashboard"),
);

export const routeSearchParamSchema = z
  .object({
    category: z
      .array(
        z.enum([
          "all",
          "people",
          "field operations",
          "products & inventory",
          "sales & finance",
          "approvals",
          "insights",
          "administration",
        ]),
      )
      .optional()
      .catch(["all"]),
    q: z.string().optional().catch(""),
  })

  .optional();

export const Route = createFileRoute("/(authenticated-routes)/dashboard/")({
  component: RouteComponent,

  validateSearch: routeSearchParamSchema,

  head: () => {
    const title = "Dashboard | Ubique";
    const description =
      "Manage Ubique accounts, monitor activities, view your user details, and manage your dashboard.";

    const url = `${env.VITE_WEB_APP_HOST}/dashboard`;

    return {
      meta: [
        { title },
        {
          name: "description",
          content: description,
        },

        // Twitter / X
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: description,
        },
        {
          name: "twitter:url",
          content: url,
        },

        // Facebook / Open Graph
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:url",
          content: url,
        },
        {
          property: "og:type",
          content: "website",
        },
      ],
    };
  },
});

function RouteComponent() {
  const { userDetailsFromCookie } = Route.useRouteContext();

  const { role } = userDetailsFromCookie;

  let Dashboard: ComponentType | null = null;

  switch (role) {
    case "SUPER_ADMIN":
      Dashboard = SuperAdminDashboard;
      break;
    case "ADMIN":
      Dashboard = AdminDashboard;
      break;
    case "ZSM":
      Dashboard = ZSMDashboard;
      break;
    case "RSM":
      Dashboard = RSMDashboard;
      break;
    case "MANAGER":
      Dashboard = ManagerDashboard;
      break;
    case "ASM":
      Dashboard = ASMDashboard;
      break;
    case "MR":
      Dashboard = MRDashboard;
      break;
    default:
      Dashboard = null;
      break;
  }

  if (!Dashboard) return null;

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  );
}
