import { useAppStore } from "@/hooks/use-app-store";
import { cn } from "@repo/styles/cn";
import { useEffect, useState } from "react";
import Main from "@/components/main/main";

const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12 && currentHour >= 4) {
    return "Good Morning";
  }

  if (currentHour < 17 && currentHour >= 12) {
    return "Good Afternoon";
  }

  if (currentHour < 21 && currentHour >= 16) {
    return "Good Evening";
  }

  return "Good Night";
};

function InitialUI() {
  const hasStartedDay = useAppStore((state) => state.hasStartedDay);
  const startDay = useAppStore((state) => state.startDay);
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60_000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleStartDay = () => {
    startDay();
  };

  return (
    <Main
      className={cn(
        "bg-background 3xs:px-5 2xs:px-6 xs:px-7 flex min-h-svh items-center justify-center px-4 py-8 sm:px-8",
      )}
    >
      <div
        className={cn(
          "border-primary-100 bg-primary-50/40 shadow-primary-950/10 dark:border-primary-900 dark:bg-primary-950/20 dark:shadow-primary-950/30 3xs:px-7 2xs:px-8 xs:px-9 w-full max-w-md rounded-2xl border px-6 py-10 text-center shadow-xl backdrop-blur-sm sm:px-10 sm:py-12 md:max-w-lg",
        )}
      >
        {/* Medical Representative Image */}

        <div className="mb-8 flex justify-center">
          <img
            src={`https://images.pexels.com/photos/30968488/pexels-photo-30968488.jpeg`}
            alt="Medical Representative"
            className={cn(
              "border-background shadow-primary-950/15 ring-primary-200/70 dark:ring-primary-800/70 h-36 w-36 rounded-full border-4 object-cover shadow-lg ring-4 sm:h-40 sm:w-40 md:h-44 md:w-44",
            )}
          />
        </div>

        {/* Greeting */}

        <h1
          className={cn(
            "font-brand-secondary text-foreground text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",
          )}
        >
          {greeting}
        </h1>

        {/* Supporting Message */}

        <p
          className={cn(
            "font-brand-primary text-primary-800/70 dark:text-primary-200/70 mt-3 text-sm sm:text-base md:text-lg",
          )}
        >
          {greeting === "Good Night"
            ? "Have a great day tomorrow!"
            : "Ready to make today productive?"}
        </p>

        {/* Start Day Button */}

        <button
          type="button"
          onClick={handleStartDay}
          disabled={hasStartedDay}
          className={cn(
            "font-brand-primary mt-8 rounded-md px-8 py-3 font-semibold transition-all duration-200",

            !hasStartedDay && [
              "bg-primary-600 text-primary-50 shadow-primary-600/20 hover:bg-primary-700 hover:shadow-primary-700/25 focus:ring-primary-200 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800 shadow-lg hover:shadow-xl focus:ring-4 focus:outline-none active:scale-95",
            ],

            hasStartedDay && [
              "bg-primary-100 text-primary-400 dark:bg-primary-900 dark:text-primary-600 cursor-not-allowed",
            ],

            "sm:px-10 sm:py-3.5 sm:text-lg",
          )}
        >
          {hasStartedDay ? "Day Started" : "Start Your Day"}
        </button>
      </div>
    </Main>
  );
}

export { InitialUI };
