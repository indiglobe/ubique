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
        "flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 sm:px-6 md:px-8 h-svh"
      )}
    >
      <div
        className={cn
            (
          "w-full max-w-md rounded-3xl bg-white px-6 py-10 text-center shadow-[0_10px_40px_rgba(0,0,0,0.12)] sm:px-10 sm:py-12 md:max-w-lg",

        )}
      >
        {/* Medical Representative Image */}

        <div className="mb-8 flex justify-center">
          <img
            src={`https://images.pexels.com/photos/30968488/pexels-photo-30968488.jpeg`}
            alt="Medical Representative"
            className={cn(
              "h-36 object-cover w-36 rounded-full border-4 border-white shadow-lg ring-2 ring-blue-200 sm:h-40 sm:w-40 md:h-44 md:w-44",
            )}
          />
        </div>

        {/* Greeting */}

        <h1
          className={cn(
            "font-bold tracking-tight",
            "text-slate-800",
            "text-3xl",
            "sm:text-4xl",
            "md:text-5xl"
          )}
        >
          {greeting}
        </h1>

        {/* Supporting Message */}

        <p
          className={cn(
            "mt-3",
            "text-sm text-slate-500",
            "sm:text-base",
            "md:text-lg"
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
            "mt-8",
            "rounded-xl",
            "px-8 py-3",
            "font-semibold",
            "transition-all duration-200",

            !hasStartedDay && [
              "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200",
            ],

            hasStartedDay && [
              "cursor-not-allowed bg-slate-300 text-slate-600",
            ],

            "sm:px-10",
            "sm:py-3.5",
            "sm:text-lg"
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