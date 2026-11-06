import {
  AlertCircle,
  ArrowUpRight,
  Ban,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  CircleMinus,
  Clock,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  MoreHorizontal,
  Pencil,
  Phone,
  ShieldCheck,
  Trash2,
  User,
  UserRound,
  UserRoundX,
  Users,
} from "lucide-react";
import { useNavigate, useLoaderData, useRouter } from "@tanstack/react-router";
import { Button } from "@repo/ui/button";
import { Badge } from "@repo/ui/badge";
import { Card, CardContent } from "@repo/ui/card";
import { Separator } from "@repo/ui/separator";
import {
  SummaryMetric,
  SummaryMetricContent,
  SummaryMetricIcon,
  SummaryMetricLabel,
  SummaryMetricValue,
  ProfileHeader,
  ProfileHeaderActions,
  ProfileHeaderContent,
  ProfileHeaderIdentity,
  ProfileHeaderAvatar,
  ProfileHeaderDetails,
  ProfileHeaderName,
  ProfileHeaderSubtitle,
  ProfileHeaderMeta,
  ProfileHeaderContact,
  ProfileHeaderContactButton,
  ProfileSection,
  ProfileSectionHeader,
  ProfileSectionHeading,
  ProfileSectionAction,
  ProfileSectionContent,
  ProfileDetailGrid,
  ProfileDetail,
  ProfileDetailValue,
  ProfileManager,
  ProfileManagerAvatar,
  ProfileManagerContent,
  ProfileManagerName,
  ProfileManagerRole,
  ProfileRecord,
  ProfileRecordContent,
  ProfileRecordDescription,
  ProfileRecordIcon,
  ProfileRecordList,
  ProfileRecordMeta,
  ProfileRecordTitle,
} from "../employee-overview.ui";
import { useReadOneEmployeeProfileOfUserId } from "@/integrations/tanstack/react-query/employee-profile-query/super-admin.rq";
import { roleToDesignationMapper } from "@repo/utils/const/roles";
import { formatDate, formatDateTime } from "@repo/utils/date";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/dialog";
import { cn } from "@repo/styles/cn";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import { USER_STATUS } from "@repo/utils/db-enums";
import { useState, useEffect } from "react";
import {
  useReadOneUserWithUserId,
  useUpdateOneUser,
} from "@/integrations/tanstack/react-query/user-query/super-admin.rq";
import { sentenceCase } from "es-toolkit/string";
import { getInitials } from "@repo/utils";

