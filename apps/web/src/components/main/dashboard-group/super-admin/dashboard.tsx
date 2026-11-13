import { cn } from "@repo/styles/cn";
import { useMemo } from "react";
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
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
  title: string;
  description: string;
  category: NonNullable<ModuleCategory>[number];
  icon: LucideIcon;
  route: FileRouteTypes["to"];
};

const modules: DashboardModule[] = [
  {
    id: "employees",
    title: "Employee Management",
    description: "Employees, roles and permissions",
    category: "people",
    icon: Users,
    route: "/dashboard/employee",
  },
  {
    id: "customers",
    title: "Customer Management",
    description: "Doctors, chemists and outlets",
    category: "people",
    icon: ContactRound,
    route: "/",
  },
  {
    id: "stockists",
    title: "Stockist Management",
    description: "Stockist accounts and mapping",
    category: "people",
    icon: Warehouse,
    route: "/",
  },
  {
    id: "territories",
    title: "Territory Management",
    description: "Territories and assignments",
    category: "field operations",
    icon: Map,
    route: "/",
  },
  {
    id: "routes",
    title: "Route Management",
    description: "MR and distributor routes",
    category: "field operations",
    icon: Route,
    route: "/",
  },
  {
    id: "products",
    title: "Product Management",
    description: "Products and visualization",
    category: "products & inventory",
    icon: Package,
    route: "/",
  },
  {
    id: "batches",
    title: "Batch & Expiry",
    description: "Batches, expiry and wastage",
    category: "products & inventory",
    icon: CalendarClock,
    route: "/",
  },
  {
    id: "inventory",
    title: "Inventory Management",
    description: "Master warehouse and stock",
    category: "products & inventory",
    icon: Boxes,
    route: "/",
  },
  {
    id: "transfers",
    title: "Stock Transfers",
    description: "Transfer requests and approvals",
    category: "products & inventory",
    icon: ArrowLeftRight,
    route: "/",
  },
  {
    id: "orders",
    title: "Order Management",
    description: "Orders and fulfillment",
    category: "sales & finance",
    icon: ShoppingBag,
    route: "/",
  },
  {
    id: "billing",
    title: "Billing & Delivery",
    description: "Invoices and dispatch tracking",
    category: "sales & finance",
    icon: ReceiptText,
    route: "/",
  },
  {
    id: "payments",
    title: "Payments & Collections",
    description: "Payment and collection tracking",
    category: "sales & finance",
    icon: Wallet,
    route: "/",
  },
  {
    id: "attendance",
    title: "Attendance Management",
    description: "Day start, day end and logs",
    category: "field operations",
    icon: CalendarCheck,
    route: "/",
  },
  {
    id: "day-unlock",
    title: "Day Unlock Requests",
    description: "Reopening approval",
    category: "approvals",
    icon: LockKeyholeOpen,
    route: "/",
  },
  {
    id: "visits",
    title: "Visit Management",
    description: "MR visits and check-ins",
    category: "field operations",
    icon: MapPin,
    route: "/",
  },
  {
    id: "activity-map",
    title: "Activity Map",
    description: "Geographical route visualization",
    category: "field operations",
    icon: MapPinned,
    route: "/",
  },
  {
    id: "doctor-profiling",
    title: "Doctor Profiling",
    description: "Specialties and preferences",
    category: "people",
    icon: Stethoscope,
    route: "/",
  },
  {
    id: "reports",
    title: "Reports & Analytics",
    description: "Business and performance reports",
    category: "insights",
    icon: ChartNoAxesCombined,
    route: "/",
  },
  {
    id: "settings",
    title: "Settings",
    description: "Application configuration",
    category: "administration",
    icon: Settings,
    route: "/",
  },
];

