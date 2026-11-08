import Main from "@/components/main/main";
import { EmployeeLookupPage } from "@/components/main/employee/employee";
import { cn } from "@repo/styles/cn";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated-routes)/dashboard/employee/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Main className={cn(`py-6`)}>
      <EmployeeLookupPage />
    </Main>
  );
}
