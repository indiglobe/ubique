import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public-routes)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
