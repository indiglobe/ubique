import StepProgress from "./step-progress";
import { useAppStore } from "@/hooks/use-app-store";
import { cn } from "@repo/styles/cn";


const DayStartedPage = () => {
  const completedStep = useAppStore(
    (state) => state.completedStep
  );

  const completeStep = useAppStore(
    (state) => state.completeStep
  );

  const resetDay = useAppStore(
    (state) => state.resetDay
  );

  const handleContinue = () => {
    completeStep(3);

    // Next page/dashboard can be added later.
  };

  const handleReturnHome = () => {
    resetDay();
  };

  return (
    <main
      className={cn(
        "flex min-h-svh",
        "items-center justify-center",
        "bg-background",
        "px-4 py-8",
        "3xs:px-5",
        "2xs:px-6",
        "sm:px-8"
      )}
    >
      <div
        className={cn(
          "w-full max-w-md",
          "rounded-3xl",
          "border border-primary-100",
          "bg-primary-50/40",
          "px-6 py-10",
          "text-center",
          "shadow-xl shadow-primary-950/10",
          "backdrop-blur-sm",
          "dark:border-primary-900",
          "dark:bg-primary-950/20",
          "dark:shadow-primary-950/30",
          "sm:px-10 sm:py-12",
          "md:max-w-lg"
        )}
      >
        {/* Step Progress */}

        <StepProgress
          completedStep={completedStep}
        />

        {/* Home Page Avatar */}

        <div className="mt-4 flex justify-center">
          <img
            src="https://images.pexels.com/photos/30968488/pexels-photo-30968488.jpeg"
            alt="Medical Representative"
            className={cn(
              "h-36 w-36",
              "rounded-full",
              "object-cover",
              "border-4 border-background",
              "shadow-lg shadow-primary-950/15",
              "ring-4 ring-primary-200/70",
              "dark:ring-primary-800/70",
              "sm:h-40 sm:w-40",
              "md:h-44 md:w-44"
            )}
          />
        </div>

        {/* Green Tick */}

        <div className="mt-7 flex justify-center">
          <div
            className={cn(
              "tick-pop",
              "flex h-16 w-16",
              "items-center justify-center",
              "rounded-full",
              "bg-accent-100",
              "text-4xl",
              "font-bold",
              "text-accent-700",
              "shadow-lg shadow-accent-600/15",
              "ring-4 ring-accent-200/50",
              "dark:bg-accent-950/40",
              "dark:text-accent-300",
              "dark:ring-accent-800/60"
            )}
          >
            ✓
          </div>
        </div>

        {/* Message */}

        <h1
          className={cn(
            "mt-6",
            "font-brand-secondary",
            "text-2xl font-bold",
            "tracking-tight",
            "text-foreground",
            "sm:text-3xl"
          )}
        >
          Congrats, your day has started 🤩🤩
        </h1>

        {/* Continue Button */}

        <button
          type="button"
          onClick={handleContinue}
          disabled={completedStep >= 3}
          className={cn(
            "mt-8",
            "w-full",
            "rounded-xl",
            "px-6 py-3.5",
            "font-brand-primary",
            "font-semibold",
            "transition-all duration-200",
            "sm:text-lg",

            completedStep < 3 && [
              "bg-primary-600",
              "text-primary-50",
              "shadow-lg shadow-primary-600/20",
              "hover:bg-primary-700",
              "hover:shadow-xl",
              "hover:shadow-primary-700/25",
              "active:scale-[0.98]",
              "focus:outline-none",
              "focus:ring-4",
              "focus:ring-primary-200",
              "dark:bg-primary-500",
              "dark:hover:bg-primary-600",
              "dark:focus:ring-primary-800",
            ],

            completedStep >= 3 && [
              "cursor-not-allowed",
              "bg-accent-600",
              "text-accent-50",
              "shadow-md shadow-accent-600/20",
              "dark:bg-accent-700",
            ]
          )}
        >
          {completedStep >= 3
            ? "Completed"
            : "Continue"}
        </button>

        {/* Return to Home Button */}

        <button
          type="button"
          onClick={handleReturnHome}
          className={cn(
            "mt-4",
            "w-full",
            "rounded-xl",
            "border-2 border-primary-600",
            "px-6 py-3.5",
            "font-brand-primary",
            "font-semibold",
            "text-primary-600",
            "transition-all duration-200",
            "hover:bg-primary-100/60",
            "active:scale-[0.98]",
            "focus:outline-none",
            "focus:ring-4",
            "focus:ring-primary-200",
            "dark:border-primary-400",
            "dark:text-primary-300",
            "dark:hover:bg-primary-900/40",
            "dark:focus:ring-primary-800",
            "sm:text-lg"
          )}
        >
          Return to Home
        </button>
      </div>
    </main>
  );
};

export default DayStartedPage;