import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";
import { Logo } from "@repo/ui/logo";
import { Link, useRouteContext } from "@tanstack/react-router";
import { Button } from "@repo/ui/button";

export function Navbar({ className, ...props }: ComponentProps<"nav">) {
  const { userDetailAsCookie } = useRouteContext({ from: "/(public-routes)" });

  return (
    <nav className={cn(``, className)} {...props}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Logo className={cn(`[--logo-size:--spacing(10)]`)} />
        </Link>

        <div className="items-center gap-3 sm:flex">
          {userDetailAsCookie ? (
            <Button
              asChild
              variant={"primary"}
              corner={"rounded"}
              className={cn(``)}
            >
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Link
              to="/log-in"
              className="bg-primary-600 hover:bg-primary-700 flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition dark:hover:shadow-[0_0_18px_rgba(96,165,250,0.35)]"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
