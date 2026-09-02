import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { read__OneUser } from "@repo/data/querries/users";

export const Route = createFileRoute("/(authenticated-routes)/(new-user)")({
  component: RouteComponent,

  beforeLoad: async ({ context }) => {
    const { userDetailsFromCookie, session } = context;

    if (userDetailsFromCookie) {
      throw redirect({
        to: "/$userName",
        params: { userName: userDetailsFromCookie.username },
      });
    }

    const {
      user: { email },
    } = session;

    const userDetails = await read__OneUser({
      querryOptions: { userEmail: email },
    });

    if (userDetails) {
      throw redirect({
        to: "/$userName",
        params: { userName: userDetails.username },
      });
    }
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
