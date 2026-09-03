import {
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  Check,
  ChevronRight,
  ClipboardCheck,
  MapPinned,
  PackageCheck,
  Route,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Store,
  UsersRound,
} from "lucide-react";
import Main from "../main";
import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";
import {
  MetricCard,
  MetricCardIcon,
  MetricCardLabel,
  MetricCardValue,
} from "./page.ui";

function HomePage() {
  return (
    <Main className="bg-background text-foreground overflow-hidden">
      <HeroSection />

      <TrustStrip />

      <Features />

      <Solution />

      <Platform />

      <Contact />
    </Main>
  );
}

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

function HeroSection({ className, ...props }: ComponentProps<"section">) {
  return (
    <section className={cn(`relative`, className)} {...props}>
      <div className="bg-primary-200/35 dark:bg-primary-800/15 absolute top-0 left-1/2 -z-10 h-137.5 w-212.5 -translate-x-1/2 rounded-full blur-[130px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-32">
        <div>
          <div className="border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-800 dark:bg-primary-950/50 dark:text-primary-200 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold">
            <span className="bg-accent-500 size-2 rounded-full" />
            Built for modern pharmaceutical field teams
          </div>

          <h1 className="font-brand-secondary mt-7 max-w-4xl text-5xl leading-[1.02] font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Your entire field force.
            <span className="text-primary-600 block">
              Connected intelligently.
            </span>
          </h1>

          <p className="text-foreground/60 mt-7 max-w-2xl text-base leading-8 sm:text-lg">
            Manage medical representatives, doctor relationships, chemist
            visits, routes, orders, inventory and business performance from one
            powerful platform.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button className="group bg-primary-600 hover:bg-primary-700 flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold text-white transition">
              Request a Demo
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </button>

            <a
              href="#features"
              className="border-foreground/10 bg-background hover:bg-foreground/5 flex items-center justify-center gap-2 rounded-2xl border px-6 py-3.5 text-sm font-bold transition"
            >
              Explore Platform
              <ChevronRight className="size-4" />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            {["Field Tracking", "CRM", "Inventory", "Analytics"].map((item) => (
              <div
                key={item}
                className="text-foreground/60 flex items-center gap-2 text-sm"
              >
                <div className="bg-accent-100 text-accent-700 dark:bg-accent-900/50 dark:text-accent-300 grid size-5 place-items-center rounded-full">
                  <Check className="size-3" strokeWidth={3} />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* HERO VISUAL */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="from-primary-200/60 via-secondary-100/40 to-accent-100/60 dark:from-primary-800/20 dark:via-secondary-800/10 dark:to-accent-800/10 rounded-10 absolute -inset-6 -z-10 bg-linear-to-br blur-2xl" />

          <div className="border-foreground/10 bg-background/90 shadow-primary-900/10 rounded-4xl border p-4 shadow-2xl backdrop-blur-xl">
            <div className="dark:bg-foreground/5 rounded-3xl bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground/45 text-xs font-semibold">
                    Business Overview
                  </p>
                  <h3 className="font-brand-secondary mt-1 text-xl font-bold">
                    Field Operations
                  </h3>
                </div>

                <div className="bg-accent-100 text-accent-800 dark:bg-accent-900/40 dark:text-accent-200 rounded-xl px-3 py-1.5 text-xs font-bold">
                  Live
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <MetricCard>
                  <MetricCardIcon
                    className={cn(
                      `bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200`,
                    )}
                  >
                    <UsersRound />
                  </MetricCardIcon>
                  <MetricCardValue>148</MetricCardValue>
                  <MetricCardLabel>Field Officers</MetricCardLabel>
                </MetricCard>

                <MetricCard>
                  <MetricCardIcon
                    className={cn(
                      `bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-200`,
                    )}
                  >
                    <Stethoscope />
                  </MetricCardIcon>
                  <MetricCardValue>1,284</MetricCardValue>
                  <MetricCardLabel>Doctor Visits</MetricCardLabel>
                </MetricCard>

                <MetricCard>
                  <MetricCardIcon
                    className={cn(
                      `bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-200`,
                    )}
                  >
                    <PackageCheck />
                  </MetricCardIcon>
                  <MetricCardValue>624</MetricCardValue>
                  <MetricCardLabel>Orders</MetricCardLabel>
                </MetricCard>

                <MetricCard>
                  <MetricCardIcon
                    className={cn(
                      `bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200`,
                    )}
                  >
                    <Store />
                  </MetricCardIcon>
                  <MetricCardValue>86</MetricCardValue>
                  <MetricCardLabel>Stockists</MetricCardLabel>
                </MetricCard>
              </div>

              <div className="border-foreground/5 mt-4 rounded-2xl border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground/45 text-xs">
                      Route Performance
                    </p>

                    <p className="font-brand-secondary mt-1 text-lg font-bold">
                      82% completed
                    </p>
                  </div>

                  <div className="bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-200 grid size-10 place-items-center rounded-xl">
                    <Route className="size-5" />
                  </div>
                </div>

                <div className="bg-primary-100 dark:bg-primary-950 mt-4 h-2.5 overflow-hidden rounded-full">
                  <div className="bg-primary-600 h-full w-[82%] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-foreground/5 bg-background absolute -bottom-7 -left-3 hidden rounded-2xl border p-4 shadow-xl sm:block">
            <div className="flex items-center gap-3">
              <div className="bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300 grid size-10 place-items-center rounded-xl">
                <ClipboardCheck className="size-5" />
              </div>

              <div>
                <p className="text-foreground/45 text-xs">Today</p>
                <p className="text-sm font-bold">324 visits completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `border-foreground/5 dark:bg-foreground/2 border-y bg-white/40`,
        className,
      )}
      {...props}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
        <Stat value="360°" label="Field visibility" />
        <Stat value="Live" label="Activity tracking" />
        <Stat value="Unified" label="Doctor & chemist CRM" />
        <Stat value="Centralized" label="Business operations" />
      </div>
    </section>
  );
}

function Features({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      id="features"
      className={cn(`py-24 sm:py-28`, className)}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-primary-600 text-xs font-bold tracking-[0.22em] uppercase">
            Complete Field Platform
          </p>

          <h2 className="font-brand-secondary mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Everything your pharmaceutical field operation needs
          </h2>

          <p className="text-foreground/55 mt-5 text-base leading-7">
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
                className="group border-foreground/5 hover:border-primary-200 hover:shadow-primary-900/5 dark:bg-foreground/3 rounded-6.5 border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
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

                <h3 className="font-brand-secondary mt-6 text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="text-foreground/55 mt-3 text-sm leading-7">
                  {feature.description}
                </p>

                <button className="text-primary-600 mt-5 flex items-center gap-1.5 text-sm font-bold">
                  Learn more
                  <ChevronRight className="size-4 transition group-hover:translate-x-1" />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Solution({ className, ...props }: ComponentProps<"section">) {
  return (
    <section id="solutions" className={cn(`py-24`, className)} {...props}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-800 text-primary-50 rounded-9 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="text-primary-200 text-xs font-bold tracking-[0.2em] uppercase">
                Built for your complete network
              </p>

              <h2 className="font-brand-secondary mt-5 max-w-xl text-3xl font-bold tracking-tight sm:text-5xl">
                Connect field teams, doctors, chemists and stockists.
              </h2>

              <p className="text-primary-100/75 mt-6 max-w-xl leading-7">
                Replace disconnected processes with one coordinated system built
                around your actual pharmaceutical field workflow.
              </p>

              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="bg-accent-400 text-accent-950 grid size-6 shrink-0 place-items-center rounded-full">
                      <Check className="size-3.5" strokeWidth={3} />
                    </div>

                    <span className="text-primary-50/90 text-sm font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-700 relative min-h-105 p-8 sm:p-12">
              <div className="bg-secondary-400/20 absolute -top-16 -right-16 size-64 rounded-full" />
              <div className="bg-accent-400/15 absolute -bottom-20 -left-12 size-64 rounded-full" />

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
  );
}

function Platform({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      id="platform"
      className={cn(`py-24 sm:py-28`, className)}
      {...props}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-secondary-700 dark:text-secondary-300 text-xs font-bold tracking-[0.2em] uppercase">
            Centralized Control
          </p>

          <h2 className="font-brand-secondary mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            One dashboard.
            <span className="text-primary-600 block">
              Complete operational visibility.
            </span>
          </h2>

          <p className="text-foreground/55 mt-6 max-w-xl leading-8">
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

        <div className="border-foreground/5 shadow-primary-950/5 dark:bg-foreground/3 rounded-4xl border bg-white p-5 shadow-xl">
          <div className="bg-foreground/2.5 rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/45 text-xs">
                  Performance Analytics
                </p>

                <h3 className="font-brand-secondary mt-1 text-xl font-bold">
                  Monthly Overview
                </h3>
              </div>

              <span className="bg-background rounded-lg px-3 py-1.5 text-xs font-semibold">
                August
              </span>
            </div>

            <div className="mt-8 flex h-52 items-end gap-3">
              {[38, 55, 46, 72, 58, 82, 65, 92, 77, 88].map((height, index) => (
                <div
                  key={index}
                  className="bg-primary-100 dark:bg-primary-950 flex h-full flex-1 items-end rounded-full"
                >
                  <div
                    className="bg-primary-600 w-full rounded-full"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
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
  );
}

function Contact({ className, ...props }: ComponentProps<"section">) {
  return (
    <section id="contact" className={cn(`pt-8 pb-24`, className)} {...props}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-secondary-100 dark:bg-secondary-950 rounded-9 relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="bg-primary-300/30 absolute top-0 left-0 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
          <div className="bg-accent-300/30 absolute right-0 bottom-0 size-48 translate-x-1/2 translate-y-1/2 rounded-full blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <p className="text-secondary-700 dark:text-secondary-300 text-xs font-bold tracking-[0.2em] uppercase">
              Transform your field operations
            </p>

            <h2 className="font-brand-secondary mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              Ready to bring your entire field force onto one platform?
            </h2>

            <p className="text-foreground/55 mx-auto mt-5 max-w-xl leading-7">
              Discover how MedForce can simplify field activity, CRM, orders,
              inventory and business reporting.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button className="bg-primary-600 hover:bg-primary-700 flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold text-white transition">
                Schedule a Demo
                <ArrowRight className="size-4" />
              </button>

              <button className="border-foreground/10 bg-background/60 hover:bg-background rounded-2xl border px-7 py-3.5 text-sm font-bold backdrop-blur transition">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <p className="font-brand-secondary text-primary-600 text-xl font-bold sm:text-2xl">
      {value}
    </p>
    <p className="text-foreground/45 mt-1 text-xs sm:text-sm">{label}</p>
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
  <div className="border-primary-500/30 bg-primary-800/60 flex items-center gap-4 rounded-2xl border p-4 backdrop-blur">
    <div className="bg-primary-50 font-brand-secondary text-primary-700 grid size-11 shrink-0 place-items-center rounded-xl text-sm font-bold">
      {number}
    </div>

    <div>
      <h4 className="font-brand-secondary text-primary-50 font-bold">
        {title}
      </h4>
      <p className="text-primary-100/65 mt-1 text-xs">{description}</p>
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
    <div className="bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200 grid size-11 shrink-0 place-items-center rounded-2xl">
      <Icon className="size-5" />
    </div>

    <div>
      <h3 className="font-brand-secondary font-bold">{title}</h3>
      <p className="text-foreground/50 mt-1 text-sm leading-6">{description}</p>
    </div>
  </div>
);

const SmallStat = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-background rounded-xl p-3">
    <p className="font-brand-secondary text-lg font-bold">{value}</p>
    <p className="text-foreground/45 text-2.75 mt-0.5">{label}</p>
  </div>
);

export { HomePage };
