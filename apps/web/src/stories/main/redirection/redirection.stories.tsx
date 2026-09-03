import Redirection from "@/components/main/redirection/redirection";
import type { TypedMetaOptions, TypedStoryOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Redirection> & TypedMetaOptions = {
  component: Redirection,
};

export default meta;

type Story = StoryObj<typeof Redirection> & TypedStoryOptions;

export const RedirectionStory: Story = {
  args: {
    
  },
};