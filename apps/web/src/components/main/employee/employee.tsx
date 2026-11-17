import {
  Search,
  Users,
  ArrowLeft,
  ShieldCheck,
  Fingerprint,
  UserRoundX,
  ScanSearch,
  Building2,
  CircleAlert,
  ArrowRight,
  Sparkles,
  ChevronRight,
  CircleCheck,
} from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import type { SubmitEvent } from "react";

export function EmployeeNotFound() {
  const { employeeId } = useParams({
    from: "/(authenticated-routes)/dashboard/employee/$employeeId/",
  });

  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (event: SubmitEvent) => {
    event.preventDefault();

    const id = searchId.trim();
    if (!id) return;

    navigate({
      to: "/dashboard/employee/$employeeId",
      params: { employeeId: id },
    });
  };

  const handleBack = () => {
    navigate({ to: "/dashboard/employee" });
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

      <div className="mx-auto w-full max-w-400 py-6 sm:py-8 lg:py-10">
        {/* Page Header */}
        <header className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="border-primary-500/20 bg-primary-500/6 inline-flex items-center gap-2 rounded-full border px-2.5 py-1">
                <span className="bg-primary-500 size-1.5 rounded-full" />
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
              Employee lookup
              <span className="text-primary-600 dark:text-primary-400">.</span>
            </h1>

            <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-6">
              Search and access employee profiles using their unique employee
              identifier.
            </p>
          </div>

          <div className="border-border/80 bg-card/70 flex w-fit items-center gap-3 rounded-xl border p-3 shadow-sm backdrop-blur-md">
            <div className="bg-secondary-500/10 flex size-9 items-center justify-center rounded-lg">
              <Building2 className="text-secondary-600 dark:text-secondary-400 size-4.5" />
            </div>
            <div>
              <p className="text-foreground text-xs font-semibold">
                Employee management
              </p>
              <p className="text-muted-foreground text-2.75 mt-1">
                Your workspace, connected
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid items-stretch gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
          {/* Left: Not Found + Search */}
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
              {/* Error Icon and Status */}
              <div className="mb-7 flex items-center justify-between gap-3">
                <div className="relative flex size-14 items-center justify-center rounded-xl border border-red-500/15 bg-red-500/10">
                  <UserRoundX className="size-7 text-red-500" />
                  <span className="border-card absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full border-2 bg-red-500">
                    <CircleAlert className="size-3 text-white" />
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.07] px-3 py-1.5">
                  <span className="size-1.5 rounded-full bg-red-500" />
                  <span className="text-2.5 font-bold tracking-[0.12em] text-red-600 uppercase dark:text-red-400">
                    No matching record
                  </span>
                </div>
              </div>

              {/* Error Message */}
              <div className="max-w-xl">
                <div className="mb-2.5 flex items-center gap-2">
                  <span className="h-px w-5 bg-red-500" />
                  <p className="text-2.5 font-bold tracking-[0.18em] text-red-600 uppercase dark:text-red-400">
                    Search result
                  </p>
                </div>

                <h2 className="font-brand-secondary text-2xl leading-tight font-extrabold tracking-[-0.04em] sm:text-3xl">
                  Employee not found
                  <span className="text-primary-600 dark:text-primary-400">
                    .
                  </span>
                </h2>

                <p className="text-muted-foreground mt-3 max-w-lg text-sm leading-6">
                  We couldn't find an employee matching the ID you entered.
                  Please verify the identifier or try searching with another
                  employee ID.
                </p>
              </div>

              {/* Searched Employee ID */}
              <div className="border-border/80 bg-background/80 mt-6 flex items-center gap-3 rounded-xl border p-3.5">
                <div className="bg-secondary-500/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
                  <Fingerprint className="text-secondary-600 dark:text-secondary-400 size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground text-2.5 font-semibold tracking-[0.12em] uppercase">
                    Searched employee ID
                  </p>
                  <p className="text-foreground mt-1 truncate font-mono text-sm font-semibold">
                    {employeeId}
                  </p>
                </div>

                <CircleAlert className="size-4 shrink-0 text-red-500" />
              </div>

              {/* Search Another Employee */}
              <div className="border-border/80 mt-7 border-t pt-6 sm:mt-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary-500/10 flex size-10 items-center justify-center rounded-lg">
                    <ScanSearch className="text-primary-600 dark:text-primary-400 size-5" />
                  </div>

                  <div>
                    <h3 className="text-foreground text-sm font-bold">
                      Search another employee
                    </h3>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      Enter a different employee ID below.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSearch}>
                  <label
                    htmlFor="searchEmployeeId"
                    className="text-foreground mb-2 block text-xs font-semibold sm:text-sm"
                  >
                    Employee ID
                  </label>

                  <div
                    className={`relative rounded-lg transition-shadow duration-200 ${
                      isFocused ? "ring-primary-500/15 ring-4" : "ring-0"
                    }`}
                  >
                    <Search
                      className={`absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 ${
                        isFocused
                          ? "text-primary-600 dark:text-primary-400"
                          : "text-muted-foreground"
                      }`}
                    />

                    <Input
                      id="searchEmployeeId"
                      name="employeeId"
                      type="text"
                      placeholder="Enter employee ID..."
                      value={searchId}
                      onChange={(event) => setSearchId(event.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      autoComplete="off"
                      spellCheck={false}
                      className="border-border/80 bg-background/90 focus-visible:border-primary-500 h-12 rounded-lg pl-10 text-sm shadow-none focus-visible:ring-0"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!searchId.trim()}
                    className="group bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 mt-3 h-11 w-full rounded-lg text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-px hover:shadow-lg disabled:translate-y-0 disabled:shadow-none"
                  >
                    <Search className="mr-2 size-4" />
                    Search Employee
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>

                <div className="mt-4 flex items-start gap-2">
                  <ShieldCheck className="text-muted-foreground mt-0.5 size-3.5 shrink-0" />
                  <p className="text-muted-foreground text-2.75 leading-5">
                    Employee profile access depends on your assigned role and
                    permissions.
                  </p>
                </div>
              </div>

              {/* Back to Directory */}
              <div className="mt-auto pt-7">
                <Button
                  type="button"
                  variant="primary"
                  appearance="ghost"
                  onClick={handleBack}
                  className="border-border/80 bg-background/70 text-foreground hover:bg-muted h-10 w-full rounded-lg text-sm font-semibold sm:w-auto"
                >
                  <ArrowLeft className="mr-2 size-4" />
                  Back to employee directory
                </Button>
              </div>
            </div>
          </section>

          {/* Right Side Panels */}
          <aside className="flex min-w-0 flex-col gap-5">
            {/* Help / How it works */}
            <section className="border-border/80 bg-card/70 relative flex flex-1 flex-col overflow-hidden rounded-xl border shadow-sm backdrop-blur-xl sm:rounded-2xl">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <div className="border-primary-500/8 absolute -top-24 -right-16 size-64 rounded-full border" />
                <div className="border-primary-500/8 absolute -top-10 right-0 size-44 rounded-full border" />
                <div className="bg-primary-500/6 absolute top-12 right-12 size-24 rounded-full blur-3xl" />
              </div>

              <div className="relative flex flex-1 flex-col p-5 sm:p-7">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-muted-foreground text-2.5 font-bold tracking-[0.16em] uppercase">
                      Need assistance?
                    </p>
                    <h3 className="font-brand-secondary text-foreground mt-1.5 text-lg font-bold sm:text-xl">
                      Let's find the right profile.
                    </h3>
                  </div>

                  <div className="border-primary-500/15 bg-primary-500/[0.07] flex size-10 shrink-0 items-center justify-center rounded-lg border">
                    <Sparkles className="text-primary-600 dark:text-primary-400 size-5" />
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-6">
                  Follow these simple steps to locate an employee in your
                  organization's directory.
                </p>

                {/* Guidance Cards */}
                <div className="mt-6 space-y-3">
                  <div className="border-border/80 bg-background/80 flex items-start gap-3 rounded-xl border p-3.5">
                    <div className="bg-primary-500/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
                      <Search className="text-primary-600 dark:text-primary-400 size-4" />
                    </div>
                    <div>
                      <p className="text-foreground text-xs font-bold">
                        Check the employee ID
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs leading-5">
                        Make sure there are no spelling mistakes or missing
                        characters.
                      </p>
                    </div>
                  </div>

                  <div className="border-border/80 bg-background/80 flex items-start gap-3 rounded-xl border p-3.5">
                    <div className="bg-secondary-500/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
                      <Fingerprint className="text-secondary-600 dark:text-secondary-400 size-4" />
                    </div>
                    <div>
                      <p className="text-foreground text-xs font-bold">
                        Enter the correct identifier
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs leading-5">
                        Use the unique employee ID assigned by your
                        organization.
                      </p>
                    </div>
                  </div>

                  <div className="border-border/80 bg-background/80 flex items-start gap-3 rounded-xl border p-3.5">
                    <div className="bg-accent-500/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
                      <Users className="text-accent-700 dark:text-accent-400 size-4" />
                    </div>
                    <div>
                      <p className="text-foreground text-xs font-bold">
                        Contact your administrator
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs leading-5">
                        If the employee still cannot be found, verify their
                        registration status.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Directory Preview */}
                <div className="border-border/80 bg-background/90 mt-6 rounded-xl border p-4 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary-500/10 flex size-8 items-center justify-center rounded-lg">
                        <Users className="text-primary-600 dark:text-primary-400 size-4" />
                      </div>
                      <span className="text-foreground text-xs font-bold">
                        Employee directory
                      </span>
                    </div>

                    <span className="text-muted-foreground border-border text-2.25 rounded-md border px-2 py-1 font-semibold uppercase">
                      Lookup
                    </span>
                  </div>

                  <div className="border-border/70 bg-card/70 flex items-center gap-3 rounded-lg border p-3">
                    <div className="bg-primary-500/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
                      <Users className="text-primary-600 dark:text-primary-400 size-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-foreground text-xs font-semibold">
                        Employee profiles
                      </p>
                      <p className="text-muted-foreground text-2.75 mt-1">
                        Search by unique employee ID
                      </p>
                    </div>

                    <ArrowRight className="text-muted-foreground size-4" />
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <CircleCheck className="text-accent-600 dark:text-accent-400 size-3.5" />
                    <p className="text-muted-foreground text-2.5">
                      Quick and secure employee lookup
                    </p>
                  </div>
                </div>

                {/* Three Steps */}
                <div className="border-border/80 mt-7 border-t pt-5">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { number: "01", label: "Enter ID" },
                      { number: "02", label: "Search" },
                      { number: "03", label: "View profile" },
                    ].map((step) => (
                      <div key={step.number}>
                        <p className="text-primary-600 dark:text-primary-400 text-xs font-bold">
                          {step.number}
                        </p>
                        <p className="text-foreground mt-1 text-xs font-semibold">
                          {step.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Security Information */}
            <section className="border-border/80 bg-card/70 relative overflow-hidden rounded-xl border p-4 shadow-sm backdrop-blur-md sm:rounded-2xl sm:p-5">
              <div className="bg-accent-500/5 pointer-events-none absolute -right-8 -bottom-10 size-32 rounded-full blur-2xl" />

              <div className="relative flex items-start gap-3">
                <div className="border-accent-600/15 bg-accent-500/10 flex size-10 shrink-0 items-center justify-center rounded-lg border">
                  <ShieldCheck className="text-accent-700 dark:text-accent-400 size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-foreground text-xs font-bold sm:text-sm">
                      Your access. Your permissions.
                    </h3>
                    <span className="bg-accent-500/10 text-accent-800 dark:text-accent-300 text-2.25 rounded-full px-2 py-0.5 font-bold uppercase">
                      Protected
                    </span>
                  </div>

                  <p className="text-muted-foreground mt-1.5 text-xs leading-5">
                    Employee information is protected and available according to
                    your assigned role and permissions.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
