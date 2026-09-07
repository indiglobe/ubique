import { createFileRoute, redirect } from "@tanstack/react-router";
import z from "zod";
import type { FileRouteTypes } from "@/routeTree.gen";
import Redirection from "@/components/main/redirection/redirection";
import { env } from "@repo/env/client";

/**
 * Defines the search parameters required by the redirection route.
 *
 * `redirectBackTo` accepts either a type-safe internal TanStack Router path
 * or a string URL that can be handled through the router's `href` option.
 *
 * The parameter is required because this route has no meaningful destination
 * of its own; its sole purpose is to forward the user to the requested URL.
 */
export const redirectionRouteSearchSchema = z.object({
  redirectBackTo: z
    .custom<FileRouteTypes["to"] | (string & {})>()
    .default("/welcome")
    .catch("/welcome"),
  redirectionFrom: z.enum(["authenticated-routes"]).optional(),
});

export const Route = createFileRoute(
  "/(authenticated-routes)/(redirection-routes)/redirection/",
)({
  component: RouteComponent,

  head: () => {
    const title = "Redirecting — Ubique";
    const description =
      "Please wait while Ubique redirects you to your requested destination.";

    return {
      meta: [
        {
          title: title,
        },
        {
          name: "description",
          content: description,
        },
        {
          name: "og:title",
          content: title,
        },
        {
          name: "og:description",
          content: description,
        },
        {
          name: "og:image",
          content: "/SEO-card.png",
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/redirection`,
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: description,
        },
        {
          name: "twitter:image",
          content: "/SEO-card.png",
        },
        {
          name: "twitter:url",
          content: `${env.VITE_WEB_APP_HOST}/redirection`,
        },
      ],
    };
  },

  validateSearch: redirectionRouteSearchSchema,

  beforeLoad: async ({ search }) => {
    const { redirectBackTo } = search;

    /**
     * Redirect internal application routes using TanStack Router's `to`
     * option.
     *
     * A path beginning with `/` is treated as an internal route, allowing
     * TanStack Router to perform the navigation within the application
     * while preserving its route-aware navigation behavior.
     */
    if (redirectBackTo.startsWith("/")) {
      throw redirect({ to: redirectBackTo });
    }

    /**
     * Redirect URLs that are not application-relative paths using `href`.
     *
     * This allows the redirection route to forward the user to destinations
     * outside the application's route tree, such as an absolute URL.
     *
     * The redirect is thrown because `beforeLoad` must interrupt the current
     * route-loading process and prevent the redirection page from continuing
     * to render.
     */
    throw redirect({
      href: redirectBackTo,
    });
  },
});

function RouteComponent() {
  return (
    <>
      <Redirection />
    </>
  );
}
