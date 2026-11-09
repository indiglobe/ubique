import { cn } from "@repo/styles/cn";
import { useMemo, useState } from "react";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CalendarCheck,
  CalendarClock,
  ChartNoAxesCombined,
  ClipboardCheck,
  ContactRound,
  FileBarChart,
  LayoutDashboard,
  LockKeyholeOpen,
  Map,
  MapPin,
  MapPinned,
  Package,
  ReceiptText,
  Route,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  Store,
  Users,
  Wallet,
  Warehouse,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import type { FileRouteTypes } from "@/routeTree.gen";
import type { routeSearchParamSchema } from "@/routes/(authenticated-routes)/dashboard/index";
import type z from "zod";

type ModuleCategory = NonNullable<
  z.infer<typeof routeSearchParamSchema>
>["category"];

type DashboardModule = {
  id: string;
  number: string;
  title: string;
  description: string;
  category: ModuleCategory;
  icon: LucideIcon;
  route: FileRouteTypes["to"];
};

const modules: DashboardModule[] = [
  {
    id: "dashboard",
    number: "01",
    title: "Dashboard",
    description: "Business overview and statistics",
    category: "overview",
    icon: LayoutDashboard,
    route: "/dashboard",
  },
  {
    id: "employees",
    number: "02",
    title: "Employee Management",
    description: "Employees, roles and permissions",
    category: "people",
    icon: Users,
    route: "/dashboard/employee",
  },
  {
    id: "customers",
    number: "03",
    title: "Customer Management",
    description: "Doctors, chemists and outlets",
    category: "people",
    icon: ContactRound,
    route: "/",
  },
  {
    id: "stockists",
    number: "04",
    title: "Stockist Management",
    description: "Stockist accounts and mapping",
    category: "people",
    icon: Warehouse,
    route: "/",
  },
  {
    id: "territories",
    number: "05",
    title: "Territory Management",
    description: "Territories and assignments",
    category: "field operations",
    icon: Map,
    route: "/",
  },
  {
    id: "routes",
    number: "06",
    title: "Route Management",
    description: "MR and distributor routes",
    category: "field operations",
    icon: Route,
    route: "/",
  },
  {
    id: "products",
    number: "07",
    title: "Product Management",
    description: "Products and visualization",
    category: "products & inventory",
    icon: Package,
    route: "/",
  },
  {
    id: "batches",
    number: "08",
    title: "Batch & Expiry",
    description: "Batches, expiry and wastage",
    category: "products & inventory",
    icon: CalendarClock,
    route: "/",
  },
  {
    id: "inventory",
    number: "09",
    title: "Inventory Management",
    description: "Master warehouse and stock",
    category: "products & inventory",
    icon: Boxes,
    route: "/",
  },
  {
    id: "transfers",
    number: "10",
    title: "Stock Transfers",
    description: "Transfer requests and approvals",
    category: "products & inventory",
    icon: ArrowLeftRight,
    route: "/",
  },
  {
    id: "orders",
    number: "11",
    title: "Order Management",
    description: "Orders and fulfillment",
    category: "sales & finance",
    icon: ShoppingBag,
    route: "/",
  },
  {
    id: "billing",
    number: "12",
    title: "Billing & Delivery",
    description: "Invoices and dispatch tracking",
    category: "sales & finance",
    icon: ReceiptText,
    route: "/",
  },
  {
    id: "payments",
    number: "13",
    title: "Payments & Collections",
    description: "Payment and collection tracking",
    category: "sales & finance",
    icon: Wallet,
    route: "/",
  },
  {
    id: "attendance",
    number: "14",
    title: "Attendance Management",
    description: "Day start, day end and logs",
    category: "field operations",
    icon: CalendarCheck,
    route: "/",
  },
  {
    id: "day-unlock",
    number: "15",
    title: "Day Unlock Requests",
    description: "Reopening approval",
    category: "approvals",
    icon: LockKeyholeOpen,
    route: "/",
  },
  {
    id: "visits",
    number: "16",
    title: "Visit Management",
    description: "MR visits and check-ins",
    category: "field operations",
    icon: MapPin,
    route: "/",
  },
  {
    id: "activity-map",
    number: "17",
    title: "Activity Map",
    description: "Geographical route visualization",
    category: "field operations",
    icon: MapPinned,
    route: "/",
  },
  {
    id: "doctor-profiling",
    number: "18",
    title: "Doctor Profiling",
    description: "Specialties and preferences",
    category: "people",
    icon: Stethoscope,
    route: "/",
  },
  {
    id: "reports",
    number: "19",
    title: "Reports & Analytics",
    description: "Business and performance reports",
    category: "insights",
    icon: ChartNoAxesCombined,
    route: "/",
  },
  {
    id: "settings",
    number: "20",
    title: "Settings",
    description: "Application configuration",
    category: "administration",
    icon: Settings,
    route: "/",
  },
];

