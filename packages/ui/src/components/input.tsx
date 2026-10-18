import { cn } from "@repo/styles/cn";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const inputVariants = cva(
  cn(
    `h-10 w-full min-w-0 border bg-transparent px-4 py-1 text-base transition-colors outline-none md:text-sm dark:bg-input/30 text-foreground`,
    `file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground`,
    `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background`,
    `disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 dark:disabled:bg-input/80`,
    `aria-invalid:border-red-500 aria-invalid:ring-2 aria-invalid:ring-offset-2  aria-invalid:ring-offset-background aria-invalid:ring-red-500 dark:aria-invalid:border-red-500 dark:aria-invalid:ring-red-500`,
    `placeholder:text-xs`,
  ),
  {
    variants: {
      variant: {
        default:
          "focus-visible:ring-primary-600 border-primary-500 placeholder:text-primary-500/60 focus-visible:border-primary-500",
        primary:
          "focus-visible:ring-primary-600 border-primary-500 placeholder:text-primary-500/60 focus-visible:border-primary-500",
        secondary:
          "focus-visible:ring-secondary-600 border-secondary-500 placeholder:text-secondary-500/60 focus-visible:border-secondary-500",
        accent:
          "focus-visible:ring-accent-600 border-accent-500 placeholder:text-accent-500/60 focus-visible:border-accent-500",
        info: "focus-visible:ring-indigo-600 border-indigo-500 placeholder:text-indigo-500/60 focus-visible:border-indigo-500",
        success:
          "focus-visible:ring-green-700 border-green-500 placeholder:text-green-500/60 focus-visible:border-green-500",
        warn: "focus-visible:ring-yellow-700 border-yellow-500 placeholder:text-yellow-500/60 focus-visible:border-yellow-500",
        destructive:
          "focus-visible:ring-red-600 border-red-500 placeholder:text-red-500/60 focus-visible:border-red-500",
      },
      corner: {
        sharp: "rounded-none",
        rounded: "rounded-sm",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      corner: "rounded",
    },
    compoundVariants: [],
  },
);

function Input({
  className,
  type,
  variant = "default",
  corner = "rounded",
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      data-variant={variant}
      data-corner={corner}
      className={cn(inputVariants({ variant, corner }), className)}
      {...props}
    />
  );
}

export { Input };
