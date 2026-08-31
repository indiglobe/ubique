import { Header } from "@/components/header/header";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Header> & TypedMetaOptions = {
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header> & TypedStoryOptions;

export const HeaderStory: Story = {
  args: {},
};
