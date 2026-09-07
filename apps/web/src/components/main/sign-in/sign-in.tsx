import { cn } from "@repo/styles/cn";
import { SideExtent } from "@/components/main/sign-in/side-extent";
// import {
//   SigningModeProvider,
//   useSigningMode,
// } from "@/components/main/sign-in/auth-context";
// import { LogIn } from "@/components/main/sign-in/log-in-form";
// import { SignUpForm } from "@/components/main/sign-in/sign-up-form";
import Main from "@/components/main/main";
import type { ComponentProps } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";

export function SignIn({ className, ...props }: ComponentProps<typeof Main>) {
  return (
    <Main
      className={cn(
        "bg-background 3xs:px-5 2xs:px-6 min-h-svh px-4 py-6 sm:px-8 sm:py-8 lg:flex lg:items-center lg:justify-center lg:px-10",
        className,
      )}
      {...props}
    >
      <section
        className={cn(
          "border-primary-100 bg-primary-50/40 shadow-primary-950/10 dark:border-primary-900 dark:bg-primary-950/20 dark:shadow-primary-950/30 mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border shadow-xl lg:grid-cols-[0.95fr_1.05fr]",
        )}
      >
        <SideExtent />

        <AuthSection>{props.children}</AuthSection>
      </section>
    </Main>
  );
}

function AuthSection({ className, ...props }: ComponentProps<"div">) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const { activeSection, toggleActiveSection } = useSigningMode();

  return (
    <div
      className={cn(
        "bg-background 3xs:px-6 2xs:px-8 text-foreground px-5 py-8 pt-20 sm:px-10 sm:pb-12 lg:flex lg:items-start lg:px-14 lg:pb-14",
        className,
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-md">
        {/* YOUR EXISTING SWITCH */}

        <div
          className={cn(
            "border-primary-200/70 bg-primary-50/80 shadow-primary-900/5 dark:border-primary-800/80 dark:bg-primary-950/50 grid grid-cols-2 rounded-2xl border p-1.5 shadow-sm dark:shadow-lg dark:shadow-black/15",
          )}
        >
          <button
            type="button"
            onClick={() => navigate({ to: "/log-in" })}
            // onClick={() => toggleActiveSection("login")}
            className={cn(
              "font-brand-primary focus-visible:ring-primary-500/50 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:outline-none",

              pathname.startsWith("/log-in") && [
                "bg-primary-600 shadow-primary-600/25 dark:bg-primary-500 dark:shadow-primary-500/20 text-white shadow-md",
              ],

              pathname.startsWith("/sign-up") && [
                "text-primary-700/70 hover:bg-primary-100 hover:text-primary-800 dark:text-primary-300/70 dark:hover:bg-primary-900/70 dark:hover:text-primary-100",
              ],
            )}
          >
            Log In
          </button>

          <button
            type="button"
            onClick={() => navigate({ to: "/sign-up" })}
            // onClick={() => toggleActiveSection("signup")}
            className={cn(
              "font-brand-primary focus-visible:ring-primary-500/50 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:outline-none",

              pathname.startsWith("/sign-up") && [
                "bg-primary-600 shadow-primary-600/25 dark:bg-primary-500 dark:shadow-primary-500/20 text-white shadow-md",
              ],

              pathname.startsWith("/log-in") && [
                "text-primary-700/70 hover:bg-primary-100 hover:text-primary-800 dark:text-primary-300/70 dark:hover:bg-primary-900/70 dark:hover:text-primary-100",
              ],
            )}
          >
            Sign Up
          </button>
        </div>

        {/* CALL COMPONENTS */}

        {props.children}
        {/* {pathname.startsWith("/sign-up") && <SignUpForm />} */}
        {/* {pathname.startsWith("/log-in") && <LogIn />} */}

        {/* {activeSection === "login" ? <LogIn /> : <SignUpForm />} */}
      </div>
    </div>
  );
}
