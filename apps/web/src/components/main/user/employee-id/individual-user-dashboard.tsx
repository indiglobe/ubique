import * as React from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Mail,
  MapPin,
  MoreHorizontal,
  Pencil,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@repo/ui/button";
import { Badge } from "@repo/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { Separator } from "@repo/ui/separator";
import {
  SummaryMetric,
  SummaryMetricContent,
  SummaryMetricIcon,
  SummaryMetricLabel,
  SummaryMetricValue,
} from "./individual-user/page.ui";

// --------------------------------------------------
// Static mock data — replace with route/query data later
// --------------------------------------------------

const user = {
  id: "USR-000142",
  name: "Ananya Sharma",
  role: "MR",
  designation: "Medical Representative",
  employeeCode: "MR-2026-0142",
  status: "UNDER_VERIFICATION",
  organizationId: "ORG-000001",
  email: "ananya.sharma@example.com",
  phone: "+91 98765 43210",
  alternatePhone: "+91 91234 56780",
  dateOfBirth: "1998-04-18",
  joiningDate: "2024-06-10",
  address: "Kolkata, West Bengal, India",
  lastLoginAt: "2026-10-28T09:42:00",
  reportingManager: {
    name: "Rajesh Mukherjee",
    role: "Zonal Sales Manager",
    employeeCode: "ZSM-2024-0008",
  },
  educationalQualifications: [
    {
      id: "EDQF-001",
      qualification: "B.Sc. — Chemistry",
      institution: "University of Calcutta",
      year: "2019",
    },
    {
      id: "EDQF-002",
      qualification: "MBA — Marketing",
      institution: "West Bengal State University",
      year: "2021",
    },
  ],
  professionalQualifications: [
    {
      id: "PRQF-001",
      qualification: "Medical Representative Training",
      issuer: "Internal Training Program",
      year: "2022",
    },
    {
      id: "PRQF-002",
      qualification: "Pharmaceutical Sales Certification",
      issuer: "Professional Certification",
      year: "2023",
    },
  ],
};

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}

// --------------------------------------------------
// Small reusable UI primitives
// --------------------------------------------------

