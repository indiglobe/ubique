import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";

export function MetricCard({ className }: ComponentProps<"div">) {
  return (
    <div
      data-slot={`metric-card`}
      className={cn("border-foreground/5 rounded-2xl border p-4", className)}
    />
  );
}

export function MetricCardIcon({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot={`metric-card-icon`}
      className={cn(`grid size-9 place-items-center rounded-xl`, className)}
      {...props}
    />
  );
}

export function MetricCardValue({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot={`metric-card-value`}
      className={cn(`font-brand-secondary mt-4 text-2xl font-bold`, className)}
      {...props}
    />
  );
}

export function MetricCardLabel({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot={`metric-card-label`}
      className={cn(`text-foreground/45 mt-1 text-xs`, className)}
      {...props}
    />
  );
}
