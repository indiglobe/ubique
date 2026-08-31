import { RootNotFound } from "@/components/main/root-not-found";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof RootNotFound> & TypedMetaOptions = {
  component: RootNotFound,
};

export default meta;

type Story = StoryObj<typeof RootNotFound> & TypedStoryOptions;

export const RootNotFoundStory: Story = {
  args: {},
};
