import {
  fetchSession,
  fetchUserDetailsCookie,
  setUserDetailsCookie,
} from "@/lib/auth/session";
import { read__OneUser } from "@repo/data/querries/users";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(guest-routes)")({
  component: RouteComponent,

  beforeLoad: async () => {
    const session = await fetchSession();

    if (session) {
      const userDetailsFromCookie = await fetchUserDetailsCookie();

      if (!userDetailsFromCookie) {
        const userDetailsFromDB = await read__OneUser({
          querryOptions: { userEmail: session.user.email },
        });

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

          await setUserDetailsCookie({
            data: {
              userId: id,
              fullName: name,
              email,
              phone,
              status,
              role,
              username,
              avatarUrl,
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
        const { username } = userDetailsFromCookie;
        throw redirect({
          to: "/$userName",
          params: { userName: username },
        });
      }
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
