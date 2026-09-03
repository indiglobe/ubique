import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { WelcomePage } from "@/components/main/welcome/welcome";

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
  })
  .optional();

export const Route = createFileRoute(
  "/(authenticated-routes)/(new-user)/welcome/",
)({
  component: RouteComponent,

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
