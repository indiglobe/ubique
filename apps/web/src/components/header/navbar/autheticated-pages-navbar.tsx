import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";
import { Logo } from "@repo/ui/logo";
import { Link } from "@tanstack/react-router";
import { Button } from "@repo/ui/button";
import { useServerFn } from "@tanstack/react-start";
import { serverFn__logoutUser } from "@/integrations/tanstack/server-function/server-action/logout.sfn";

export function Navbar({ className, ...props }: ComponentProps<"nav">) {
  const logoutUser = useServerFn(serverFn__logoutUser);

  return (
    <nav className={cn(``, className)} {...props}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Logo className={cn(`[--logo-size:--spacing(10)]`)} />
        </Link>

        <div className="items-center gap-3 sm:flex ">
          <Button
            variant={"destructive"}
            corner={"rounded"}
            className={cn(`text-white`)}
            onClick={() => logoutUser()}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
