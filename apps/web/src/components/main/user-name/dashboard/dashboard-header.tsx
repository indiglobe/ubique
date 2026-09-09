import { useState } from "react";

import {
  Bell,
  Check,
  LogOut,
  Moon,
  Search,
} from "lucide-react";

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

import { Button } from "@repo/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/sheet";

import { cn } from "@repo/styles/cn";

import { DashboardProfile } from "./dashboard-profile";
import { DashboardSidebar } from "./dashboard-sidebar";

export function DashboardHeader() {
  const [isLogoutOpen, setIsLogoutOpen] =
    useState(false);

  const [
    isLogoutSuccessOpen,
    setIsLogoutSuccessOpen,
  ] = useState(false);

  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false);

  const handleLogout = () => {
    // Add actual logout logic here later.

    setIsLogoutOpen(false);
    setIsLogoutSuccessOpen(true);
  };

  const handleLogoutSuccess = () => {
    setIsLogoutSuccessOpen(false);

    // Redirect to login page later.
  };

  return (
    <>
      {/* Header Container */}

      <div
        className={cn(
          `@container w-full`,
        )}
      >
        <header
          className={cn(
            `flex w-full items-center justify-between`,
            `border-b border-foreground/10`,
            `bg-transparent`,
            `px-3 py-3`,
            `@min-[28rem]:px-4`,
            `@min-[40rem]:px-6`,
            `@min-[64rem]:px-7`,
          )}
        >
          {/* ========================= */}
          {/* Left Section */}
          {/* ========================= */}

          <div
            className={cn(
              `flex min-w-0 items-center`,
            )}
          >
            {/* ========================= */}
            {/* Mobile Profile */}
            {/* ========================= */}

            <div
              className={cn(
                `md:hidden`,
              )}
            >
              <Sheet
                open={isMobileMenuOpen}
                onOpenChange={
                  setIsMobileMenuOpen
                }
              >
                {/* Mobile Profile Trigger */}

                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label="Open profile menu"
                    className={cn(
                      `rounded-full`,
                      `border-0`,
                      `bg-transparent`,
                      `p-0`,
                      `text-foreground`,
                      `outline-none`,
                      `transition-opacity duration-200`,
                      `hover:opacity-80`,
                      `focus-visible:ring-2`,
                      `focus-visible:ring-primary-400`,
                      `focus-visible:ring-offset-2`,
                      `focus-visible:ring-offset-background`,
                    )}
                  >
                    {/*
                      Use the same DashboardProfile
                      component, but only display its
                      avatar on mobile header.

                      DashboardProfile root:
                      1st child = avatar
                      2nd child = user information
                    */}

                    <DashboardProfile
                      className={cn(
                        `gap-0`,
                        `[&>div:last-child]:hidden`,
                      )}
                    />
                  </button>
                </SheetTrigger>

                {/* ========================= */}
                {/* Mobile Left Drawer */}
                {/* ========================= */}

                <SheetContent
                  side="left"
                  className={cn(
                    `flex h-full flex-col`,
                    `w-[85%]`,
                    `max-w-xs`,
                    `border-r border-foreground/10`,
                    `bg-background`,
                    `p-0`,
                    `text-foreground`,
                  )}
                >
                  {/* ========================= */}
                  {/* Drawer Profile Header */}
                  {/* ========================= */}

                  <SheetHeader
                    className={cn(
                      `shrink-0`,
                      `border-b border-foreground/10`,
                      `px-5 py-5`,
                      `text-left`,
                    )}
                  >
                    <SheetTitle
                      className={cn(
                        `sr-only`,
                      )}
                    >
                      Profile Menu
                    </SheetTitle>

                    <DashboardProfile />
                  </SheetHeader>

                  {/* ========================= */}
                  {/* Sidebar Content */}
                  {/* ========================= */}

                  <div
                    className={cn(
                      `min-h-0 flex-1`,
                      `overflow-y-auto`,
                      `[scrollbar-width:none]`,
                      `[&::-webkit-scrollbar]:hidden`,
                    )}
                  >
                    <DashboardSidebar />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* ========================= */}
            {/* Desktop Profile */}
            {/* ========================= */}

            <div
              className={cn(
                `hidden`,
                `md:block`,
              )}
            >
              <DashboardProfile />
            </div>
          </div>

          {/* ========================= */}
          {/* Right Section */}
          {/* ========================= */}

          <div
            className={cn(
              `flex shrink-0 items-center`,
              `gap-1.5`,
              `@max-[40rem]:gap-3`,
              `@max-[28rem]:gap-2`,
            )}
          >
            {/* ========================= */}
            {/* Notifications */}
            {/* ========================= */}

            <Button
              type="button"
              variant="primary"
              size="icon"
              aria-label="Notifications"
              className={cn(
                `relative`,
                `size-9 shrink-0`,
                `rounded-full`,
                `border border-foreground/10`,
                `bg-foreground/3`,
                `text-foreground/65`,
                `transition-all duration-200`,
                `hover:border-primary-300/40`,
                `hover:bg-primary-300/10`,
                `hover:text-foreground`,
                `@max-[40rem]:size-10`,
              )}
            >
              <Bell
                className={cn(
                  `size-4`,
                  `@min-[40rem]:size-4.5`,
                )}
                strokeWidth={1.8}
              />

              {/* Notification Count */}

              <span
                className={cn(
                  `absolute -top-1 -right-0.5`,
                  `flex size-4 items-center justify-center`,
                  `rounded-1.25`,
                  `bg-primary-300`,
                  `font-brand-primary`,
                  `text-2 font-bold`,
                  `text-primary-950`,
                  `@min-[40rem]:size-4.25`,
                  `@min-[40rem]:text-2.25`,
                )}
              >
                2
              </span>
            </Button>

            {/* ========================= */}
            {/* Desktop Search */}
            {/* ========================= */}

            <div
              className={cn(
                `hidden h-10 items-center gap-2`,
                `rounded-md`,
                `border border-foreground/10`,
                `bg-foreground/3`,
                `px-3`,
                `transition-colors`,
                `focus-within:border-primary-300/40`,
                `@min-[40rem]:flex`,
                `@min-[40rem]:w-36`,
                `@min-[48rem]:w-40`,
                `@min-[64rem]:w-44`,
              )}
            >
              <Search
                className={cn(
                  `size-4 shrink-0`,
                  `text-foreground/40`,
                )}
                strokeWidth={1.8}
              />

              <input
                type="text"
                placeholder="Search.."
                className={cn(
                  `min-w-0 flex-1`,
                  `border-none`,
                  `bg-transparent`,
                  `font-brand-primary`,
                  `text-xs`,
                  `text-foreground`,
                  `outline-none`,
                  `placeholder:text-foreground/35`,
                )}
              />

              <Moon
                className={cn(
                  `size-4 shrink-0`,
                  `text-foreground/45`,
                )}
                strokeWidth={1.8}
              />
            </div>

            {/* ========================= */}
            {/* Mobile Search */}
            {/* ========================= */}

            <Button
              type="button"
              variant="primary"
              size="icon"
              aria-label="Search"
              className={cn(
                `flex size-9 shrink-0`,
                `rounded-xl`,
                `border border-foreground/10`,
                `bg-foreground/3`,
                `text-foreground/60`,
                `transition-all duration-200`,
                `hover:border-primary-300/40`,
                `hover:bg-primary-300/10`,
                `hover:text-foreground`,
                `@min-[40rem]:hidden`,
              )}
            >
              <Search
                className={cn(
                  `size-4`,
                )}
                strokeWidth={1.8}
              />
            </Button>

            {/* ========================= */}
            {/* Logout Confirmation */}
            {/* ========================= */}

            <AlertDialog
              open={isLogoutOpen}
              onOpenChange={
                setIsLogoutOpen
              }
            >
              <AlertDialogTrigger
                asChild
              >
                <Button
                  type="button"
                  variant="primary"
                  className={cn(
                    `h-9 shrink-0 gap-2`,
                    `rounded-md`,
                    `border border-red-600`,
                    `bg-red-600`,
                    `px-2.5`,
                    `font-brand-primary`,
                    `text-xs font-semibold`,
                    `text-white`,
                    `transition-all duration-300`,
                    `hover:border-red-700`,
                    `hover:bg-red-700`,
                    `hover:text-white`,
                    `active:scale-95`,
                    `@min-[40rem]:h-10`,
                    `@min-[40rem]:px-4`,
                  )}
                >
                  <span
                    className={cn(
                      `hidden`,
                      `@min-[32rem]:inline`,
                    )}
                  >
                    Log Out
                  </span>

                  <LogOut
                    className={cn(
                      `size-4`,
                    )}
                    strokeWidth={1.8}
                  />
                </Button>
              </AlertDialogTrigger>

              {/* Confirmation Dialog */}

              <AlertDialogContent
                className={cn(
                  `@container`,
                  `w-[calc(100%-2rem)]`,
                  `max-w-xl`,
                  `border border-foreground/10`,
                  `bg-background`,
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
                        `flex size-12 shrink-0`,
                        `items-center justify-center`,
                        `rounded-full`,
                        `bg-red-500/10`,
                        `text-red-500`,
                      )}
                    >
                      <LogOut
                        className={cn(
                          `size-5`,
                        )}
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
                          `font-brand-secondary`,
                          `text-xl leading-tight`,
                          `font-semibold`,
                          `text-foreground`,
                        )}
                      >
                        Log out of your
                        account?
                      </AlertDialogTitle>

                      <AlertDialogDescription
                        className={cn(
                          `mt-2 max-w-lg`,
                          `font-brand-primary`,
                          `text-sm leading-6`,
                          `text-foreground/60`,
                        )}
                      >
                        You are about to end
                        your current session.
                        You can sign back in
                        anytime using your
                        account credentials.
                      </AlertDialogDescription>
                    </div>
                  </div>
                </AlertDialogHeader>

                <AlertDialogFooter
                  className={cn(
                    `mt-2`,
                    `@min-[24rem]:justify-end`,
                  )}
                >
                  {/* Cancel */}

                  <AlertDialogCancel
                    className={cn(
                      `rounded-md`,
                      `border border-foreground/10`,
                      `bg-transparent`,
                      `px-5`,
                      `font-brand-primary`,
                      `font-semibold`,
                      `text-foreground`,
                      `transition-colors`,
                      `hover:bg-foreground/5`,
                    )}
                  >
                    Stay Logged In
                  </AlertDialogCancel>

                  {/* Confirm Logout */}

                  <AlertDialogAction
                    onClick={
                      handleLogout
                    }
                    className={cn(
                      `gap-2`,
                      `rounded-md`,
                      `border-red-600`,
                      `bg-red-600`,
                      `px-5`,
                      `font-brand-primary`,
                      `font-semibold`,
                      `text-white`,
                      `transition-colors`,
                      `hover:border-red-700`,
                      `hover:bg-red-700`,
                      `hover:text-white`,
                    )}
                  >
                    <LogOut
                      className={cn(
                        `size-4`,
                      )}
                      strokeWidth={1.8}
                    />

                    Log Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* ========================= */}
            {/* Logout Success Dialog */}
            {/* ========================= */}

            <AlertDialog
              open={
                isLogoutSuccessOpen
              }
              onOpenChange={
                setIsLogoutSuccessOpen
              }
            >
              <AlertDialogContent
                className={cn(
                  `@container`,
                  `w-[calc(100%-2rem)]`,
                  `max-w-md`,
                  `border border-foreground/10`,
                  `bg-background`,
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
                      `mx-auto mb-4`,
                      `flex size-14`,
                      `items-center justify-center`,
                      `rounded-full`,
                      `bg-accent-500/10`,
                      `text-accent-600`,
                      `dark:text-accent-400`,
                    )}
                  >
                    <Check
                      className={cn(
                        `size-7`,
                      )}
                      strokeWidth={2.3}
                    />
                  </div>

                  {/* Success Title */}

                  <AlertDialogTitle
                    className={cn(
                      `font-brand-secondary`,
                      `text-xl font-semibold`,
                      `text-foreground`,
                    )}
                  >
                    Logged Out Successfully!
                  </AlertDialogTitle>

                  {/* Success Description */}

                  <AlertDialogDescription
                    className={cn(
                      `mx-auto mt-2`,
                      `max-w-sm`,
                      `font-brand-primary`,
                      `text-sm leading-6`,
                      `text-foreground/60`,
                    )}
                  >
                    You have successfully
                    logged out of your account.
                    We hope to see you again
                    soon.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter
                  className={cn(
                    `mt-2`,
                    `@min-[24rem]:justify-center`,
                  )}
                >
                  <AlertDialogAction
                    onClick={
                      handleLogoutSuccess
                    }
                    className={cn(
                      `w-full`,
                      `rounded-md`,
                      `bg-accent-600`,
                      `px-6`,
                      `font-brand-primary`,
                      `font-semibold`,
                      `text-white`,
                      `transition-colors`,
                      `hover:bg-accent-700`,
                      `hover:text-white`,
                      `@min-[24rem]:w-auto`,
                      `@min-[24rem]:min-w-32`,
                    )}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </header>
      </div>
    </>
  );
}