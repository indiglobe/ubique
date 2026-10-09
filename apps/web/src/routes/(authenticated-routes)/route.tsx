import { fetchUserDetailsCookie } from "@/integrations/auth/session";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated-routes)")({
  component: RouteComponent,

  beforeLoad: async () => {
    const userDetailsFromCookie = await fetchUserDetailsCookie();

    if (!userDetailsFromCookie) {
      throw redirect({ to: "/log-in" });
    }

    return { userDetailsFromCookie };
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
