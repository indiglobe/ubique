import { cn } from "@repo/styles/cn";
import { ArrowRight, Menu, Stethoscope } from "lucide-react";
import type { ComponentProps } from "react";

export function Navbar({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav className={cn(``, className)} {...props}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <div className="bg-primary-600 grid size-10 place-items-center rounded-xl text-white">
            <Stethoscope className="size-5" />
          </div>

          <div>
            <p className="font-brand-secondary text-lg leading-none font-bold">
              MedForce
            </p>
            <p className="text-primary-600 text-2.5 mt-1 font-semibold tracking-[0.18em] uppercase">
              Field Intelligence
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          <a
            href="#features"
            className="text-foreground/65 hover:text-primary-600 text-sm font-medium transition"
          >
            Features
          </a>

          <a
            href="#solutions"
            className="text-foreground/65 hover:text-primary-600 text-sm font-medium transition"
          >
            Solutions
          </a>

          <a
            href="#platform"
            className="text-foreground/65 hover:text-primary-600 text-sm font-medium transition"
          >
            Platform
          </a>

          <a
            href="#contact"
            className="text-foreground/65 hover:text-primary-600 text-sm font-medium transition"
          >
            Contact
          </a>
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <button className="text-foreground/70 hover:bg-foreground/5 rounded-xl px-4 py-2.5 text-sm font-semibold transition">
            Sign in
          </button>

          <button className="bg-primary-600 hover:bg-primary-700 flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition">
            Request Demo
            <ArrowRight className="size-4" />
          </button>
        </div>

        <button className="bg-foreground/5 grid size-10 place-items-center rounded-xl sm:hidden">
          <Menu className="size-5" />
        </button>
      </div>
    </nav>
  );
}
