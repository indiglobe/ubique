import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, House } from "lucide-react";
import { Button } from "@repo/ui/button";

export function WrongDestinationPage() {
  return (
    <main className="bg-background text-foreground relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
      <div className="bg-primary-500/10 pointer-events-none absolute -top-32 -left-32 size-96 rounded-full blur-3xl" />
      <div className="bg-secondary-500/10 pointer-events-none absolute -right-32 -bottom-40 size-120 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-xl text-center">
        <h1 className="font-brand-accent text-3xl font-bold tracking-tight sm:text-4xl">
          Uh-oh! This isn't
          <span className="text-primary-500 block">where you should be.</span>
        </h1>

        <p className="text-foreground/60 mx-auto mt-5 max-w-md text-sm leading-7 sm:text-base">
          Looks like you've landed on a page that wasn't meant for you. No
          worries, though! Let's get you back to where everything starts.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            corner="rounded"
            className="w-full sm:w-auto"
          >
            <Link to="/">
              <House className="size-4" />
              Take me home
              <ArrowRight className="size-4" />
            </Link>
          </Button>

          <Button
            type="button"
            variant="primary"
            appearance='ghost'
            size="lg"
            corner="rounded"
            className="text-foreground/60 hover:text-foreground w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="size-4" />
            Go back
          </Button>
        </div>

        <div className="border-foreground/10 mt-16 border-t pt-6">
          <p className="text-foreground/40 text-xs">
            Got here by mistake? It happens. Let's find your way home.
          </p>
        </div>
      </div>
    </main>
  );
}
