import { useState } from "react";
import {
  Bell,
  Check,
  ChevronDown,
  LogOut,
  Moon,
  Search,
  Wallet,
} from "lucide-react";
import { Button } from "@repo/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/alert-dialog";
import { cn } from "@repo/styles/cn";

export function DashboardHeader() {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLogoutSuccessOpen, setIsLogoutSuccessOpen] = useState(false);

  const handleLogout = () => {
    // Add actual logout logic here later.
    setIsLogoutOpen(false);
    setIsLogoutSuccessOpen(true);
  };

  const handleLogoutSuccess = () => {
    setIsLogoutSuccessOpen(false);

    // You can redirect to the login page here later.
  };

  return (
    <>
      <header
        className={cn(
          `flex w-full items-center justify-between border-b border-foreground/10 bg-transparent px-3 py-3 3xs:px-4 sm:px-6 lg:px-7`,
        )}
      >
        {/* Left Section */}
        <div className={cn(`flex min-w-0 items-center`)}>
          {/* Profile */}
          <Button
            type="button"
            variant="primary"
            className={cn(
              `h-auto min-w-0 gap-2.5 rounded-xl border-0 bg-transparent p-0 text-foreground shadow-none transition-opacity duration-200 hover:bg-transparent hover:text-foreground hover:opacity-80 focus-visible:bg-transparent active:bg-transparent sm:gap-3`,
            )}
          >
            {/* Avatar */}
            <div
              className={cn(
                `flex size-10 shrink-0 items-center justify-center rounded-full border border-primary-300/60 bg-primary-100 p-0.5 dark:bg-primary-900/50 sm:size-11`,
              )}
            >
              <div
                className={cn(
                  `flex size-full items-center justify-center rounded-full bg-secondary-100 text-lg sm:text-xl`,
                )}
              >
                👩🏼
              </div>
            </div>

            {/* User Details */}
            <div
              className={cn(
                `hidden min-w-0 text-left 3xs:block`,
              )}
            >
              {/* Username */}
              <div className={cn(`flex items-center gap-2`)}>
                <span
                  className={cn(
                    `max-w-20 truncate font-brand-primary text-2.5 font-medium text-foreground/45 sm:max-w-none sm:text-2.75`,
                  )}
                >
                  @ryan997
                </span>
              </div>

              {/* Name */}
              <div className={cn(`mt-0.5 flex items-center gap-1.5`)}>
                <span
                  className={cn(
                    `max-w-28 truncate font-brand-secondary text-sm font-semibold text-foreground sm:max-w-none sm:text-base`,
                  )}
                >
                  Ryan Crawford
                </span>

                <ChevronDown
                  className={cn(
                    `size-3.5 shrink-0 text-foreground/55`,
                  )}
                  strokeWidth={1.8}
                />
              </div>
            </div>
          </Button>

          {/* Divider */}
          <div
            className={cn(
              `mx-4 hidden h-12 w-px bg-foreground/10 sm:block lg:mx-7`,
            )}
          />

          {/* Medical Representative */}
          <Button
            type="button"
            className={cn(
              `hidden items-center gap-2 rounded-xl bg-primary-300 px-4 font-brand-secondary text-sm font-semibold text-primary-950 shadow-[0_0_24px_oklch(79.064%_0.10696_245.047/0.16)] transition-all duration-200 hover:bg-primary-200 hover:text-primary-950 hover:shadow-[0_0_30px_oklch(79.064%_0.10696_245.047/0.24)] active:scale-[0.97] 2xs:flex sm:px-5`,
            )}
          >
            <span>Medical Representative</span>

            <Wallet
              className={cn(`size-4`)}
              strokeWidth={2}
            />
          </Button>
        </div>

        {/* Right Section */}
        <div
          className={cn(
            `flex shrink-0 items-center gap-1.5 3xs:gap-2 sm:gap-3`,
          )}
        >
          {/* Notifications */}
          <Button
            type="button"
            variant="primary"
            size="icon"
            aria-label="Notifications"
            className={cn(
              `relative size-9 shrink-0 rounded-full border border-foreground/10 bg-foreground/3 text-foreground/65 transition-all duration-200 hover:border-primary-300/40 hover:bg-primary-300/10 hover:text-foreground sm:size-10`,
            )}
          >
            <Bell
              className={cn(
                `size-4 sm:size-4.5`,
              )}
              strokeWidth={1.8}
            />

            {/* Notification Count */}
            <span
              className={cn(
                `absolute -top-1 -right-0.5 flex size-4 items-center justify-center rounded-1.25 bg-primary-300 font-brand-primary text-2 font-bold text-primary-950 sm:size-4.25 sm:text-2.25`,
              )}
            >
              2
            </span>
          </Button>

          {/* Desktop Search */}
          <div
            className={cn(
              `hidden h-10 items-center gap-2 rounded-xl border border-foreground/10 bg-foreground/3 px-3 transition-colors focus-within:border-primary-300/40 sm:flex sm:w-36 md:w-40 lg:w-44`,
            )}
          >
            <Search
              className={cn(
                `size-4 shrink-0 text-foreground/40`,
              )}
              strokeWidth={1.8}
            />

            <input
              type="text"
              placeholder="Search.."
              className={cn(
                `min-w-0 flex-1 border-none bg-transparent font-brand-primary text-xs text-foreground outline-none placeholder:text-foreground/35`,
              )}
            />

            <Moon
              className={cn(
                `size-4 shrink-0 text-foreground/45`,
              )}
              strokeWidth={1.8}
            />
          </div>

          {/* Mobile Search */}
          <Button
            type="button"
            variant="primary"
            size="icon"
            aria-label="Search"
            className={cn(
              `flex size-9 shrink-0 rounded-xl border border-foreground/10 bg-foreground/3 text-foreground/60 transition-all duration-200 hover:border-primary-300/40 hover:bg-primary-300/10 hover:text-foreground sm:hidden`,
            )}
          >
            <Search
              className={cn(`size-4`)}
              strokeWidth={1.8}
            />
          </Button>

          {/* Logout Confirmation Dialog */}
          <AlertDialog
            open={isLogoutOpen}
            onOpenChange={setIsLogoutOpen}
          >
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="primary"
                className={cn(
                  `h-9 shrink-0 gap-2 rounded-xl border border-red-600 bg-red-600 px-2.5 font-brand-primary text-xs font-semibold text-white transition-all duration-300 hover:border-red-700 hover:bg-red-700 hover:text-white active:scale-95 sm:h-10 sm:px-4`,
                )}
              >
                <span
                  className={cn(
                    `hidden 2xs:inline`,
                  )}
                >
                  Log Out
                </span>

                <LogOut
                  className={cn(`size-4`)}
                  strokeWidth={1.8}
                />
              </Button>
            </AlertDialogTrigger>

            {/* Confirmation Content */}
            <AlertDialogContent
              className={cn(
                `w-[calc(100%-2rem)] border border-foreground/10 bg-background sm:max-w-xl`,
              )}
            >
              <AlertDialogHeader
                className={cn(
                  `block text-left`,
                )}
              >
                <div
                  className={cn(
                    `flex items-start gap-4`,
                  )}
                >
                  {/* Logout Icon */}
                  <div
                    className={cn(
                      `flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500`,
                    )}
                  >
                    <LogOut
                      className={cn(`size-5`)}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={cn(
                      `min-w-0 flex-1 pt-0.5`,
                    )}
                  >
                    <AlertDialogTitle
                      className={cn(
                        `font-brand-secondary text-xl font-semibold leading-tight text-foreground`,
                      )}
                    >
                      Log out of your account?
                    </AlertDialogTitle>

                    <AlertDialogDescription
                      className={cn(
                        `mt-2 max-w-lg font-brand-primary text-sm leading-6 text-foreground/60`,
                      )}
                    >
                      You are about to end your current session. You can sign
                      back in anytime using your account credentials.
                    </AlertDialogDescription>
                  </div>
                </div>
              </AlertDialogHeader>

              <AlertDialogFooter
                className={cn(
                  `mt-2 sm:justify-end`,
                )}
              >
                {/* Cancel */}
                <AlertDialogCancel
                  className={cn(
                    `rounded-xl border border-foreground/10 bg-transparent px-5 font-brand-primary font-semibold text-foreground transition-colors hover:bg-foreground/5`,
                  )}
                >
                  Stay Logged In
                </AlertDialogCancel>

                {/* Confirm Logout */}
                <AlertDialogAction
                  onClick={handleLogout}
                  className={cn(
                    `gap-2 rounded-xl border-red-600 bg-red-600 px-5 font-brand-primary font-semibold text-white transition-colors hover:border-red-700 hover:bg-red-700 hover:text-white`,
                  )}
                >
                  <LogOut
                    className={cn(`size-4`)}
                    strokeWidth={1.8}
                  />

                  Log Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Logout Success Dialog */}
          <AlertDialog
            open={isLogoutSuccessOpen}
            onOpenChange={setIsLogoutSuccessOpen}
          >
            <AlertDialogContent
              className={cn(
                `w-[calc(100%-2rem)] border border-foreground/10 bg-background sm:max-w-md`,
              )}
            >
              <AlertDialogHeader
                className={cn(
                  `block text-center`,
                )}
              >
                {/* Success Icon */}
                <div
                  className={cn(
                    `mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400`,
                  )}
                >
                  <Check
                    className={cn(`size-7`)}
                    strokeWidth={2.3}
                  />
                </div>

                {/* Success Title */}
                <AlertDialogTitle
                  className={cn(
                    `font-brand-secondary text-xl font-semibold text-foreground`,
                  )}
                >
                  Logged Out Successfully!
                </AlertDialogTitle>

                {/* Success Description */}
                <AlertDialogDescription
                  className={cn(
                    `mx-auto mt-2 max-w-sm font-brand-primary text-sm leading-6 text-foreground/60`,
                  )}
                >
                  You have successfully logged out of your account. We hope to
                  see you again soon.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter
                className={cn(
                  `mt-2 sm:justify-center`,
                )}
              >
                <AlertDialogAction
                  onClick={handleLogoutSuccess}
                  className={cn(
                    `w-full rounded-xl bg-accent-600 px-6 font-brand-primary font-semibold text-white transition-colors hover:bg-accent-700 hover:text-white sm:w-auto sm:min-w-32`,
                  )}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>
    </>
  );
}