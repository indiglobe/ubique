import { HomePage } from "@/components/main/home/home";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public-routes)/")({
  component: RouteComponent,

  head: () => {
    const title = "Ubique — Doctors, Orders & Field Force, One Platform";
    const description =
      "Ubique is an all-in-one platform that connects doctors, streamlines orders, and empowers field forces to manage healthcare operations efficiently from one place.";

    return {
      meta: [
        { title: title },
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
          content: `${env.VITE_WEB_APP_HOST}/redirection`,
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
          content: `${env.VITE_WEB_APP_HOST}`,
        },
      ],
    };
  },
});

function RouteComponent() {
  return <HomePage />;
}
