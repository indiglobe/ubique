import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import {
  deleteUserDetailsCookie,
  fetchSession,
  fetchUserDetailsCookie,
} from "@/lib/auth/session";

export const Route = createFileRoute("/(authenticated-routes)")({
  component: RouteComponent,

  beforeLoad: async () => {
    /**
     * Retrieve the current authentication session to determine whether
     * the user is still authenticated before allowing access to any
     * protected child route.
     *
     * The session is the source of truth for authentication. A missing
     * session means the user's authenticated state is no longer valid,
     * regardless of whether user-related data may still exist in cookies.
     */
    const session = await fetchSession();

    /**
     * Retrieve the user details persisted in the authentication cookie.
     *
     * These details are loaded alongside the session so they can be made
     * available to all descendant routes through the authenticated route
     * context once authentication has been successfully verified.
     */
    const userDetailsFromCookie = await fetchUserDetailsCookie();

    /**
     * Handle an unauthenticated user attempting to access a protected route.
     *
     * When no valid session exists, remove the user-details cookie to prevent
     * stale user information from remaining after the authentication state
     * has expired or been invalidated.
     *
     * The redirect is thrown so TanStack Router immediately stops the current
     * route-loading process and navigates the user to the sign-in page.
     */
    if (!session) {
      await deleteUserDetailsCookie();
      throw redirect({ to: "/sign-in" });
    }

    /**
     * Authentication has been successfully verified.
     *
     * Return both the active session and the associated user details so
     * descendant routes can access the authenticated user's context without
     * independently fetching the same authentication data.
     */
    return { session, userDetailsFromCookie };
  },
});

function RouteComponent() {
  return <Outlet />;
}
