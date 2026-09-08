import { cn } from "@repo/styles/cn";
import { Logo } from "@repo/ui/logo";
import type { ComponentProps } from "react";

export function Footer({ className, ...props }: ComponentProps<"footer">) {
  return (
    <footer
      className={cn(`border-foreground/5 border-t`, className)}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Logo
            className={cn(
              `h-(--logo-size) w-[calc(var(--logo-size)*3)] [--logo-size:--spacing(10)]`,
            )}
          />

          <span className="border-foreground/5 text-foreground/40 max-md:text-center text-xs">
            © 2026 Ubique Pharma Pvt. Ltd. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

{
  /* FOOTER */
}
