import { createFileRoute, redirect } from "@tanstack/react-router";
import z from "zod";
import type { FileRouteTypes } from "@/routeTree.gen";

export const redirectionRouteSearchSchema = z.object({
  redirectUrl: z.custom<FileRouteTypes["to"] | (string & {})>(),
});

export const Route = createFileRoute(
  "/(authenticated-routes)/(redirection-routes)/redirection/",
)({
  component: RouteComponent,

  validateSearch: redirectionRouteSearchSchema,

  beforeLoad: async ({ search }) => {
    const { redirectUrl } = search;

    if (redirectUrl.startsWith("/")) {
      throw redirect({ to: redirectUrl });
    } else {
      throw redirect({
        href: redirectUrl,
      });
    }
  },
});

function RouteComponent() {
  return <></>;
}
