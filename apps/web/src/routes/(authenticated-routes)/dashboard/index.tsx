import { Dashboard } from "@/components/main/dashboard-group";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

export const routeSearchParamSchema = z
  .object({
    q: z.string().optional(),
    status: z.enum(["asc", "desc"]).optional().catch("asc"),
    role: z.enum(["asc", "desc"]).optional().catch("asc"),
    "employee-code": z.enum(["asc", "desc"]).optional().catch("asc"),
    "last-login": z.enum(["asc", "desc"]).optional().catch("asc"),
  })
  .optional();

export const Route = createFileRoute("/(authenticated-routes)/dashboard/")({
  component: RouteComponent,

  validateSearch: routeSearchParamSchema,
});

function RouteComponent() {
  return (
    <>
      <Dashboard />
    </>
  );
}
