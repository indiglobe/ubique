import { useAppStore } from "@/hooks/use-app-store";
import { cn } from "@repo/styles/cn";
import {
  useEffect,
  useState,
} from "react";
// Replace this with the actual image URL you want to use.


const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12 && currentHour >= 4) {
    return "Good Morning";
  }

  if (currentHour < 17 && currentHour >=12) {
    return "Good Afternoon";
  }

  if (currentHour < 21 && currentHour >=16) {
    return "Good Evening";
  }

  return "Good Night";
};

const InitialUI = () => {
  const hasStartedDay = useAppStore((state)=>state.hasStartedDay);

  const startDay=useAppStore((state)=>state.startDay);

  const [greeting, setGreeting] = useState(
    getGreeting()
  );

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

    // The next page/navigation will
    // be added in the next step.
  };

  return (
    <main
      className={cn(
        "flex min-h-svh items-center justify-center bg-background px-4 py-8 3xs:px-5 2xs:px-6 xs:px-7 sm:px-8"
      )}
    >
      <div
        className={cn
            (
          "w-full max-w-md rounded-3xl border border-primary-100 bg-primary-50/40 px-6 py-10 text-center shadow-xl shadow-primary-950/10 backdrop-blur-sm dark:border-primary-900 dark:bg-primary-950/20 dark:shadow-primary-950/30 3xs:px-7 2xs:px-8 xs:px-9 sm:px-10 sm:py-12 md:max-w-lg",

        )}
      >
        {/* Medical Representative Image */}

        <div className="mb-8 flex justify-center">
          <img
            src={`https://images.pexels.com/photos/30968488/pexels-photo-30968488.jpeg`}
            alt="Medical Representative"
            className={cn(
              "h-36 w-36 rounded-full border-4 border-background object-cover shadow-lg shadow-primary-950/15 ring-4 ring-primary-200/70 dark:ring-primary-800/70 sm:h-40 sm:w-40 md:h-44 md:w-44",
            )}
          />
        </div>

        {/* Greeting */}

        <h1
          className={cn(
            "font-brand-secondary font-bold tracking-tight text-foreground text-3xl sm:text-4xl md:text-5xl"
          )}
        >
          {greeting}
        </h1>

        {/* Supporting Message */}

        <p
          className={cn(
            "mt-3 font-brand-primary text-sm text-primary-800/70 dark:text-primary-200/70 sm:text-base md:text-lg"
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
            "mt-8 rounded-xl px-8 py-3 font-brand-primary font-semibold transition-all duration-200",

            !hasStartedDay && [
              "bg-primary-600 text-primary-50 shadow-lg shadow-primary-600/20 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-700/25 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary-200 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800",
            ],

            hasStartedDay && [
              "cursor-not-allowed bg-primary-100 text-primary-400 dark:bg-primary-900 dark:text-primary-600",
            ],

            "sm:px-10 sm:py-3.5 sm:text-lg"
          )}
        >
          {hasStartedDay
            ? "Day Started"
            : "Start Your Day"}
        </button>
      </div>
    </main>
  );
};

export  {InitialUI};