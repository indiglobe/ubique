import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@repo/styles/cn";

const buttonVariants = cva(
  "focus-visible:ring-offset-background inline-flex transition-colors shrink-0 items-center justify-center gap-2 text-base font-medium whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-red-400 dark:aria-invalid:ring-red-600 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "",
        primary: "",
        secondary: "",
        accent: "",
        info: "",
        success: "",
        warn: "",
        destructive: "",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
      corner: {
        sharp: "rounded-none",
        rounded: "rounded-md",
        circle: "rounded-full",
      },
      appearance: {
        ghost: "",
        filled: "",
        outline: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      corner: "sharp",
      appearance: "filled",
    },
    compoundVariants: [
      {
        variant: "primary",
        appearance: "filled",
        className:
          "bg-primary-500 text-background hover:bg-primary-400 focus-visible:bg-primary-600 focus-visible:ring-primary-600",
      },
      {
        variant: "default",
        appearance: "filled",
        className:
          "bg-primary-500 text-background hover:bg-primary-400 focus-visible:bg-primary-600 focus-visible:ring-primary-600",
      },
      {
        variant: "secondary",
        appearance: "filled",
        className:
          "bg-secondary-500 text-background hover:bg-secondary-400 focus-visible:bg-secondary-600 focus-visible:ring-secondary-600",
      },
      {
        variant: "accent",
        appearance: "filled",
        className:
          "bg-accent-500 text-background hover:bg-accent-400 focus-visible:bg-accent-600 focus-visible:ring-accent-600",
      },
      {
        variant: "info",
        appearance: "filled",
        className:
          "bg-indigo-500 text-background hover:bg-indigo-400 focus-visible:bg-indigo-600 focus-visible:ring-indigo-600",
      },
      {
        variant: "success",
        appearance: "filled",
        className:
          "bg-green-600 text-background hover:bg-green-500 focus-visible:bg-green-700 focus-visible:ring-green-700",
      },
      {
        variant: "warn",
        appearance: "filled",
        className:
          "bg-yellow-600 text-background hover:bg-yellow-500 focus-visible:bg-yellow-700 focus-visible:ring-yellow-700",
      },
      {
        variant: "destructive",
        appearance: "filled",
        className:
          "text-background bg-red-500 hover:bg-red-400 focus-visible:bg-red-600 focus-visible:ring-red-600",
      },
      {
        variant: "primary",
        appearance: "ghost",
        className: "hover:bg-primary-500/10 text-primary-500",
      },
      {
        variant: "default",
        appearance: "ghost",
        className: "hover:bg-primary-500/10 text-primary-500",
      },
      {
        variant: "secondary",
        appearance: "ghost",
        className: "hover:bg-secondary-500/10 text-secondary-500",
      },
      {
        variant: "accent",
        appearance: "ghost",
        className: "hover:bg-accent-500/10 text-accent-500",
      },
      {
        variant: "info",
        appearance: "ghost",
        className: "hover:bg-indigo-500/10 text-indigo-500",
      },
      {
        variant: "success",
        appearance: "ghost",
        className: "hover:bg-green-500/10 text-green-500",
      },
      {
        variant: "warn",
        appearance: "ghost",
        className: "hover:bg-yellow-500/10 text-yellow-500",
      },
      {
        variant: "destructive",
        appearance: "ghost",
        className: "hover:bg-red-500/10 text-red-500",
      },
      {
        variant: "primary",
        appearance: "outline",
        className:
          "bg-background border-primary-500 focus-visible:border focus-visible:border-primary-500 border hover:bg-primary-500/20 dark:hover:bg-primary-500/20 text-primary-500",
      },
      {
        variant: "default",
        appearance: "outline",
        className:
          "bg-background border-primary-500 focus-visible:border focus-visible:border-primary-500 border hover:bg-primary-500/20 dark:hover:bg-primary-500/20 text-primary-500",
      },
      {
        variant: "secondary",
        appearance: "outline",
        className:
          "bg-background border-secondary-500 focus-visible:border focus-visible:border-secondary-500 border hover:bg-secondary-500/20 dark:hover:bg-secondary-500/20 text-secondary-500",
      },
      {
        variant: "accent",
        appearance: "outline",
        className:
          "bg-background border-accent-500 focus-visible:border focus-visible:border-accent-500 border hover:bg-accent-500/20 dark:hover:bg-accent-500/20 text-accent-500",
      },
      {
        variant: "info",
        appearance: "outline",
        className:
          "bg-background border-indigo-500 focus-visible:border focus-visible:border-indigo-500 border hover:bg-indigo-500/20 dark:hover:bg-indigo-500/20 text-indigo-500",
      },
      {
        variant: "success",
        appearance: "outline",
        className:
          "bg-background border-green-500 focus-visible:border focus-visible:border-green-500 border hover:bg-green-500/20 dark:hover:bg-green-500/20 text-green-500",
      },
      {
        variant: "warn",
        appearance: "outline",
        className:
          "bg-background border-yellow-500 focus-visible:border focus-visible:border-yellow-500 border hover:bg-yellow-500/20 dark:hover:bg-yellow-500/20 text-yellow-500",
      },
      {
        variant: "destructive",
        appearance: "outline",
        className:
          "bg-background border-red-500 focus-visible:border focus-visible:border-red-500 border hover:bg-red-500/20 dark:hover:bg-red-500/20 text-red-500",
      },
    ],
  },
);

function Button({
  className,
  variant = "default",
  appearance = "filled",
  size = "default",
  asChild = false,
  corner = "sharp",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-appearance={appearance}
      data-corner={corner}
      data-size={size}
      className={cn(
        buttonVariants({ variant, size, className, corner, appearance }),
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
