import { Footer } from "@/components/footer/footer";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Footer> & TypedMetaOptions = {
  component: Footer,
};

export default meta;

type Story = StoryObj<typeof Footer> & TypedStoryOptions;

export const FooterStory: Story = {
  args: {},
};
