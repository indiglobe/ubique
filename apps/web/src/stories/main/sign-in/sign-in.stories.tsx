import  { SignIn } from "@/components/main/sign-in/sign-in";
import type { TypedMetaOptions, TypedStoryOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof SignIn> & TypedMetaOptions = {
  component: SignIn,
};

export default meta;

type Story = StoryObj<typeof SignIn> & TypedStoryOptions;

export const SignInStory: Story = {
  args: {
    
  },
};