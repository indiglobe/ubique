import { cn } from "@repo/styles/cn";

export default function Redirection() {
  return (
    <main
      className={cn(
        "relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-4 py-10 sm:px-6 lg:px-8",
      )}
    >
      {/* BACKGROUND DECORATION */}

      <div
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
        )}
      >
        <div
          className={cn(
            "absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary-300/15 blur-3xl dark:bg-primary-700/10",
          )}
        />

        <div
          className={cn(
            "absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-secondary-300/15 blur-3xl dark:bg-secondary-700/10",
          )}
        />

        <div
          className={cn(
            "absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-300/10 blur-3xl",
          )}
        />
      </div>

      {/* REDIRECTION FAILURE CARD */}

      <section
        className={cn(
          "relative w-full max-w-xl overflow-hidden rounded-3xl border border-primary-100 bg-background/95 p-6 shadow-primary-950/10 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10 dark:border-primary-900 dark:bg-background/90 dark:shadow-primary-950/30",
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
                d="M5 12h13"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14 8 4 4-4 4"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 5v14"
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
                  "font-brand-accent text-xs font-semibold uppercase tracking-[0.14em] text-primary-600 dark:text-primary-300",
                )}
              >
                Internal Redirection Route
              </span>
            </div>
          </div>

          {/* CONTENT */}

          <div className="mt-5">
            <h1
              className={cn(
                "font-brand-secondary text-3xl font-bold tracking-tight text-foreground sm:text-4xl",
              )}
            >
              Redirection failed.
            </h1>

            <p
              className={cn(
                "mt-4 font-brand-primary text-sm leading-7 text-foreground/60 sm:text-base",
              )}
            >
              You have reached an internal routing screen that is not intended
              to be displayed to users.
            </p>
          </div>

          {/* WARNING */}

          <div
            className={cn(
              "mt-7 rounded-2xl border border-primary-100 bg-primary-50/50 p-4 dark:border-primary-900 dark:bg-primary-950/25",
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300",
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16h.01"
                  />

                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>

              <div>
                <p
                  className={cn(
                    "font-brand-secondary text-sm font-semibold text-foreground",
                  )}
                >
                  This screen should not normally appear
                </p>

                <p
                  className={cn(
                    "mt-1 text-xs leading-5 text-foreground/55",
                  )}
                >
                  The application was expected to redirect automatically, but
                  that process did not complete as intended.
                </p>
              </div>
            </div>
          </div>

          {/* TECHNICAL NOTE */}

          <div
            className={cn(
              "mt-6 flex items-center gap-2 text-xs text-foreground/40",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full bg-primary-400",
              )}
            />

            Temporary internal routing fallback
          </div>
        </div>
      </section>
    </main>
  );
}