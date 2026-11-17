import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";

function DashboardSkeleton({ className }: ComponentProps<"div">) {
  return (
    <div
      aria-label="Loading dashboard"
      aria-busy="true"
      className={cn("bg-background text-foreground min-h-screen", className)}
    >
      <div className="mx-auto w-full max-w-400 space-y-8">
        {/* Hero Banner */}
        <section className="bg-foreground/5 relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10">
          <div className="max-w-2xl space-y-5">
            {/* Badge */}
            <Skeleton className="h-7 w-48 rounded-full" />

            {/* Heading */}
            <div className="space-y-3">
              <Skeleton className="h-9 w-3/4 max-w-md sm:h-11" />
              <Skeleton className="h-9 w-2/3 max-w-sm sm:h-11" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full max-w-lg" />
              <Skeleton className="h-4 w-4/5 max-w-md" />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Skeleton className="h-10 w-40 rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
          </div>

          {/* Decorative illustration */}
          <div className="absolute right-10 bottom-8 hidden lg:flex">
            <Skeleton className="size-40 rounded-full" />
          </div>
        </section>

        {/* Business Overview */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="space-y-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-6 w-40" />
            </div>

            <Skeleton className="h-4 w-52 max-w-full" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border-foreground/10 bg-background rounded-xl border p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1 space-y-3">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-9 w-20" />
                  </div>

                  <Skeleton className="size-10 rounded-lg" />
                </div>

                <Skeleton className="mt-3 h-3 w-36 max-w-full" />
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-6 w-32" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border-foreground/10 bg-background flex items-center gap-4 rounded-xl border p-4"
              >
                <Skeleton className="size-11 shrink-0 rounded-lg" />

                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-32 max-w-full" />
                  <Skeleton className="h-3 w-40 max-w-full" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Module Directory */}
        <section className="scroll-mt-24 space-y-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="space-y-2">
              <Skeleton className="h-3 w-36" />
              <Skeleton className="h-6 w-52" />
              <Skeleton className="h-4 w-64 max-w-full" />
            </div>

            <Skeleton className="h-11 w-full rounded-lg lg:max-w-sm" />
          </div>

          {/* Category filters */}
          <div className="flex gap-2 overflow-hidden pb-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-9 w-24 shrink-0 rounded-lg" />
            ))}
          </div>

          {/* Module count */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Module cards */}
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="border-foreground/10 bg-background flex min-h-37.5 flex-col rounded-xl border p-5"
              >
                <div className="flex items-start justify-between">
                  <Skeleton className="size-11 rounded-lg" />
                  <Skeleton className="h-4 w-6" />
                </div>

                <div className="mt-5 flex items-end justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-4 w-36 max-w-full" />
                    <Skeleton className="h-3 w-44 max-w-full" />
                  </div>

                  <Skeleton className="mb-1 size-4 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-foreground/10 flex flex-col justify-between gap-3 border-t pt-5 sm:flex-row">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-3 w-52" />
        </footer>
      </div>
    </div>
  );
}

function Skeleton({ className }: ComponentProps<"div">) {
  return (
    <div
      className={cn("bg-foreground/5 animate-pulse rounded-md", className)}
    />
  );
}

export { DashboardSkeleton };
