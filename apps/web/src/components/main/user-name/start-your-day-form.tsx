import { useAppStore } from "@/hooks/use-app-store";
import SelfiePage from "./selfie-page";
import OdometerPage from "./odometer-page";
import DayStartedPage from "./day-started-page";
import { InitialUI } from "./initial-ui";

export function StartYourDayForm() {
  const hasStartedDay = useAppStore((state) => state.hasStartedDay);

  const completedStep = useAppStore((state) => state.completedStep);

  if (!hasStartedDay) {
    return <InitialUI />;
  }

  if (completedStep === 0) {
    return <SelfiePage />;
  }

  if (completedStep === 1) {
    return <OdometerPage />;
  }

  return <DayStartedPage />;
}
