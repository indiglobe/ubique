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
        "flex min-h-screen",
        "items-center justify-center",
        "bg-slate-50",
        "px-4 py-8"
      )}
    >
      <div
        className={cn(
          "w-full max-w-md",
          "rounded-3xl",
          "bg-white",
          "px-6 py-10",
          "text-center",
          "shadow-[0_10px_40px_rgba(0,0,0,0.12)]",
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
              "border-4 border-white",
              "shadow-lg",
              "ring-2 ring-blue-100",
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
              "bg-emerald-100",
              "text-4xl",
              "font-bold",
              "text-emerald-600"
            )}
          >
            ✓
          </div>
        </div>

        {/* Message */}

        <h1
          className={cn(
            "mt-6",
            "text-2xl font-bold",
            "text-slate-800",
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
            "font-semibold",
            "transition-all duration-200",
            "sm:text-lg",

            completedStep < 3 && [
              "bg-blue-600",
              "text-white",
              "shadow-md",
              "hover:bg-blue-700",
              "hover:shadow-lg",
              "active:scale-[0.98]",
            ],

            completedStep >= 3 && [
              "cursor-not-allowed",
              "bg-emerald-600",
              "text-white",
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
            "border-2 border-blue-600",
            "px-6 py-3.5",
            "font-semibold",
            "text-blue-600",
            "transition-all duration-200",
            "hover:bg-blue-50",
            "active:scale-[0.98]",
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