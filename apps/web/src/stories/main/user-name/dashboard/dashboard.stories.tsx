import { Dashboard } from "@/components/main/user-name/dashboard/dashboard";
import type { TypedMetaOptions, TypedStoryOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Dashboard> & TypedMetaOptions = {
  component: Dashboard,
};

export default meta;

type Story = StoryObj<typeof Dashboard> & TypedStoryOptions;

export const DashboardStory: Story = {
  args: {
    
  },
};