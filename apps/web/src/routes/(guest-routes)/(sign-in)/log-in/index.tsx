import { LogIn } from "@/components/main/sign-in/log-in-form";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(guest-routes)/(sign-in)/log-in/")({
  component: RouteComponent,

  head: () => {
    const title = "Log In — Ubique";
    const description =
      "Log in to your Ubique account to access doctors, orders, field force management, and healthcare operations from one platform.";

    return {
      meta: [
        {
          title: title,
        },
        {
          name: "description",
          content: description,
        },
        {
          name: "og:title",
          content: title,
        },
        {
          name: "og:description",
          content: description,
        },
        {
          name: "og:image",
          content: "/SEO-card.png",
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/log-in`,
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: description,
        },
        {
          name: "twitter:image",
          content: "/SEO-card.png",
        },
        {
          name: "twitter:url",
          content: `${env.VITE_WEB_APP_HOST}/log-in`,
        },
      ],
    };
  },
});

export function RouteComponent() {
  return (
    <>
      <LogIn />
    </>
  );
}
