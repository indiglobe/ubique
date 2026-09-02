import WelcomePage from "@/components/main/welcome/welcome";
import type { TypedMetaOptions, TypedStoryOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof WelcomePage> & TypedMetaOptions = {
  component: WelcomePage,
};

export default meta;

type Story = StoryObj<typeof WelcomePage> & TypedStoryOptions;

export const WelcomePageStory: Story = {
  args: {
    
  },
};