import { Wallet } from "lucide-react";

import { cn } from "@repo/styles/cn";

interface DashboardProfileProps {
  className?: string;
}

export function DashboardProfile({
  className,
}: DashboardProfileProps) {
  return (
    <div
      className={cn(
        `flex min-w-0 items-center gap-3`,
        className,
      )}
    >
      {/* Profile Picture */}

      <div
        className={cn(
          `flex size-11 shrink-0 items-center justify-center`,
          `rounded-full`,
          `border border-primary-300/60`,
          `bg-primary-100`,
          `p-0.5`,
          `dark:bg-primary-900/50`,
        )}
      >
        <div
          className={cn(
            `flex size-full items-center justify-center`,
            `rounded-full`,
            `bg-secondary-100`,
            `text-xl`,
            `dark:bg-secondary-900`,
          )}
        >
          👩🏼
        </div>
      </div>

      {/* User Details */}

      <div
        className={cn(
          `min-w-0 flex-1`,
        )}
      >
        {/* Username */}

        <p
          className={cn(
            `truncate`,
            `font-brand-primary`,
            `text-xs font-medium`,
            `text-foreground/45`,
          )}
        >
          @ryan997
        </p>

        {/* Name */}

        <p
          className={cn(
            `mt-0.5 truncate`,
            `font-brand-secondary`,
            `text-base font-semibold`,
            `text-foreground`,
          )}
        >
          Ryan Crawford
        </p>

        {/* Badge */}

        <div
          className={cn(
            `mt-1.5 flex w-fit items-center gap-1.5`,
            `rounded-full`,
            `border border-primary-300/30`,
            `bg-primary-300/10`,
            `px-2.5 py-1`,
            `font-brand-primary`,
            `text-[10px] font-semibold`,
            `text-primary-700`,
            `dark:text-primary-200`,
          )}
        >
          <Wallet
            className={cn(`size-3`)}
            strokeWidth={1.8}
          />

          <span
            className={cn(
              `whitespace-nowrap`,
            )}
          >
            Medical Representative
          </span>
        </div>
      </div>
    </div>
  );
}