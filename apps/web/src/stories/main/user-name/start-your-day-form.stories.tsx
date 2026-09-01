import { StartYourDayForm } from "@/components/main/user-name/start-your-day-form";
import type { TypedMetaOptions, TypedStoryOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof StartYourDayForm> & TypedMetaOptions = {
  component: StartYourDayForm,
};

export default meta;

type Story = StoryObj<typeof StartYourDayForm> & TypedStoryOptions;

export const StartYourDayFormStory: Story = {
  args: {
    
  },
};