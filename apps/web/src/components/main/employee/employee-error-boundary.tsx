import {
  ShieldX,
  ShieldAlert,
  LockKeyhole,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Headset,
  FileWarning,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@repo/ui/button";

export function AccessDenied({ onGoBack }: { onGoBack?: () => void }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
      return;
    }

    navigate({ to: "/dashboard" });
  };

  return (
    <main className="bg-background font-brand-primary relative isolate flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="bg-primary-500/5 absolute -top-40 left-1/2 size-96 -translate-x-1/2 rounded-full blur-[110px]" />

        <div className="bg-secondary-500/6 absolute top-1/3 -right-32 size-72 rounded-full blur-[100px]" />

        <div className="bg-accent-500/[0.035] absolute -bottom-32 -left-24 size-80 rounded-full blur-[100px]" />

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
        <div className="from-primary-500 via-secondary-500 to-secondary-600 absolute inset-x-0 top-0 h-1 bg-linear-to-r" />

        {/* Decorative rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16"
        >
          <div className="border-secondary-500/9 flex size-56 items-center justify-center rounded-full border sm:size-64">
            <div className="border-secondary-500/9 flex size-[72%] items-center justify-center rounded-full border">
              <div className="bg-secondary-500/4 size-[65%] rounded-full" />
            </div>
          </div>
        </div>

        <div className="relative px-5 py-8 sm:px-9 sm:py-9">
          {/* Status and illustration */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-5 flex size-20 items-center justify-center sm:size-22">
              <div className="border-secondary-500/15 absolute inset-0 rounded-2xl border" />

              <div className="border-secondary-500/10 absolute inset-2 rounded-xl border" />

              <div className="bg-secondary-500/10 flex size-14 items-center justify-center rounded-xl sm:size-16">
                <ShieldX
                  className="text-secondary-700 dark:text-secondary-400 size-8"
                  strokeWidth={1.5}
                />
              </div>

              <span className="border-card bg-background absolute -right-1 -bottom-1 flex size-7 items-center justify-center rounded-lg border-2 shadow-sm">
                <LockKeyhole className="text-secondary-700 dark:text-secondary-400 size-3.5" />
              </span>
            </div>

            {/* Status badge */}
            <div className="border-secondary-500/20 bg-secondary-500/8 mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5">
              <ShieldAlert className="text-secondary-700 dark:text-secondary-400 size-3.5" />

              <span className="text-secondary-800 dark:text-secondary-300 text-2.5 font-bold tracking-[0.14em] uppercase">
                Restricted access
              </span>
            </div>

            {/* Main message */}
            <h1 className="font-brand-accent text-2xl leading-tight font-bold tracking-[-0.04em] sm:text-3xl">
              Access denied
              <span className="text-secondary-600 dark:text-secondary-400">
                .
              </span>
            </h1>

            <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm leading-6">
              You don't have permission to access this page. Access to this
              resource is restricted based on your assigned role and
              permissions.
            </p>
          </div>

          {/* General restriction information */}
          <div className="border-border/80 bg-background/80 mt-6 rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <div className="bg-secondary-500/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
                <LockKeyhole className="text-secondary-700 dark:text-secondary-400 size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-foreground text-sm font-semibold">
                  Protected resource
                </p>

                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  This page contains restricted content that is only available
                  to users with the appropriate access permissions.
                </p>
              </div>
            </div>
          </div>

          {/* Permission explanation */}
          <div className="border-border/80 mt-6 flex items-start gap-3 border-t pt-5">
            <div className="bg-primary-500/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
              <ShieldCheck className="text-primary-600 dark:text-primary-400 size-4.5" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-foreground text-xs font-semibold sm:text-sm">
                Why am I seeing this?
              </h2>

              <p className="text-muted-foreground mt-1.5 text-xs leading-5">
                Your current role may not include the permissions required to
                access this page. If you believe you should have access, contact
                your administrator to request the appropriate permissions.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Button
              type="button"
              onClick={handleBack}
              className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 h-10 flex-1 rounded-lg px-4 text-sm font-semibold text-white shadow-sm transition-colors dark:text-white"
            >
              <ArrowLeft className="mr-2 size-4" />
              Back to dashboard
            </Button>

            <Button
              type="button"
              variant="primary"
              appearance="filled"
              onClick={() => {
                window.location.href = "mailto:";
              }}
              className="border-border/80 bg-background/70 text-foreground hover:bg-muted h-10 rounded-lg px-4 text-sm font-semibold"
            >
              <Headset className="mr-2 size-4" />
              Contact support
            </Button>
          </div>

          {/* Security note */}
          <div className="border-border/70 mt-6 border-t pt-4 text-center">
            <p className="text-muted-foreground text-2.75 leading-5">
              <LockKeyhole className="mr-1 inline size-3 align-[-2px]" />
              Access to protected resources is governed by role-based access
              controls.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export function PageGenerationError({
  onRetry,
  onGoBack,
}: {
  onRetry?: () => void;
  onGoBack?: () => void;
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
      return;
    }

    navigate({ to: "/dashboard" });
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
      return;
    }

    window.location.reload();
  };

  return (
    <main className="bg-background font-brand-primary relative isolate flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="bg-destructive/5 absolute -top-40 left-1/2 size-96 -translate-x-1/2 rounded-full blur-[110px]" />

        <div className="bg-primary-500/5 absolute top-1/3 -right-32 size-72 rounded-full blur-[100px]" />

        <div className="bg-destructive/5 absolute -bottom-32 -left-24 size-80 rounded-full blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="via-destructive/30 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent" />
      </div>

      <section className="border-border/80 bg-card/80 relative w-full max-w-xl overflow-hidden rounded-xl border shadow-lg shadow-black/[0.035] backdrop-blur-xl sm:rounded-2xl">
        {/* Top accent */}
        <div className="from-destructive/80 via-destructive/50 to-primary-500 absolute inset-x-0 top-0 h-1 bg-linear-to-r" />

        {/* Decorative rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16"
        >
          <div className="border-destructive/10 flex size-56 items-center justify-center rounded-full border sm:size-64">
            <div className="border-destructive/10 flex size-[72%] items-center justify-center rounded-full border">
              <div className="bg-destructive/5 size-[65%] rounded-full" />
            </div>
          </div>
        </div>

        <div className="relative px-5 py-8 sm:px-9 sm:py-9">
          {/* Error illustration */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-5 flex size-20 items-center justify-center sm:size-22">
              <div className="border-destructive/15 absolute inset-0 rounded-2xl border" />

              <div className="border-destructive/10 absolute inset-2 rounded-xl border" />

              <div className="bg-destructive/10 flex size-14 items-center justify-center rounded-xl sm:size-16">
                <FileWarning
                  className="text-destructive size-8"
                  strokeWidth={1.5}
                />
              </div>

              <span className="border-card bg-background absolute -right-1 -bottom-1 flex size-7 items-center justify-center rounded-lg border-2 shadow-sm">
                <AlertTriangle className="text-destructive size-3.5" />
              </span>
            </div>

            {/* Status badge */}
            <div className="border-destructive/20 bg-destructive/5 mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5">
              <span className="bg-destructive size-1.5 rounded-full" />

              <span className="text-destructive text-2.5 font-bold tracking-[0.14em] uppercase">
                Generation failed
              </span>
            </div>

            {/* Main message */}
            <h1 className="font-brand-accent text-2xl leading-tight font-bold tracking-[-0.04em] sm:text-3xl">
              Something went wrong
              <span className="text-destructive">.</span>
            </h1>

            <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm leading-6">
              We couldn't generate this page due to an unexpected error.
              Something may have interrupted the process. Please try again.
            </p>
          </div>

          {/* Error information */}
          <div className="border-border/80 bg-background/80 mt-6 rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <div className="bg-destructive/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
                <AlertTriangle className="text-destructive size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-foreground text-sm font-semibold">
                  Unable to generate page
                </p>

                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  The page content could not be generated successfully. This
                  could be due to a temporary server issue or an unexpected
                  processing error.
                </p>
              </div>
            </div>
          </div>

          {/* Suggested action */}
          <div className="border-border/80 mt-6 flex items-start gap-3 border-t pt-5">
            <div className="bg-primary-500/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
              <RefreshCw className="text-primary-600 dark:text-primary-400 size-4" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-foreground text-xs font-semibold sm:text-sm">
                What can you do?
              </h2>

              <p className="text-muted-foreground mt-1.5 text-xs leading-5">
                Try generating the page again. If the problem persists, please
                contact our support team for assistance.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Button
              type="button"
              onClick={handleRetry}
              className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 h-10 flex-1 rounded-lg px-4 text-sm font-semibold text-white shadow-sm transition-colors dark:text-white"
            >
              <RefreshCw className="mr-2 size-4" />
              Try again
            </Button>

            <Button
              type="button"
              variant="primary"
              appearance="filled"
              onClick={handleBack}
              className="border-border/80 bg-background/70 text-foreground hover:bg-muted h-10 rounded-lg px-4 text-sm font-semibold"
            >
              <ArrowLeft className="mr-2 size-4" />
              Back to dashboard
            </Button>
          </div>

          {/* Support */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => {
                window.location.href = "mailto:";
              }}
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs font-medium transition-colors"
            >
              <Headset className="size-3.5" />
              Need help? Contact support
            </button>
          </div>

          {/* Footer */}
          <div className="border-border/70 mt-6 border-t pt-4 text-center">
            <p className="text-muted-foreground text-2.75 leading-5">
              We apologize for the inconvenience. Your work may still be
              available, so please try again before starting over.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
