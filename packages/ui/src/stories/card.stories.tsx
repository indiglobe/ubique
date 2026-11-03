import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/card";
import { Button } from "@/components/button";
import {
  Users,
  ArrowUpRight,
  MoreHorizontal,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: Card,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
  args: {
    size: "default",
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-87.5">
      <CardHeader>
        <CardTitle>Employee directory</CardTitle>
        <CardDescription>
          Manage employees across your organization.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-foreground/70">
          Browse employee profiles, review organizational details, and manage
          your team.
        </p>
      </CardContent>
    </Card>
  ),
};

export const Small: Story = {
  args: {
    size: "sm",
  },
  render: (args) => (
    <Card {...args} className="w-75">
      <CardHeader>
        <CardTitle>Quick overview</CardTitle>
        <CardDescription>
          A compact card for smaller dashboard sections.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-foreground/70">
          Compact spacing keeps information organized without sacrificing
          readability.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithHeaderAction: Story = {
  render: (args) => (
    <Card {...args} className="w-87.5">
      <CardHeader>
        <CardTitle>Team members</CardTitle>
        <CardDescription>Current team overview</CardDescription>

        <CardAction>
          <Button variant="ghost" size="icon" aria-label="More team options">
            <MoreHorizontal className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-900/60 dark:text-primary-300">
            <Users className="size-5" />
          </div>

          <div>
            <p className="text-2xl font-bold tracking-tight">128</p>
            <p className="text-xs text-foreground/55">Active employees</p>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <Card {...args} className="w-87.5">
      <CardHeader>
        <CardTitle>Employee growth</CardTitle>
        <CardDescription>Employee registrations this month</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2">
          <span className="font-brand-secondary text-3xl font-bold tracking-tight">
            248
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-accent-100 px-2 py-1 text-xs font-semibold text-accent-800 dark:bg-accent-900/50 dark:text-accent-200">
            <TrendingUp className="size-3.5" />
            12.8%
          </span>
        </div>
      </CardContent>

      <CardFooter className="justify-between">
        <span className="text-xs text-foreground/55">
          Compared to last month
        </span>

        <Button variant="ghost" size="sm" className="gap-1">
          View report
          <ArrowUpRight className="size-3.5" />
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const DashboardStat: Story = {
  render: (args) => (
    <Card {...args} className="w-75">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex size-11 items-center justify-center rounded-xl border border-primary-200/70 bg-linear-to-br from-primary-100 to-primary-50 text-primary-700 dark:border-primary-800 dark:from-primary-900/70 dark:to-primary-950 dark:text-primary-300">
            <Users className="size-5" />
          </div>

          <span className="inline-flex items-center gap-1 rounded-full bg-accent-100 px-2 py-1 text-xs font-semibold text-accent-800 dark:bg-accent-900/50 dark:text-accent-200">
            <TrendingUp className="size-3.5" />
            8.2%
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm font-medium text-foreground/55">
          Total employees
        </p>

        <p className="mt-2 font-brand-secondary text-3xl font-bold tracking-tight">
          1,284
        </p>

        <p className="mt-2 text-xs text-foreground/50">
          Compared to the previous month
        </p>
      </CardContent>
    </Card>
  ),
};

export const CustomAccent: Story = {
  render: (args) => (
    <Card {...args} className="w-87.5 border-accent-200/70 dark/70">
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-accent-100 text-accent-800 dark:bg-accent-900/60 dark:text-accent-200">
          <UserPlus className="size-5" />
        </div>

        <CardTitle>Invite employees</CardTitle>

        <CardDescription>
          Expand your organization by adding new team members.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-6 text-foreground/65">
          Invite employees to join your workspace and access the tools they
          need.
        </p>
      </CardContent>

      <CardFooter>
        <Button className="w-full gap-2">
          Invite employee
          <ArrowUpRight className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Grid: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-900/60 dark:text-primary-300">
            <Users className="size-5" />
          </div>

          <CardTitle>Total employees</CardTitle>
          <CardDescription>Registered in your organization</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="font-brand-secondary text-3xl font-bold">1,284</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-accent-100 text-accent-800 dark:bg-accent-900/60 dark:text-accent-200">
            <UserPlus className="size-5" />
          </div>

          <CardTitle>New employees</CardTitle>
          <CardDescription>Added this month</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="font-brand-secondary text-3xl font-bold">48</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-secondary-100 text-secondary-800 dark:bg-secondary-900/60 dark:text-secondary-200">
            <TrendingUp className="size-5" />
          </div>

          <CardTitle>Growth rate</CardTitle>
          <CardDescription>Monthly employee growth</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="font-brand-secondary text-3xl font-bold">8.2%</p>
        </CardContent>
      </Card>
    </div>
  ),
};
