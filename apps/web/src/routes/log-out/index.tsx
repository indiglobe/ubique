import { createFileRoute, redirect } from "@tanstack/react-router";
import z from "zod";
import type { FileRoutesByTo } from "@/routeTree.gen";
import { deleteUserDetailsCookie } from "@/integrations/auth/session";
import { WrongDestinationPage } from "@/components/main/wrong-page";

export const routeSearchParams = z.object({
  "redirect-url": z
    .custom<keyof FileRoutesByTo | (string & {})>()
    .optional()
    .catch("/")
    .default("/"),
});

export const Route = createFileRoute("/log-out/")({
  component: RouteComponent,
  validateSearch: routeSearchParams,

  beforeLoad: async ({ search }) => {
    const redirectUrl = search["redirect-url"];

    await deleteUserDetailsCookie();

    if (redirectUrl.startsWith("/")) {
      throw redirect({ to: redirectUrl });
    } else {
      throw redirect({ href: redirectUrl });
    }
  },
});

function RouteComponent() {
  return <WrongDestinationPage />;
}
