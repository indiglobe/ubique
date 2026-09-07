import { SignIn } from "@/components/main/sign-in/sign-in";
import type { FileRouteTypes } from "@/routeTree.gen";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import z from "zod";

/**
 * Defines the search parameters required by the sign-in route.
 *
 * `redirectBackTo` accepts either a type-safe internal TanStack Router path
 * or a string URL that can be handled through the router's `href` option.
 *
 * The parameter is required because this route has no meaningful destination
 * of its own; its sole purpose is to forward the user to the requested URL.
 */
export const siginInRouteSearchSchema = z
  .object({
    redirectBackTo: z
      .custom<FileRouteTypes["to"] | (string & {})>()
      .optional()
      .catch("/"),
  })
  .optional();

export const Route = createFileRoute("/(guest-routes)/(sign-in)")({
  component: RouteComponent,

  validateSearch: siginInRouteSearchSchema,
});

export function RouteComponent() {
  return (
    <>
      <SignIn>
        <Outlet />
      </SignIn>
    </>
  );
}
