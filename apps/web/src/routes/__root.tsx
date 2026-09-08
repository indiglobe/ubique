import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { DevTools } from "@/integrations/tanstack/devtools";
import appCss from "../styles.css?url";
import type { QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@/integrations/theme/theme-provider";
import { cn } from "@repo/styles/cn";
import { RootNotFound } from "@/components/main/root-not-found";
import { RootError } from "@/components/main/root-error";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Ubique — Doctors, Orders & Field Force, One Platform",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/favicon.ico",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
    ],
  }),

  shellComponent: RootDocument,

  notFoundComponent: RootNotFound,

  errorComponent: RootError,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body
        className={cn(
          `flex max-w-svw flex-col overflow-x-clip overflow-y-auto`,
        )}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <DevTools />
        <Scripts />
      </body>
    </html>
  );
}
