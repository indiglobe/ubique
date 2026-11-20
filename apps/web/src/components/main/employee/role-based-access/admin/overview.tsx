import {
  Users,
  UserCheck,
  UserX,
  CalendarDays,
  Clock3,
  ClipboardCheck,
  ArrowUpRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@repo/styles/cn";
import { useReadUserCount } from "@/integrations/tanstack/react-query/user-query/admin.rq";
import { useReadAllAttendence } from "@/integrations/tanstack/react-query/attendance-query/admin.rq";

export function EmployeeDashboardQuickOverview() {
  const { data: userCount, status: userCountFetchingStatus } = useReadUserCount(
    {
      status: "ACTIVE",
      role: ["ADMIN", "ASM", "DISTRIBUTOR", "MANAGER", "MR", "RSM", "ZSM"],
    },
  );
  const { data: attendence, status: attendenceFetchingStatus } =
    useReadAllAttendence({
      attendanceDate: new Date(Date.now()),
      attendanceStatus: ["ABSENT", "ON_LEAVE", "PRESENT"],
    });

  const totalUser = userCount?.reduce((a, n) => (a += n.count), 0) ?? 0;

  const present =
    attendence?.reduce(
      (count, attendance) =>
        count + (attendance.attendanceStatus === "PRESENT" ? 1 : 0),
      0,
    ) ?? 0;

  const absent =
    attendence?.reduce(
      (count, attendance) =>
        count + (attendance.attendanceStatus === "ABSENT" ? 1 : 0),
      0,
    ) ?? 0;

  const onLeave =
    attendence?.reduce(
      (count, attendance) =>
        count + (attendance.attendanceStatus === "ON_LEAVE" ? 1 : 0),
      0,
    ) ?? 0;

  const attendancePercentage =
    totalUser > 0 ? Math.min((present / totalUser) * 100, 100) : 0;
  const presentWidth = totalUser > 0 ? (present / totalUser) * 100 : 0;
  const absentWidth = totalUser > 0 ? (absent / totalUser) * 100 : 0;
  const onLeaveWidth = totalUser > 0 ? (onLeave / totalUser) * 100 : 0;

  return (
    <section className="@container space-y-5">
      {/* Section heading */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-primary-600 text-xs font-semibold tracking-[0.14em] uppercase">
            Workforce overview
          </p>

          <h2 className="font-brand-secondary mt-1 text-xl font-bold tracking-tight">
            Employee Overview
          </h2>

          <p className="text-foreground/45 mt-1 text-sm">
            Monitor your workforce and today's attendance.
          </p>
        </div>

        <div className="text-foreground/45 flex items-center gap-2">
          <CalendarDays className="size-4" />
          <span className="text-xs font-medium">
            {new Intl.DateTimeFormat("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).format(new Date())}
          </span>
        </div>
      </div>

      {/* Statistics */}
      <div className="2xs:grid-cols-2 grid grid-cols-1 gap-4 xl:grid-cols-4">
        <div className="group border-foreground/10 bg-background hover:border-primary-500/30 rounded-xl border p-5 transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-foreground/50 text-xs font-medium">
                Total Employees
              </p>

              <div className="mt-3 flex h-9 items-center">
                {userCountFetchingStatus === "pending" ? (
                  <div className="bg-muted h-8 w-20 animate-pulse rounded-md" />
                ) : userCountFetchingStatus === "error" ? (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle className="size-5" />
                    <span className="text-xs">Failed to load</span>
                  </div>
                ) : (
                  <p className="font-brand-secondary text-3xl font-bold tracking-tight tabular-nums">
                    {totalUser}
                  </p>
                )}
              </div>
            </div>

            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-md",
                "bg-primary-500/10 text-primary-600",
              )}
            >
              {attendenceFetchingStatus === "pending" ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Users className="size-5" />
              )}
            </div>
          </div>

          <p className="text-foreground/45 mt-3 text-xs">
            Registered employees
          </p>
        </div>

        <div className="group border-foreground/10 bg-background hover:border-primary-500/30 rounded-xl border p-5 transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-foreground/50 text-xs font-medium">
                Present Today
              </p>

              <div className="mt-3 flex h-9 items-center">
                {attendenceFetchingStatus === "pending" ? (
                  <div className="bg-muted h-8 w-20 animate-pulse rounded-md" />
                ) : attendenceFetchingStatus === "error" ? (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle className="size-5" />
                    <span className="text-xs">Failed to load</span>
                  </div>
                ) : (
                  <p className="font-brand-secondary text-3xl font-bold tracking-tight tabular-nums">
                    {present}
                  </p>
                )}
              </div>
            </div>

            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-md",
                "bg-accent-500/10 text-accent-700",
              )}
            >
              {attendenceFetchingStatus === "pending" ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <UserCheck className="size-5" />
              )}
            </div>
          </div>

          <p className="text-foreground/45 mt-3 text-xs">
            Employees checked in
          </p>
        </div>

        <div className="group border-foreground/10 bg-background hover:border-primary-500/30 rounded-xl border p-5 transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-foreground/50 text-xs font-medium">
                Absent Today
              </p>

              <div className="mt-3 flex h-9 items-center">
                {attendenceFetchingStatus === "pending" ? (
                  <div className="bg-muted h-8 w-20 animate-pulse rounded-md" />
                ) : attendenceFetchingStatus === "error" ? (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle className="size-5" />
                    <span className="text-xs">Failed to load</span>
                  </div>
                ) : (
                  <p className="font-brand-secondary text-3xl font-bold tracking-tight tabular-nums">
                    {absent}
                  </p>
                )}
              </div>
            </div>

            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-md",
                "bg-red-500/10 text-red-500",
              )}
            >
              {attendenceFetchingStatus === "pending" ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <UserX className="size-5" />
              )}
            </div>
          </div>

          <p className="text-foreground/45 mt-3 text-xs">
            Employees not present
          </p>
        </div>

        <div className="group border-foreground/10 bg-background hover:border-primary-500/30 rounded-xl border p-5 transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-foreground/50 text-xs font-medium">On Leave</p>

              <div className="mt-3 flex h-9 items-center">
                {attendenceFetchingStatus === "pending" ? (
                  <div className="bg-muted h-8 w-20 animate-pulse rounded-md" />
                ) : attendenceFetchingStatus === "error" ? (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle className="size-5" />
                    <span className="text-xs">Failed to load</span>
                  </div>
                ) : (
                  <p className="font-brand-secondary text-3xl font-bold tracking-tight tabular-nums">
                    {onLeave}
                  </p>
                )}
              </div>
            </div>

            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-md",
                "bg-secondary-500/10 text-secondary-700",
              )}
            >
              {attendenceFetchingStatus === "pending" ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <CalendarDays className="size-5" />
              )}
            </div>
          </div>

          <p className="text-foreground/45 mt-3 text-xs">
            Approved leave requests
          </p>
        </div>
      </div>

      {/* Attendance details */}
      <div className="grid gap-4 @sm:grid-cols-3 @lg:grid-cols-5">
        {/* Attendance breakdown */}
        <div className="border-foreground/10 bg-background rounded-xl border p-5 @sm:col-span-3 @lg:col-span-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-brand-secondary text-sm font-bold">
                Today's Attendance
              </h3>

              <p className="text-foreground/45 mt-1 text-xs">
                Attendance distribution across employees.
              </p>
            </div>

            <div className="bg-primary-500/10 text-primary-600 flex size-9 items-center justify-center rounded-lg">
              <ClipboardCheck className="size-4" />
            </div>
          </div>

          {attendenceFetchingStatus === "pending" ? (
            <div className="bg-muted mt-7 h-3 w-full animate-pulse rounded-full" />
          ) : attendenceFetchingStatus === "error" ? (
            <p className="mt-6 text-xs text-red-500">
              Unable to load attendance breakdown.
            </p>
          ) : (
            <>
              <div className="bg-muted mt-7 flex h-3 w-full overflow-hidden rounded-full">
                <div
                  className="bg-accent-500 transition-all duration-500"
                  style={{ width: `${presentWidth}%` }}
                />
                <div
                  className="bg-destructive transition-all duration-500"
                  style={{ width: `${absentWidth}%` }}
                />
                <div
                  className="bg-secondary-500 transition-all duration-500"
                  style={{ width: `${onLeaveWidth}%` }}
                />
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-accent-500 size-2 rounded-full" />
                    <span className="text-foreground/45 text-xs">Present</span>
                  </div>
                  <p className="font-brand-secondary mt-2 text-xl font-bold tabular-nums">
                    {present}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-red-500" />
                    <span className="text-foreground/45 text-xs">Absent</span>
                  </div>
                  <p className="font-brand-secondary mt-2 text-xl font-bold tabular-nums">
                    {absent}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-secondary-500 size-2 rounded-full" />
                    <span className="text-foreground/45 text-xs">On Leave</span>
                  </div>
                  <p className="font-brand-secondary mt-2 text-xl font-bold tabular-nums">
                    {onLeave}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Attendance rate */}
        <div className="border-foreground/10 bg-background rounded-xl border p-5 @sm:col-span-3 @lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-brand-secondary text-sm font-bold">
                Attendance Rate
              </h3>

              <p className="text-foreground/45 mt-1 text-xs">
                Today's attendance percentage
              </p>
            </div>

            <div className="bg-accent-500/10 text-accent-700 flex size-9 items-center justify-center rounded-lg">
              <ArrowUpRight className="size-4" />
            </div>
          </div>

          <div className="mt-7 flex items-center gap-5">
            <div
              className="relative flex size-24 shrink-0 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(
                  var(--color-accent-500) ${attendancePercentage}%,
                  var(--color-muted) ${attendancePercentage}%
                )`,
              }}
            >
              <div className="bg-background flex size-19 items-center justify-center rounded-full">
                <span className="font-brand-secondary text-lg font-bold tabular-nums">
                  {attendancePercentage.toFixed(1)}%
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold">Today's performance</p>

              <p className="text-foreground/45 mt-1 text-xs leading-5">
                {present} out of {totalUser} employees present.
              </p>
            </div>
          </div>

          <div className="border-foreground/10 mt-6 flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2">
              <Clock3 className="text-foreground/40 size-4" />
              <span className="text-foreground/50 text-xs">Late Arrivals</span>
            </div>

            <span className="text-sm font-bold tabular-nums">--</span>
          </div>

          <div className="border-foreground/10 mt-3 flex items-center justify-between border-t pt-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="text-foreground/40 size-4" />
              <span className="text-foreground/50 text-xs">
                Pending Check-outs
              </span>
            </div>

            <span className="text-sm font-bold tabular-nums">--</span>
          </div>
        </div>
      </div>
    </section>
  );
}
