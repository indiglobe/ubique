import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@repo/styles/cn";

const buttonVariants = cva(
  "focus-visible:ring-offset-background inline-flex transition-colors shrink-0 items-center justify-center gap-2 text-base font-medium whitespace-nowrap outline-none focus-visible:border-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-red-400 dark:aria-invalid:ring-red-600 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500 text-background dark:text-foreground hover:bg-primary-400 focus-visible:bg-primary-600 focus-visible:ring-primary-600",
        primary:
          "bg-primary-500 text-background dark:text-foreground hover:bg-primary-400 focus-visible:bg-primary-600 focus-visible:ring-primary-600",
        secondary:
          "bg-secondary-500 text-background dark:text-foreground hover:bg-secondary-400 focus-visible:bg-secondary-600 focus-visible:ring-secondary-600",
        accent:
          "bg-accent-500 text-background dark:text-foreground hover:bg-accent-400 focus-visible:bg-accent-600 focus-visible:ring-accent-600",
        info: "bg-indigo-500 text-background dark:text-foreground hover:bg-indigo-400 focus-visible:bg-indigo-600 focus-visible:ring-indigo-600",
        success:
          "bg-green-600 text-background dark:text-foreground hover:bg-green-500 focus-visible:bg-green-700 focus-visible:ring-green-700",
        warn: "bg-yellow-600 text-background dark:text-foreground hover:bg-yellow-500 focus-visible:bg-yellow-700 focus-visible:ring-yellow-700",
        destructive:
          "text-background dark:text-foreground bg-red-500 hover:bg-red-400 focus-visible:bg-red-600 focus-visible:ring-red-600",
        ghost: "hover:bg-foreground/10 hover:text-foreground",
        outline:
          "bg-background border-foreground focus-visible:border focus-visible:border-foreground border hover:bg-black/20 dark:hover:bg-white/20",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 text-sm has-[>svg]:px-2.5",
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
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      corner: "sharp",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  corner = "rounded",
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
      data-size={size}
      className={cn(buttonVariants({ variant, size, className, corner }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
