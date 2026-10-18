import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/public-page-header";
import { fetchUserDetailsCookie } from "@/integrations/auth/session";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public-routes)")({
  component: RouteComponent,

  beforeLoad: async () => {
    const userDetailAsCookie = await fetchUserDetailsCookie();

    return { userDetailAsCookie };
  },
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
