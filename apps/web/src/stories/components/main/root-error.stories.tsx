import { RootError } from "@/components/main/root-error";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof RootError> & TypedMetaOptions = {
  component: RootError,
};

export default meta;

type Story = StoryObj<typeof RootError> & TypedStoryOptions;

export const RootErrorStory: Story = {
  args: {},
};
