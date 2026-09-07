import { Button } from "@repo/ui/button";
import { cn } from "@repo/styles/cn";
import { Link } from "@tanstack/react-router";

export function RootNotFound() {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-background",
      )}
      data-slot="root-not-found"
    >
      <div
        className={cn(
          "relative mx-auto flex min-h-svh max-w-7xl items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24",
        )}
      >
        {/* BACKGROUND DECORATION */}

        <div
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
          )}
        >
          <div
            className={cn(
              "absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary-300/20 blur-3xl dark:bg-primary-700/15",
            )}
          />

          <div
            className={cn(
              "absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-secondary-300/20 blur-3xl dark:bg-secondary-700/15",
            )}
          />

          <div
            className={cn(
              "absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-300/10 blur-3xl",
            )}
          />
        </div>

        {/* 404 CARD */}

        <div
          className={cn(
            "relative w-full max-w-2xl overflow-hidden rounded-3xl border border-primary-100 bg-background/95 p-6 shadow-primary-950/10 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10 dark:border-primary-900 dark:bg-background/90 dark:shadow-primary-950/30",
          )}
        >
          {/* CARD GLOW */}

          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-primary-100/60 to-transparent dark:from-primary-950/50",
            )}
          />

          <div className="relative z-10">
            {/* ICON */}

            <div
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-2xl border border-primary-200 bg-primary-50 shadow-primary-950/5 shadow-lg dark:border-primary-800 dark:bg-primary-950/60",
              )}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={cn(
                  "h-8 w-8 text-primary-600 dark:text-primary-300",
                )}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 17h.01"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.3 4.7 2.9 17.5A2 2 0 0 0 4.6 20h14.8a2 2 0 0 0 1.7-2.5L13.7 4.7a2 2 0 0 0-3.4 0Z"
                />
              </svg>
            </div>

            {/* STATUS */}

            <div className="mt-7">
              <div
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 dark:border-primary-800 dark:bg-primary-950/50",
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full bg-primary-500",
                  )}
                />

                <span
                  className={cn(
                    "font-brand-accent text-xs font-semibold uppercase tracking-[0.15em] text-primary-600 dark:text-primary-300",
                  )}
                >
                  404 — Page Not Found
                </span>
              </div>
            </div>

            {/* HEADING */}

            <div className="mt-5">
              <h1
                className={cn(
                  "font-brand-secondary text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl",
                )}
              >
                Page not found
                <span
                  className={cn(
                    "ml-2 text-primary-600 dark:text-primary-300",
                  )}
                >
                  ⚠️
                </span>
              </h1>

              <p
                className={cn(
                  "mt-4 max-w-xl font-brand-primary text-sm leading-7 text-foreground/60 sm:text-base",
                )}
              >
                The page you're looking for doesn't exist, may have been moved,
                or the link might be incorrect. You can return to the homepage
                and continue exploring.
              </p>
            </div>

            {/* ACTION */}

            <div
              className={cn(
                "mt-8 flex w-full justify-end",
              )}
            >
              <Button
                variant="primary"
                asChild
                className="rounded-xl"
              >
                <Link to="/">Go to Home</Link>
              </Button>
            </div>

            {/* EXTRA HINT */}

            <div
              className={cn(
                "mt-8 rounded-2xl border border-primary-100 bg-primary-50/40 px-4 py-3 dark:border-primary-900 dark:bg-primary-950/20",
              )}
            >
              <p
                className={cn(
                  "font-brand-primary text-xs leading-5 text-foreground/50",
                )}
              >
                If you followed a link to get here, it may no longer be
                available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}