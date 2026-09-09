import { cn } from "@repo/styles/cn";

export default function Redirection() {
  return (
    <main
      className={cn(
        "bg-background relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8",
      )}
    >
      {/* BACKGROUND DECORATION */}

      <div
        className={cn("pointer-events-none absolute inset-0 overflow-hidden")}
      >
        <div
          className={cn(
            "bg-primary-300/15 dark:bg-primary-700/10 absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl",
          )}
        />

        <div
          className={cn(
            "bg-secondary-300/15 dark:bg-secondary-700/10 absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-3xl",
          )}
        />

        <div
          className={cn(
            "bg-accent-300/10 absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
          )}
        />
      </div>

      {/* REDIRECTION FAILURE CARD */}

      <section
        className={cn(
          "border-primary-100 bg-background/95 shadow-primary-950/10 dark:border-primary-900 dark:bg-background/90 dark:shadow-primary-950/30 relative w-full max-w-xl overflow-hidden rounded-3xl border p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10",
        )}
      >
        {/* CARD GLOW */}

        <div
          className={cn(
            "from-primary-100/60 dark:from-primary-950/50 pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b to-transparent",
          )}
        />

        <div className="relative z-10">
          {/* ICON */}

          <div
            className={cn(
              "border-primary-200 bg-primary-50 shadow-primary-950/5 dark:border-primary-800 dark:bg-primary-950/60 flex h-16 w-16 items-center justify-center rounded-2xl border shadow-lg",
            )}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className={cn("text-primary-600 dark:text-yellow-400 h-8 w-8")}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h13" />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14 8 4 4-4 4"
              />

              <path strokeLinecap="round" strokeLinejoin="round" d="M4 5v14" />
            </svg>
          </div>

          {/* STATUS */}

          <div className="mt-7">
            <div
              className={cn(
                "border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-950/50 inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
              )}
            >
              <span className={cn("bg-primary-500 h-2 w-2 rounded-full")} />

              <span
                className={cn(
                  "font-brand-accent text-primary-600 dark:text-primary-300 text-xs font-semibold tracking-[0.14em] uppercase",
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
                "font-brand-secondary text-foreground text-3xl font-bold tracking-tight sm:text-4xl",
              )}
            >
              Redirection failed.
            </h1>

            <p
              className={cn(
                "font-brand-primary text-foreground/60 mt-4 text-sm leading-7 sm:text-base",
              )}
            >
              You have reached an internal routing screen that is not intended
              to be displayed to users.
            </p>
          </div>

          {/* WARNING */}

          <div
            className={cn(
              `mt-7`,
              `rounded-2xl`,
              `border-primary-100 border`,
              `bg-primary-50/50`,
              `p-4`,
              `dark:border-primary-900`,
              `dark:bg-primary-950/25`,
            )}
          >
            <div className={cn(`flex items-start gap-3`)}>
              {/* Icon */}
              <div
                className={cn(
                  `flex size-8 shrink-0 items-center justify-center rounded-sm bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300`,
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={cn(`size-4`)}
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

              {/* Text Content */}
              <div className={cn(`min-w-0 flex-1`)}>
                <p
                  className={cn(
                    `font-brand-secondary text-sm font-semibold leading-8 text-foreground`,
                  )}
                >
                  This screen should not normally appear
                </p>

                <p
                  className={cn(
                    `mt-1 font-brand-primary text-xs leading-5 text-foreground/55`,
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
              "text-foreground/40 mt-6 flex items-center gap-2 text-xs",
            )}
          >
            <span className={cn("bg-primary-400 h-1.5 w-1.5 rounded-full")} />
            Temporary internal routing fallback
          </div>
        </div>
      </section>
    </main>
  );
}
