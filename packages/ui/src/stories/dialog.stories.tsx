import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "@/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";

const meta: Meta<typeof Dialog> & TypedMetaOptions = {
  component: Dialog,
  args: {
    modal: true,
  },
  argTypes: {
    open: {
      control: false,
      description: "Controls whether the dialog is open.",
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the dialog is initially open.",
    },
    onOpenChange: {
      action: "open changed",
      description: "Called when the dialog open state changes.",
    },
    modal: {
      control: "boolean",
      description: "Whether the dialog behaves modally.",
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A modal dialog built on Radix UI. Use it to display important information, confirmation actions, or forms in an overlay.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>
            This is a dialog description. Use this space to explain the purpose
            of the dialog to the user.
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Dialog content goes here. You can place text, forms, or other
          components inside the dialog.
        </p>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithLongContent: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">View details</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms and conditions</DialogTitle>
          <DialogDescription>
            Please review the following information before continuing.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-64 space-y-3 overflow-y-auto pr-2 text-sm text-muted-foreground">
          <p>
            By continuing, you agree to follow the terms and conditions
            associated with this service.
          </p>
          <p>
            You are responsible for keeping your account credentials secure and
            for ensuring that the information you provide is accurate.
          </p>
          <p>
            Services may be updated periodically to improve functionality,
            reliability, and security.
          </p>
          <p>
            If you have questions about these terms, please contact the
            appropriate support team before proceeding.
          </p>
        </div>

        <DialogFooter showCloseButton>
          <Button>Accept and continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Confirmation: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete item</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            selected item and remove its associated data.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive">Delete</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Create project</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a project</DialogTitle>
          <DialogDescription>
            Enter a name and description for your new project.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="space-y-2">
            <label htmlFor="project-name" className="text-sm font-medium">
              Project name
            </label>
            <input
              id="project-name"
              name="projectName"
              placeholder="My project"
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="project-description"
              className="text-sm font-medium"
            >
              Description
            </label>
            <textarea
              id="project-description"
              name="projectDescription"
              placeholder="Describe your project"
              rows={3}
              className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  ),
};

export const WithoutCloseButton: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Custom dialog</DialogTitle>
          <DialogDescription>
            The default close icon is hidden. Use the actions below to close
            this dialog.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close dialog</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithFooterCloseButton: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="secondary">Open settings</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your preferences. Changes can be reviewed before you close
            this dialog.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Email notifications</p>
              <p className="text-xs text-muted-foreground">
                Receive updates by email.
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              aria-label="Email notifications"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Product updates</p>
              <p className="text-xs text-muted-foreground">
                Receive announcements about new features.
              </p>
            </div>
            <input type="checkbox" aria-label="Product updates" />
          </div>
        </div>

        <DialogFooter showCloseButton>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Controlled: Story = {
  render: function ControlledDialog(args) {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <Dialog {...args} open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Open controlled dialog</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled dialog</DialogTitle>
              <DialogDescription>
                This dialog's open state is managed by React state.
              </DialogDescription>
            </DialogHeader>

            <p className="text-sm text-muted-foreground">
              Current state: {open ? "Open" : "Closed"}
            </p>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <p className="text-sm text-muted-foreground">
          Dialog status: {open ? "Open" : "Closed"}
        </p>
      </div>
    );
  },
};
