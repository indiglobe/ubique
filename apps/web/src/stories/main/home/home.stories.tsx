import { HomePage } from "@/components/main/home/home";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof HomePage> & TypedMetaOptions = {
  component: HomePage,
};

export default meta;

type Story = StoryObj<typeof HomePage> & TypedStoryOptions;

export const HomePageStory: Story = {
  args: {},
};
