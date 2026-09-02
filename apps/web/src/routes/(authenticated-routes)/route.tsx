import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import {
  deleteUserDetailsCookie,
  fetchSession,
  fetchUserDetailsCookie,
} from "@/lib/auth/session";

export const Route = createFileRoute("/(authenticated-routes)")({
  component: RouteComponent,

  beforeLoad: async () => {
    const session = await fetchSession();
    const userDetailsFromCookie = await fetchUserDetailsCookie();

    if (!session) {
      await deleteUserDetailsCookie();
      throw redirect({ to: "/sign-in" });
    }

    return { session, userDetailsFromCookie };
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
