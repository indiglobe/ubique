import { LoginForm } from "@/components/main/log-in/login-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(unauthenticated-routes)/log-in/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <LoginForm />
    </>
  );
}
