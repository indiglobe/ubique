import { authClient } from "@/lib/auth/auth-client";
import { env } from "@repo/env/client";
import { cn } from "@repo/styles/cn";
import { useNavigate, useRouter, useSearch } from "@tanstack/react-router";

export function SignUpForm() {
  const navigate = useNavigate();
  const router = useRouter();
  const searchParamsFromSigninRoutes = useSearch({
    from: "/(guest-routes)/(sign-in)",
  });

  async function googleSignIn() {
    const signUpCallbackUrl = new URL(
      router.buildLocation({
        to: "/redirection",
        search: {
          redirectBackTo: searchParamsFromSigninRoutes?.redirectBackTo ?? "/",
        },
      }).publicHref,
      env.VITE_WEB_APP_HOST,
    );

    await authClient.signIn.social({
      provider: "google",
      callbackURL: signUpCallbackUrl.toString(),
    });
  }

  return (
    <>
      {/* HEADING */}
      <div className="mt-9">
        <p
          className={cn(
            "font-brand-accent text-primary-600 dark:text-primary-300 text-xs font-semibold tracking-[0.18em] uppercase",
          )}
        >
          Get Started
        </p>
        <h2
          className={cn(
            "font-brand-secondary text-foreground dark:text-primary-50 mt-2 text-3xl font-bold tracking-tight sm:text-4xl",
          )}
        >
          Create your account.
        </h2>
        <p
          className={cn(
            "text-primary-800/65 dark:text-primary-100/65 mt-3 text-sm leading-6",
          )}
        >
          Create your account and get your professional workspace ready.
        </p>
      </div>

      <button
        type="button"
        onClick={googleSignIn}
        className={cn(
          "font-brand-primary bg-background text-foreground border-primary-200/80 shadow-primary-900/5 hover:border-primary-300 hover:bg-primary-50 hover:shadow-primary-900/10 focus-visible:ring-primary-500/40 dark:border-primary-800/80 dark:bg-primary-950/30 dark:text-primary-50 dark:hover:border-primary-700 dark:hover:bg-primary-950/70 mt-7 flex w-full items-center justify-center gap-3 rounded-xl border px-5 py-3.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-md focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] dark:shadow-black/10 dark:hover:shadow-lg dark:hover:shadow-black/20",
        )}
      >
        {/* REAL GOOGLE ICON */}
        <svg viewBox="0 0 24 24" className={cn("h-5 w-5 shrink-0")}>
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
        Sign up with Google
      </button>

      {/* DIVIDER */}

      <div className={cn("my-7 flex items-center gap-4")}>
        <div
          className={cn("bg-primary-200/70 dark:bg-primary-800/70 h-px grow")}
        />

        <span
          className={cn(
            "text-primary-600/50 dark:text-primary-300/45 shrink-0 text-xs font-medium",
          )}
        >
          More sign-up/sign-in ways upcoming
        </span>

        <div
          className={cn("bg-primary-200/70 dark:bg-primary-800/70 h-px grow")}
        />
      </div>

      {/* BOTTOM SWITCH */}

      <p
        className={cn(
          "text-primary-800/60 dark:text-primary-100/60 mt-6 text-center text-sm",
        )}
      >
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate({ to: "/log-in" })}
          className={cn(
            "text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-100 focus-visible:ring-primary-500/40 font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none",
          )}
        >
          Log In
        </button>
      </p>
    </>
  );
}
