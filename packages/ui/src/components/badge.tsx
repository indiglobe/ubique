import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@repo/styles/cn";

const badgeVariants = cva(
  [
    "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1.5",
    "rounded-full border border-transparent px-2.5 py-0.5",
    "text-xs font-semibold tracking-wide whitespace-nowrap",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "aria-invalid:border-red-500 aria-invalid:ring-2 aria-invalid:ring-red-500/20",
    "[&>svg]:pointer-events-none [&>svg]:size-3.5 [&>svg]:shrink-0",
    "[&>svg]:transition-colors",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "border-primary-200/70 bg-primary-100 text-primary-800",
          "dark:border-primary-800/70 dark:bg-primary-900/60 dark:text-primary-200",
          "[a]:hover:bg-primary-200 dark:[a]:hover:bg-primary-800",
        ].join(" "),

        secondary: [
          "border-secondary-200/70 bg-secondary-100 text-secondary-800",
          "dark:border-secondary-800/70 dark:bg-secondary-900/50 dark:text-secondary-200",
          "[a]:hover:bg-secondary-200 dark:[a]:hover:bg-secondary-800",
        ].join(" "),

        destructive: [
          "border-red-200 bg-red-50 text-red-700",
          "dark:border-red-900/70 dark:bg-red-950/50 dark:text-red-300",
          "focus-visible:ring-red-500/30",
          "[a]:hover:bg-red-100 dark:[a]:hover:bg-red-900/50",
        ].join(" "),

        outline: [
          "border-primary-200 bg-background text-foreground",
          "dark:border-primary-800 dark:bg-background",
          "[a]:hover:border-primary-300 [a]:hover:bg-primary-50 [a]:hover:text-primary-800",
          "dark:[a]:hover:border-primary-700 dark:[a]:hover:bg-primary-950 dark:[a]:hover:text-primary-200",
        ].join(" "),

        ghost: [
          "text-foreground/70",
          "hover:bg-primary-100/70 hover:text-primary-800",
          "dark:hover:bg-primary-900/50 dark:hover:text-primary-200",
        ].join(" "),

        link: [
          "h-auto rounded-none px-0 text-primary-700 underline-offset-4",
          "hover:text-primary-500 hover:underline",
          "dark:text-primary-300 dark:hover:text-primary-200",
        ].join(" "),

        success: [
          "border-green-200 bg-green-50 text-green-700",
          "dark:border-green-900/70 dark:bg-green-950/50 dark:text-green-300",
          "[a]:hover:bg-green-100 dark:[a]:hover:bg-green-900/50",
        ].join(" "),

        warning: [
          "border-amber-200 bg-amber-50 text-amber-800",
          "dark:border-amber-900/70 dark:bg-amber-950/50 dark:text-amber-300",
          "[a]:hover:bg-amber-100 dark:[a]:hover:bg-amber-900/50",
        ].join(" "),

        info: [
          "border-sky-200 bg-sky-50 text-sky-800",
          "dark:border-sky-900/70 dark:bg-sky-950/50 dark:text-sky-300",
          "[a]:hover:bg-sky-100 dark:[a]:hover:bg-sky-900/50",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
