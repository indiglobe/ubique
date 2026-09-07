import { cn } from "@repo/styles/cn";
import { Menu } from "lucide-react";
import type { ComponentProps } from "react";
import { Logo } from "@repo/ui/logo";
import { Link } from "@tanstack/react-router";

export function Navbar({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav className={cn(``, className)} {...props}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Logo
            className={cn(
              `[--logo-size:--spacing(10)] h-(--logo-size) w-[calc(var(--logo-size)*3)]`,
            )}
          />
        </Link>

        {/* <nav className="hidden items-center gap-8 lg:flex">
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
        </nav> */}

        <div className="hidden items-center gap-3 sm:flex">
          <button
            className={cn(
              "rounded-xl border-primary-300/50 border bg-transparent px-4 py-2.5 text-sm font-semibold text-foreground/70 transition-all duration-300  hover:border-primary-500 hover:text-primary-600 hover:shadow-[0_0_18px_rgba(59,130,246,0.35)] dark:border-primary-700/60 dark:hover:border-primary-400 dark:hover:text-primary-300 dark:hover:shadow-[0_0_18px_rgba(96,165,250,0.35)]",
            )}
          >
            Sign up
          </button>

          <button className="bg-primary-600 hover:bg-primary-700 flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition dark:hover:shadow-[0_0_18px_rgba(96,165,250,0.35)]">
            Log in
          </button>
        </div>

        <button className="bg-foreground/5 grid size-10 place-items-center rounded-xl sm:hidden">
          <Menu className="size-5" />
        </button>
      </div>
    </nav>
  );
}
