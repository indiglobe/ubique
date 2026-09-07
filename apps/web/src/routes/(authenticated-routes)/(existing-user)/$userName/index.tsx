import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated-routes)/(existing-user)/$userName/",
)({
  component: RouteComponent,

  head: ({params}) => {

    const {userName} = params
    const title = "User Profile — Ubique";
    const description =
      "View your Ubique profile and access your account information, healthcare operations, and personalized workspace.";

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
          content: `${env.VITE_WEB_APP_HOST}/${userName}`,
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
          content: `${env.VITE_WEB_APP_HOST}/${userName}`,
        },
      ],
    };
  },
});

function RouteComponent() {
  return <div>Hello "/(authenticated-routes)/$userName/"!</div>;
}
