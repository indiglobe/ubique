import { cn } from "@repo/styles/cn";


type StepProgressProps = {
  completedStep: number;
};

const StepProgress = ({
  completedStep,
}: StepProgressProps) => {
  const steps = [1, 2, 3];

  return (
    <div className="mb-8 flex w-full items-center justify-center">
      {steps.map((step, index) => (
        <div
          key={step}
          className="flex items-center"
        >
          {/* Step Circle */}

          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",

              completedStep >= step
                ? [
                    "border-blue-600",
                    "bg-blue-600",
                    "text-white",
                  ]
                : [
                    "border-slate-300",
                    "bg-white",
                    "text-slate-500",
                  ]
            )}
          >
            {step}
          </div>

          {/* Connecting Line */}

          {index < steps.length - 1 && (
            <div
              className={cn(
                "h-0.5 w-12 sm:w-16 md:w-20",

                completedStep >= step
                  ? "bg-blue-600"
                  : "bg-slate-300"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepProgress;