import { HomePage } from "@/components/main/home/home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public-routes)/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Ubique — Doctors, Orders & Field Force, One Platform" }],
  }),
});

function RouteComponent() {
  return <HomePage />;
}
