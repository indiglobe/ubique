import { useMemo } from "react";
import {
  createSortedRowModel,
  sortFn_alphanumeric,
  sortFn_datetime,
  stockFeatures,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import type { ColumnDef, SortingState, Updater } from "@tanstack/react-table";
import {
  Search,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  AlertCircle,
  Users,
} from "lucide-react";
import { useReadAllUsers } from "@/integrations/tanstack/react-query/super-admin/dashboard.query";
import { cn } from "@repo/styles/cn";
import { useSearch, useNavigate } from "@tanstack/react-router";
import type { routeSearchParamSchema } from "@/routes/(authenticated-routes)/dashboard";
import type { z } from "zod";
import { CreateNewUserForm } from "./super-admin-forms";
import { useTanStackTableDevtools } from "@tanstack/react-table-devtools";

type User = NonNullable<ReturnType<typeof useReadAllUsers>["data"]>[number];

type RouteSearch = z.infer<typeof routeSearchParamSchema>;

const EMPTY_USERS: User[] = [];

/**
 * IMPORTANT:
 * stockFeatures enables feature APIs, but does not register
 * the client-side sorted row model.
 *
 * createSortedRowModel() is what actually sorts the rows.
 */
const features = tableFeatures({
  ...stockFeatures,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    datetime: sortFn_datetime,
  },
});

/**
 * URL search parameter -> TanStack Table column ID.
 *
 * The order here defines sort priority when multiple URL
 * parameters are active.
 */
type SortParam = Exclude<
  keyof NonNullable<z.infer<typeof routeSearchParamSchema>>,
  "q"
>;
type SortableColumn = Extract<
  keyof User,
  "employeeCode" | "role" | "status" | "lastLoginAt"
>;

const SORT_PARAM_TO_COLUMN = {
  "employee-code": "employeeCode",
  role: "role",
  status: "status",
  "last-login": "lastLoginAt",
} as const satisfies Record<SortParam, SortableColumn>;

const SORT_PARAMS = [
  "employee-code",
  "role",
  "status",
  "last-login",
] as const satisfies readonly SortParam[];

const COLUMN_TO_SORT_PARAM = {
  employeeCode: "employee-code",
  role: "role",
  status: "status",
  lastLoginAt: "last-login",
} as const satisfies Record<SortableColumn, SortParam>;

/**
 * Define which columns are sortable.
 *
 * Register explicit sorting functions for predictable
 * string and date sorting.
 */
const columns: ColumnDef<typeof features, User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: false,
  },
  {
    accessorKey: "employeeCode",
    header: "Employee Code",
    sortFn: "alphanumeric",
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: false,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    enableSorting: false,
  },
  {
    accessorKey: "role",
    header: "Role",
    sortFn: "alphanumeric",
    cell: (info) => {
      const role = info.getValue<User["role"]>();

      return (
        <span className="bg-primary-300/10 text-primary-700 dark:text-primary-300 border-primary-300/20 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
          {role.replaceAll("_", " ")}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    sortFn: "alphanumeric",
    cell: (info) => {
      const status = info.getValue<User["status"]>();

      const styles: Record<User["status"], string> = {
        ACTIVE: "bg-accent-500/10 text-accent-600 border-accent-300/30",
        INACTIVE: "bg-foreground/5 text-foreground/60 border-foreground/10",
        SUSPENDED: "bg-red-500/10 text-red-600 border-red-500/20",
        UNDER_VERIFICATION:
          "bg-amber-500/10 text-amber-600 border-amber-500/20",
      };

      return (
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
            styles[status],
          )}
        >
          {status.replaceAll("_", " ")}
        </span>
      );
    },
  },
  {
    accessorKey: "lastLoginAt",
    header: "Last Login",
    sortFn: "datetime",
    cell: (info) => {
      const date = info.getValue<User["lastLoginAt"]>();

      return date ? new Date(date).toLocaleString() : "Never";
    },
  },
];

