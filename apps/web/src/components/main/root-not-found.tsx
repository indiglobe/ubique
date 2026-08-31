import { Button } from "@repo/ui/button";
import { cn } from "@repo/styles/cn";
import { Link } from "@tanstack/react-router";

export function RootNotFound() {
  return (
    <section className={cn(`w-full`)} data-slot={`root-not-found`}>
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
              404 — Page Not Found
            </p>

            {/* Heading */}
            <div className={cn(`flex flex-col gap-3`)}>
              <h1
                className={cn(
                  `text-foreground text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl`,
                )}
              >
                Page not found ⚠️
              </h1>

              <p
                className={cn(
                  `text-foreground/70 max-w-xl text-sm leading-relaxed sm:text-base`,
                )}
              >
                The page you're looking for doesn't exist, may have been moved,
                or the link might be incorrect. You can return to the homepage
                and continue exploring.
              </p>
            </div>

            {/* Action */}
            <div className={cn(`flex w-full justify-end pt-2`)}>
              <Button variant="primary" asChild>
                <Link to="/">Go to Home</Link>
              </Button>
            </div>

            {/* Extra Hint */}
            <p className={cn(`text-foreground/50 text-xs`)}>
              If you followed a link to get here, it may no longer be available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
