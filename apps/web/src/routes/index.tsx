import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "AI Mine Hub — The World's Markets, One Platform" }],
  }),
});

function RouteComponent() {
  return <></>;
}
