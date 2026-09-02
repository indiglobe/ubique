import { authClient } from "@/lib/auth/auth-client";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated-routes)/(existing-user)")(
  {
    component: RouteComponent,

    beforeLoad: async ({ context }) => {
      const { userDetailsFromCookie } = context;

      if (!userDetailsFromCookie) {
        await authClient.signOut();
        throw redirect({ to: "/sign-in" });
      }
    },
  },
);

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
