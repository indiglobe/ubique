import { cn } from "@repo/styles/cn";
import { Menu } from "lucide-react";
import type { ComponentProps } from "react";
import { Logo } from "@repo/ui/logo";
import { Link, useNavigate } from "@tanstack/react-router";

export function Navbar({ className, ...props }: ComponentProps<"nav">) {
  const navigate = useNavigate();
  return (
    <nav className={cn(``, className)} {...props}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Logo
            className={cn(
              `h-(--logo-size) w-[calc(var(--logo-size)*3)] [--logo-size:--spacing(10)]`,
            )}
          />
        </Link>

        <div className="hidden items-center gap-3 sm:flex">
          <button
            className={cn(
              "border-primary-300/50 text-foreground/70 hover:border-primary-500 hover:text-primary-600 dark:border-primary-700/60 dark:hover:border-primary-400 dark:hover:text-primary-300 rounded-md border bg-transparent px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_18px_rgba(59,130,246,0.35)] dark:hover:shadow-[0_0_18px_rgba(96,165,250,0.35)]",
            )}
            onClick={() => navigate({ to: "/sign-up" })}
          >
            Sign up
          </button>

          <button
            className="bg-primary-600 hover:bg-primary-700 flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition dark:hover:shadow-[0_0_18px_rgba(96,165,250,0.35)]"
            onClick={() => navigate({ to: "/log-in" })}
          >
            Log in
          </button>
        </div>

        <button className="bg-foreground/5 grid size-10 place-items-center rounded-md sm:hidden">
          <Menu className="size-5" />
        </button>
      </div>
    </nav>
  );
}
