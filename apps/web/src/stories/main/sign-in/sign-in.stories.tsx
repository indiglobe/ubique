import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { Route as SigninLayoutRoute } from "@/routes/(guest-routes)/(sign-in)/route";
import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
  createMemoryHistory,
  Outlet,
} from "@tanstack/react-router";
import type { FileRoutesById, FileRoutesByFullPath } from "@/routeTree.gen";
import { SignUpForm } from "@/components/main/sign-in/sign-up-form";
import { LogIn } from "@/components/main/sign-in/log-in-form";
import { SignIn } from "@/components/main/sign-in/sign-in";

function renderWithMockRouter(initialPath: keyof FileRoutesByFullPath = "/") {
  const rootRoute = createRootRoute();

  const signinLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: "/(guest-routes)/(sign-in)" satisfies keyof FileRoutesById,
    component: () => (
      <SignIn>
        <Outlet />
      </SignIn>
    ),
  });

  const signUpIndexRoute = createRoute({
    getParentRoute: () => signinLayoutRoute,
    path: "/sign-up/" satisfies keyof FileRoutesByFullPath,
    component: SignUpForm,
  });

  const logInIndexRoute = createRoute({
    getParentRoute: () => signinLayoutRoute,
    path: "/log-in/" satisfies keyof FileRoutesByFullPath,
    component: LogIn,
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
            component: () => LogIn,
          },
          "/(guest-routes)/(sign-in)/sign-up/": {
            component: () => SignUpForm,
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
