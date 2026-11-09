import Main from "@/components/main/main";
import { cn } from "@repo/styles/cn";
import { createFileRoute } from "@tanstack/react-router";
import {
  TableHeader,
  UsersTable,
} from "@/components/main/dashboard-group/super-admin/users-table";
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

export const Route = createFileRoute(
  "/(authenticated-routes)/dashboard/employee/",
)({
  component: RouteComponent,

  validateSearch: routeSearchParamSchema,
});

function RouteComponent() {
  return (
    <Main className={cn(`py-6`)}>
      <section className={cn(``)}>
        <div>
          <TableHeader />
          <UsersTable />
        </div>
      </section>
    </Main>
  );
}
