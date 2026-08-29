import { GoogleSigninButton } from "@/components/signin-buttons";
import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

function Buttons() {
  return <GoogleSigninButton />;
}

const meta: Meta<typeof Buttons> & TypedMetaOptions = {
  component: () => (
    <div className="min-w-svw -m-4">
      <Buttons />
    </div>
  ),

  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Buttons>;

export const ButtonsStory: Story = {
  args: {},
};
