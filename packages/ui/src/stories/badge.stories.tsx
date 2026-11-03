import { Badge } from "@/components/badge";
import { Meta, StoryObj } from "@storybook/react-vite";
import {
  Check,
  Clock,
  Info,
  LoaderCircle,
  ShieldCheck,
  TriangleAlert,
  X,
} from "lucide-react";

const meta = {
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
        "success",
        "warning",
        "info",
      ],
    },
    asChild: {
      control: "boolean",
    },
  },
  args: {
    variant: "default",
    children: "Badge",
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="success">
        <Check />
        Approved
      </Badge>

      <Badge variant="warning">
        <TriangleAlert />
        Needs review
      </Badge>

      <Badge variant="destructive">
        <X />
        Rejected
      </Badge>

      <Badge variant="info">
        <Info />
        Information
      </Badge>

      <Badge variant="secondary">
        <Clock />
        Pending
      </Badge>

      <Badge variant="default">
        <ShieldCheck />
        Verified
      </Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="success">
        <span className="size-1.5 rounded-full bg-current" />
        Active
      </Badge>

      <Badge variant="warning">
        <span className="size-1.5 rounded-full bg-current" />
        Pending
      </Badge>

      <Badge variant="destructive">
        <span className="size-1.5 rounded-full bg-current" />
        Inactive
      </Badge>

      <Badge variant="outline">
        <span className="size-1.5 rounded-full bg-primary-500" />
        Draft
      </Badge>
    </div>
  ),
};

export const WithLoadingState: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="secondary">
        <LoaderCircle className="animate-spin" />
        Processing
      </Badge>

      <Badge variant="info">Syncing</Badge>

      <Badge variant="success">
        <Check />
        Complete
      </Badge>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="w-full max-w-md rounded-2xl border border-primary-200/70 bg-background p-5 shadow-sm dark:border-primary-900/70">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-brand-secondary text-base font-semibold text-foreground">
            Quarterly sales report
          </h3>
          <p className="text-sm text-foreground/60">Updated 10 minutes ago</p>
        </div>

        <Badge variant="success">
          <Check />
          Published
        </Badge>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge variant="outline">Q4 2026</Badge>
        <Badge variant="secondary">Sales</Badge>
        <Badge variant="info">Reviewed</Badge>
      </div>
    </div>
  ),
};

export const DarkModePreview: Story = {
  render: () => (
    <div className="dark w-full rounded-2xl bg-background p-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="info">Info</Badge>
      </div>
    </div>
  ),
};