const categories: Record<NonNullable<ModuleCategory>[number], string> = {
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

  const searchParams = useSearch({
    from: "/(authenticated-routes)/dashboard/",
  });

  const selectedCategories = searchParams?.category ?? ["all"];
  const searchQuery = searchParams?.q ?? "";

  const filteredModules = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return modules.filter((module) => {
      const matchesCategories =
        selectedCategories.includes("all") ||
        selectedCategories.includes(module.category);

      const matchesSearch =
        !normalizedSearch ||
        module.title.toLowerCase().includes(normalizedSearch) ||
        module.description.toLowerCase().includes(normalizedSearch) ||
        module.category.toLowerCase().includes(normalizedSearch);

      return matchesCategories && matchesSearch;
    });
  }, [searchQuery, selectedCategories]);

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

              <SearchingField />
            </div>

            <CategorySelectionButtons />

            <div className="flex items-center justify-between">
              <p className="text-foreground/45 text-xs">
                Showing{" "}
                <span className="text-foreground font-semibold">
                  {filteredModules.length}
                </span>{" "}
                of {modules.length} modules
              </p>

              {searchQuery && (
                <button
                  type="button"
                  onClick={() =>
                    navigate({
                      to: "/dashboard",
                      search: (prev) => ({
                        ...prev,
                        q: undefined,
                      }),
                      replace: true,
                      resetScroll: false,
                    })
                  }
                  className="text-primary-600 text-xs font-semibold hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>

            {filteredModules.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredModules.map((module, idx) => {
                  const Icon = module.icon;

                  return (
                    <button
                      key={module.id}
                      type="button"
                      onClick={() => navigate({ to: module.route })}
                      className="group border-foreground/10 bg-background hover:border-primary-500/40 hover:shadow-primary-500/5 relative flex min-h-37.5 flex-col overflow-clip rounded-xl border p-5 text-left transition duration-200 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="flex w-full items-start justify-between">
                        <div className="bg-foreground/4.5 text-foreground/65 group-hover:bg-primary-600 flex size-11 items-center justify-center rounded-sm transition group-hover:text-white">
                          <Icon className="size-5" />
                        </div>

                        <span className="font-brand-secondary text-foreground/25 text-xs font-bold tracking-wider">
                          {`${(idx + 1).toString().padStart(2, "0")}`}
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
                    navigate({
                      to: "/dashboard",
                      search: () => ({
                        category: undefined,
                        q: undefined,
                      }),
                      replace: true,
                      resetScroll: false,
                    });
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
                  "flex size-10 items-center justify-center rounded-md",
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

  const quickActionsModules = modules.slice(0, 4);

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
        {quickActionsModules.map((quickActionsModule) => {
          const Icon = quickActionsModule.icon;

          return (
            <button
              type="button"
              onClick={() => navigate({ to: quickActionsModule.route })}
              className="group border-foreground/10 bg-background hover:border-primary-500/40 hover:shadow-primary-500/5 flex items-center gap-4 rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="bg-primary-500/10 text-primary-600 group-hover:bg-primary-600 flex size-11 shrink-0 items-center justify-center rounded-md transition group-hover:text-white">
                <Icon className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">
                  {quickActionsModule.title}
                </p>
                <p className="text-foreground/45 mt-1 text-xs">
                  {quickActionsModule.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function SearchingField() {
  const searchParams = useSearch({
    from: "/(authenticated-routes)/dashboard/",
  });

  const navigate = useNavigate();

  const searchQuery = searchParams?.q ?? "";

  return (
    <div className="relative w-full lg:max-w-sm">
      <Search className="text-foreground/40 pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />

      <Input
        value={searchQuery}
        onChange={(event) => {
          const value = event.target.value;

          navigate({
            to: "/dashboard",
            search: (prev) => ({
              ...prev,
              q: value || undefined,
            }),
            replace: true,
            resetScroll: false,
          });
        }}
        placeholder="Search modules..."
        className="h-11 pl-10"
      />
    </div>
  );
}

function CategorySelectionButtons() {
  const searchParams = useSearch({
    from: "/(authenticated-routes)/dashboard/",
  });

  const navigate = useNavigate();

  type Category = NonNullable<ModuleCategory>[number];

  const selectedCategories: Category[] = searchParams?.category ?? ["all"];

  const handleCategoryChange = (category: Category) => {
    let updated: Category[];

    if (category === "all") {
      updated = ["all"];
    } else {
      updated = selectedCategories.includes(category)
        ? selectedCategories.filter((item) => item !== category)
        : [...selectedCategories.filter((item) => item !== "all"), category];

      if (updated.length === 0) {
        updated = ["all"];
      }
    }

    navigate({
      to: "/dashboard",
      search: (prev) => ({
        ...prev,
        category: updated.includes("all") ? undefined : updated,
      }),
      replace: true,
      resetScroll: false,
    });
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {Object.entries(categories).map(
        ([categoryNameForSearchParams, categoryNameForUser]) => {
          const category = categoryNameForSearchParams as Category;

          const isActive = selectedCategories.includes(category);

          return (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={cn(
                "shrink-0 rounded-lg border px-3 py-2 text-xs font-semibold transition",
                isActive
                  ? "border-primary-600 bg-primary-600 text-white"
                  : "border-foreground/10 bg-background text-foreground/60 hover:border-foreground/25 hover:text-foreground",
              )}
            >
              {categoryNameForUser}
            </button>
          );
        },
      )}
    </div>
  );
}
