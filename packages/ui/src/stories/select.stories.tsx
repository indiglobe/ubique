import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/select";

const meta: Meta<typeof Select> & TypedMetaOptions = {
  component: Select,
  args: {
    disabled: false,
    required: false,
    name: "example-select",
  },
  argTypes: {
    defaultValue: {
      control: "text",
      description: "Initial selected value.",
    },
    value: {
      control: false,
      description: "Current selected value for controlled usage.",
    },
    onValueChange: {
      action: "value changed",
      description: "Called when the selected value changes.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the select.",
    },
    required: {
      control: "boolean",
      description: "Marks the select as required.",
    },
    name: {
      control: "text",
      description: "Name used when submitting a form.",
    },
    open: {
      control: false,
    },
    defaultOpen: {
      control: false,
    },
    dir: {
      control: false,
    },
    // modal: {
    //   control: false,
    // },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable select component built on Radix UI. Supports selectable options, grouped items, disabled states, and configurable trigger sizes.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
  { label: "Mango", value: "mango" },
];

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-55">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};

export const Small: Story = {
  args: {
    defaultValue: "apple",
  },
  argTypes: {
    defaultValue: {
      control: "select",
      options: ["apple", "banana", "orange", "mango"],
    },
  },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger size="sm" className="w-55">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: "banana",
  },
  argTypes: {
    defaultValue: {
      control: "select",
      options: ["apple", "banana", "orange", "mango"],
    },
  },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-55">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "apple",
  },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-55">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};

export const GroupedOptions: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-60">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frontend</SelectLabel>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
        </SelectGroup>

        <SelectSeparator />

        <SelectGroup>
          <SelectLabel>Backend</SelectLabel>
          <SelectItem value="node">Node.js</SelectItem>
          <SelectItem value="django">Django</SelectItem>
          <SelectItem value="rails">Ruby on Rails</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const WithDisabledOption: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-55">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange" disabled>
          Orange (unavailable)
        </SelectItem>
        <SelectItem value="mango">Mango</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Controlled: Story = {
  argTypes: {
    defaultValue: {
      control: false,
    },
  },
  render: function ControlledSelect(args) {
    const [value, setValue] = useState("apple");

    return (
      <div className="flex w-60 flex-col gap-3">
        <Select {...args} value={value} onValueChange={setValue}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="text-sm text-muted-foreground">
          Selected value: {value || "None"}
        </p>
      </div>
    );
  },
};
