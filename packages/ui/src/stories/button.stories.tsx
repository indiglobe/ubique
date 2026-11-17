import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/button";
import { ComponentProps } from "react";

const meta: Meta<typeof Button> & TypedMetaOptions = {
  component: Button,
  args: {
    children: "Sample button",
    variant: "default",
    corner: "sharp",
    size: "default",
    appearance: "filled",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "accent",
        "default",
        "destructive",
        "primary",
        "secondary",
        "info",
        "warn",
        "success",
      ] satisfies NonNullable<
        Pick<ComponentProps<typeof Button>, "variant">["variant"]
      >[],
    },
    corner: {
      control: "select",
      options: ["circle", "rounded", "sharp"] satisfies NonNullable<
        Pick<ComponentProps<typeof Button>, "corner">["corner"]
      >[],
    },
    size: {
      control: "select",
      options: [
        "default",
        "icon",
        "icon-lg",
        "icon-sm",
        "icon-xs",
        "lg",
        "sm",
        "xs",
      ] satisfies NonNullable<
        Pick<ComponentProps<typeof Button>, "size">["size"]
      >[],
    },
    appearance: {
      control: "select",
      options: ["filled", "ghost", "outline"] satisfies NonNullable<
        Pick<ComponentProps<typeof Button>, "appearance">["appearance"]
      >[],
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const DefaultButtonStory: Story = {
  args: {},
};
