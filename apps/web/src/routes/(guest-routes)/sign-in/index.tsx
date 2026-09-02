import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(guest-routes)/sign-in/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(guest-routes)/sign-in/"!</div>;
}
