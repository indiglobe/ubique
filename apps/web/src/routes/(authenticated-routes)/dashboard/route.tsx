import Main from "@/components/main/main";
import { cn } from "@repo/styles/cn";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated-routes)/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Main className={cn(`py-6`)}>
      <Outlet />
    </Main>
  );
}
