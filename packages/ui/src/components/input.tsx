"use client";

import { cn } from "@repo/styles/cn";
import * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border border-foreground/15 bg-background px-3 py-2 font-brand-primary text-sm text-foreground shadow-sm transition-all duration-200 placeholder:text-foreground/40 outline-none focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/20 file:mr-3 file:border-0 file:bg-transparent file:font-brand-primary file:text-sm file:font-medium file:text-foreground hover:border-foreground/25 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-foreground/4 disabled:text-foreground/40 disabled:opacity-60 aria-invalid:border-red-500 aria-invalid:focus-visible:ring-red-500/20 dark:bg-background dark:disabled:bg-foreground/6",

        className,
      )}
      {...props}
    />
  );
}

export { Input };
