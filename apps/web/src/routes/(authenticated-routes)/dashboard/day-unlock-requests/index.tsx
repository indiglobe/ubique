import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated-routes)/dashboard/day-unlock-requests/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>Hello "/(authenticated-routes)/dashboard/day-unlock-requests/"!</div>
  );
}
