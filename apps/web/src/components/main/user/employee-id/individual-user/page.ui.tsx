import * as React from "react";
import { cva  } from "@repo/styles/cva";
import type {VariantProps} from "@repo/styles/cva";
import { cn } from "@repo/styles/cn";

const summaryMetricIconVariants = cva(
  "flex size-10 shrink-0 items-center justify-center rounded-md",
  {
    variants: {
      tone: {
        primary: "bg-primary/10 text-primary",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
      },
    },
    defaultVariants: {
      tone: "primary",
    },
  },
);

const summaryMetricVariants = cva("flex min-w-0 items-center gap-3", {
  variants: {
    size: {
      default: "gap-3",
      sm: "gap-2",
      lg: "gap-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type SummaryMetricContextValue = {
  tone: NonNullable<VariantProps<typeof summaryMetricIconVariants>["tone"]>;
};

const SummaryMetricContext = React.createContext<SummaryMetricContextValue>({
  tone: "primary",
});

type SummaryMetricProps = React.ComponentProps<"div"> &
  VariantProps<typeof summaryMetricVariants> & {
    tone?: VariantProps<typeof summaryMetricIconVariants>["tone"];
  };

function SummaryMetric({
  className,
  size,
  tone = "primary",
  children,
  ...props
}: SummaryMetricProps) {
  return (
    <SummaryMetricContext.Provider value={{ tone }}>
      <div
        data-slot="summary-metric"
        className={cn(summaryMetricVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    </SummaryMetricContext.Provider>
  );
}

function SummaryMetricIcon({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { tone } = React.useContext(SummaryMetricContext);

  return (
    <div
      data-slot="summary-metric-icon"
      className={cn(summaryMetricIconVariants({ tone }), className)}
      {...props}
    />
  );
}

function SummaryMetricContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="summary-metric-content"
      className={cn("min-w-0 flex-1", className)}
      {...props}
    />
  );
}

function SummaryMetricLabel({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="summary-metric-label"
      className={cn("text-muted-foreground text-xs font-medium", className)}
      {...props}
    />
  );
}

function SummaryMetricValue({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="summary-metric-value"
      className={cn("mt-1 truncate text-sm font-semibold", className)}
      {...props}
    />
  );
}

export {
  SummaryMetric,
  SummaryMetricIcon,
  SummaryMetricContent,
  SummaryMetricLabel,
  SummaryMetricValue,
};
