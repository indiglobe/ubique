export function EmployeeDashboardQuickOverviewSkeleton() {
  return (
    <section className="@container space-y-5">
      {/* Section heading */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-2">
          <div className="bg-muted h-3 w-36 animate-pulse rounded" />
          <div className="bg-muted h-7 w-52 animate-pulse rounded" />
          <div className="bg-muted h-4 w-72 max-w-full animate-pulse rounded" />
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-muted size-4 animate-pulse rounded" />
          <div className="bg-muted h-3 w-24 animate-pulse rounded" />
        </div>
      </div>

      {/* Statistics cards */}
      <div className="2xs:grid-cols-2 grid grid-cols-1 gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="border-foreground/10 bg-background rounded-xl border p-5"
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1 space-y-4">
                <div className="bg-muted h-3 w-28 animate-pulse rounded" />
                <div className="bg-muted h-9 w-20 animate-pulse rounded-md" />
              </div>

              <div className="bg-muted size-10 shrink-0 animate-pulse rounded-md" />
            </div>

            <div className="bg-muted mt-3 h-3 w-32 animate-pulse rounded" />
          </div>
        ))}
      </div>

      {/* Attendance details */}
      <div className="grid gap-4 @sm:grid-cols-3 @lg:grid-cols-5">
        {/* Attendance breakdown skeleton */}
        <div className="border-foreground/10 bg-background rounded-xl border p-5 @sm:col-span-3 @lg:col-span-3">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-2">
              <div className="bg-muted h-4 w-36 animate-pulse rounded" />
              <div className="bg-muted h-3 w-56 max-w-full animate-pulse rounded" />
            </div>

            <div className="bg-muted size-9 animate-pulse rounded-lg" />
          </div>

          {/* Progress bar */}
          <div className="bg-muted mt-7 h-3 w-full animate-pulse rounded-full" />

          {/* Attendance statistics */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <div className="flex items-center gap-2">
                  <div className="bg-muted size-2 animate-pulse rounded-full" />
                  <div className="bg-muted h-3 w-14 animate-pulse rounded" />
                </div>

                <div className="bg-muted mt-2 h-7 w-12 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Attendance rate skeleton */}
        <div className="border-foreground/10 bg-background rounded-xl border p-5 @sm:col-span-3 @lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="bg-muted h-4 w-32 animate-pulse rounded" />
              <div className="bg-muted h-3 w-40 animate-pulse rounded" />
            </div>

            <div className="bg-muted size-9 animate-pulse rounded-lg" />
          </div>

          {/* Attendance rate circle */}
          <div className="mt-7 flex items-center gap-5">
            <div className="bg-muted size-24 shrink-0 animate-pulse rounded-full" />

            <div className="min-w-0 flex-1 space-y-2">
              <div className="bg-muted h-4 w-36 max-w-full animate-pulse rounded" />
              <div className="bg-muted h-3 w-full animate-pulse rounded" />
              <div className="bg-muted h-3 w-24 animate-pulse rounded" />
            </div>
          </div>

          {/* Late arrivals */}
          <div className="border-foreground/10 mt-6 flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2">
              <div className="bg-muted size-4 animate-pulse rounded" />
              <div className="bg-muted h-3 w-24 animate-pulse rounded" />
            </div>

            <div className="bg-muted h-4 w-8 animate-pulse rounded" />
          </div>

          {/* Pending check-outs */}
          <div className="border-foreground/10 mt-3 flex items-center justify-between border-t pt-3">
            <div className="flex items-center gap-2">
              <div className="bg-muted size-4 animate-pulse rounded" />
              <div className="bg-muted h-3 w-32 animate-pulse rounded" />
            </div>

            <div className="bg-muted h-4 w-8 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}
