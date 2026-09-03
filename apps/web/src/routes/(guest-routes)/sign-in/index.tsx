import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@/components/main/sign-in/sign-in";

export const Route = createFileRoute("/(guest-routes)/sign-in/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SignIn />
    </>
  );
}
