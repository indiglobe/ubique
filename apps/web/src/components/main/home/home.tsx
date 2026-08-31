// src/pages/HomePage.tsx

import {
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  Check,
  ChevronRight,
  ClipboardCheck,
  MapPinned,
  Menu,
  PackageCheck,
  Route,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Store,
  UsersRound,
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Field Force Management",
    description:
      "Manage attendance, day start, field visits, activity logs and complete MR workflows from one mobile-first platform.",
  },
  {
    icon: Stethoscope,
    title: "Doctor & Chemist CRM",
    description:
      "Maintain detailed doctor, chemist and outlet profiles with visit history, preferences, remarks and follow-ups.",
  },
  {
    icon: MapPinned,
    title: "Geo-Tagged Visits",
    description:
      "Capture visit location, date, time and field activity to maintain reliable and transparent field records.",
  },
  {
    icon: Route,
    title: "Smart Route Workflows",
    description:
      "Support both MR-controlled and distributor-controlled routes with flexible operational workflows.",
  },
  {
    icon: Boxes,
    title: "Order & Inventory",
    description:
      "Check stock, select stockists, book orders, calculate value and monitor product movement from one system.",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    description:
      "Track visits, attendance, orders, collections, inventory and territory performance through centralized dashboards.",
  },
];

const benefits = [
  "Centralized field operations",
  "Real-time activity visibility",
  "Doctor and chemist relationship management",
  "Route-based order workflows",
  "Stockist and inventory control",
  "Performance reporting and analytics",
];

