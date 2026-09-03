import { cn } from "@repo/styles/cn";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";
import { useAuthContext } from "./auth-context";

export function AuthSection() {
  const { activeSection, toggleActiveSection } = useAuthContext();

  return (
    <div
      className={cn(
        "bg-background 3xs:px-6 2xs:px-8 px-5 py-8 sm:px-10 sm:py-12 lg:flex lg:items-center lg:px-14 lg:py-14",
      )}
    >
      <div className="mx-auto w-full max-w-md">
        {/* YOUR EXISTING SWITCH */}

        <div
          className={cn(
            "border-primary-100 bg-primary-100/50 dark:border-primary-900 dark:bg-primary-950/50 grid grid-cols-2 rounded-2xl border p-1.5",
          )}
        >
          <button
            type="button"
            onClick={() => toggleActiveSection("signin")}
            className={cn(
              "font-brand-primary rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200",
              activeSection === "signin" && [
                "bg-background text-primary-600 shadow-primary-950/10 dark:text-primary-300 shadow-md",
              ],
              activeSection !== "signin" && [
                "text-primary-600/60 hover:text-primary-700 dark:text-primary-400/60 dark:hover:text-primary-300",
              ],
            )}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => toggleActiveSection("signup")}
            className={cn(
              "font-brand-primary rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200",
              activeSection === "signup" && [
                "bg-background text-primary-600 shadow-primary-950/10 dark:text-primary-300 shadow-md",
              ],
              activeSection !== "signup" && [
                "text-primary-600/60 hover:text-primary-700 dark:text-primary-400/60 dark:hover:text-primary-300",
              ],
            )}
          >
            Sign Up
          </button>
        </div>

        {/* CALL COMPONENTS */}

        {activeSection === "signin" ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
}
