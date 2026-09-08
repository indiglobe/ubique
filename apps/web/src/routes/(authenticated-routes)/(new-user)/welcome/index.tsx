import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { WelcomePage } from "@/components/main/welcome/welcome";
import { env } from "@repo/env/client";

/**
 * Defines the optional search parameters accepted by the welcome route.
 *
 * The entire search object is optional, allowing the route to be accessed
 * without any query parameters. When provided, `email` contains the user's
 * email address and can be used by the welcome flow to pre-populate or
 * identify the user's email without requiring it to be entered again.
 */
export const welcomeRouteSearchSchema = z
  .object({
    email: z.string().optional(),
    redirectBackTo: z.string().optional(),
  })
  .optional();

export const Route = createFileRoute(
  "/(authenticated-routes)/(new-user)/welcome/",
)({
  component: RouteComponent,

  head: () => {
    const title = "Welcome to Ubique";
    const description =
      "Welcome to Ubique. Get started with your account and discover a smarter way to manage doctors, orders, and field force operations.";

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
          content: `${env.VITE_WEB_APP_HOST}/welcome`,
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
          content: `${env.VITE_WEB_APP_HOST}/welcome`,
        },
      ],
    };
  },

  /**
   * Validates and parses the welcome route's query parameters according to
   * `welcomeRouteSearchSchema`.
   *
   * This ensures that any `email` value received through the URL is treated
   * as a string and that both the search object and the `email` parameter
   * may be omitted.
   */
  validateSearch: welcomeRouteSearchSchema,
});

function RouteComponent() {
  return (
    <>
      <WelcomePage />
    </>
  );
}
