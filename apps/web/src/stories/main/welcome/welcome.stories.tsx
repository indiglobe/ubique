import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { Route } from "@/routes/(authenticated-routes)/(new-user)/welcome/index";
import { mocked__welcomePageContext } from "@/integrations/storybook/mocked/context/welcome-page";
import { mocked } from "storybook/test";
import { serverFn__createOneUser } from "@/integrations/server-function/query/user.sf";

const meta = {
  beforeEach: () => {
    mocked(serverFn__createOneUser).mockResolvedValue();
  },
  parameters: {
    tanstack: {
      router: {
        route: Route,
        routeOverrides: {
          "/(authenticated-routes)/(new-user)/welcome/": {
            context: () => {
              return mocked__welcomePageContext({ image: false });
            },
          },
        },
      },
    },
  },
} satisfies Meta<typeof Route> & TypedMetaOptions;

export default meta;

type Story = StoryObj<typeof meta> & TypedStoryOptions;

export const WelcomePageStory: Story = {
  args: {},
};
