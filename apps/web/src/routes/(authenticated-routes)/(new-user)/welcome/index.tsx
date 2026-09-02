import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import WelcomePage from "@/components/main/welcome/welcome";

export const welcomeRouteSearchSchema = z
  .object({
    email: z.string().optional(),
  })
  .optional();

export const Route = createFileRoute(
  "/(authenticated-routes)/(new-user)/welcome/",
)({
  component: RouteComponent,

  validateSearch: welcomeRouteSearchSchema,
});

function RouteComponent() {
  return (
    <>
      <WelcomePage />
    </>
  );
}
