import { authClient } from "@/lib/auth/auth-client";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated-routes)/(existing-user)")(
  {
    component: RouteComponent,

    beforeLoad: async ({ context }) => {
      const { userDetailsFromCookie } = context;

      /**
       * Ensure that an authenticated user has the required user details
       * available before accessing existing-user routes.
       *
       * The authenticated parent route provides `userDetailsFromCookie`
       * through the route context. If those details are unavailable, the
       * current authentication state is treated as invalid for this route
       * group.
       *
       * Sign the user out to clear the invalid authentication state, then
       * redirect them to the sign-in page so they can establish a valid
       * session again.
       */
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
