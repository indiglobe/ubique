import { Logo,LogoIcon,LogoText } from "@/components/logo";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

function LogoComp() {
  return (
    <div>
      <Logo />
      <LogoIcon />
      <LogoText />
    </div>
  );
}

const meta: Meta<typeof LogoComp> & TypedMetaOptions = {
  component: LogoComp,
};

export default meta;

type Story = StoryObj<typeof LogoComp> & TypedStoryOptions;

export const LogoCompStory: Story = {
  args: {},
};