const HomePage = () => {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-foreground/5 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-2">
            <div className="grid size-10 place-items-center rounded-xl bg-primary-600 text-white">
              <Stethoscope className="size-5" />
            </div>

            <div>
              <p className="font-brand-secondary text-lg font-bold leading-none">
                MedForce
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-600">
                Field Intelligence
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="#features"
              className="text-sm font-medium text-foreground/65 transition hover:text-primary-600"
            >
              Features
            </a>

            <a
              href="#solutions"
              className="text-sm font-medium text-foreground/65 transition hover:text-primary-600"
            >
              Solutions
            </a>

            <a
              href="#platform"
              className="text-sm font-medium text-foreground/65 transition hover:text-primary-600"
            >
              Platform
            </a>

            <a
              href="#contact"
              className="text-sm font-medium text-foreground/65 transition hover:text-primary-600"
            >
              Contact
            </a>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <button className="rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground/70 transition hover:bg-foreground/5">
              Sign in
            </button>

            <button className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700">
              Request Demo
              <ArrowRight className="size-4" />
            </button>
          </div>

          <button className="grid size-10 place-items-center rounded-xl bg-foreground/5 sm:hidden">
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="absolute left-1/2 top-0 -z-10 h-[550px] w-[850px] -translate-x-1/2 rounded-full bg-primary-200/35 blur-[130px] dark:bg-primary-800/15" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-32">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-bold text-primary-700 dark:border-primary-800 dark:bg-primary-950/50 dark:text-primary-200">
              <span className="size-2 rounded-full bg-accent-500" />
              Built for modern pharmaceutical field teams
            </div>

            <h1 className="mt-7 max-w-4xl font-brand-secondary text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Your entire field force.
              <span className="block text-primary-600">
                Connected intelligently.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-foreground/60 sm:text-lg">
              Manage medical representatives, doctor relationships, chemist
              visits, routes, orders, inventory and business performance from
              one powerful platform.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button className="group flex items-center justify-center gap-2 rounded-2xl bg-primary-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-primary-700">
                Request a Demo
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </button>

              <a
                href="#features"
                className="flex items-center justify-center gap-2 rounded-2xl border border-foreground/10 bg-background px-6 py-3.5 text-sm font-bold transition hover:bg-foreground/5"
              >
                Explore Platform
                <ChevronRight className="size-4" />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {[
                "Field Tracking",
                "CRM",
                "Inventory",
                "Analytics",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-foreground/60"
                >
                  <div className="grid size-5 place-items-center rounded-full bg-accent-100 text-accent-700 dark:bg-accent-900/50 dark:text-accent-300">
                    <Check className="size-3" strokeWidth={3} />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-primary-200/60 via-secondary-100/40 to-accent-100/60 blur-2xl dark:from-primary-800/20 dark:via-secondary-800/10 dark:to-accent-800/10" />

            <div className="rounded-[32px] border border-foreground/10 bg-background/90 p-4 shadow-2xl shadow-primary-900/10 backdrop-blur-xl">
              <div className="rounded-[24px] bg-white p-5 dark:bg-foreground/5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-foreground/45">
                      Business Overview
                    </p>
                    <h3 className="mt-1 font-brand-secondary text-xl font-bold">
                      Field Operations
                    </h3>
                  </div>

                  <div className="rounded-xl bg-accent-100 px-3 py-1.5 text-xs font-bold text-accent-800 dark:bg-accent-900/40 dark:text-accent-200">
                    Live
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <MetricCard
                    icon={UsersRound}
                    value="148"
                    label="Field Officers"
                    tone="primary"
                  />

                  <MetricCard
                    icon={Stethoscope}
                    value="1,284"
                    label="Doctor Visits"
                    tone="secondary"
                  />

                  <MetricCard
                    icon={PackageCheck}
                    value="624"
                    label="Orders"
                    tone="accent"
                  />

                  <MetricCard
                    icon={Store}
                    value="86"
                    label="Stockists"
                    tone="primary"
                  />
                </div>

                <div className="mt-4 rounded-2xl border border-foreground/5 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-foreground/45">
                        Route Performance
                      </p>

                      <p className="mt-1 font-brand-secondary text-lg font-bold">
                        82% completed
                      </p>
                    </div>

                    <div className="grid size-10 place-items-center rounded-xl bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-200">
                      <Route className="size-5" />
                    </div>
                  </div>

                  <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-primary-100 dark:bg-primary-950">
                    <div className="h-full w-[82%] rounded-full bg-primary-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-7 -left-3 hidden rounded-2xl border border-foreground/5 bg-background p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300">
                  <ClipboardCheck className="size-5" />
                </div>

                <div>
                  <p className="text-xs text-foreground/45">Today</p>
                  <p className="text-sm font-bold">324 visits completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-foreground/5 bg-white/40 dark:bg-foreground/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          <Stat value="360°" label="Field visibility" />
          <Stat value="Live" label="Activity tracking" />
          <Stat value="Unified" label="Doctor & chemist CRM" />
          <Stat value="Centralized" label="Business operations" />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary-600">
              Complete Field Platform
            </p>

            <h2 className="mt-4 font-brand-secondary text-3xl font-bold tracking-tight sm:text-5xl">
              Everything your pharmaceutical field operation needs
            </h2>

            <p className="mt-5 text-base leading-7 text-foreground/55">
              From field attendance to order fulfillment, every workflow stays
              connected inside a single platform.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group rounded-[26px] border border-foreground/5 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/5 dark:bg-foreground/[0.03]"
                >
                  <div
                    className={`grid size-12 place-items-center rounded-2xl ${
                      index % 3 === 0
                        ? "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200"
                        : index % 3 === 1
                          ? "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-200"
                          : "bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-200"
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-6 font-brand-secondary text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-foreground/55">
                    {feature.description}
                  </p>

                  <button className="mt-5 flex items-center gap-1.5 text-sm font-bold text-primary-600">
                    Learn more
                    <ChevronRight className="size-4 transition group-hover:translate-x-1" />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section id="solutions" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[36px] bg-primary-800 text-primary-50">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 sm:p-12 lg:p-16">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-200">
                  Built for your complete network
                </p>

                <h2 className="mt-5 max-w-xl font-brand-secondary text-3xl font-bold tracking-tight sm:text-5xl">
                  Connect field teams, doctors, chemists and stockists.
                </h2>

                <p className="mt-6 max-w-xl leading-7 text-primary-100/75">
                  Replace disconnected processes with one coordinated system
                  built around your actual pharmaceutical field workflow.
                </p>

                <div className="mt-9 grid gap-4 sm:grid-cols-2">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <div className="grid size-6 shrink-0 place-items-center rounded-full bg-accent-400 text-accent-950">
                        <Check className="size-3.5" strokeWidth={3} />
                      </div>

                      <span className="text-sm font-medium text-primary-50/90">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[420px] bg-primary-700 p-8 sm:p-12">
                <div className="absolute -right-16 -top-16 size-64 rounded-full bg-secondary-400/20" />
                <div className="absolute -bottom-20 -left-12 size-64 rounded-full bg-accent-400/15" />

                <div className="relative grid h-full content-center gap-4">
                  <WorkflowCard
                    number="01"
                    title="MR starts the day"
                    description="Attendance and working-day logging"
                  />

                  <WorkflowCard
                    number="02"
                    title="Visits doctors & chemists"
                    description="Geo-tagged activity and visit records"
                  />

                  <WorkflowCard
                    number="03"
                    title="Books & tracks orders"
                    description="Inventory-aware order management"
                  />

                  <WorkflowCard
                    number="04"
                    title="Management gets insights"
                    description="Centralized reports and analytics"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM SECTION */}
      <section id="platform" className="py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-700 dark:text-secondary-300">
              Centralized Control
            </p>

            <h2 className="mt-4 font-brand-secondary text-3xl font-bold tracking-tight sm:text-5xl">
              One dashboard.
              <span className="block text-primary-600">
                Complete operational visibility.
              </span>
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-foreground/55">
              Give administrators a centralized view of field officers,
              territories, doctors, chemists, stockists, products, orders,
              payments, attendance and activity.
            </p>

            <div className="mt-8 space-y-4">
              <BenefitRow
                icon={ShieldCheck}
                title="Controlled administration"
                description="Centralized management with Super Admin controls."
              />

              <BenefitRow
                icon={Building2}
                title="Territory management"
                description="Manage field teams, territories and route ownership."
              />

              <BenefitRow
                icon={BarChart3}
                title="Business intelligence"
                description="Turn field activity into actionable performance insights."
              />
            </div>
          </div>

          <div className="rounded-[32px] border border-foreground/5 bg-white p-5 shadow-xl shadow-primary-950/5 dark:bg-foreground/[0.03]">
            <div className="rounded-[24px] bg-foreground/[0.025] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-foreground/45">
                    Performance Analytics
                  </p>

                  <h3 className="mt-1 font-brand-secondary text-xl font-bold">
                    Monthly Overview
                  </h3>
                </div>

                <span className="rounded-lg bg-background px-3 py-1.5 text-xs font-semibold">
                  August
                </span>
              </div>

              <div className="mt-8 flex h-52 items-end gap-3">
                {[38, 55, 46, 72, 58, 82, 65, 92, 77, 88].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex h-full flex-1 items-end rounded-full bg-primary-100 dark:bg-primary-950"
                    >
                      <div
                        className="w-full rounded-full bg-primary-600"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ),
                )}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                <SmallStat label="Orders" value="2.4K" />
                <SmallStat label="Visits" value="8.9K" />
                <SmallStat label="Collection" value="₹18L" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="pb-24 pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[36px] bg-secondary-100 px-6 py-14 text-center dark:bg-secondary-950 sm:px-12 sm:py-20">
            <div className="absolute left-0 top-0 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-300/30 blur-3xl" />
            <div className="absolute bottom-0 right-0 size-48 translate-x-1/2 translate-y-1/2 rounded-full bg-accent-300/30 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-700 dark:text-secondary-300">
                Transform your field operations
              </p>

              <h2 className="mt-4 font-brand-secondary text-3xl font-bold tracking-tight sm:text-5xl">
                Ready to bring your entire field force onto one platform?
              </h2>

              <p className="mx-auto mt-5 max-w-xl leading-7 text-foreground/55">
                Discover how MedForce can simplify field activity, CRM, orders,
                inventory and business reporting.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button className="flex items-center justify-center gap-2 rounded-2xl bg-primary-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-primary-700">
                  Schedule a Demo
                  <ArrowRight className="size-4" />
                </button>

                <button className="rounded-2xl border border-foreground/10 bg-background/60 px-7 py-3.5 text-sm font-bold backdrop-blur transition hover:bg-background">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-foreground/5">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-xl bg-primary-600 text-white">
                <Stethoscope className="size-4" />
              </div>

              <span className="font-brand-secondary text-lg font-bold">
                MedForce
              </span>
            </div>

            <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-foreground/50">
              <a href="#features">Features</a>
              <a href="#solutions">Solutions</a>
              <a href="#platform">Platform</a>
              <a href="#contact">Contact</a>
              <a href="#">Privacy</a>
            </div>
          </div>

          <div className="mt-8 border-t border-foreground/5 pt-6 text-xs text-foreground/40">
            © 2026 MedForce. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
};

type MetricCardProps = {
  icon: React.ElementType;
  value: string;
  label: string;
  tone: "primary" | "secondary" | "accent";
};

const MetricCard = ({
  icon: Icon,
  value,
  label,
  tone,
}: MetricCardProps) => {
  const tones = {
    primary:
      "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200",
    secondary:
      "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-200",
    accent:
      "bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-200",
  };

  return (
    <div className="rounded-2xl border border-foreground/5 p-4">
      <div
        className={`grid size-9 place-items-center rounded-xl ${tones[tone]}`}
      >
        <Icon className="size-4" />
      </div>

      <p className="mt-4 font-brand-secondary text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-foreground/45">{label}</p>
    </div>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <p className="font-brand-secondary text-xl font-bold text-primary-600 sm:text-2xl">
      {value}
    </p>
    <p className="mt-1 text-xs text-foreground/45 sm:text-sm">{label}</p>
  </div>
);

const WorkflowCard = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => (
  <div className="flex items-center gap-4 rounded-2xl border border-primary-500/30 bg-primary-800/60 p-4 backdrop-blur">
    <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-50 font-brand-secondary text-sm font-bold text-primary-700">
      {number}
    </div>

    <div>
      <h4 className="font-brand-secondary font-bold text-primary-50">
        {title}
      </h4>
      <p className="mt-1 text-xs text-primary-100/65">{description}</p>
    </div>
  </div>
);

const BenefitRow = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="flex gap-4">
    <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200">
      <Icon className="size-5" />
    </div>

    <div>
      <h3 className="font-brand-secondary font-bold">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-foreground/50">
        {description}
      </p>
    </div>
  </div>
);

const SmallStat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl bg-background p-3">
    <p className="font-brand-secondary text-lg font-bold">{value}</p>
    <p className="mt-0.5 text-[11px] text-foreground/45">{label}</p>
  </div>
);

export {HomePage};