import {
  Search,
  UserRoundX,
  ArrowLeft,
  ShieldAlert,
  Fingerprint,
} from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Button } from "@repo/ui/button";

export function EmployeeNotFound() {
  const { employeeId } = useParams({
    from: "/(authenticated-routes)/dashboard/user/$employeeId/",
  });
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({ to: "/dashboard/user" });
  };

  return (
    <main className="bg-background font-brand-primary relative isolate flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="bg-primary-500/5 absolute -top-40 left-1/2 size-96 -translate-x-1/2 rounded-full blur-[110px]" />

        <div className="bg-secondary-500/4 absolute top-1/2 -right-32 size-72 -translate-y-1/2 rounded-full blur-[100px]" />

        <div className="bg-accent-500/4 absolute -bottom-32 -left-24 size-80 rounded-full blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="via-primary-500/25 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent" />
      </div>

      <section className="border-border/80 bg-card/80 relative w-full max-w-xl overflow-hidden rounded-xl border shadow-lg shadow-black/[0.035] backdrop-blur-xl sm:rounded-2xl">
        {/* Top accent */}
        <div className="from-primary-500 via-secondary-500 to-accent-500 absolute inset-x-0 top-0 h-1 bg-linear-to-r" />

        {/* Decorative rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16"
        >
          <div className="border-primary-500/8 flex size-56 items-center justify-center rounded-full border sm:size-64">
            <div className="border-primary-500/8 flex size-[72%] items-center justify-center rounded-full border">
              <div className="bg-primary-500/[0.035] size-[65%] rounded-full" />
            </div>
          </div>
        </div>

        <div className="relative px-5 py-8 text-center sm:px-10 sm:py-10">
          {/* Error illustration */}
          <div className="relative mx-auto mb-6 flex size-20 items-center justify-center sm:size-24">
            <div className="border-primary-500/10 absolute inset-0 rounded-2xl border" />

            <div className="border-primary-500/10 absolute inset-2 rounded-xl border" />

            <div className="bg-primary-500/[0.07] flex size-14 items-center justify-center rounded-xl sm:size-16">
              <UserRoundX
                className="text-primary-600 dark:text-primary-400 size-7 sm:size-8"
                strokeWidth={1.5}
              />
            </div>

            <span className="border-card bg-secondary-500 absolute -right-1 -bottom-1 flex size-7 items-center justify-center rounded-lg border-2">
              <Search className="text-secondary-700 dark:text-secondary-300 size-3.5" />
            </span>
          </div>

          {/* Status badge */}
          <div className="border-secondary-500/20 bg-secondary-500/[0.07] mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5">
            <span className="bg-secondary-500 size-1.5 rounded-full" />

            <span className="text-secondary-700 dark:text-secondary-300 text-2.5 font-bold tracking-[0.15em] uppercase">
              No matching record
            </span>
          </div>

          {/* Main message */}
          <h1 className="font-brand-accent text-2xl leading-tight font-bold tracking-[-0.04em] sm:text-3xl">
            No employee found
            <span className="text-primary-600 dark:text-primary-400">.</span>
          </h1>

          <p className="text-muted-foreground mx-auto mt-3 max-w-sm text-sm leading-6">
            We couldn't find an employee matching the provided ID. Check the
            identifier and try searching again.
          </p>

          {/* Searched ID */}
          {employeeId && (
            <div className="border-border/80 bg-background/80 mx-auto mt-6 flex max-w-sm items-center gap-3 rounded-lg border p-3 text-left">
              <div className="bg-secondary-500/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
                <Fingerprint className="text-secondary-600 dark:text-secondary-400 size-4.5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground text-2.5 font-semibold tracking-[0.12em] uppercase">
                  Searched employee ID
                </p>

                <p className="text-foreground mt-1 truncate font-mono text-sm font-semibold">
                  {employeeId}
                </p>
              </div>

              <ShieldAlert className="text-secondary-600 dark:text-secondary-400 size-4 shrink-0" />
            </div>
          )}

          {/* Actions */}
          <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
            <Button
              type="button"
              onClick={handleBack}
              className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 h-10 rounded-lg px-5 text-sm font-semibold text-white shadow-sm transition-colors dark:text-white"
            >
              <ArrowLeft className="mr-2 size-4" />
              Back to search
            </Button>

            {/* {onRetry && (
              <Button
                type="button"
                variant="outline"
                onClick={onRetry}
                className="border-border/80 bg-background/70 text-foreground hover:bg-muted h-10 rounded-lg px-5 text-sm font-semibold"
              >
                <RotateCcw className="mr-2 size-3.5" />
                Try again
              </Button>
            )} */}
          </div>

          {/* Bottom note */}
          <div className="border-border/70 mt-7 border-t pt-5">
            <p className="text-muted-foreground text-xs leading-5">
              <span className="text-foreground font-semibold">
                Need assistance?
              </span>{" "}
              Verify the employee ID or contact your administrator if you
              believe this is an error.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
