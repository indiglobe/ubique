import * as React from "react";
import {
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Bug,
  ShieldAlert,
  CircleAlert,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@repo/ui/button";

interface EmployeeProfileErrorProps {
  error?: Error;
  reset?: () => void;
  onGoBack?: () => void;
}

export function EmployeeProfileError({
  error,
  reset,
  onGoBack,
}: EmployeeProfileErrorProps) {
  const navigate = useNavigate();
  const [isRetrying, setIsRetrying] = React.useState(false);

  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
      return;
    }

    navigate({ to: "/dashboard/user" });
  };

  const handleRetry = async () => {
    if (!reset) return;

    setIsRetrying(true);

    try {
      reset();
    } finally {
      setIsRetrying(false);
    }
  };

  const errorMessage = error instanceof Error ? error.message : undefined;

  return (
    <main className="bg-background font-brand-primary relative isolate flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="bg-secondary-500/5 absolute -top-40 left-1/2 size-96 -translate-x-1/2 rounded-full blur-[110px]" />

        <div className="bg-primary-500/4 absolute top-1/3 -right-32 size-72 rounded-full blur-[100px]" />

        <div className="bg-secondary-500/[0.035] absolute -bottom-32 -left-24 size-80 rounded-full blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="via-secondary-500/30 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent" />
      </div>

      <section className="border-border/80 bg-card/80 relative w-full max-w-xl overflow-hidden rounded-xl border shadow-lg shadow-black/[0.035] backdrop-blur-xl sm:rounded-2xl">
        {/* Top accent */}
        <div className="from-secondary-500 via-secondary-600 to-primary-500 absolute inset-x-0 top-0 h-1 bg-linear-to-r" />

        {/* Decorative rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16"
        >
          <div className="border-secondary-500/8 flex size-56 items-center justify-center rounded-full border sm:size-64">
            <div className="border-secondary-500/8 flex size-[72%] items-center justify-center rounded-full border">
              <div className="bg-secondary-500/[0.035] size-[65%] rounded-full" />
            </div>
          </div>
        </div>

        <div className="relative px-5 py-8 sm:px-9 sm:py-9">
          {/* Error illustration */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-5 flex size-20 items-center justify-center sm:size-22">
              <div className="border-secondary-500/15 absolute inset-0 rounded-2xl border" />

              <div className="border-secondary-500/10 absolute inset-2 rounded-xl border" />

              <div className="bg-secondary-500/10 flex size-14 items-center justify-center rounded-xl sm:size-16">
                <AlertTriangle
                  className="text-secondary-700 dark:text-secondary-400 size-8"
                  strokeWidth={1.5}
                />
              </div>

              <span className="border-card bg-background absolute -right-1 -bottom-1 flex size-7 items-center justify-center rounded-lg border-2 shadow-sm">
                <CircleAlert className="text-secondary-700 dark:text-secondary-400 size-3.5" />
              </span>
            </div>

            {/* Status badge */}
            <div className="border-secondary-500/20 bg-secondary-500/8 mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5">
              <span className="bg-secondary-500 size-1.5 rounded-full" />

              <span className="text-secondary-800 dark:text-secondary-300 text-2.5 font-bold tracking-[0.14em] uppercase">
                Unexpected error
              </span>
            </div>

            {/* Main message */}
            <h1 className="font-brand-accent text-2xl leading-tight font-bold tracking-[-0.04em] sm:text-3xl">
              Something went wrong
              <span className="text-secondary-600 dark:text-secondary-400">
                .
              </span>
            </h1>

            <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm leading-6">
              We couldn't load this employee's profile. This may be a temporary
              issue. Try again or return to employee search.
            </p>
          </div>

          {/* Error summary */}
          <div className="border-border/80 bg-background/80 mt-6 rounded-lg border p-3.5 sm:p-4">
            <div className="flex items-start gap-3">
              <div className="bg-secondary-500/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
                <ShieldAlert className="text-secondary-700 dark:text-secondary-400 size-4.5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-foreground text-xs font-semibold sm:text-sm">
                  Employee profile unavailable
                </p>

                <p className="text-muted-foreground mt-1.5 text-xs leading-5">
                  The requested page could not be displayed. Your data has not
                  necessarily been lost.
                </p>
              </div>
            </div>
          </div>

          {/* Development-only diagnostics */}
          {import.meta.env.DEV && errorMessage && (
            <details className="border-border/80 bg-background/70 mt-3 overflow-hidden rounded-lg border">
              <summary className="text-muted-foreground hover:text-foreground flex cursor-pointer list-none items-center gap-2 px-3.5 py-3 text-xs font-semibold transition-colors">
                <Bug className="size-3.5" />
                View development error
              </summary>

              <div className="border-border/70 border-t px-3.5 py-3">
                <pre className="text-muted-foreground max-h-40 overflow-auto font-mono text-2.75 leading-5 wrap-break-word whitespace-pre-wrap">
                  {errorMessage}
                </pre>
              </div>
            </details>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Button
              type="button"
              onClick={handleRetry}
              disabled={!reset || isRetrying}
              className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 h-10 flex-1 rounded-lg px-4 text-sm font-semibold text-white shadow-sm transition-colors dark:text-white"
            >
              <RefreshCw
                className={`mr-2 size-4 ${isRetrying ? "animate-spin" : ""}`}
              />
              {isRetrying ? "Retrying..." : "Try again"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="border-border/80 bg-background/70 text-foreground hover:bg-muted h-10 rounded-lg px-4 text-sm font-semibold"
            >
              <ArrowLeft className="mr-2 size-4" />
              Back to search
            </Button>
          </div>

          {/* Bottom note */}
          <div className="border-border/70 mt-6 border-t pt-4 text-center">
            <p className="text-muted-foreground text-2.75 leading-5">
              If this problem continues, contact your administrator or try again
              later.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