function SectionHeading({
  icon: Icon,
  title,
  description,
  tone = "primary",
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  tone?: "primary" | "secondary" | "accent";
}) {
  const toneClasses = {
    primary: "bg-primary/10 text-primary ring-primary/10",
    secondary: "bg-secondary/10 text-secondary-700 ring-secondary/15",
    accent: "bg-accent/20 text-accent-800 ring-accent/20",
  };

  return (
    <div className="flex items-start gap-3">
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-md ring-1 ${toneClasses[tone]}`}
      >
        <Icon className="size-4.75" />
      </div>

      <div className="min-w-0 pt-0.5">
        <CardTitle className="font-brand-secondary text-sm font-bold tracking-tight">
          {title}
        </CardTitle>
        <CardDescription className="mt-1 text-xs leading-relaxed">
          {description}
        </CardDescription>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="group border-border hover:border-primary min-w-0 border-l-2 py-0.5 pl-3 transition-colors">
      <p className="text-muted-foreground text-2.75 font-semibold tracking-wide uppercase">
        {label}
      </p>

      <div className="mt-1.5 flex items-start gap-2">
        {Icon && (
          <Icon className="text-muted-foreground mt-0.5 size-3.5 shrink-0" />
        )}

        <p className="text-foreground min-w-0 text-sm leading-relaxed font-medium wrap-break-word">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

// --------------------------------------------------
// Profile banner
// --------------------------------------------------

function ProfileHeader() {
  return (
    <Card className="bg-card ring-border/70 gap-0 overflow-hidden rounded-lg border-0 p-0 shadow-sm ring-1">
      {/* Colorful banner */}
      <div className="from-primary-950 via-primary-800 to-primary-600 relative isolate overflow-hidden bg-linear-to-br px-5 py-6 text-white sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-28 right-0 size-72 rounded-full border border-white/10" />
          <div className="absolute -top-16 right-8 size-52 rounded-full border border-white/10" />
          <div className="bg-primary-400/20 absolute -right-10 -bottom-36 size-72 rounded-full blur-2xl" />
          <div className="bg-secondary-400/15 absolute top-0 right-1/3 size-32 rounded-full blur-3xl" />
          <div className="from-primary-950/30 absolute inset-0 bg-linear-to-r via-transparent to-transparent" />
        </div>

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="relative w-fit shrink-0">
              <div className="font-brand-accent shadow-primary-950/20 flex size-24 items-center justify-center rounded-lg border border-white/30 bg-white/15 text-3xl font-bold text-white shadow-lg backdrop-blur-sm sm:size-28">
                {getInitials(user.name)}
              </div>

              <span
                className="border-primary-800 bg-accent-400 text-accent-950 absolute -right-2 -bottom-2 flex size-7 items-center justify-center rounded-md border-2 shadow-sm"
                title="Employee profile"
              >
                <CheckCircle2 className="size-4" />
              </span>
            </div>

            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge className="rounded-sm border border-white/20 bg-white/15 text-white hover:bg-white/20">
                  {user.role}
                </Badge>

                <Badge className="border-secondary-300/30 bg-secondary-400/20 text-secondary-100 hover:bg-secondary-400/25 rounded-sm border">
                  <Clock3 className="mr-1 size-3" />
                  {formatStatus(user.status)}
                </Badge>
              </div>

              <h1 className="font-brand-accent text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                {user.name}
              </h1>

              <p className="text-primary-100 mt-2 text-sm font-medium">
                {user.designation}
                <span className="mx-2 text-white/40">/</span>
                <span className="text-white/80">{user.employeeCode}</span>
              </p>

              <div className="mt-4 flex flex-col gap-2 text-sm text-white/80 sm:flex-row sm:flex-wrap sm:gap-x-5">
                <a
                  href={`mailto:${user.email}`}
                  className="flex min-w-0 items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="text-primary-200 size-4 shrink-0" />
                  <span className="break-all">{user.email}</span>
                </a>

                <a
                  href={`tel:${user.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="text-primary-200 size-4 shrink-0" />
                  {user.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-9 rounded-md border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <a href={`mailto:${user.email}`}>
                <Mail className="mr-2 size-4" />
                Contact
              </a>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="size-9 rounded-md border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              aria-label="More profile actions"
              onClick={() => {
                // TODO: Add additional actions.
              }}
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick overview */}
      <QuickOverview />
    </Card>
  );
}

// --------------------------------------------------
// Personal information
// --------------------------------------------------

function PersonalInformation() {
  return (
    <Card className="border-border/70 gap-0 overflow-hidden rounded-lg py-0 shadow-sm transition-shadow hover:shadow-md">
      <div className="from-primary-500 via-primary-300 h-1 bg-linear-to-r to-transparent" />

      <CardHeader className="flex flex-row items-start justify-between gap-3 px-5 pt-5 pb-4">
        <SectionHeading
          icon={UserRound}
          title="Personal information"
          description="Personal details and contact information"
        />

        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-primary size-8 shrink-0 rounded-md"
          aria-label="Edit personal information"
          onClick={() => {
            // TODO: Open personal information editor.
          }}
        >
          <Pencil className="size-3.5" />
        </Button>
      </CardHeader>

      <CardContent className="px-5 pt-2 pb-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
          <Detail label="Full name" value={user.name} icon={UserRound} />
          <Detail
            label="Date of birth"
            value={formatDate(user.dateOfBirth)}
            icon={CalendarDays}
          />
          <Detail label="Email address" value={user.email} icon={Mail} />
          <Detail label="Primary phone" value={user.phone} icon={Phone} />
          <Detail
            label="Alternate phone"
            value={user.alternatePhone}
            icon={Phone}
          />
          <Detail label="Location" value={user.address} icon={MapPin} />
        </div>
      </CardContent>
    </Card>
  );
}

// --------------------------------------------------
// Employment details
// --------------------------------------------------

function EmploymentDetails() {
  return (
    <Card className="border-border/70 gap-0 overflow-hidden rounded-lg py-0 shadow-sm transition-shadow hover:shadow-md">
      <div className="from-secondary-500 via-secondary-300 h-1 bg-linear-to-r to-transparent" />

      <CardHeader className="px-5 pt-5 pb-4">
        <SectionHeading
          icon={BriefcaseBusiness}
          title="Employment details"
          description="Organization, role and reporting structure"
          tone="secondary"
        />
      </CardHeader>

      <CardContent className="px-5 pt-2 pb-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
          <Detail label="Employee code" value={user.employeeCode} />
          <Detail label="Role" value={`${user.designation} (${user.role})`} />
          <Detail label="Joining date" value={formatDate(user.joiningDate)} />
          <Detail label="Account status" value={formatStatus(user.status)} />
          <Detail label="Organization ID" value={user.organizationId} />
          <Detail label="Last login" value={formatDateTime(user.lastLoginAt)} />
        </div>

        <Separator className="my-6" />

        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-muted-foreground text-2.75 font-bold tracking-wider uppercase">
            Reporting manager
          </p>

          <Badge
            variant="outline"
            className="border-primary/20 bg-primary/5 text-primary rounded-sm"
          >
            <Users className="mr-1 size-3" />
            Direct manager
          </Badge>
        </div>

        <div className="group border-border/70 bg-muted/30 hover:border-primary/30 hover:bg-primary/3 relative flex items-center gap-3 overflow-hidden rounded-md border p-3 transition-colors">
          <div className="bg-secondary-400 absolute inset-y-0 left-0 w-1" />

          <div className="bg-secondary/15 font-brand-accent text-secondary-800 ml-1 flex size-11 shrink-0 items-center justify-center rounded-md text-sm font-bold">
            {getInitials(user.reportingManager.name)}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              {user.reportingManager.name}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {user.reportingManager.role}
            </p>
            <p className="text-muted-foreground text-2.75 mt-1">
              {user.reportingManager.employeeCode}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground group-hover:text-primary size-8 shrink-0 rounded-md"
            aria-label="View reporting manager"
            onClick={() => {
              // TODO: Navigate to the reporting manager's profile.
            }}
          >
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// --------------------------------------------------
// Qualification cards
// --------------------------------------------------

function Qualifications() {
  return (
    <>
      <Card className="border-border/70 gap-0 overflow-hidden rounded-lg py-0 shadow-sm transition-shadow hover:shadow-md">
        <div className="from-accent-500 via-accent-300 h-1 bg-linear-to-r to-transparent" />

        <CardHeader className="flex flex-row items-start justify-between gap-3 px-5 pt-5 pb-4">
          <SectionHeading
            icon={GraduationCap}
            title="Educational qualifications"
            description={`${user.educationalQualifications.length} academic records`}
            tone="accent"
          />

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary h-8 shrink-0 rounded-md px-2 text-xs"
            onClick={() => {
              // TODO: Open education editor.
            }}
          >
            <Pencil className="mr-1.5 size-3.5" />
            Edit
          </Button>
        </CardHeader>

        <CardContent className="px-5 pt-2 pb-5">
          <div className="space-y-3">
            {user.educationalQualifications.map((item, index) => (
              <div
                key={item.id}
                className="group border-border/70 bg-muted/20 hover:border-accent-500/40 hover:bg-accent-500/4 relative flex items-start gap-3 overflow-hidden rounded-md border p-3 transition-all"
              >
                <div className="bg-accent-500/60 absolute inset-y-0 left-0 w-0.5 transition-all group-hover:w-1" />

                <div className="bg-accent/20 text-accent-800 flex size-10 shrink-0 items-center justify-center rounded-md">
                  <GraduationCap className="size-4.5" />
                </div>

                <div className="min-w-0 flex-1 py-0.5">
                  <p className="text-sm leading-snug font-semibold">
                    {item.qualification}
                  </p>
                  <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                    {item.institution}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="border-accent-500/25 bg-accent-500/10 text-accent-800 text-2.5 rounded-sm px-1.5 py-0"
                    >
                      Completed {item.year}
                    </Badge>
                    <span className="text-muted-foreground text-2.5">
                      Record {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <CheckCircle2 className="text-accent-700 mt-1 size-4 shrink-0" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/70 gap-0 overflow-hidden rounded-lg py-0 shadow-sm transition-shadow hover:shadow-md">
        <div className="from-secondary-500 via-secondary-300 h-1 bg-linear-to-r to-transparent" />

        <CardHeader className="flex flex-row items-start justify-between gap-3 px-5 pt-5 pb-4">
          <SectionHeading
            icon={ShieldCheck}
            title="Professional qualifications"
            description={`${user.professionalQualifications.length} training and certification records`}
            tone="secondary"
          />

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary h-8 shrink-0 rounded-md px-2 text-xs"
            onClick={() => {
              // TODO: Open professional qualification editor.
            }}
          >
            <Pencil className="mr-1.5 size-3.5" />
            Edit
          </Button>
        </CardHeader>

        <CardContent className="px-5 pt-2 pb-5">
          <div className="space-y-3">
            {user.professionalQualifications.map((item, index) => (
              <div
                key={item.id}
                className="group border-border/70 bg-muted/20 hover:border-secondary-500/40 hover:bg-secondary-500/4 relative flex items-start gap-3 overflow-hidden rounded-md border p-3 transition-all"
              >
                <div className="bg-secondary-500/60 absolute inset-y-0 left-0 w-0.5 transition-all group-hover:w-1" />

                <div className="bg-secondary/15 text-secondary-800 flex size-10 shrink-0 items-center justify-center rounded-md">
                  <ShieldCheck className="size-4.5" />
                </div>

                <div className="min-w-0 flex-1 py-0.5">
                  <p className="text-sm leading-snug font-semibold">
                    {item.qualification}
                  </p>
                  <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                    {item.issuer}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="border-secondary-500/25 bg-secondary-500/10 text-secondary-800 text-2.5 rounded-sm px-1.5 py-0"
                    >
                      Completed {item.year}
                    </Badge>
                    <span className="text-muted-foreground text-2.5">
                      Record {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <CheckCircle2 className="text-primary mt-1 size-4 shrink-0" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

// --------------------------------------------------
// Page
// --------------------------------------------------

function PageHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-3 flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => navigate({ to: "/dashboard/user" })}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Users
          </button>

          <span className="text-muted-foreground/50">/</span>

          <span className="text-foreground font-semibold">
            Employee profile
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-md">
            <Sparkles className="size-4" />
          </div>

          <div>
            <h2 className="font-brand-secondary text-xl font-bold tracking-tight sm:text-2xl">
              Employee overview
            </h2>
            <p className="text-muted-foreground mt-1 text-xs">
              View profile, employment and qualification details.
            </p>
          </div>
        </div>
      </div>

      <div className="border-border/70 bg-card/80 flex items-center gap-2 self-start rounded-md border px-3 py-2 text-xs sm:self-auto">
        <span className="bg-secondary-500 size-2 rounded-full" />
        <span className="text-muted-foreground">Profile ID</span>
        <span className="font-semibold">{user.id}</span>
      </div>
    </div>
  );
}

export function IndividualUserDashboard() {
  const navigate = useNavigate();

  return (
    <main className="bg-background text-foreground relative min-h-screen overflow-hidden">
      {/* Subtle page ambience */}
      <div className="from-primary/5.5 via-primary/2 pointer-events-none absolute inset-x-0 top-0 h-80 bg-linear-to-b to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Breadcrumb and page context */}
        <PageHeader />

        <ProfileHeader />

        {/* Main information grid */}
        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
          <PersonalInformation />
          <EmploymentDetails />
          <Qualifications />
        </div>

        {/* Navigation */}
        <div className="border-border/70 flex items-center justify-between border-t pt-5">
          <Button
            variant="outline"
            size="sm"
            className="bg-card h-9 rounded-md"
            onClick={() => navigate({ to: "/dashboard/user" })}
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to users
          </Button>

          <p className="text-muted-foreground text-2.75 hidden sm:block">
            Employee record · {user.employeeCode}
          </p>
        </div>
      </div>
    </main>
  );
}

function QuickOverview() {
  return (
    <CardContent className="bg-card grid gap-5 px-5 py-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
      <SummaryMetric tone="primary">
        <SummaryMetricIcon>
          <BriefcaseBusiness className="size-4" />
        </SummaryMetricIcon>
        <SummaryMetricContent>
          <SummaryMetricLabel>Designation</SummaryMetricLabel>
          <SummaryMetricValue>{user.designation}</SummaryMetricValue>
        </SummaryMetricContent>
      </SummaryMetric>

      <SummaryMetric tone="secondary">
        <SummaryMetricIcon>
          <CalendarDays className="size-4" />
        </SummaryMetricIcon>
        <SummaryMetricContent>
          <SummaryMetricLabel>Date of joining</SummaryMetricLabel>
          <SummaryMetricValue>
            {formatDate(user.joiningDate)}
          </SummaryMetricValue>
        </SummaryMetricContent>
      </SummaryMetric>

      <SummaryMetric tone="accent">
        <SummaryMetricIcon>
          <Users className="size-4" />
        </SummaryMetricIcon>
        <SummaryMetricContent>
          <SummaryMetricLabel>Reporting manager</SummaryMetricLabel>
          <SummaryMetricValue>{user.reportingManager.name}</SummaryMetricValue>
        </SummaryMetricContent>
      </SummaryMetric>
    </CardContent>
  );
}
