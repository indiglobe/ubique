import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";
import { useRouter } from "@tanstack/react-router";

export function RootError({ error }: { error: unknown }) {
  const router = useRouter();

  return (
    <section className={cn(`w-full`)} data-slot={`root-error`}>
      <div
        className={cn(
          `relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-24`,
        )}
      >
        {/* Background Glow */}
        <div
          className={cn(
            `from-primary-500/20 via-accent-500/10 to-secondary-500/20 absolute inset-0 -z-10 bg-linear-to-br opacity-60 blur-2xl`,
          )}
        />

        <div
          className={cn(
            `border-primary-300/40 dark:border-primary-700/40 bg-background relative w-full max-w-2xl border p-6 sm:p-8 lg:p-10`,
          )}
        >
          <div
            className={cn(
              `from-primary-500/5 to-accent-500/5 absolute inset-0 -z-10 bg-linear-to-br via-transparent`,
            )}
          />

          <div className={cn(`flex flex-col gap-6`)}>
            {/* Label */}
            <p
              className={cn(
                `text-primary-600 dark:text-primary-400 text-sm font-medium tracking-wide`,
              )}
            >
              500 — Application Error
            </p>

            {/* Heading */}
            <div className={cn(`flex flex-col gap-3`)}>
              <h1
                className={cn(
                  `text-foreground text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl`,
                )}
              >
                Something went wrong 💥
              </h1>

              <p
                className={cn(
                  `text-foreground/70 max-w-xl text-sm leading-relaxed sm:text-base`,
                )}
              >
                An unexpected error occurred while processing your request. You
                can try again or reload the page to continue.
              </p>
            </div>

            {/* Actions */}
            <div
              className={cn(
                `flex flex-col justify-between gap-3 pt-2 sm:flex-row`,
              )}
            >
              <Button
                variant={"accent"}
                onClick={() => router.navigate({ to: "/" })}
              >
                Home page
              </Button>

              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>

            {/* Error Details */}
            {error instanceof Error && (
              <details
                className={cn(
                  `border-primary-200/40 dark:border-primary-800/40 mt-2 border-t pt-5 text-left`,
                )}
              >
                <summary
                  className={cn(
                    `text-foreground/60 hover:text-foreground cursor-pointer text-xs font-medium transition`,
                  )}
                >
                  View error details
                </summary>

                <pre
                  className={cn(
                    `bg-muted/50 text-foreground/60 mt-3 overflow-auto p-3 text-xs whitespace-pre-wrap`,
                  )}
                >
                  {error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
