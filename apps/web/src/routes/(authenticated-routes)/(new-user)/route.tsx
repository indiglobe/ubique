import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { serverFn__readOneUser } from "@/integrations/server-function/query/user.sf";

export const Route = createFileRoute("/(authenticated-routes)/(new-user)")({
  component: RouteComponent,

  beforeLoad: async ({ context }) => {
    /**
     * New-user route authentication flow:
     */

    const { userDetailsFromCookie, session } = context;

    /**
     * - If user details are already available in the cookie, the user
     *   is considered an existing user and is redirected directly to
     *   their username-based route.
     */
    if (userDetailsFromCookie) {
      throw redirect({
        to: "/$userName",
        params: { userName: userDetailsFromCookie.username },
      });
    }

    const {
      user: { email },
    } = session;

    /**
     * - If user details are not available in the cookie, fetch the user's
     *   details from the database using the email associated with the
     *   authenticated session.
     */
    const userDetails = await serverFn__readOneUser({
      data: { queryOptions: { userEmail: email } },
    });

    /**
     * - If the user already exists in the database, the user is considered
     *   an existing user and is redirected to their username-based route.
     */
    if (userDetails) {
      throw redirect({
        to: "/$userName",
        params: { userName: userDetails.username },
      });
    }

    /**
     * - If the user does not exist in the database, allow the request to
     *   continue so the new-user flow can be rendered.
     */

    return { session };
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
