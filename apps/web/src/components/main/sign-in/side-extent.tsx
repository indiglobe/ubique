import { cn } from "@repo/styles/cn";
import { LogoIcon } from "@repo/ui/logo";
import type { ComponentProps } from "react";

export function SideExtent({ className, ...props }: ComponentProps<"aside">) {
  return (
    <aside
      className={cn(
        `from-primary-700 via-primary-600 to-secondary-600 dark:from-primary-950 dark:via-primary-900 dark:to-secondary-950 relative overflow-hidden bg-linear-to-br px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:min-h-190 lg:flex-col lg:justify-between lg:px-12 lg:py-14`,
        className,
      )}
      {...props}
    >
      {/* MEDICAL 3D BACKGROUND */}

      <div
        className={cn(`pointer-events-none absolute inset-0 overflow-hidden`)}
      >
        {/* Ambient glow */}
        <div
          className={cn(
            `bg-primary-100/30 dark:bg-primary-400/15 absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl`,
          )}
        />
        <div
          className={cn(
            `bg-secondary-200/25 dark:bg-secondary-400/15 absolute -right-24 -bottom-28 h-96 w-96 rounded-full blur-3xl`,
          )}
        />
        <div
          className={cn(
            `bg-primary-300/10 dark:bg-primary-400/10 absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl`,
          )}
        />
        {/* Rings */}
        <div
          className={cn(
            `dark:border-primary-100/10 absolute top-12 -right-20 h-64 w-64 rounded-full border border-white/20`,
          )}
        />
        <div
          className={cn(
            `dark:border-primary-100/10 absolute top-36 right-5 h-32 w-32 rounded-full border border-white/20`,
          )}
        />
        {/* CAPSULE */}
        <div
          className={cn(
            `shadow-primary-950/20 dark:border-primary-100/15 dark:bg-primary-50/8 absolute top-10 right-8 hidden h-24 w-24 rotate-12 items-center justify-center rounded-3xl border border-white/25 bg-white/15 shadow-2xl backdrop-blur-xl sm:flex dark:shadow-black/30`,
          )}
        >
          <div
            className={cn(
              `shadow-primary-950/20 dark:border-primary-100/10 relative h-14 w-8 -rotate-35 overflow-hidden rounded-full border border-white/20 shadow-xl dark:shadow-black/30`,
            )}
          >
            <div
              className={cn(
                `dark:bg-primary-100/90 absolute inset-x-0 top-0 h-1/2 bg-white/95`,
              )}
            />

            <div
              className={cn(
                `bg-secondary-300 dark:bg-secondary-400/90 absolute inset-x-0 bottom-0 h-1/2`,
              )}
            />
          </div>
        </div>

        {/* RX CARD */}
        <div
          className={cn(
            `shadow-primary-950/20 dark:border-primary-100/15 dark:bg-primary-50/8 absolute top-[38%] right-7 hidden w-28 -rotate-6 rounded-2xl border border-white/25 bg-white/15 p-4 shadow-2xl backdrop-blur-xl lg:block dark:shadow-black/30`,
          )}
        >
          <p
            className={cn(
              `font-brand-secondary dark:text-primary-50 text-xl font-bold text-white/95`,
            )}
          >
            Rx
          </p>
          <div
            className={cn(
              `dark:bg-primary-100/15 mt-3 h-1.5 w-full rounded-full bg-white/25`,
            )}
          />
          <div
            className={cn(
              `dark:bg-primary-100/12 mt-2 h-1.5 w-3/4 rounded-full bg-white/20`,
            )}
          />
          <div
            className={cn(
              `dark:bg-primary-100/8 mt-2 h-1.5 w-1/2 rounded-full bg-white/15`,
            )}
          />
        </div>

        {/* MEDICAL CROSS */}

        <div
          className={cn(
            `shadow-primary-950/20 dark:border-primary-100/15 dark:bg-primary-50/8 absolute bottom-42 left-8 hidden h-20 w-20 -rotate-12 items-center justify-center rounded-2xl border border-white/25 bg-white/15 shadow-2xl backdrop-blur-xl sm:flex dark:shadow-black/30`,
          )}
        >
          <div className={cn(`relative h-10 w-10`)}>
            <div
              className={cn(
                `dark:bg-primary-100/75 absolute top-0 left-1/2 h-10 w-3 -translate-x-1/2 rounded-full bg-white/85`,
              )}
            />

            <div
              className={cn(
                `dark:bg-primary-100/75 absolute top-1/2 left-0 h-3 w-10 -translate-y-1/2 rounded-full bg-white/85`,
              )}
            />
          </div>
        </div>

        {/* TABLET STRIP */}

        <div
          className={cn(
            `shadow-primary-950/20 dark:border-primary-100/15 dark:bg-primary-50/8 absolute right-8 bottom-10 hidden w-36 rotate-6 rounded-2xl border border-white/25 bg-white/15 p-4 shadow-2xl backdrop-blur-xl lg:block dark:shadow-black/30`,
          )}
        >
          <div className={cn(`grid grid-cols-4 gap-2`)}>
            {Array.from({
              length: 8,
            }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  `dark:border-primary-100/10 dark:bg-primary-100/10 aspect-square rounded-full border border-white/25 bg-white/20 shadow-inner shadow-white/10`,
                )}
              />
            ))}
          </div>
        </div>

        {/* MEDICINE BOTTLE */}

        <div
          className={cn(
            `shadow-primary-950/20 dark:border-primary-100/15 dark:bg-primary-50/8 absolute bottom-14 left-[43%] hidden h-24 w-16 -rotate-6 rounded-xl border border-white/25 bg-white/15 shadow-xl backdrop-blur-xl lg:block dark:shadow-black/30`,
          )}
        >
          <div
            className={cn(
              `dark:border-primary-100/10 dark:bg-primary-100/10 absolute -top-3 left-1/2 h-4 w-9 -translate-x-1/2 rounded-t-lg border border-white/25 bg-white/20`,
            )}
          />

          <div
            className={cn(
              `dark:bg-primary-100/8 absolute top-7 right-2 left-2 rounded-lg bg-white/15 px-1 py-3 text-center`,
            )}
          >
            <span
              className={cn(
                `font-brand-secondary dark:text-primary-100/70 text-xs font-bold text-white/80`,
              )}
            >
              MED
            </span>
          </div>
        </div>
      </div>

      {/* SIDE CONTENT */}

      <div className={cn(`relative z-10`)}>
        {/* ICON */}

        <div
          className={cn(
            `shadow-primary-950/15 dark:border-primary-100/15 dark:bg-primary-50/8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/15 shadow-lg backdrop-blur-xl dark:shadow-black/30`,
          )}
        >
          <LogoIcon className={cn(`size-10`)} />
        </div>

        <p
          className={cn(
            `font-brand-accent text-primary-50/85 dark:text-primary-200/80 mt-10 text-xs font-semibold tracking-[0.22em] uppercase`,
          )}
        >
          Medical Representative Portal
        </p>

        <h1
          className={cn(
            `font-brand-secondary dark:text-primary-50 mt-4 max-w-md text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl`,
          )}
        >
          Your workday, connected.
        </h1>

        <p
          className={cn(
            `font-brand-primary text-primary-50/80 dark:text-primary-100/75 mt-5 max-w-md text-sm leading-7 sm:text-base`,
          )}
        >
          Access your professional workspace, manage your daily activities and
          stay organised throughout every field visit.
        </p>
      </div>

      {/* FEATURE CARDS */}

      <div
        className={cn(
          `2xs:grid-cols-3 relative z-10 mt-10 grid gap-3 lg:mt-16 lg:grid-cols-1`,
        )}
      >
        <div
          className={cn(
            `shadow-primary-950/10 dark:border-primary-100/15 dark:bg-primary-50/8 rounded-2xl border border-white/25 bg-white/15 p-4 shadow-lg backdrop-blur-xl dark:shadow-black/30`,
          )}
        >
          <p
            className={cn(
              `font-brand-secondary dark:text-primary-50 text-sm font-semibold text-white`,
            )}
          >
            Secure Access
          </p>

          <p
            className={cn(
              `text-primary-50/70 dark:text-primary-100/65 mt-1 text-xs`,
            )}
          >
            Protected professional workspace
          </p>
        </div>

        <div
          className={cn(
            `shadow-primary-950/10 dark:border-primary-100/15 dark:bg-primary-50/8 rounded-2xl border border-white/25 bg-white/15 p-4 shadow-lg backdrop-blur-xl dark:shadow-black/30`,
          )}
        >
          <p
            className={cn(
              `font-brand-secondary dark:text-primary-50 text-sm font-semibold text-white`,
            )}
          >
            Stay Organised
          </p>

          <p
            className={cn(
              `text-primary-50/70 dark:text-primary-100/65 mt-1 text-xs`,
            )}
          >
            Keep your daily activity on track
          </p>
        </div>

        <div
          className={cn(
            `shadow-primary-950/10 dark:border-primary-100/15 dark:bg-primary-50/8 rounded-2xl border border-white/25 bg-white/15 p-4 shadow-lg backdrop-blur-xl dark:shadow-black/30`,
          )}
        >
          <p
            className={cn(
              `font-brand-secondary dark:text-primary-50 text-sm font-semibold text-white`,
            )}
          >
            Work Smarter
          </p>

          <p
            className={cn(
              `text-primary-50/70 dark:text-primary-100/65 mt-1 text-xs`,
            )}
          >
            Everything you need in one place
          </p>
        </div>
      </div>
    </aside>
  );
}
