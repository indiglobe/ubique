import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated-routes)/dashboard/doctor-profiling/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>Hello "/(authenticated-routes)/dashboard/doctor-profiling/"!</div>
  );
}
