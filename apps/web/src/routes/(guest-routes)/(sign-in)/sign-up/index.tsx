import { SignUpForm } from "@/components/main/sign-in/sign-up-form";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(guest-routes)/(sign-in)/sign-up/")({
  component: RouteComponent,

  head: () => {
    const title = "Sign In — Ubique";
    const description =
      "Sign in to your Ubique account to access doctors, orders, field force management, and healthcare operations from one platform.";

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
          content: `${env.VITE_WEB_APP_HOST}/sign-up`,
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
          content: `${env.VITE_WEB_APP_HOST}/sign-up`,
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <SignUpForm />
    </>
  );
}