const static_user = {
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

export function IndividualUserDashboard() {
  return (
    <div className="bg-background text-foreground relative min-h-screen overflow-hidden">
      {/* Subtle page ambience */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 " />

      <div className="relative mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Breadcrumb and page context */}
        <PageHeader />

        <UserProfileOverView />

        {/* Main information grid */}
        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
          <PersonalInformation />
          <EmploymentDetails />
          <Qualifications />
        </div>
      </div>
    </div>
  );
}

function PageHeader() {
  const navigate = useNavigate();
  const { employeeDetails } = useLoaderData({
    from: "/(authenticated-routes)/dashboard/user/$employeeId/",
  });

  const { id } = employeeDetails;

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
            <User className="size-4" />
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
        <span className="font-semibold">{id}</span>
      </div>
    </div>
  );
}

function UserProfileOverView() {
  const { employeeDetails } = useLoaderData({
    from: "/(authenticated-routes)/dashboard/user/$employeeId/",
  });

  return (
    <Card className="bg-card ring-border/70 gap-0 overflow-hidden rounded-lg border-0 p-0 shadow-sm ring-1">
      <ProfileHeader size="default" verified={employeeDetails.status}>
        <ProfileHeaderContent>
          <ProfileHeaderIdentity>
            <ProfileHeaderAvatar initials={getInitials(employeeDetails.name)} />

            <ProfileHeaderDetails>
              <ProfileHeaderName>{employeeDetails.name}</ProfileHeaderName>

              <ProfileHeaderSubtitle>
                {employeeDetails.role}
                <span className="mx-2 text-white/40">/</span>
                <span className="text-white/80">
                  {employeeDetails.employeeCode}
                </span>
              </ProfileHeaderSubtitle>

              <ProfileHeaderMeta>
                <ProfileHeaderContact
                  type="email"
                  href={`mailto:${employeeDetails.email}`}
                >
                  <span className="break-all">{employeeDetails.email}</span>
                </ProfileHeaderContact>

                <ProfileHeaderContact
                  type="phone"
                  href={`tel:${employeeDetails.phone.replace(/[^\d+]/g, "")}`}
                >
                  {employeeDetails.phone}
                </ProfileHeaderContact>
              </ProfileHeaderMeta>
            </ProfileHeaderDetails>
          </ProfileHeaderIdentity>

          <ProfileHeaderActions>
            <ProfileHeaderContactButton>
              <a href={`mailto:${employeeDetails.email}`}>
                <Mail className="mr-2 size-4" />
                Contact
              </a>
            </ProfileHeaderContactButton>

            <ProfileStatusTogglingButton />
          </ProfileHeaderActions>
        </ProfileHeaderContent>
      </ProfileHeader>

      {/* Quick overview */}
      <QuickOverview />
    </Card>
  );
}

type UserStatus = (typeof USER_STATUS)[number];

const profileStatusConfig = {
  ACTIVE: {
    label: "Active",
    description: "User account is active and can access the platform.",
    icon: CheckCircle2,
    className:
      "border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  INACTIVE: {
    label: "Inactive",
    description: "User account is currently inactive.",
    icon: CircleMinus,
    className:
      "border-gray-300 bg-gray-100 text-gray-600 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-400",
  },
  SUSPENDED: {
    label: "Suspended",
    description: "User account access has been temporarily restricted.",
    icon: Ban,
    className:
      "border-red-300 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-950/60 dark:text-red-400",
  },
  UNDER_VERIFICATION: {
    label: "Under Verification",
    description: "User account is awaiting verification.",
    icon: Clock,
    className:
      "border-amber-300 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-400",
  },
  DELETED: {
    label: "Deleted",
    description: "User account has been marked as deleted.",
    icon: Trash2,
    className:
      "border-slate-300 bg-slate-200 text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-400",
  },
} satisfies Record<
  UserStatus,
  {
    label: string;
    description: string;
    icon: React.ElementType;
    className: string;
  }
>;

function ProfileStatusTogglingButton() {
  const { employeeDetails } = useLoaderData({
    from: "/(authenticated-routes)/dashboard/user/$employeeId/",
  });
  const { status } = employeeDetails;

  const router = useRouter();

  const { mutateAsync: updateOneUser } = useUpdateOneUser();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<UserStatus>(status);

  useEffect(() => {
    if (isDialogOpen) {
      setSelectedStatus(status);
    }
  }, [isDialogOpen, status]);

  const currentStatusConfig = profileStatusConfig[status];
  const selectedStatusConfig = profileStatusConfig[selectedStatus];

  const SelectedIcon = selectedStatusConfig.icon;

  const handleUpdate = async () => {
    if (selectedStatus === status) {
      setIsDialogOpen(false);
      return;
    }

    await updateOneUser({
      data: {
        identifier: { id: employeeDetails.id },
        dataToUpdate: { status: selectedStatus },
      },
    });

    router.invalidate();
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {/* Trigger */}
      <Button
        data-slot="profile-header-more-button"
        variant="outline"
        size="icon"
        aria-label="More profile actions"
        className={cn(
          "size-9 rounded-md border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white",
        )}
        asChild
      >
        <DialogTrigger>
          <MoreHorizontal className="size-4" />
        </DialogTrigger>
      </Button>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Profile Status</DialogTitle>

          <DialogDescription>
            Update the user's account status. Changes will be applied once you
            confirm.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-foreground/50 text-xs font-medium">
              CURRENT STATUS
            </p>

            <div
              className={cn(
                "flex w-fit items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium",
                currentStatusConfig.className,
              )}
            >
              <currentStatusConfig.icon className="size-4" />
              {currentStatusConfig.label}
            </div>
          </div>

          {/* New Status */}
          <div className="space-y-2">
            <label
              htmlFor="profile-status"
              className="text-foreground text-sm font-medium"
            >
              New Status
            </label>

            <Select
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value as UserStatus)}
            >
              <SelectTrigger id="profile-status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {USER_STATUS.map((item) => {
                    const config = profileStatusConfig[item];
                    const Icon = config.icon;

                    return (
                      <SelectItem key={item} value={item}>
                        <span className="flex items-center gap-2">
                          <Icon
                            className={cn(
                              "size-4",
                              config.className
                                .split(" ")
                                .filter((c) => c.startsWith("text-")),
                            )}
                          />
                          {config.label}
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Selected Status Preview */}
          <div
            className={cn(
              "flex items-start gap-3 rounded-lg border p-3",
              "border-foreground/10 bg-foreground/2.5",
            )}
          >
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-md border",
                selectedStatusConfig.className,
              )}
            >
              <SelectedIcon className="size-4" />
            </div>

            <div className="min-w-0 space-y-1">
              <p className="text-foreground text-sm font-medium">
                {selectedStatusConfig.label}
              </p>

              <p className="text-foreground/55 text-xs leading-relaxed">
                {selectedStatusConfig.description}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className={cn(`sm:justify-between`)}>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleUpdate}
            disabled={selectedStatus === status}
          >
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function QuickOverview() {
  const { employeeDetails } = useLoaderData({
    from: "/(authenticated-routes)/dashboard/user/$employeeId/",
  });

  const { data: userProfile, status: userProfileFetchingStatus } =
    useReadOneEmployeeProfileOfUserId(employeeDetails.id);

  return (
    <CardContent className="bg-card grid gap-5 px-5 py-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
      <SummaryMetric tone="primary">
        <SummaryMetricIcon>
          <BriefcaseBusiness className="size-4" />
        </SummaryMetricIcon>
        <SummaryMetricContent>
          <SummaryMetricLabel>Designation</SummaryMetricLabel>
          <SummaryMetricValue>
            {roleToDesignationMapper.get(employeeDetails.role)}
          </SummaryMetricValue>
        </SummaryMetricContent>
      </SummaryMetric>

      <SummaryMetric tone="secondary">
        <SummaryMetricIcon>
          <CalendarDays className="size-4" />
        </SummaryMetricIcon>

        <SummaryMetricContent>
          <SummaryMetricLabel>Date of joining</SummaryMetricLabel>

          <SummaryMetricValue>
            {userProfileFetchingStatus === "pending" && (
              <span className="bg-muted inline-block h-4 w-28 animate-pulse rounded-xs" />
            )}

            {userProfileFetchingStatus === "error" && (
              <span className="text-destructive flex items-center gap-1.5 text-sm font-normal">
                <AlertCircle className="size-3.5" />
                Failed to load
              </span>
            )}

            {userProfileFetchingStatus === "success" && (
              <span className="text-foreground">
                {formatDate(userProfile!.joiningDate)}
              </span>
            )}
          </SummaryMetricValue>
        </SummaryMetricContent>
      </SummaryMetric>

      <SummaryMetric tone="accent">
        <SummaryMetricIcon>
          <Users className="size-4" />
        </SummaryMetricIcon>
        <SummaryMetricContent>
          <SummaryMetricLabel>Reporting manager</SummaryMetricLabel>
          <SummaryMetricValue>
            {employeeDetails.manager ? employeeDetails.manager.name : "N/A"}
          </SummaryMetricValue>
        </SummaryMetricContent>
      </SummaryMetric>
    </CardContent>
  );
}