const categories: Record<ModuleCategory, string> = {
  all: "All",
  overview: "Overview",
  people: "People",
  "field operations": "Field Operations",
  "products & inventory": "Products & Inventory",
  "sales & finance": "Sales & Finance",
  approvals: "Approvals",
  insights: "Insights",
  administration: "Administration",
};

export function SuperAdminDashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | ModuleCategory
  >("All");

  const filteredModules = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return modules.filter((module) => {
      const matchesCategory =
        selectedCategory === "All" || module.category === selectedCategory;

      const matchesSearch =
        !normalizedSearch ||
        module.title.toLowerCase().includes(normalizedSearch) ||
        module.description.toLowerCase().includes(normalizedSearch) ||
        module.category.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className={cn("min-h-screen transition-[padding] duration-300")}>
        <div className="mx-auto w-full max-w-400 space-y-8">
          <Banner />

          <BusinessOverview />

          <QuickActions />

          <section id="module-directory" className="scroll-mt-24 space-y-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className="text-primary-600 text-xs font-semibold tracking-[0.14em] uppercase">
                  Workspace directory
                </p>
                <h2 className="font-brand-secondary mt-1 text-xl font-bold tracking-tight">
                  All management modules
                </h2>
                <p className="text-foreground/50 mt-1 text-sm">
                  Access every part of your business from one place.
                </p>
              </div>

              <div className="relative w-full lg:max-w-sm">
                <Search className="text-foreground/40 pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search modules..."
                  className="h-11 pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "shrink-0 rounded-lg border px-3 py-2 text-xs font-semibold transition",
                    selectedCategory === category
                      ? "border-primary-600 bg-primary-600 text-white"
                      : "border-foreground/10 bg-background text-foreground/60 hover:border-foreground/25 hover:text-foreground",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-foreground/45 text-xs">
                Showing{" "}
                <span className="text-foreground font-semibold">
                  {filteredModules.length}
                </span>{" "}
                of {modules.length} modules
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-primary-600 text-xs font-semibold hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>

            {filteredModules.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredModules.map((module) => {
                  const Icon = module.icon;

                  return (
                    <button
                      key={module.id}
                      type="button"
                      onClick={() => navigate({ to: module.route })}
                      className="group border-foreground/10 bg-background hover:border-primary-500/40 hover:shadow-primary-500/5 relative flex min-h-37.5 flex-col overflow-clip rounded-xl border p-5 text-left transition duration-200 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="flex w-full items-start justify-between">
                        <div className="bg-foreground/4.5 text-foreground/65 group-hover:bg-primary-600 flex size-11 items-center justify-center rounded-md transition group-hover:text-white">
                          <Icon className="size-5" />
                        </div>

                        <span className="font-brand-secondary text-foreground/25 text-xs font-bold tracking-wider">
                          {module.number}
                        </span>
                      </div>

                      <div className="mt-5 flex w-full items-end justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="group-hover:text-primary-600 text-sm font-bold tracking-tight transition">
                            {module.title}
                          </h3>
                          <p className="text-foreground/45 mt-1.5 text-xs leading-5">
                            {module.description}
                          </p>
                        </div>

                        <ArrowUpRight className="text-foreground/25 group-hover:text-primary-600 mb-1 size-4 shrink-0 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>

                      <span className="bg-primary-600 pointer-events-none absolute right-0 bottom-0 left-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="border-foreground/15 flex flex-col items-center justify-center rounded-xl border border-dashed px-5 py-16 text-center">
                <div className="bg-foreground/5 text-foreground/40 flex size-12 items-center justify-center rounded-xl">
                  <Search className="size-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold">No modules found</h3>
                <p className="text-foreground/45 mt-1 text-xs">
                  Try another search term or category.
                </p>
                <Button
                  variant="accent"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </section>

          <footer className="border-foreground/10 text-foreground/40 flex flex-col justify-between gap-2 border-t pt-5 text-xs sm:flex-row">
            <p>Super Admin Control Center</p>
            <p>Secure business management workspace</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

function Banner() {
  const {
    userDetailsFromCookie: { fullName },
  } = useRouteContext({
    from: "/(authenticated-routes)/dashboard/",
  });

  const navigate = useNavigate();

  return (
    <section className="bg-foreground/5 text-foreground relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10">
      {/* background */}
      <>
        <div className="border-background/10 pointer-events-none absolute -top-32 -right-16 size-80 rounded-full border" />
        <div className="border-background/10 pointer-events-none absolute -top-20 -right-4 size-64 rounded-full border" />
        <div className="bg-primary-500/20 pointer-events-none absolute right-1/4 -bottom-40 size-72 rounded-full blur-3xl" />
      </>
      {/* background */}

      <div className="relative z-10 max-w-2xl">
        <div className="border-foreground/15 bg-background/10 mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5">
          <ShieldCheck className="text-primary-300 size-3.5" />
          <span className="text-foreground/75 text-2.5 font-bold tracking-[0.18em] uppercase">
            Super Admin Control Center
          </span>
        </div>

        <h1 className="font-brand-secondary text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Everything under
          <span className="text-primary-300 block">one command.</span>
        </h1>

        <p className="text-foreground/60 mt-4 max-w-lg text-sm leading-6 sm:text-base">
          Welcome back, {fullName}. Manage your people, products, operations and
          business performance from one central workspace.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button
            onClick={() => {
              document
                .getElementById("module-directory")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-primary-600 hover:bg-primary-700 text-white"
          >
            Explore all modules
            <ArrowRight className="ml-2 size-4" />
          </Button>

          <Button
            variant="primary"
            appearance="ghost"
            onClick={() => navigate({ to: "/" })}
            className=""
          >
            View reports
            <ArrowUpRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>

      <div className="absolute right-10 bottom-8 hidden lg:block">
        <div className="border-background/15 bg-background/4 flex size-40 items-center justify-center rounded-full border">
          <div className="border-primary-400/30 bg-primary-500/10 flex size-28 items-center justify-center rounded-full border">
            <ShieldCheck className="text-primary-300 size-14" />
          </div>
        </div>
      </div>
    </section>
  );
}

function BusinessOverview() {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-primary-600 text-xs font-semibold tracking-[0.14em] uppercase">
            Business overview
          </p>
          <h2 className="font-brand-secondary mt-1 text-xl font-bold tracking-tight">
            At a glance
          </h2>
        </div>

        <p className="text-foreground/45 text-xs">
          Connect your dashboard queries to display live statistics.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <>
          <div className="border-foreground/10 bg-background hover:border-primary-500/30 rounded-xl border p-5 transition hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-foreground/50 text-xs font-medium">
                  Total Employees
                </p>
                <p className="font-brand-secondary mt-3 text-3xl font-bold tracking-tight">
                  —
                </p>
              </div>

              <div
                className={cn(
                  "flex size-10 items-center justify-center rounded-lg",
                  `bg-primary-500/10 text-primary-600`,
                )}
              >
                <Users className="size-5" />
              </div>
            </div>

            <p className="text-foreground/45 mt-3 text-xs">
              Registered employees
            </p>
          </div>

          <div className="border-foreground/10 bg-background hover:border-primary-500/30 rounded-xl border p-5 transition hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-foreground/50 text-xs font-medium">
                  Customers & Outlets
                </p>
                <p className="font-brand-secondary mt-3 text-3xl font-bold tracking-tight">
                  —
                </p>
              </div>

              <div
                className={cn(
                  "flex size-10 items-center justify-center rounded-lg",
                  `bg-secondary-500/10 text-secondary-700`,
                )}
              >
                <Store className="size-5" />
              </div>
            </div>

            <p className="text-foreground/45 mt-3 text-xs">
              Doctors, chemists and outlets
            </p>
          </div>

          <div className="border-foreground/10 bg-background hover:border-primary-500/30 rounded-xl border p-5 transition hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-foreground/50 text-xs font-medium">
                  Total Orders
                </p>
                <p className="font-brand-secondary mt-3 text-3xl font-bold tracking-tight">
                  —
                </p>
              </div>

              <div
                className={cn(
                  "flex size-10 items-center justify-center rounded-lg",
                  `bg-green-500/10 text-green-600`,
                )}
              >
                <ShoppingBag className="size-5" />
              </div>
            </div>

            <p className="text-foreground/45 mt-3 text-xs">Orders received</p>
          </div>

          <div className="border-foreground/10 bg-background hover:border-primary-500/30 rounded-xl border p-5 transition hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-foreground/50 text-xs font-medium">
                  Pending Approvals
                </p>
                <p className="font-brand-secondary mt-3 text-3xl font-bold tracking-tight">
                  —
                </p>
              </div>

              <div
                className={cn(
                  "flex size-10 items-center justify-center rounded-lg",
                  `bg-purple-500/10 text-purple-600`,
                )}
              >
                <ClipboardCheck className="size-5" />
              </div>
            </div>

            <p className="text-foreground/45 mt-3 text-xs">
              Requests requiring attention
            </p>
          </div>
        </>
      </div>
    </section>
  );
}

function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-primary-600 text-xs font-semibold tracking-[0.14em] uppercase">
            Frequently accessed
          </p>
          <h2 className="font-brand-secondary mt-1 text-xl font-bold tracking-tight">
            Quick actions
          </h2>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="group border-foreground/10 bg-background hover:border-primary-500/40 hover:shadow-primary-500/5 flex items-center gap-4 rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="bg-primary-500/10 text-primary-600 group-hover:bg-primary-600 flex size-11 shrink-0 items-center justify-center rounded-xl transition group-hover:text-white">
            <Users className="size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Employee Management</p>
            <p className="text-foreground/45 mt-1 text-xs">
              Manage your workforce
            </p>
          </div>

          <ArrowUpRight className="text-foreground/30 group-hover:text-primary-600 size-4 shrink-0 transition" />
        </button>

        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="group border-foreground/10 bg-background hover:border-primary-500/40 hover:shadow-primary-500/5 flex items-center gap-4 rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="bg-primary-500/10 text-primary-600 group-hover:bg-primary-600 flex size-11 shrink-0 items-center justify-center rounded-xl transition group-hover:text-white">
            <ShoppingBag className="size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Order Management</p>
            <p className="text-foreground/45 mt-1 text-xs">
              Review and process orders
            </p>
          </div>

          <ArrowUpRight className="text-foreground/30 group-hover:text-primary-600 size-4 shrink-0 transition" />
        </button>

        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="group border-foreground/10 bg-background hover:border-primary-500/40 hover:shadow-primary-500/5 flex items-center gap-4 rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="bg-primary-500/10 text-primary-600 group-hover:bg-primary-600 flex size-11 shrink-0 items-center justify-center rounded-xl transition group-hover:text-white">
            <Boxes className="size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Inventory Management</p>
            <p className="text-foreground/45 mt-1 text-xs">
              Monitor warehouse inventory
            </p>
          </div>

          <ArrowUpRight className="text-foreground/30 group-hover:text-primary-600 size-4 shrink-0 transition" />
        </button>

        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="group border-foreground/10 bg-background hover:border-primary-500/40 hover:shadow-primary-500/5 flex items-center gap-4 rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="bg-primary-500/10 text-primary-600 group-hover:bg-primary-600 flex size-11 shrink-0 items-center justify-center rounded-xl transition group-hover:text-white">
            <FileBarChart className="size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Reports & Analytics</p>
            <p className="text-foreground/45 mt-1 text-xs">
              Explore business performance
            </p>
          </div>

          <ArrowUpRight className="text-foreground/30 group-hover:text-primary-600 size-4 shrink-0 transition" />
        </button>
      </div>
    </section>
  );
}
