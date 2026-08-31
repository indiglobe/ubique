import { cn } from "@repo/styles/cn";
import { Stethoscope } from "lucide-react";
import type { ComponentProps } from "react";

export function Footer({ className, ...props }: ComponentProps<"footer">) {
  return (
    <footer
      className={cn(`border-foreground/5 border-t`, className)}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary-600 grid size-9 place-items-center rounded-xl text-white">
              <Stethoscope className="size-4" />
            </div>

            <span className="font-brand-secondary text-lg font-bold">
              MedForce
            </span>
          </div>

          <div className="text-foreground/50 flex flex-wrap gap-x-7 gap-y-3 text-sm">
            <a href="#features">Features</a>
            <a href="#solutions">Solutions</a>
            <a href="#platform">Platform</a>
            <a href="#contact">Contact</a>
            <a href="#">Privacy</a>
          </div>
        </div>

        <div className="border-foreground/5 text-foreground/40 mt-8 border-t pt-6 text-xs">
          © 2026 MedForce. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

{
  /* FOOTER */
}
