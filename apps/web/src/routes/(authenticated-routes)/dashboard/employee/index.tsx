import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { EmployeePageForSuperAdmin } from "@/components/main/employee/role-based-access/super-admin";

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

  validateSearch: routeSearchParamSchema,
});

function RouteComponent() {
  const {
    userDetailsFromCookie: { role },
  } = Route.useRouteContext();

  if (role === "SUPER_ADMIN") {
    return <EmployeePageForSuperAdmin />;
  }

  return null;
}
