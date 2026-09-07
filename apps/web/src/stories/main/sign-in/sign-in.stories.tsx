import type { SignIn } from "@/components/main/sign-in/sign-in";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/tanstack-react";
import {
  Route as SigninLayoutRoute,
  RouteComponent as SigninLayoutComponent,
} from "@/routes/(guest-routes)/(sign-in)/route";
import {
  RouteComponent as LogInIndexComponent,
} from "@/routes/(guest-routes)/(sign-in)/log-in/index";
import {
  RouteComponent as SignUpIndexComponent,
} from "@/routes/(guest-routes)/(sign-in)/sign-up/index";
import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
  createMemoryHistory,
} from "@tanstack/react-router";
import type { FileRoutesById, FileRoutesByFullPath } from "@/routeTree.gen";

function renderWithMockRouter(initialPath: keyof FileRoutesByFullPath = "/") {
  const rootRoute = createRootRoute();

  const signinLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: "/(guest-routes)/(sign-in)" satisfies keyof FileRoutesById,
    component: SigninLayoutComponent,
  });

  const signUpIndexRoute = createRoute({
    getParentRoute: () => signinLayoutRoute,
    path: "/sign-up/" satisfies keyof FileRoutesByFullPath,
    component: SignUpIndexComponent,
  });

  const logInIndexRoute = createRoute({
    getParentRoute: () => signinLayoutRoute,
    path: "/log-in/" satisfies keyof FileRoutesByFullPath,
    component: LogInIndexComponent,
  });

  const routeTree = rootRoute.addChildren([
    signinLayoutRoute.addChildren([signUpIndexRoute, logInIndexRoute]),
  ]);

  const history = createMemoryHistory({
    initialEntries: [initialPath],
  });

  return createRouter({
    routeTree,
    history,
  });
}

const meta = {
  parameters: {
    tanstack: {
      router: {
        route: SigninLayoutRoute,
        routeOverrides: {
          "/(guest-routes)/(sign-in)/log-in/": {
            component: () => LogInIndexComponent,
          },
          "/(guest-routes)/(sign-in)/sign-up/": {
            component: () => SignUpIndexComponent,
          },
        },
      },
    },
  },
} satisfies Meta<typeof SigninLayoutRoute> & TypedMetaOptions;

export default meta;

type Story = StoryObj<typeof SignIn> & TypedStoryOptions;

export const SignInStory: Story = {
  args: {},
  render: () => {
    const router = renderWithMockRouter("/sign-up/");
    return <RouterProvider router={router} />;
  },
};
