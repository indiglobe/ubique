import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";
import { Logo } from "@repo/ui/logo";
import { Link } from "@tanstack/react-router";
import { Button } from "@repo/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/alert-dialog";
import { LogOut, ShieldAlert } from "lucide-react";

export function Navbar({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav className={cn(``, className)} {...props}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Logo className={cn(`[--logo-size:--spacing(10)]`)} />
        </Link>

        <div className="items-center gap-3 sm:flex">
          <LogoutDialog />
        </div>
      </div>
    </nav>
  );
}

export function LogoutDialog() {
  return (
    <AlertDialog>
      <Button
        asChild
        variant="destructive"
        corner="rounded"
        className={cn("text-white")}
      >
        <AlertDialogTrigger >
          <LogOut className="size-4" />
          Logout
        </AlertDialogTrigger>
      </Button>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="border-red-200/50 bg-red-100 text-red-600 dark:border-red-800/50 dark:bg-red-950/40 dark:text-red-400">
            <ShieldAlert />
          </AlertDialogMedia>

          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>

          <AlertDialogDescription>
            You're about to end your current session. You'll need to sign in
            again to access your account and continue where you left off.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <Button asChild variant="ghost">
            <AlertDialogCancel>Stay logged in</AlertDialogCancel>
          </Button>

          <Button asChild variant={"destructive"}>
            <AlertDialogAction asChild>
              <Link
                to="/log-out"
                search={{ "redirect-url": "/" }}
                className="text-white"
              >
                <LogOut className="size-4" />
                Yes, logout
              </Link>
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
