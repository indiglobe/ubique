import { Dashboard } from "@/components/main/dashboard-group";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

export const routeSearchParamSchema = z
  .object({
    q: z.string().optional(),
    status: z.enum(["asc", "desc"]).optional().catch("asc"),
    role: z.enum(["asc", "desc"]).optional().catch("asc"),
    "employee-code": z.enum(["asc", "desc"]).optional().catch("asc"),
    "last-login": z.enum(["asc", "desc"]).optional().catch("asc"),
  })
  .optional();

export const Route = createFileRoute("/(authenticated-routes)/dashboard/")({
  component: RouteComponent,

  validateSearch: routeSearchParamSchema,

  head: () => {
    const title = "Dashboard | Ubique";
    const description =
      "Manage Ubique accounts, monitor activities, view your user details, and manage your dashboard.";

    const url = `${env.VITE_WEB_APP_HOST}/dashboard`;

    return {
      meta: [
        { title },
        {
          name: "description",
          content: description,
        },

        // Twitter / X
        {
          name: "twitter:card",
          content: "summary",
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
          name: "twitter:url",
          content: url,
        },

        // Facebook / Open Graph
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:url",
          content: url,
        },
        {
          property: "og:type",
          content: "website",
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <Dashboard />
    </>
  );
}