export function UsersTable() {
  const searchParams = useSearch({
    from: "/(authenticated-routes)/dashboard/",
  });

  const navigate = useNavigate();

  const { data: users, isLoading, isError } = useReadAllUsers();

  const searchQuery = searchParams?.q ?? "";

  /**
   * Reconstruct TanStack's sorting array from the URL.
   *
   * Every active URL sort parameter is included.
   * Array order determines multi-sort priority.
   */
  const sorting = (): SortingState => {
    const result: SortingState = [];

    for (const param of SORT_PARAMS) {
      const direction = searchParams?.[param];

      if (direction === "asc" || direction === "desc") {
        result.push({
          id: SORT_PARAM_TO_COLUMN[param],
          desc: direction === "desc",
        });
      }
    }

    return result;
  };

  /**
   * Persist TanStack's sorting changes to the URL.
   *
   * Normal click: sort one column.
   * Shift + click: add/remove secondary sort columns.
   */
  const handleSortingChange = (updater: Updater<SortingState>) => {
    const nextSorting =
      typeof updater === "function" ? updater(sorting()) : updater;

    const sortMap = new Map<SortableColumn, "asc" | "desc">();

    for (const item of nextSorting) {
      const param = COLUMN_TO_SORT_PARAM[item.id as SortableColumn];

      if (param) {
        sortMap.set(item.id as SortableColumn, item.desc ? "desc" : "asc");
      }
    }

    void navigate({
      to: "/dashboard",
      search: (prev: RouteSearch) => ({
        ...prev,
        "employee-code": sortMap.get("employeeCode"),
        role: sortMap.get("role"),
        status: sortMap.get("status"),
        "last-login": sortMap.get("lastLoginAt"),
      }),
      replace: true,
    });
  };

  const table = useTable({
    key: "Super Admin Table",

    features,
    columns,
    data: users ?? EMPTY_USERS,

    state: {
      sorting: sorting(),
    },

    onSortingChange: handleSortingChange,

    // Shift-click enables multi-column sorting.
    enableMultiSort: true,
  });

  useTanStackTableDevtools(table);

  /**
   * getRowModel() now returns sorted rows because the
   * sortedRowModel feature is registered above.
   *
   * Search is applied afterward, preserving the sort order.
   */
  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const rows = table.getRowModel().rows;

    if (!query) return rows;

    return rows.filter((row) =>
      [
        row.original.name,
        row.original.username,
        row.original.email,
        row.original.employeeCode,
        row.original.phone,
        row.original.role,
        row.original.status,
      ].some((value) => value?.toLowerCase().includes(query)),
    );
  }, [table, searchQuery, users]);

  if (isLoading) {
    return <UsersTableSkeleton />;
  }

  if (isError) {
    return <UsersTableError />;
  }

  return (
    <div className="font-brand-primary mx-auto space-y-6 py-4 md:py-6">
      {/* Main Table */}
      <div className="bg-background border-foreground/10 overflow-hidden rounded-md border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225 border-collapse text-left">
            <thead>
              {table.getHeaderGroups().map((group) => (
                <tr
                  key={group.id}
                  className="border-foreground/10 bg-foreground/2 border-b text-xs font-semibold tracking-wider uppercase"
                >
                  {group.headers.map((header) => {
                    const isSorted = header.column.getIsSorted();
                    const canSort = header.column.getCanSort();

                    return (
                      <th
                        key={header.id}
                        aria-sort={
                          isSorted === "asc"
                            ? "ascending"
                            : isSorted === "desc"
                              ? "descending"
                              : "none"
                        }
                        className="text-foreground/60 p-4 font-semibold whitespace-nowrap"
                      >
                        {header.isPlaceholder ? null : canSort ? (
                          <button
                            type="button"
                            onClick={header.column.getToggleSortingHandler()}
                            title="Click to sort; Shift-click to add a secondary sort"
                            className="group inline-flex cursor-pointer items-center gap-2 font-semibold tracking-wider uppercase"
                          >
                            <table.FlexRender header={header} />

                            <span className="text-foreground/50 group-hover:text-foreground transition-colors">
                              {isSorted === "asc" ? (
                                <ArrowUp className="text-primary-600 size-3.5" />
                              ) : isSorted === "desc" ? (
                                <ArrowDown className="text-primary-600 size-3.5" />
                              ) : (
                                <ArrowUpDown className="size-3.5 opacity-50" />
                              )}
                            </span>
                          </button>
                        ) : (
                          <table.FlexRender header={header} />
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody className="divide-foreground/5 divide-y text-xs">
              {filteredRows.length > 0 ? (
                filteredRows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-foreground/3 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="text-foreground/80 p-4 whitespace-nowrap"
                      >
                        <table.FlexRender cell={cell} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-foreground/50 p-12 text-center"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-foreground/50 px-1 text-xs font-semibold">
        Showing {filteredRows.length} users
      </div>
    </div>
  );
}

export function Tableheader() {
  const searchParams = useSearch({
    from: "/(authenticated-routes)/dashboard/",
  });

  const navigate = useNavigate();

  const searchQuery = searchParams?.q ?? "";

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-5 rounded-xl border p-4",
        "border-primary-200 bg-primary-100/40 dark:border-primary-800 dark:bg-primary-950/30",
        "sm:p-5 md:gap-6 md:p-6",
        "lg:flex-row lg:items-center lg:justify-between",
      )}
    >
      {/* Header content */}
      <div className="min-w-0 flex-1">
        <span className="font-brand-accent text-accent-600 dark:text-accent-400 text-2.5 font-bold tracking-[0.2em] uppercase sm:text-xs">
          Administration
        </span>

        <h2 className="font-brand-secondary text-foreground mt-1 text-xl font-bold tracking-tight sm:text-2xl">
          Users Management
        </h2>

        <p className="text-foreground/60 mt-1 max-w-2xl text-sm leading-relaxed">
          Manage all registered users, view roles, and track active statuses.
        </p>
      </div>

      {/* Actions */}
      <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center lg:w-auto lg:shrink-0">
        <div className="relative w-full min-w-0 sm:flex-1 lg:w-64 lg:flex-none xl:w-72">
          <Search className="text-foreground/40 pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />

          <input
            type="search"
            placeholder="Search users..."
            aria-label="Search users"
            value={searchQuery}
            onChange={(event) => {
              const q = event.target.value || undefined;

              void navigate({
                to: "/dashboard",
                search: (prev: RouteSearch) => ({
                  ...prev,
                  q,
                }),
                replace: true,
              });
            }}
            className={cn(
              "bg-foreground/3 border-foreground/10 text-foreground",
              "placeholder:text-foreground/40 w-full min-w-0 rounded-md border",
              "py-2.5 pr-3 pl-9 text-sm",
              "transition-colors outline-none",
              "focus-visible:border-primary-400 focus-visible:ring-primary-400/30 focus-visible:ring-2",
            )}
          />
        </div>

        <div className="w-full min-w-0 sm:w-auto sm:flex-none">
          <CreateNewUserForm />
        </div>
      </div>
    </div>
  );
}

export function UsersTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div
      role="status"
      aria-label="Loading users"
      className="font-brand-primary space-y-4 py-6"
    >
      <span className="sr-only">Loading users...</span>

      {/* Table skeleton */}
      <div className="border-foreground/10 bg-background overflow-hidden rounded-xl border shadow-sm">
        <div className="bg-foreground/3 border-foreground/10 grid grid-cols-2 gap-4 border-b p-4 sm:grid-cols-4 lg:grid-cols-7">
          {Array.from({ length: 7 }, (_, index) => (
            <div
              key={index}
              className={cn(
                "bg-foreground/10 h-3 animate-pulse rounded",
                index > 1 && "hidden sm:block",
                index > 3 && "lg:block",
              )}
            />
          ))}
        </div>

        {Array.from({ length: rows }, (_, index) => (
          <div
            key={index}
            className="border-foreground/5 grid grid-cols-2 items-center gap-4 border-b p-4 last:border-b-0 sm:grid-cols-4 lg:grid-cols-7"
          >
            {/* eslint-disable-next-line no-shadow */}
            {Array.from({ length: 7 }, (_, cellIndex) => (
              <div
                key={cellIndex}
                className={cn(
                  "flex min-w-0 items-center gap-2",
                  cellIndex > 1 && "hidden sm:flex",
                  cellIndex > 3 && "lg:flex",
                )}
              >
                {cellIndex === 0 && (
                  <div className="bg-foreground/10 size-8 shrink-0 animate-pulse rounded-full" />
                )}

                <div
                  className="bg-foreground/10 h-3 max-w-full animate-pulse rounded"
                  style={{
                    width: `${45 + ((index + cellIndex) % 4) * 12}%`,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="bg-foreground/5 h-3 w-32 animate-pulse rounded" />
    </div>
  );
}

export function UsersTableError() {
  return (
    <section
      role="alert"
      className="font-brand-primary rounded-xl border border-red-500/20 bg-red-500/5 my-6 py-6"
    >
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400">
          <AlertCircle className="size-7" />
        </div>

        <p className="text-foreground/50 text-2.5 font-bold tracking-[0.2em] uppercase">
          Something went wrong
        </p>

        <h3 className="text-foreground mt-2 text-lg font-bold sm:text-xl">
          Unable to load users
        </h3>

        <p className="text-foreground/60 mt-2 max-w-md text-sm leading-6">
          We couldn't load the user directory. Check your connection and try
          again. Your existing dashboard data and filters haven't been changed
          by this error.
        </p>
      </div>
    </section>
  );
}

type UsersTableEmptyProps = {
  searched?: boolean;
  query?: string;
};

export function UsersTableEmpty({
  searched = false,
  query = "",
}: UsersTableEmptyProps) {
  return (
    <div className="font-brand-primary flex flex-col items-center justify-center px-4 py-14 text-center sm:py-20">
      <div className="bg-foreground/5 text-foreground/50 flex size-14 items-center justify-center rounded-2xl">
        {searched ? (
          <Search className="size-6" />
        ) : (
          <Users className="size-6" />
        )}
      </div>

      <h3 className="text-foreground mt-4 text-base font-bold">
        {searched ? "No matching users" : "No users yet"}
      </h3>

      <p className="text-foreground/60 mt-2 max-w-sm text-sm leading-6">
        {searched
          ? `We couldn't find any users matching "${query}". Try a different name, email, employee code, or status.`
          : "There are no registered users to display yet. New users will appear here once they have been added."}
      </p>
    </div>
  );
}
