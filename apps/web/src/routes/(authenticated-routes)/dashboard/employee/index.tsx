import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { lazy, Suspense } from "react";
import type { ComponentType } from "react";
import { EmployeeDashboardQuickOverviewSkeleton as EmployeePageForSuperAdminSkeleton } from "@/components/main/employee/role-based-access/super-admin/loading-boudary";
import type { USER_ROLE } from "@repo/utils/const/roles";
import { AccessDenied } from "@/components/main/page-error-boundary";

const ALLOWED_ROLES_FOR_THIS_ROUTE: (typeof USER_ROLE)[number][] = [
  "SUPER_ADMIN",
  "ADMIN",
];

const EmployeePageForSuperAdmin = lazy(
  () =>
    import("@/components/main/employee/role-based-access/super-admin/employee"),
);

const EmployeePageForAdmin = lazy(
  () => import("@/components/main/employee/role-based-access/admin/employee"),
);

export const routeSearchParamSchema = z
  .object({
    q: z.string().optional(),
    status: z.enum(["asc", "desc"]).optional().catch("asc"),
    role: z.enum(["asc", "desc"]).optional().catch("asc"),
    "employee-code": z.enum(["asc", "desc"]).optional().catch("asc"),
    "last-login": z.enum(["asc", "desc"]).optional().catch("asc"),
  })
  .optional();

export const Route = createFileRoute(
  "/(authenticated-routes)/dashboard/employee/",
)({
  component: RouteComponent,

  beforeLoad: async ({ context }) => {
    const {
      userDetailsFromCookie: { role },
    } = context;

    if (!ALLOWED_ROLES_FOR_THIS_ROUTE.includes(role)) {
      throw Error("NOT_ALLOWED");
    }
  },

  validateSearch: routeSearchParamSchema,

  errorComponent: ({ error }) => {
    if (error instanceof Error) {
      return <AccessDenied />;
    }

    throw error;
  },
});

function RouteComponent() {
  const { userDetailsFromCookie } = Route.useRouteContext();

  const { role } = userDetailsFromCookie;

  let EmployeePage: ComponentType | null = null;
  let Skeleton: ComponentType = () => <div>Loading...</div>;

  switch (role) {
    case "SUPER_ADMIN":
      EmployeePage = EmployeePageForSuperAdmin;
      Skeleton = EmployeePageForSuperAdminSkeleton;
      break;

    case "ADMIN":
      EmployeePage = EmployeePageForAdmin;
      Skeleton = EmployeePageForSuperAdminSkeleton;
      break;
    // case "ADMIN":
    //   Dashboard = AdminDashboard;
    //   break;
    // case "ZSM":
    //   Dashboard = ZSMDashboard;
    //   break;
    // case "RSM":
    //   Dashboard = RSMDashboard;
    //   break;
    // case "MANAGER":
    //   Dashboard = ManagerDashboard;
    //   break;
    // case "ASM":
    //   Dashboard = ASMDashboard;
    //   break;
    // case "MR":
    //   Dashboard = MRDashboard;
    //   break;
    default:
      EmployeePage = null;
      break;
  }

  if (!EmployeePage) return null;

  return (
    <Suspense fallback={<Skeleton />}>
      <EmployeePage />
    </Suspense>
  );
}
