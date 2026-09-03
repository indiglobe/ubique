import { serverFn__readOneUser } from "@/integrations/server-function/query/user.sf";
import {
  fetchSession,
  fetchUserDetailsCookie,
  setUserDetailsCookie,
} from "@/lib/auth/session";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(guest-routes)")({
  component: RouteComponent,

  beforeLoad: async () => {
    /**
     * Authentication flow for guest-only routes:
     */

    const session = await fetchSession();

    if (session) {
      /**
       * - If an active session exists, check whether the user's details
       *   are already available in the user-details cookie.
       */
      const userDetailsFromCookie = await fetchUserDetailsCookie();

      /**
       * - If the cookie is missing, fetch the user's details from the
       *   database using the email associated with the active session.
       */
      if (!userDetailsFromCookie) {
        const userDetailsFromDB = await serverFn__readOneUser({
          data: { queryOptions: { userEmail: session.user.email } },
        });

        /**
         * - If the user does not exist in the database, redirect them to
         *   the welcome page and pass their session email as a search
         *   parameter so the onboarding flow can continue.
         */

        if (!userDetailsFromDB) {
          throw redirect({
            to: "/welcome",
            search: { email: session.user.email },
          });
        } else {
          const {
            avatarUrl,
            email,
            id,
            status,
            employeeCode,
            organizationId,
            phone,
            role,
            username,
            name,
          } = userDetailsFromDB;

          /**
           * - If the user exists in the database, populate the user-details
           *   cookie with the required user information and redirect them
           *   to their username-based route.
           */
          await setUserDetailsCookie({
            data: {
              avatarUrl: avatarUrl ?? null,
              email,
              userId: id,
              fullName: name,
              phone,
              status,
              role,
              username,
              employeeCode,
              organizationId,
            },
          });

          throw redirect({
            to: "/$userName",
            params: { userName: userDetailsFromDB.username },
          });
        }
      } else {
        /**
         * - If user details are present in the cookie, redirect the user
         *   directly to their username-based route.
         *
         *
         * This prevents authenticated users from accessing guest-only
         * routes while also ensuring that user details are cached in the
         * cookie when they are not already available.
         */
        const { username } = userDetailsFromCookie;

        throw redirect({
          to: "/$userName",
          params: { userName: username },
        });
      }
    }

    /**
     * - If no active session exists, allow the request to continue
     *   and render the guest route.
     */
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
