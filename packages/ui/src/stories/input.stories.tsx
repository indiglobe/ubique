import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@/components/input";

const meta: Meta<typeof Input> & TypedMetaOptions = {
  component: Input,
  args: {
    type: "text",
    placeholder: "Enter text...",
    disabled: false,
    required: false,
    readOnly: false,
    "aria-invalid": false,
  },
  argTypes: {
    type: {
      control: "select",
      options: [
        "text",
        "email",
        "password",
        "number",
        "search",
        "tel",
        "url",
        "date",
        "time",
        "datetime-local",
        "month",
        "week",
        "file",
      ] satisfies NonNullable<
        Pick<React.ComponentProps<typeof Input>, "type">["type"]
      >[],
      description: "The input field type.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text displayed when the input is empty.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input.",
    },
    required: {
      control: "boolean",
      description: "Marks the input as required.",
    },
    readOnly: {
      control: "boolean",
      description: "Prevents editing the input value.",
    },
    "aria-invalid": {
      control: "boolean",
      description: "Displays the invalid input state.",
    },
    value: {
      control: "text",
      description: "Controlled input value.",
    },
    defaultValue: {
      control: "text",
      description: "Initial input value.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes.",
    },
    onChange: {
      control: false,
      action: "value changed",
    },
    onBlur: {
      control: false,
      action: "blurred",
    },
    onFocus: {
      control: false,
      action: "focused",
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A reusable input component supporting different HTML input types, disabled and read-only states, validation styling, and custom CSS classes.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
  },
};

export const WithValue: Story = {
  args: {
    type: "text",
    defaultValue: "Sample input value",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "name@example.com",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter a number",
  },
};

export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "This input is disabled",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    defaultValue: "This value cannot be edited",
    readOnly: true,
  },
};

export const Required: Story = {
  args: {
    placeholder: "This field is required",
    required: true,
  },
};

export const Invalid: Story = {
  args: {
    defaultValue: "invalid-email",
    type: "email",
    "aria-invalid": true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <label htmlFor="storybook-input" className="text-sm font-medium">
        Email address
      </label>
      <Input id="storybook-input" {...args} />
      <p className="text-sm text-muted-foreground">
        Enter the email address associated with your account.
      </p>
    </div>
  ),
  args: {
    type: "email",
    placeholder: "name@example.com",
  },
};

export const File: Story = {
  args: {
    type: "file",
  },
};

export const CustomStyling: Story = {
  args: {
    placeholder: "Custom styled input",
    className: "border-primary-500 focus-visible:ring-primary-500/30",
  },
};