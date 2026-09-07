import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";
import { useRouter } from "@tanstack/react-router";

export function RootError({ error }: { error: unknown }) {
  const router = useRouter();

  return (
    <section
      className={cn("bg-background relative w-full overflow-hidden")}
      data-slot="root-error"
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
              "bg-primary-300/20 dark:bg-primary-700/15 absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl",
            )}
          />

          <div
            className={cn(
              "bg-secondary-300/20 dark:bg-secondary-700/15 absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-3xl",
            )}
          />

          <div
            className={cn(
              "bg-accent-300/10 absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
            )}
          />
        </div>

        {/* ERROR CARD */}

        <div
          className={cn(
            "border-primary-100 bg-background/95 shadow-primary-950/10 dark:border-primary-900 dark:bg-background/90 dark:shadow-primary-950/30 relative w-full max-w-2xl overflow-hidden rounded-3xl border p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10",
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
                className={cn("text-primary-600 dark:text-primary-300 h-8 w-8")}
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
                  "border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-950/50 inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
                )}
              >
                <span className={cn("w-2d rounded-fulld bg-primary-500 h-2")} />

                <span
                  className={cn(
                    "font-brand-accentd font-semiboldd uppercased tracking-[0.15em]d text-primary-600d dark:text-primary-300 text-xs",
                  )}
                >
                  500 — Application Error
                </span>
              </div>
            </div>

            {/* HEADING */}

            <div className="mt-5">
              <h1
                className={cn(
                  "font-brand-secondary text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
                )}
              >
                Something went wrong
                <span
                  className={cn(
                    "ml-2d text-primary-600d dark:text-primary-300",
                  )}
                >
                  💥
                </span>
              </h1>

              <p
                className={cn(
                  "font-brand-primary text-foreground/60 mt-4 max-w-xl text-sm leading-7 sm:text-base",
                )}
              >
                An unexpected error occurred while processing your request. You
                can try again or reload the page to continue.
              </p>
            </div>

            {/* ACTIONS */}

            <div className={cn("mt-8 flex flex-col gap-3 sm:flex-row")}>
              <Button
                variant="accent"
                onClick={() =>
                  router.navigate({
                    to: "/",
                  })
                }
                className={cn(`rounded-xl`)}
              >
                Home page
              </Button>

              <div className={cn("flex w-full justify-end")}>
                <Button
                  onClick={() => window.location.reload()}
                  className={cn("rounded-xl")}
                >
                  Try Again
                </Button>
              </div>
            </div>

            {/* ERROR DETAILS */}

            {error instanceof Error && (
              <details
                className={cn(
                  "group border-primary-100 bg-primary-50/40 dark:border-primary-900 dark:bg-primary-950/20 mt-8 overflow-hidden rounded-2xl border",
                )}
              >
                <summary
                  className={cn(
                    "flexd cursor-pointerd list-noned justify-betweend gap-4d py-3.5d font-brand-primaryd font-mediumd text-foreground/60d transition-colorsd hover:text-primary-600d dark:hover:text-primary-300 items-center px-4 text-sm",
                  )}
                >
                  <span>View error details</span>

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={cn(
                      "h-4 w-4 transition-transform duration-200 group-open:rotate-180",
                    )}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m6 9 6 6 6-6"
                    />
                  </svg>
                </summary>

                <div
                  className={cn(
                    "border-primary-100 border-td p-4d dark:border-primary-900",
                  )}
                >
                  <pre
                    className={cn(
                      "bg-primary-950 text-primary-100 max-h-52 overflow-auto rounded-xl p-4 font-mono text-xs leading-6 whitespace-pre-wrap",
                    )}
                  >
                    {error.message}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
