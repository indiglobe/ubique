import * as React from "react";
import {
  Search,
  Users,
  ArrowUpRight,
  UserRoundSearch,
  ShieldCheck,
  Fingerprint,
  ArrowRight,
  Sparkles,
  ScanSearch,
  Command,
  Building2,
  ChevronRight,
  CircleCheck,
  MoveUpRight,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";

export function EmployeeLookupPage() {
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = employeeId.trim();

    if (!id) return;

    navigate({
      to: "/dashboard/user/$employeeId",
      params: { employeeId: id },
    });
  };

  return (
    <div className="bg-background font-brand-primary relative isolate min-h-[calc(100svh-4rem)] overflow-hidden">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="bg-primary-500/6 absolute -top-40 left-1/2 h-112 w-2xl -translate-x-1/2 rounded-full blur-[110px]" />

        <div className="bg-secondary-500/4 absolute top-[35%] -right-32 size-72 rounded-full blur-[100px]" />

        <div className="bg-accent-500/4 absolute -bottom-32 -left-24 size-80 rounded-full blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="via-primary-500/25 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent" />
      </div>

      <main className="mx-auto w-full max-w-400 px-4 py-6 sm:px-6 sm:py-8 lg:px-9 lg:py-10 xl:px-12">
        {/* Page header */}
        <header className="mb-7 flex flex-col gap-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between lg:mb-9">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="border-primary-500/20 bg-primary-500/6 inline-flex items-center gap-2 rounded-full border px-2.5 py-1">
                <span className="relative flex size-1.5">
                  <span className="bg-primary-500 absolute inline-flex size-full animate-ping rounded-full opacity-40" />
                  <span className="bg-primary-500 relative inline-flex size-1.5 rounded-full" />
                </span>

                <span className="text-primary-700 dark:text-primary-300 text-2.5 font-bold tracking-[0.14em] uppercase">
                  Workforce intelligence
                </span>
              </span>

              <ChevronRight className="text-muted-foreground/50 size-3" />

              <span className="text-muted-foreground text-2.5 font-medium tracking-[0.12em] uppercase">
                Employee directory
              </span>
            </div>

            <h1 className="font-brand-accent text-3xl leading-tight font-bold tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              Find your people
              <span className="text-primary-600 dark:text-primary-400">.</span>
            </h1>

            <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-6 sm:text-3.75">
              Search an employee ID to discover their profile and access the
              information you need.
            </p>
          </div>

          {/* Workspace badge */}
          <div className="border-border/80 bg-card/70 flex w-fit shrink-0 items-center gap-3 rounded-xl border p-3 shadow-sm backdrop-blur-md">
            <div className="bg-secondary-500/10 flex size-9 items-center justify-center rounded-lg">
              <Building2 className="text-secondary-600 dark:text-secondary-400 size-4.5" />
            </div>

            <div>
              <p className="text-foreground text-xs font-semibold">
                Employee management
              </p>
              <p className="text-muted-foreground mt-1 text-2.75">
                Your workspace, connected
              </p>
            </div>

            <ArrowUpRight className="text-muted-foreground/60 ml-2 size-4" />
          </div>
        </header>

        {/* Main layout */}
        <div className="grid items-stretch gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
          {/* Search panel */}
          <section className="border-border/80 bg-card/80 relative flex min-w-0 flex-col overflow-hidden rounded-xl border shadow-sm backdrop-blur-xl sm:rounded-2xl">
            <div className="from-primary-400 via-primary-600 to-secondary-500 absolute inset-x-0 top-0 h-1 bg-linear-to-r" />

            {/* Decorative rings */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-20"
            >
              <div className="border-primary-500/8 flex size-64 items-center justify-center rounded-full border sm:size-80">
                <div className="border-primary-500/8 flex size-[75%] items-center justify-center rounded-full border">
                  <div className="bg-primary-500/[0.035] size-[65%] rounded-full" />
                </div>
              </div>
            </div>

            <div className="relative flex flex-1 flex-col p-5 sm:p-7 lg:p-8 xl:p-9">
              {/* Panel heading */}
              <div className="mb-7 flex items-center justify-between gap-3 sm:mb-9">
                <div className="bg-primary-600 shadow-primary-600/15 relative flex size-12 items-center justify-center rounded-xl text-white shadow-md sm:size-14">
                  <div className="absolute inset-1 rounded-lg border border-white/15" />

                  <UserRoundSearch
                    className="size-6 sm:size-7"
                    strokeWidth={1.7}
                  />

                  <span className="border-card bg-accent-400 absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full border-2">
                    <Sparkles className="text-foreground size-2.5" />
                  </span>
                </div>

                <div className="border-accent-600/20 bg-accent-500/8 flex items-center gap-2 rounded-full border px-2.5 py-1.5">
                  <ShieldCheck className="text-accent-700 dark:text-accent-400 size-3.5" />

                  <span className="text-accent-800 dark:text-accent-300 text-2.5 font-bold tracking-[0.12em] uppercase">
                    Secure lookup
                  </span>
                </div>
              </div>

              {/* Intro copy */}
              <div className="max-w-xl">
                <div className="mb-2.5 flex items-center gap-2">
                  <span className="bg-secondary-500 h-px w-5" />

                  <p className="text-secondary-700 dark:text-secondary-400 text-2.5 font-bold tracking-[0.18em] uppercase">
                    The directory, simplified
                  </p>
                </div>

                <h2 className="font-brand-secondary text-2xl leading-[1.2] font-extrabold tracking-[-0.04em] sm:text-3xl">
                  The right person.
                  <br />
                  <span className="text-primary-600 dark:text-primary-400">
                    Right when you need them.
                  </span>
                </h2>

                <p className="text-muted-foreground mt-3 max-w-lg text-sm leading-6">
                  Skip the endless lists and manual lookups. Enter an employee
                  identifier to open their individual profile.
                </p>
              </div>

              {/* Search form */}
              <form onSubmit={handleSearch} className="mt-7 sm:mt-8">
                <label
                  htmlFor="employeeId"
                  className="text-foreground mb-2 flex items-center justify-between gap-3 text-xs font-semibold sm:text-sm"
                >
                  <span>Employee ID</span>

                  <span className="text-muted-foreground flex items-center gap-1.5 text-2.5 font-medium">
                    <Command className="size-3" />
                    Direct access
                  </span>
                </label>

                <div
                  className={`relative rounded-lg transition-shadow duration-200 ${
                    isFocused
                      ? "ring-primary-500/15 ring-4"
                      : "ring-0 ring-transparent"
                  }`}
                >
                  <ScanSearch
                    className={`pointer-events-none absolute top-1/2 left-3.5 z-10 size-4.5 -translate-y-1/2 transition-colors ${
                      isFocused
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-muted-foreground"
                    }`}
                  />

                  <Input
                    id="employeeId"
                    name="employeeId"
                    type="text"
                    placeholder="Enter employee ID..."
                    value={employeeId}
                    onChange={(event) => setEmployeeId(event.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoComplete="off"
                    spellCheck={false}
                    className="border-border/80 bg-background/90 text-foreground placeholder:text-muted-foreground/60 focus-visible:border-primary-500 h-12 rounded-lg pr-3 pl-10 text-sm shadow-none transition-colors focus-visible:ring-0 sm:h-12"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!employeeId.trim()}
                  className="group bg-primary-600 shadow-primary-600/10 hover:bg-primary-700 hover:shadow-primary-600/15 dark:bg-primary-500 dark:hover:bg-primary-400 mt-3 h-11 w-full rounded-lg text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-px hover:shadow-lg disabled:translate-y-0 disabled:shadow-none dark:text-white"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Search className="size-4 transition-transform duration-200 group-hover:scale-110" />
                    Find employee
                    <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Button>

                <div className="mt-3 flex items-start gap-2">
                  <ShieldCheck className="text-muted-foreground mt-0.5 size-3.5 shrink-0" />

                  <p className="text-muted-foreground text-2.75 leading-5">
                    Profile access depends on your assigned role and
                    permissions.
                  </p>
                </div>
              </form>

              {/* Workforce information */}
              <div className="border-border/80 mt-7 border-t pt-5 sm:mt-8 sm:pt-5">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-500/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
                    <Users className="text-primary-600 dark:text-primary-400 size-4.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-foreground text-xs font-semibold sm:text-sm">
                      Your entire workforce
                    </p>

                    <p className="text-muted-foreground mt-0.5 text-xs leading-5">
                      One identifier takes you directly to a profile.
                    </p>
                  </div>

                  <div className="border-border/80 flex size-8 shrink-0 items-center justify-center rounded-lg border">
                    <MoveUpRight className="text-muted-foreground size-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right-side panels */}
          <aside className="flex min-w-0 flex-col gap-5">
            {/* How it works */}
            <section className="border-border/80 bg-card/70 relative flex flex-1 flex-col overflow-hidden rounded-xl border shadow-sm backdrop-blur-xl sm:rounded-2xl">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <div className="border-primary-500/8 absolute -top-24 -right-16 size-64 rounded-full border" />

                <div className="border-primary-500/8 absolute -top-10 right-0 size-44 rounded-full border" />

                <div className="bg-primary-500/6 absolute top-12 right-12 size-24 rounded-full blur-3xl" />

                <div className="bg-secondary-500/5 absolute -bottom-16 -left-10 size-40 rounded-full blur-3xl" />
              </div>

              <div className="relative flex flex-1 flex-col p-5 sm:p-7">
                {/* Section heading */}
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-muted-foreground text-2.5 font-bold tracking-[0.16em] uppercase">
                      How it works
                    </p>

                    <h3 className="font-brand-secondary text-foreground mt-1.5 text-lg font-bold tracking-tight sm:text-xl">
                      From ID to insight.
                    </h3>
                  </div>

                  <div className="border-primary-500/15 bg-primary-500/[0.07] flex size-9 shrink-0 items-center justify-center rounded-lg border">
                    <ScanSearch className="text-primary-600 dark:text-primary-400 size-4.5" />
                  </div>
                </div>

                <p className="text-muted-foreground max-w-md text-sm leading-6">
                  Navigate your organization's employee directory with just one
                  identifier.
                </p>

                {/* Profile preview */}
                <div className="relative mt-6 flex-1">
                  <div className="bg-primary-600/4 absolute inset-3 rounded-xl blur-xl" />

                  <div className="border-border/80 bg-background/90 relative overflow-hidden rounded-xl border p-3.5 shadow-sm sm:p-4">
                    {/* Preview header */}
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary-500/10 flex size-7 items-center justify-center rounded-lg">
                          <Fingerprint className="text-primary-600 dark:text-primary-400 size-3.5" />
                        </div>

                        <span className="text-foreground text-xs font-semibold">
                          Employee profile
                        </span>
                      </div>

                      <span className="text-muted-foreground border-border/80 rounded-md border px-2 py-1 text-2.25 font-semibold tracking-wider uppercase">
                        Preview
                      </span>
                    </div>

                    {/* Employee details card */}
                    <div className="border-border/70 bg-card/70 flex items-center gap-3 rounded-lg border p-3">
                      <div className="bg-primary-500/10 relative flex size-11 shrink-0 items-center justify-center rounded-lg">
                        <Users className="text-primary-600 dark:text-primary-400 size-5" />

                        <span className="border-background bg-accent-400 absolute -right-1 -bottom-1 flex size-3.5 items-center justify-center rounded-full border">
                          <CircleCheck className="text-foreground size-2" />
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-foreground truncate text-xs font-semibold sm:text-sm">
                          Employee details
                        </p>

                        <p className="text-muted-foreground mt-1 text-2.75 leading-4">
                          Profile & organizational information
                        </p>
                      </div>

                      <ArrowUpRight className="text-muted-foreground/60 size-4 shrink-0" />
                    </div>

                    {/* Employee identifier */}
                    <div className="border-border/70 mt-3 flex items-center gap-3 rounded-lg border border-dashed p-3">
                      <div className="bg-secondary-500/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
                        <Fingerprint className="text-secondary-600 dark:text-secondary-400 size-4.5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-muted-foreground text-2.25 font-semibold tracking-[0.12em] uppercase">
                          Employee identifier
                        </p>

                        <p className="text-foreground mt-1 truncate font-mono text-xs font-semibold">
                          {employeeId.trim() || "EMP1024"}
                        </p>
                      </div>

                      <div className="bg-primary-500/10 flex size-7 shrink-0 items-center justify-center rounded-lg">
                        <ArrowRight className="text-primary-600 dark:text-primary-400 size-3.5" />
                      </div>
                    </div>

                    {/* Preview status */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="bg-accent-500/15 flex size-4 shrink-0 items-center justify-center rounded-full">
                        <CircleCheck className="text-accent-700 dark:text-accent-400 size-2.5" />
                      </span>

                      <p className="text-muted-foreground text-2.5 leading-4">
                        Enter an ID to navigate to its profile
                      </p>
                    </div>
                  </div>

                  {/* Floating label */}
                  <div className="border-border/80 bg-card absolute -right-1 -bottom-3 flex items-center gap-2 rounded-lg border px-2.5 py-2 shadow-md sm:right-2">
                    <div className="bg-secondary-500/10 flex size-6 items-center justify-center rounded-md">
                      <Sparkles className="text-secondary-600 dark:text-secondary-400 size-3.5" />
                    </div>

                    <span className="text-foreground text-2.5 font-semibold">
                      Fast & straightforward
                    </span>
                  </div>
                </div>

                {/* Three-step process */}
                <div className="border-border/80 mt-8 border-t pt-5 sm:mt-9">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <div className="bg-primary-500/10 mb-2 flex size-7 items-center justify-center rounded-lg">
                        <Search className="text-primary-600 dark:text-primary-400 size-3.5" />
                      </div>

                      <p className="text-foreground text-xs font-semibold">
                        Search
                      </p>

                      <p className="text-muted-foreground mt-1 text-2.5 leading-4">
                        Enter an ID
                      </p>
                    </div>

                    <div>
                      <div className="bg-secondary-500/10 mb-2 flex size-7 items-center justify-center rounded-lg">
                        <ArrowRight className="text-secondary-600 dark:text-secondary-400 size-3.5" />
                      </div>

                      <p className="text-foreground text-xs font-semibold">
                        Navigate
                      </p>

                      <p className="text-muted-foreground mt-1 text-2.5 leading-4">
                        Open profile
                      </p>
                    </div>

                    <div>
                      <div className="bg-accent-500/15 mb-2 flex size-7 items-center justify-center rounded-lg">
                        <ShieldCheck className="text-accent-700 dark:text-accent-400 size-3.5" />
                      </div>

                      <p className="text-foreground text-xs font-semibold">
                        Explore
                      </p>

                      <p className="text-muted-foreground mt-1 text-2.5 leading-4">
                        View permitted data
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Access and security */}
            <section className="border-border/80 bg-card/70 relative overflow-hidden rounded-xl border p-4 shadow-sm backdrop-blur-md sm:rounded-2xl sm:p-5">
              <div
                aria-hidden="true"
                className="bg-accent-500/5 pointer-events-none absolute -right-8 -bottom-10 size-32 rounded-full blur-2xl"
              />

              <div className="relative flex items-start gap-3">
                <div className="border-accent-600/15 bg-accent-500/10 flex size-10 shrink-0 items-center justify-center rounded-lg border">
                  <ShieldCheck className="text-accent-700 dark:text-accent-400 size-4.5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-foreground text-xs font-bold sm:text-sm">
                      Your access. Your permissions.
                    </h3>

                    <span className="bg-accent-500/10 text-accent-800 dark:text-accent-300 rounded-full px-2 py-0.5 text-2.25 font-bold tracking-wide uppercase">
                      Protected
                    </span>
                  </div>

                  <p className="text-muted-foreground mt-1.5 text-xs leading-5">
                    Employee information is available according to your assigned
                    role and permissions.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
