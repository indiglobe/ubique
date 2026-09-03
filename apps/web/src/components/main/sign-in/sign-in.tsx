import { cn } from "@repo/styles/cn";

import { AuthSection } from "./auth-section";
import { SideExtent } from "./side-extent";
import { AuthContextProvider } from "./auth-context";

export function SignIn() {
  return (
    <main
      className={cn(
        "min-h-svh",
        "bg-background",
        "px-4 py-6",
        "3xs:px-5",
        "2xs:px-6",
        "sm:px-8 sm:py-8",
        "lg:flex",
        "lg:items-center",
        "lg:justify-center",
        "lg:px-10",
      )}
    >
      <section
        className={cn(
          "mx-auto",
          "grid w-full",
          "max-w-6xl",
          "overflow-hidden",
          "rounded-3xl",
          "border-primary-100 border",
          "bg-primary-50/40",
          "shadow-primary-950/10 shadow-xl",
          "dark:border-primary-900",
          "dark:bg-primary-950/20",
          "dark:shadow-primary-950/30",
          "lg:grid-cols-[0.95fr_1.05fr]",
        )}
      >
        <SideExtent />

        <AuthContextProvider>
          <AuthSection />
        </AuthContextProvider>
      </section>
    </main>
  );
}
