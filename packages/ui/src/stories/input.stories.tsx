import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@/components/input";
import { ComponentProps } from "react";

const meta: Meta<typeof Input> & TypedMetaOptions = {
  component: Input,
  args: {
    variant: "default",
    placeholder: "Sample placeholder",
    corner: "sharp",
    "aria-invalid": false,
    type: "text",
  },
  argTypes: {
    corner: {
      control: "select",
      options: ["circle", "rounded", "sharp"] satisfies NonNullable<
        Pick<ComponentProps<typeof Input>, "corner">["corner"]
      >[],
    },
    type: {
      control: "select",
      options: [
        "button",
        "checkbox",
        "color",
        "date",
        "datetime-local",
        "email",
        "file",
        "hidden",
        "image",
        "month",
        "number",
        "password",
        "radio",
        "range",
        "reset",
        "search",
        "submit",
        "tel",
        "text",
        "time",
        "url",
        "week",
      ] satisfies NonNullable<
        Pick<ComponentProps<typeof Input>, "type">["type"]
      >[],
    },
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
        // "success",
      ] satisfies NonNullable<
        Pick<ComponentProps<typeof Input>, "variant">["variant"]
      >[],
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const DefaultButtonStory: Story = {
  args: {},
};