function PersonalInformation() {
  const { employeeDetails } = useLoaderData({
    from: "/(authenticated-routes)/dashboard/user/$employeeId/",
  });

  const { status: userProfileFetchingStatus, data: userProfileData } =
    useReadOneEmployeeProfileOfUserId(employeeDetails.id);

  return (
    <ProfileSection>
      <ProfileSectionHeader>
        <ProfileSectionHeading
          icon={UserRound}
          title="Personal information"
          description="Personal details and contact information"
        />

        <ProfileSectionAction>
          <Button variant="ghost" size="icon" className="size-8">
            <Pencil className="size-4" />
          </Button>
        </ProfileSectionAction>
      </ProfileSectionHeader>

      <ProfileSectionContent>
        <ProfileDetailGrid>
          <ProfileDetail label="Full name">
            <UserRound className="text-muted-foreground size-3.5 shrink-0" />
            {/* <ProfileDetailIcon as={UserRound} /> */}
            <ProfileDetailValue>{employeeDetails.name}</ProfileDetailValue>
          </ProfileDetail>

          <ProfileDetail label="Date of birth">
            <CalendarDays className="text-muted-foreground size-3.5 shrink-0" />
            <ProfileDetailValue>
              {userProfileFetchingStatus === "pending" && (
                <span className="bg-muted mt-1 inline-block h-4 w-28 animate-pulse rounded-xs" />
              )}

              {userProfileFetchingStatus === "error" && (
                <span className="text-destructive flex items-center gap-1.5 text-sm font-normal">
                  <AlertCircle className="size-3.5" />
                  Failed to load
                </span>
              )}

              {userProfileFetchingStatus === "success" &&
                formatDate(new Date(userProfileData!.dateOfBirth))}
            </ProfileDetailValue>
          </ProfileDetail>

          <ProfileDetail label="Email address">
            <Mail className="text-muted-foreground size-3.5 shrink-0" />
            <ProfileDetailValue>{employeeDetails.email}</ProfileDetailValue>
          </ProfileDetail>

          <ProfileDetail label="Primary phone">
            <Phone className="text-muted-foreground size-3.5 shrink-0" />
            <ProfileDetailValue>{employeeDetails.phone}</ProfileDetailValue>
          </ProfileDetail>

          <ProfileDetail label="Alternate phone">
            <Phone className="text-muted-foreground size-3.5 shrink-0" />
            <ProfileDetailValue>
              {userProfileFetchingStatus === "pending" && (
                <span className="bg-muted mt-1 inline-block h-4 w-28 animate-pulse rounded-xs" />
              )}

              {userProfileFetchingStatus === "error" && (
                <span className="text-destructive flex items-center gap-1.5 text-sm font-normal">
                  <AlertCircle className="size-3.5" />
                  Failed to load
                </span>
              )}

              {userProfileFetchingStatus === "success" &&
                (userProfileData!.alternatePhone ?? "Not provided")}
            </ProfileDetailValue>
          </ProfileDetail>

          <ProfileDetail label="Location">
            <MapPin className="text-muted-foreground size-3.5 shrink-0" />
            <ProfileDetailValue>{static_user.address}</ProfileDetailValue>
          </ProfileDetail>
        </ProfileDetailGrid>
      </ProfileSectionContent>
    </ProfileSection>
  );
}

