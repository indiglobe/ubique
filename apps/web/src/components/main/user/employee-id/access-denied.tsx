import {
  ShieldX,
  ShieldAlert,
  ArrowLeft,
  LockKeyhole,
  Fingerprint,
  Headset,
  UserRound,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@repo/ui/button";

interface EmployeeAccessDeniedProps {
  employeeId?: string;
  employeeName?: string;
  onGoBack?: () => void;
}

export function EmployeeAccessDenied({
  employeeId,
  employeeName,
  onGoBack,
}: EmployeeAccessDeniedProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
      return;
    }

    navigate({ to: "/dashboard/user" });
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
              You don't have permission to view this employee's details. Access
              is restricted according to your assigned role and permissions.
            </p>
          </div>

          {/* Employee information */}
          {(employeeId || employeeName) && (
            <div className="border-border/80 bg-background/80 mt-6 rounded-lg border p-3.5 sm:p-4">
              <div className="mb-3 flex items-center gap-2">
                <LockKeyhole className="text-secondary-600 dark:text-secondary-400 size-4" />

                <p className="text-foreground text-xs font-semibold">
                  Restricted employee profile
                </p>
              </div>

              <div className="border-border/70 flex items-center gap-3 border-t pt-3">
                <div className="bg-primary-500/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
                  <UserRound className="text-primary-600 dark:text-primary-400 size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  {employeeName && (
                    <p className="text-foreground truncate text-sm font-semibold">
                      {employeeName}
                    </p>
                  )}

                  {employeeId && (
                    <div className="text-muted-foreground mt-1 flex items-center gap-1.5">
                      <Fingerprint className="size-3.5 shrink-0" />

                      <span className="font-mono text-xs">{employeeId}</span>
                    </div>
                  )}
                </div>

                <div className="bg-secondary-500/10 flex size-8 shrink-0 items-center justify-center rounded-lg">
                  <LockKeyhole className="text-secondary-700 dark:text-secondary-400 size-4" />
                </div>
              </div>
            </div>
          )}

          {/* Permission explanation */}
          <div className="border-border/80 mt-6 flex items-start gap-3 border-t pt-5">
            <div className="bg-primary-500/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
              <ShieldAlert className="text-primary-600 dark:text-primary-400 size-4.5" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-foreground text-xs font-semibold sm:text-sm">
                Why am I seeing this?
              </h2>

              <p className="text-muted-foreground mt-1.5 text-xs leading-5">
                Your current role may not include access to this employee's
                profile. If you need access for your work, contact your
                administrator or request the appropriate permission.
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
              Back to employee search
            </Button>

            <Button
              type="button"
              variant="outline"
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
              Employee information is protected by role-based access controls.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
