import { cn } from "@repo/styles/cn";
import { useAuthContext } from "./auth-context";

export function SignInForm() {
  const { toggleActiveSection } = useAuthContext();

  return (
    <>
      {/* HEADING */}

      <div className="mt-9">
        <p
          className={cn(
            "font-brand-accent text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-300",
          )}
        >
          Welcome Back
        </p>

        <h2
          className={cn(
            "mt-2 font-brand-secondary text-3xl font-bold tracking-tight text-foreground sm:text-4xl",
          )}
        >
          Sign in to your account.
        </h2>

        <p
          className={cn(
            "mt-3 text-sm leading-6 text-primary-800/60 dark:text-primary-200/60",
          )}
        >
          Enter your details to access your medical representative workspace.
        </p>
      </div>

      {/* GOOGLE */}

      <button
        type="button"
        // onClick={handleGoogleAuth}
        className={cn(
          "mt-7 flex w-full items-center justify-center gap-3 rounded-xl border-primary-200 border bg-background px-5 py-3.5 font-brand-primary text-sm font-semibold text-foreground shadow-primary-950/5 shadow-sm transition-all duration-200 hover:border-primary-300 hover:bg-primary-50 hover:shadow-md active:scale-[0.98] dark:border-primary-800 dark:hover:border-primary-700 dark:hover:bg-primary-950/40",
        )}
      >
        {/* REAL GOOGLE ICON */}
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
          <path
            fill="#4285F4"
            d="M21.805 10.023h-9.62v3.955h5.53c-.24 1.271-.96 2.349-2.045 3.073v2.553h3.31c1.937-1.783 3.055-4.41 3.055-7.534 0-.69-.062-1.355-.18-1.997Z"
          />

          <path
            fill="#34A853"
            d="M12.185 22c2.77 0 5.093-.918 6.79-2.486l-3.31-2.553c-.918.615-2.09.978-3.48.978-2.674 0-4.939-1.805-5.75-4.23H3.015v2.655A10.256 10.256 0 0 0 12.185 22Z"
          />

          <path
            fill="#FBBC05"
            d="M6.435 13.709a6.18 6.18 0 0 1 0-3.954V7.1H3.015a10.286 10.286 0 0 0 0 9.264l3.42-2.655Z"
          />

          <path
            fill="#EA4335"
            d="M12.185 5.525c1.507 0 2.86.518 3.925 1.534l2.94-2.94C17.273 2.463 14.95 1.45 12.185 1.45A10.256 10.256 0 0 0 3.015 7.1l3.42 2.655c.811-2.425 3.076-4.23 5.75-4.23Z"
          />
        </svg>
        Continue with Google
      </button>

      {/* DIVIDER */}

      <div className={cn("my-7", "flex items-center", "gap-4")}>
        <div
          className={cn("h-px grow", "bg-primary-100", "dark:bg-primary-900")}
        />

        <span
          className={cn(
            "shrink-0 text-xs font-medium text-primary-600/50 dark:text-primary-400/50",
          )}
        >
          More sign-up/sign-in ways upcoming
        </span>

        <div
          className={cn("h-px grow", "bg-primary-100", "dark:bg-primary-900")}
        />
      </div>

      {/* FORM */}

      {/* <button
        type="submit"
        disabled={!canSubmit || isSubmitting}
        className={cn(
          "mt-7 flex w-full items-center justify-center rounded-xl px-6 py-3.5 font-brand-primary font-semibold transition-all duration-200 sm:text-lg",

          canSubmit &&
            !isSubmitting && [
              "bg-primary-600 text-primary-50 shadow-primary-600/20 shadow-lg hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-700/25 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary-200 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800",
            ],

          (!canSubmit || isSubmitting) && [
            "cursor-not-allowed bg-primary-100 text-primary-400 dark:bg-primary-900 dark:text-primary-600",
          ],
        )}
      >
        {isSubmitting ? "Please Wait..." : "Sign In"}
      </button> */}

      {/* BOTTOM SWITCH */}

      <p
        className={cn(
          "mt-6 text-center text-sm text-primary-800/60 dark:text-primary-200/60",
        )}
      >
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => toggleActiveSection("signup")}
          className={cn(
            "font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200",
          )}
        >
          Sign Up
        </button>
      </p>
    </>
  );
}