function EmploymentDetails() {
  const { employeeDetails } = useLoaderData({
    from: "/(authenticated-routes)/dashboard/user/$employeeId/",
  });

  const { status: userFetchingStatus, data: user } = useReadOneUserWithUserId(
    employeeDetails.id,
  );
  const { status: userProfileFetchingStatus, data: userProfileData } =
    useReadOneEmployeeProfileOfUserId(employeeDetails.id);

  const navigate = useNavigate();

  return (
    <ProfileSection tone="secondary">
      <ProfileSectionHeader>
        <ProfileSectionHeading
          icon={BriefcaseBusiness}
          title="Employment details"
          description="Organization, role and reporting structure"
        />
      </ProfileSectionHeader>

      <ProfileSectionContent>
        <ProfileDetailGrid>
          <ProfileDetail label="Employee code">
            <ProfileDetailValue>
              {employeeDetails.employeeCode}
            </ProfileDetailValue>
          </ProfileDetail>

          <ProfileDetail label="Role">
            <ProfileDetailValue>
              {roleToDesignationMapper.get(employeeDetails.role)}
            </ProfileDetailValue>
          </ProfileDetail>

          <ProfileDetail label="Joining date">
            <ProfileDetailValue>
              {userProfileFetchingStatus === "pending" && (
                <span className="bg-muted inline-block h-4 w-28 animate-pulse rounded-xs" />
              )}

              {userProfileFetchingStatus === "error" && (
                <span className="text-destructive flex items-center gap-1.5 text-sm font-normal">
                  <AlertCircle className="size-3.5" />
                  Failed to load
                </span>
              )}

              {userProfileFetchingStatus === "success" && (
                <span className="text-foreground">
                  {formatDate(userProfileData!.joiningDate)}
                </span>
              )}
            </ProfileDetailValue>
          </ProfileDetail>

          <ProfileDetail label="Account status">
            <ProfileDetailValue>
              {sentenceCase(employeeDetails.status)}
            </ProfileDetailValue>
          </ProfileDetail>

          <ProfileDetail label="Last login">
            <ProfileDetailValue>
              {employeeDetails.lastLoginAt
                ? formatDateTime(new Date(employeeDetails.lastLoginAt))
                : "Never"}
            </ProfileDetailValue>
          </ProfileDetail>
        </ProfileDetailGrid>

        <Separator className="my-6" />

        <div className="mb-3 flex items-center justify-between">
          <p className="text-muted-foreground text-xs font-semibold">
            Reporting manager
          </p>

          <Badge variant="outline" className="gap-1">
            <Users className="size-3" />
            Direct manager
          </Badge>
        </div>

        {userFetchingStatus === "pending" && (
          <ProfileManager>
            <ProfileManagerAvatar>
              <Loader2 className="text-muted-foreground size-5 animate-spin" />
            </ProfileManagerAvatar>

            <ProfileManagerContent>
              <ProfileManagerName className="text-muted-foreground">
                Loading manager...
              </ProfileManagerName>
              <ProfileManagerRole>
                Please wait while we fetch manager details.
              </ProfileManagerRole>
            </ProfileManagerContent>
          </ProfileManager>
        )}

        {userFetchingStatus === "error" && (
          <ProfileManager className="border-destructive/30 bg-destructive/5">
            <ProfileManagerAvatar className="bg-destructive/10 text-destructive">
              <AlertCircle className="size-5" />
            </ProfileManagerAvatar>

            <ProfileManagerContent>
              <ProfileManagerName className="text-destructive">
                Failed to load manager
              </ProfileManagerName>
              <ProfileManagerRole>
                Something went wrong while fetching manager details. Please try
                again.
              </ProfileManagerRole>
            </ProfileManagerContent>
          </ProfileManager>
        )}

        {userFetchingStatus === "success" && (
          <>
            {user?.manager ? (
              <ProfileManager>
                <ProfileManagerAvatar>
                  {getInitials(user.manager.name)}
                </ProfileManagerAvatar>

                <ProfileManagerContent>
                  <ProfileManagerName>{user.manager.name}</ProfileManagerName>

                  <ProfileManagerRole>
                    {roleToDesignationMapper.get(user.manager.role)}
                  </ProfileManagerRole>

                  <p className="text-muted-foreground mt-1 text-xs">
                    {user.manager.employeeCode}
                  </p>
                </ProfileManagerContent>

                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0"
                  onClick={() =>
                    navigate({
                      to: "/dashboard/user/$employeeId",
                      params: {
                        employeeId: user.manager!.employeeCode,
                      },
                    })
                  }
                >
                  <ArrowUpRight className="size-4" />
                </Button>
              </ProfileManager>
            ) : (
              <ProfileManager>
                <ProfileManagerAvatar className="bg-muted text-muted-foreground">
                  <UserRoundX className="size-5" />
                </ProfileManagerAvatar>

                <ProfileManagerContent>
                  <ProfileManagerName>No manager assigned</ProfileManagerName>
                  <ProfileManagerRole>
                    This employee currently has no reporting manager assigned.
                  </ProfileManagerRole>
                </ProfileManagerContent>
              </ProfileManager>
            )}
          </>
        )}
      </ProfileSectionContent>
    </ProfileSection>
  );
}

function Qualifications() {
  return (
    <>
      <ProfileSection tone="accent">
        <ProfileSectionHeader>
          <ProfileSectionHeading
            icon={GraduationCap}
            title="Educational qualifications"
            description={`${static_user.educationalQualifications.length} academic records`}
          />

          <ProfileSectionAction>
            <Button variant="ghost" size="sm">
              <Pencil className="mr-1.5 size-3.5" />
              Edit
            </Button>
          </ProfileSectionAction>
        </ProfileSectionHeader>

        <ProfileSectionContent>
          <ProfileRecordList>
            {static_user.educationalQualifications.map((item) => (
              <ProfileRecord key={item.id}>
                <ProfileRecordIcon>
                  <GraduationCap className="size-4" />
                </ProfileRecordIcon>

                <ProfileRecordContent>
                  <ProfileRecordTitle>{item.qualification}</ProfileRecordTitle>

                  <ProfileRecordDescription>
                    {item.institution}
                  </ProfileRecordDescription>

                  <ProfileRecordMeta>
                    <Badge variant="outline">Completed {item.year}</Badge>
                  </ProfileRecordMeta>
                </ProfileRecordContent>

                <CheckCircle2 className="text-muted-foreground mt-1 size-4 shrink-0" />
              </ProfileRecord>
            ))}
          </ProfileRecordList>
        </ProfileSectionContent>
      </ProfileSection>

      <ProfileSection tone="secondary">
        <ProfileSectionHeader>
          <ProfileSectionHeading
            icon={ShieldCheck}
            title="Professional qualifications"
            description={`${static_user.professionalQualifications.length} training and certification records`}
          />

          <ProfileSectionAction>
            <Button variant="ghost" size="sm">
              <Pencil className="mr-1.5 size-3.5" />
              Edit
            </Button>
          </ProfileSectionAction>
        </ProfileSectionHeader>

        <ProfileSectionContent>
          <ProfileRecordList>
            {static_user.professionalQualifications.map((item) => (
              <ProfileRecord key={item.id}>
                <ProfileRecordIcon>
                  <ShieldCheck className="size-4" />
                </ProfileRecordIcon>

                <ProfileRecordContent>
                  <ProfileRecordTitle>{item.qualification}</ProfileRecordTitle>

                  <ProfileRecordDescription>
                    {item.issuer}
                  </ProfileRecordDescription>

                  <ProfileRecordMeta>
                    <Badge variant="outline">Completed {item.year}</Badge>
                  </ProfileRecordMeta>
                </ProfileRecordContent>

                <CheckCircle2 className="text-muted-foreground mt-1 size-4 shrink-0" />
              </ProfileRecord>
            ))}
          </ProfileRecordList>
        </ProfileSectionContent>
      </ProfileSection>
    </>
  );
}
