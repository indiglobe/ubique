import z from "zod";
import {
  AlertCircle,
  AlertTriangle,
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
  MoreHorizontal,
  Pencil,
  Phone,
  Plus,
  RefreshCw,
  Trash,
  Trash2,
  User,
  UserRound,
  UserRoundPen,
  UserRoundX,
  Users,
  BriefcaseIcon,
  ChevronDown,
  X,
  UserRoundCheck,
} from "lucide-react";
import {
  useNavigate,
  useLoaderData,
  useRouter,
  useRouteContext,
  Link,
} from "@tanstack/react-router";
import { Button } from "@repo/ui/button";
import { Skeleton } from "@repo/ui/skeleton";
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
  ProfileRecordAction,
} from "../employee-overview.ui";
import {
  useReadOneEmployeeProfile,
  useUpdateEmployeeProfile,
} from "@/integrations/tanstack/react-query/employee-profile-query/super-admin.rq";
import { roleToDesignationMapper } from "@repo/utils/const/roles";
import { formatDate, formatDateTime } from "@repo/utils/date";
import {
  Dialog,
  DialogClose,
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
  useReadOneUser,
  useUpdateUser,
} from "@/integrations/tanstack/react-query/user-query/super-admin.rq";
import { sentenceCase } from "es-toolkit/string";
import { getInitials } from "@repo/utils";
import { hasPermission } from "@repo/utils/authorization";
import {
  useCreateEducationalQualification,
  useDeleteEducationalQualification,
  useReadAllEducationalQualification,
  useReadOneEducationalQualification,
  useUpdateEducationalQualification,
} from "@/integrations/tanstack/react-query/educational-qualification-query/super-admin.rq";
import {
  useCreateProfessionalQualification,
  useDeleteProfessionalQualification,
  useReadAllProfessionalQualification,
  useReadOneProfessionalQualification,
  useUpdateProfessionalQualification,
} from "@/integrations/tanstack/react-query/professional-qualification-query/super-admin.rq";
import { useForm } from "@tanstack/react-form";
import { Input } from "@repo/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/popover";
import { Calendar } from "@repo/ui/calendar";
import { format } from "date-fns";
import { update__OneUserSchema } from "@repo/data/validators/users";
import { update__OneEmployeeProfileSchema } from "@repo/data/validators/employee-profile";
import { toast } from "sonner";
import { tryCatch } from "@repo/utils/try-catch";

export function IndividualUserDashboard() {
  return (
    <div className="bg-background text-foreground relative min-h-screen overflow-hidden">
      {/* Subtle page ambience */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80" />

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
    from: "/(authenticated-routes)/dashboard/employee/$employeeId/",
  });

  const { id } = employeeDetails;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-3 flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => navigate({ to: "/dashboard/employee" })}
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
    from: "/(authenticated-routes)/dashboard/employee/$employeeId/",
  });

  return (
    <Card className="bg-card ring-border/70 gap-0 overflow-hidden rounded-lg border-0 p-0 shadow-sm ring-1">
      <ProfileHeader size="default" verified={employeeDetails.status}>
        <ProfileHeaderContent>
          <ProfileHeaderIdentity>
            <ProfileHeaderAvatar
              initials={getInitials(employeeDetails.name)}
              avatarLink={employeeDetails.profilePicture ?? ""}
            />

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
    from: "/(authenticated-routes)/dashboard/employee/$employeeId/",
  });
  const { status } = employeeDetails;

  const router = useRouter();

  const { mutateAsync: updateOneUser } = useUpdateUser();

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
        appearance="outline"
        variant="primary"
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
            appearance="ghost"
            variant="destructive"
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
    from: "/(authenticated-routes)/dashboard/employee/$employeeId/",
  });

  const { data: userProfile, status: userProfileFetchingStatus } =
    useReadOneEmployeeProfile({
      associatedUserId: employeeDetails.id,
    });

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
    from: "/(authenticated-routes)/dashboard/employee/$employeeId/",
  });
  const {
    userDetailsFromCookie: { role },
  } = useRouteContext({
    from: "/(authenticated-routes)/dashboard/employee/$employeeId/",
  });

  const { status: userProfileFetchingStatus, data: userProfileData } =
    useReadOneEmployeeProfile({
      associatedUserId: employeeDetails.id,
    });

  return (
    <ProfileSection>
      <ProfileSectionHeader>
        <ProfileSectionHeading
          icon={UserRound}
          title="Personal information"
          description="Personal details and contact information"
        />

        <ProfileSectionAction>
          {hasPermission({
            actionPermision: "update:user",
            role,
          }) && <EditEmployeeProfileDialog />}
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
        </ProfileDetailGrid>
      </ProfileSectionContent>
    </ProfileSection>
  );
}

function EmploymentDetails() {
  const { employeeDetails } = useLoaderData({
    from: "/(authenticated-routes)/dashboard/employee/$employeeId/",
  });
  const {
    userDetailsFromCookie: { role },
  } = useRouteContext({
    from: "/(authenticated-routes)/dashboard/employee/$employeeId/",
  });

  // const { status: userFetchingStatus, data: user } = useReadOneUserWithUserId(
  //   employeeDetails.id,
  // );
  const { status: userFetchingStatus, data: user } = useReadOneUser({
    id: employeeDetails.id,
  });
  const { status: userProfileFetchingStatus, data: userProfileData } =
    useReadOneEmployeeProfile({
      associatedUserId: employeeDetails.id,
    });

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
                {hasPermission({
                  actionPermision: "create:educational_qualification",
                  role,
                }) && (
                  <Button
                    appearance="ghost"
                    variant="primary"
                    size="icon"
                    className="size-8 shrink-0"
                  >
                    <UserRoundPen className="size-4" />
                  </Button>
                )}

                <Button
                  appearance="ghost"
                  variant="primary"
                  size="icon"
                  className="size-8 shrink-0"
                  asChild
                >
                  <Link
                    to="/dashboard/employee/$employeeId"
                    params={{ employeeId: employeeDetails.employeeCode }}
                    target="_bank"
                  >
                    <ArrowUpRight className="size-4" />
                  </Link>
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
  const {
    userDetailsFromCookie: { role },
  } = useRouteContext({
    from: "/(authenticated-routes)/dashboard/employee/$employeeId/",
  });
  const { employeeDetails } = useLoaderData({
    from: "/(authenticated-routes)/dashboard/employee/$employeeId/",
  });

  const {
    status: educationalQualificationFetchingStatus,
    data: educationalQualifications,
    refetch: refetchEducationalQualifications,
  } = useReadAllEducationalQualification({
    employeeCode: employeeDetails.employeeCode,
  });

  const {
    status: professionalQualificationFetchingStatus,
    data: professionalQualifications,
    refetch: refetchProfessionalQualifications,
  } = useReadAllProfessionalQualification({
    employeeCode: employeeDetails.employeeCode,
  });

  return (
    <>
      <ProfileSection
        tone="accent"
        data-qualification-section="Educational qualifications"
      >
        <ProfileSectionHeader>
          <ProfileSectionHeading
            icon={GraduationCap}
            title="Educational qualifications"
            description={`${educationalQualifications?.length ?? 0} academic records`}
          />

          <ProfileSectionAction>
            {hasPermission({
              actionPermision: "create:educational_qualification",
              role,
            }) && <AddEducationalQualificationButton />}
          </ProfileSectionAction>
        </ProfileSectionHeader>

        <ProfileSectionContent>
          <ProfileRecordList>
            {educationalQualificationFetchingStatus === "error" && (
              <div
                role="alert"
                className="border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center gap-2 rounded-lg border px-4 py-6 text-center"
              >
                <AlertCircle className="text-destructive size-7" />

                <p className="text-sm font-semibold">
                  Failed to load educational qualifications
                </p>

                <p className="text-muted-foreground text-xs">
                  Something went wrong. Please try again.
                </p>

                <Button
                  size="sm"
                  appearance="outline"
                  variant="warn"
                  onClick={() => refetchEducationalQualifications()}
                  className="mt-2"
                >
                  <RefreshCw className="mr-2 size-3.5" />
                  Try again
                </Button>
              </div>
            )}

            {educationalQualificationFetchingStatus === "pending" && (
              <>
                {Array.from({ length: 2 }).map((_, index) => (
                  <ProfileRecord key={index}>
                    <ProfileRecordIcon>
                      <Skeleton className="size-5 rounded" />
                    </ProfileRecordIcon>

                    <ProfileRecordContent>
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="mt-2 h-3 w-28" />
                      <Skeleton className="mt-2 h-5 w-24 rounded-full" />
                    </ProfileRecordContent>
                  </ProfileRecord>
                ))}
              </>
            )}

            {educationalQualificationFetchingStatus === "success" &&
              educationalQualifications?.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-6 text-center">
                  <GraduationCap className="text-muted-foreground size-7" />

                  <p className="text-sm font-semibold">
                    No educational qualifications found
                  </p>

                  <p className="text-muted-foreground text-xs">
                    Your educational qualifications will appear here.
                  </p>
                </div>
              )}

            {educationalQualifications &&
              educationalQualifications.length > 0 && (
                <>
                  {educationalQualifications.map((item) => (
                    <ProfileRecord key={item.id}>
                      <ProfileRecordIcon>
                        <GraduationCap className="size-4" />
                      </ProfileRecordIcon>

                      <ProfileRecordContent>
                        <ProfileRecordTitle>
                          {item.qualification}
                        </ProfileRecordTitle>

                        <ProfileRecordDescription>
                          {item.institution}
                        </ProfileRecordDescription>

                        <ProfileRecordMeta>
                          <Badge variant="outline">Completed {item.year}</Badge>
                        </ProfileRecordMeta>
                      </ProfileRecordContent>

                      <ProfileRecordAction>
                        {hasPermission({
                          actionPermision: "update:educational_qualification",
                          role,
                        }) && (
                          <EditEducationalQualificationButton
                            qualificationRecordId={item.id}
                          />
                        )}

                        {hasPermission({
                          actionPermision: "delete:educational_qualification",
                          role,
                        }) && (
                          <ConfirmEducationalQualificationDeletion
                            qualificationRecordId={item.id}
                          />
                        )}
                      </ProfileRecordAction>
                    </ProfileRecord>
                  ))}
                </>
              )}
          </ProfileRecordList>
        </ProfileSectionContent>
      </ProfileSection>

      <ProfileSection
        tone="secondary"
        data-qualification-section="Professional qualifications"
      >
        <ProfileSectionHeader>
          <ProfileSectionHeading
            icon={BriefcaseIcon}
            title="Professional qualifications"
            description={`${professionalQualifications?.length ?? 0} training and certification records`}
          />

          <ProfileSectionAction>
            {hasPermission({
              actionPermision: "create:professional_qualification",
              role,
            }) && <AddProfessionalQualificationButton />}
          </ProfileSectionAction>
        </ProfileSectionHeader>

        <ProfileSectionContent>
          <ProfileRecordList>
            {professionalQualificationFetchingStatus === "error" && (
              <div
                role="alert"
                className="border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center gap-2 rounded-lg border px-4 py-6 text-center"
              >
                <AlertCircle className="text-destructive size-7" />

                <p className="text-sm font-semibold">
                  Failed to load professional qualifications
                </p>

                <p className="text-muted-foreground text-xs">
                  Something went wrong. Please try again.
                </p>

                <Button
                  size="sm"
                  variant="warn"
                  appearance="outline"
                  onClick={() => refetchProfessionalQualifications()}
                  className="mt-2"
                >
                  <RefreshCw className="mr-2 size-3.5" />
                  Try again
                </Button>
              </div>
            )}

            {professionalQualificationFetchingStatus === "pending" && (
              <>
                {Array.from({ length: 2 }).map((_, index) => (
                  <ProfileRecord key={index}>
                    <ProfileRecordIcon>
                      <Skeleton className="size-5 rounded" />
                    </ProfileRecordIcon>

                    <ProfileRecordContent>
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="mt-2 h-3 w-28" />
                      <Skeleton className="mt-2 h-5 w-24 rounded-full" />
                    </ProfileRecordContent>
                  </ProfileRecord>
                ))}
              </>
            )}

            {professionalQualificationFetchingStatus === "success" &&
              professionalQualifications?.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-6 text-center">
                  <GraduationCap className="text-muted-foreground size-7" />

                  <p className="text-sm font-semibold">
                    No professional qualifications found
                  </p>

                  <p className="text-muted-foreground text-xs">
                    Your professional qualifications will appear here.
                  </p>
                </div>
              )}

            {professionalQualifications &&
              professionalQualifications.length > 0 && (
                <>
                  {professionalQualifications.map((item) => (
                    <ProfileRecord key={item.id}>
                      <ProfileRecordIcon>
                        <BriefcaseIcon className="size-4" />
                      </ProfileRecordIcon>

                      <ProfileRecordContent>
                        <ProfileRecordTitle>
                          {item.qualification}
                        </ProfileRecordTitle>

                        <ProfileRecordDescription>
                          {item.issuer}
                        </ProfileRecordDescription>

                        <ProfileRecordMeta>
                          <Badge variant="outline">Completed {item.year}</Badge>
                        </ProfileRecordMeta>
                      </ProfileRecordContent>

                      <ProfileRecordAction>
                        {hasPermission({
                          actionPermision: "update:professional_qualification",
                          role,
                        }) && (
                          <EditProfessionalQualificationButton
                            qualificationRecordId={item.id}
                          />
                        )}

                        {hasPermission({
                          actionPermision: "delete:professional_qualification",
                          role,
                        }) && (
                          <ConfirmProfessionalQualificationDeletion
                            qualificationRecordId={item.id}
                          />
                        )}
                      </ProfileRecordAction>
                    </ProfileRecord>
                  ))}
                </>
              )}
          </ProfileRecordList>
        </ProfileSectionContent>
      </ProfileSection>
    </>
  );
}

function ConfirmEducationalQualificationDeletion({
  qualificationRecordId,
}: {
  qualificationRecordId: string;
}) {
  const {
    mutateAsync: deleteEducationalQualification,
    isPending: isDeleteEducationalQualificationPending,
  } = useDeleteEducationalQualification();
  const {
    data: educationalQualification,
    status: educationalQualificationFetchingStatus,
  } = useReadOneEducationalQualification({ id: qualificationRecordId });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = async () => {
    await deleteEducationalQualification({
      data: { identifier: { id: qualificationRecordId } },
    });
    toast.custom(() => <ToastMessageForQualificationDeletionSuccess />);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Button
        type="button"
        appearance="ghost"
        variant="destructive"
        size="icon"
        aria-label="Delete educational qualification"
        className=""
        asChild
      >
        <DialogTrigger>
          <Trash className="size-4" />
        </DialogTrigger>
      </Button>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-md border border-red-500/20 bg-red-500/10 text-red-500">
            <AlertTriangle className="size-5" />
          </div>

          <DialogTitle>Delete educational qualification?</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete this educational record? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="border-foreground/10 bg-foreground/3 flex items-start gap-3 rounded-lg border p-3">
          <div className="border-foreground/10 bg-background flex size-10 shrink-0 items-center justify-center rounded-md border">
            <GraduationCap className="text-foreground/60 size-5" />
          </div>

          {educationalQualificationFetchingStatus === "error" && (
            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-destructive text-sm font-semibold">
                Failed to load qualification
              </p>
              <p className="text-muted-foreground text-xs">
                Unable to fetch educational details. Please try again.
              </p>
            </div>
          )}

          {educationalQualificationFetchingStatus === "pending" && (
            <div className="min-w-0 flex-1 space-y-2 py-0.5">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-24" />
            </div>
          )}

          {educationalQualification && (
            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-foreground truncate text-sm font-semibold">
                {educationalQualification.qualification}
              </p>

              <p className="text-foreground/55 truncate text-xs">
                {educationalQualification.institution}
              </p>

              <p className="text-foreground/45 text-xs">
                Completed {educationalQualification.year}
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            appearance="ghost"
            variant="destructive"
            disabled={isDeleteEducationalQualificationPending}
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={isDeleteEducationalQualificationPending}
            onClick={handleDelete}
            className="text-white"
          >
            <Trash className="size-4" />
            {isDeleteEducationalQualificationPending
              ? "Deleting..."
              : "Yes, delete record"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ConfirmProfessionalQualificationDeletion({
  qualificationRecordId,
}: {
  qualificationRecordId: string;
}) {
  const {
    mutateAsync: deleteProfessionalQualification,
    isPending: isDeleteProfessionalQualificationPending,
  } = useDeleteProfessionalQualification();
  const {
    data: professionalQualification,
    status: professionalQualificationFetchingStatus,
  } = useReadOneProfessionalQualification({ id: qualificationRecordId });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = async () => {
    await deleteProfessionalQualification({
      data: { identifier: { id: qualificationRecordId } },
    });
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Button
        type="button"
        appearance="ghost"
        variant="destructive"
        size="icon"
        aria-label="Delete professional qualification"
        className=""
        asChild
      >
        <DialogTrigger>
          <Trash className="size-4" />
        </DialogTrigger>
      </Button>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-md border border-red-500/20 bg-red-500/10 text-red-500">
            <AlertTriangle className="size-5" />
          </div>

          <DialogTitle>Delete professional qualification?</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete this professional record? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="border-foreground/10 bg-foreground/3 flex items-start gap-3 rounded-lg border p-3">
          <div className="border-foreground/10 bg-background flex size-10 shrink-0 items-center justify-center rounded-md border">
            <GraduationCap className="text-foreground/60 size-5" />
          </div>

          {professionalQualificationFetchingStatus === "error" && (
            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-destructive text-sm font-semibold">
                Failed to load qualification
              </p>
              <p className="text-muted-foreground text-xs">
                Unable to fetch professional details. Please try again.
              </p>
            </div>
          )}

          {professionalQualificationFetchingStatus === "pending" && (
            <div className="min-w-0 flex-1 space-y-2 py-0.5">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-24" />
            </div>
          )}

          {professionalQualification && (
            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-foreground truncate text-sm font-semibold">
                {professionalQualification.qualification}
              </p>

              <p className="text-foreground/55 truncate text-xs">
                {professionalQualification.issuer}
              </p>

              <p className="text-foreground/45 text-xs">
                Completed {professionalQualification.year}
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            appearance="ghost"
            variant="destructive"
            disabled={isDeleteProfessionalQualificationPending}
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={isDeleteProfessionalQualificationPending}
            onClick={handleDelete}
            className="text-white"
          >
            <Trash className="size-4" />
            {isDeleteProfessionalQualificationPending
              ? "Deleting..."
              : "Yes, delete record"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ToastMessageForQualificationDeletionSuccess({
  message = "Selected qualification has been deleted successfully.",
  onClose,
}: {
  message?: string;
  onClose?: () => void;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "bg-background relative isolate flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-xl border border-red-500/20 p-4 shadow-lg shadow-red-950/5 after:absolute after:inset-0 after:-z-1 after:overflow-clip after:backdrop-blur-xs dark:border-red-500/25 dark:bg-red-950/80",
      )}
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-red-500" />

      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-600 dark:text-red-400">
        <UserRoundCheck className="size-5" />
      </div>

      <div className="min-w-0 flex-1 space-y-1 pt-0.5">
        <p className="text-sm font-semibold text-red-700 dark:text-red-300">
          Qualification deleted successfully
        </p>

        <p className="text-foreground/70 text-sm leading-relaxed">{message}</p>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-md",
            "text-foreground/45 transition-colors",
            "hover:bg-red-500/10 hover:text-red-600",
            "focus-visible:ring-2 focus-visible:ring-red-500/50 focus-visible:outline-none",
          )}
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

type TEditEmployeeProfileForm = {
  name: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  alternatePhone: string;
};

function EditEmployeeProfileDialog() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutateAsync: updateUser, isPending: isUpdateUserPending } =
    useUpdateUser();
  const { employeeDetails } = useLoaderData({
    from: "/(authenticated-routes)/dashboard/employee/$employeeId/",
  });
  const { data: employeeProfile } = useReadOneEmployeeProfile({
    associatedUserId: employeeDetails.id,
  });
  const {
    mutateAsync: updateEmployeeProfile,
    isPending: isUpdateEmployeeProfilePending,
  } = useUpdateEmployeeProfile();

  // form default values
  const defaultValues: TEditEmployeeProfileForm = {
    name: employeeDetails.name ?? "",
    dateOfBirth: employeeProfile?.dateOfBirth
      ? new Date(employeeProfile.dateOfBirth)
      : new Date(Date.now()),
    email: employeeDetails.email ?? "",
    phone: employeeDetails.phone ?? "",
    alternatePhone: employeeProfile?.alternatePhone ?? "",
  };

  const form = useForm({
    defaultValues: defaultValues,

    onSubmit: async ({ value }) => {
      const parsedUserDetails =
        update__OneUserSchema.shape.dataToUpdate.safeParse(value);
      const parsedEmployeeProfileDetails =
        update__OneEmployeeProfileSchema.shape.dataToUpdate.safeParse(value);

      if (parsedUserDetails.error || parsedEmployeeProfileDetails.error) {
        return;
      }

      const { data: updateableUserDetails } = parsedUserDetails;
      const { data: updateableEmployeeProfileDetails } =
        parsedEmployeeProfileDetails;

      if (Object.keys(updateableUserDetails).length > 0) {
        const [errorUpdatingUser] = await tryCatch(
          updateUser({
            data: {
              identifier: { employeeCode: employeeDetails.employeeCode },
              dataToUpdate: { ...updateableUserDetails },
            },
          }),
        );

        if (errorUpdatingUser) {
          toast.custom(() => <ToastMessageForProfileUpdateError />);
          return;
        }
      }

      if (Object.keys(updateableEmployeeProfileDetails).length > 0) {
        const [errorUpdatingEmployeeProfile] = await tryCatch(
          updateEmployeeProfile({
            data: {
              identifier: { associatedUserId: employeeDetails.id },
              dataToUpdate: { ...updateableEmployeeProfileDetails },
            },
          }),
        );

        if (errorUpdatingEmployeeProfile) {
          toast.custom(() => <ToastMessageForProfileUpdateError />);
          return;
        }
      }

      toast.custom(() => <ToastMessageForProfileUpdateSuccess />);

      router.invalidate();
      setIsDialogOpen(false);
    },
  });

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button appearance="ghost" variant="primary">
          <Pencil className="size-4" />
          <span>Edit</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="border-primary-500/20 bg-primary-500/10 text-primary-600 dark:text-primary-400 mb-2 flex size-11 items-center justify-center rounded-xl border">
            <UserRound className="size-5" />
          </div>

          <DialogTitle className="font-brand-secondary text-xl">
            Edit employee profile
          </DialogTitle>

          <DialogDescription>
            Update the employee's personal and contact information. Your changes
            will be saved once you submit the form.
          </DialogDescription>
        </DialogHeader>

        <form
          id="edit-employee-profile-form"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
          className="space-y-5"
        >
          <div className="space-y-4">
            <div className="border-foreground/10 flex items-center gap-2 border-b pb-2">
              <UserRound className="text-primary-500 size-4" />
              <h3 className="text-sm font-semibold">Personal information</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) =>
                    value.trim().length === 0
                      ? "Full name is required"
                      : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <label htmlFor={field.name} className="text-sm font-medium">
                      Full name <span className="text-red-500">*</span>
                    </label>

                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      placeholder="Enter full name"
                      className="h-11 rounded-md"
                    />

                    {field.state.meta.errors.map((error, index) => (
                      <p key={index} className="text-xs text-red-500">
                        {error}
                      </p>
                    ))}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="dateOfBirth"
                validators={{
                  onChange: ({ value }) =>
                    value > new Date()
                      ? "Date of birth cannot be in the future"
                      : undefined,
                }}
              >
                {(field) => {
                  const selectedDate = field.state.value
                    ? new Date(field.state.value)
                    : undefined;

                  return (
                    <div className="min-w-0 space-y-2">
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium"
                      >
                        Date of birth <span className="text-red-500">*</span>
                      </label>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id={field.name}
                            type="button"
                            appearance="outline"
                            variant="primary"
                            corner="rounded"
                            aria-invalid={field.state.meta.errors.length > 0}
                            className={cn(
                              "",
                              field.state.meta.errors.length > 0 &&
                                "border-red-500 focus-visible:ring-red-500/20",
                            )}
                            onBlur={field.handleBlur}
                          >
                            <span className="flex min-w-0 items-center gap-3">
                              <span className="bg-primary-500/10 text-primary-600 dark:text-primary-400 flex size-8 shrink-0 items-center justify-center rounded-md">
                                <CalendarDays className="size-4" />
                              </span>

                              <span
                                className={cn(
                                  "truncate text-sm",
                                  !selectedDate && "text-foreground/45",
                                )}
                              >
                                {selectedDate
                                  ? format(selectedDate, "MMMM dd, yyyy")
                                  : "Select date of birth"}
                              </span>
                            </span>

                            <ChevronDown className="text-foreground/40 size-4 shrink-0" />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent
                          align="start"
                          side="bottom"
                          sideOffset={8}
                          className="border-foreground/10 bg-background w-auto max-w-[calc(100vw-2rem)] rounded-xl border p-2 shadow-xl"
                        >
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                              if (date) {
                                field.handleChange(date);
                              }
                            }}
                            captionLayout="dropdown"
                            startMonth={new Date(1940, 0)}
                            endMonth={new Date()}
                            disabled={(date) => date > new Date()}
                            defaultMonth={selectedDate ?? new Date(2000, 0)}
                            autoFocus
                          />
                        </PopoverContent>
                      </Popover>

                      {field.state.meta.errors.map((error, index) => (
                        <p key={index} className="text-xs text-red-500">
                          {error}
                        </p>
                      ))}
                    </div>
                  );
                }}
              </form.Field>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-foreground/10 flex items-center gap-2 border-b pb-2">
              <Phone className="text-primary-500 size-4" />
              <h3 className="text-sm font-semibold">Contact information</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value.trim()
                      ? "Email address is required"
                      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                        ? "Enter a valid email address"
                        : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <label htmlFor={field.name} className="text-sm font-medium">
                      Email address <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Mail className="text-foreground/40 pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />

                      <Input
                        id={field.name}
                        type="email"
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        placeholder="employee@example.com"
                        className="h-11 rounded-md pl-10"
                      />
                    </div>

                    {field.state.meta.errors.map((error, index) => (
                      <p key={index} className="text-xs text-red-500">
                        {error}
                      </p>
                    ))}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="phone"
                validators={{
                  onChange: ({ value }) =>
                    !value.trim() ? "Primary phone is required" : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <label htmlFor={field.name} className="text-sm font-medium">
                      Primary phone <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Phone className="text-foreground/40 pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />

                      <Input
                        id={field.name}
                        type="tel"
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        placeholder="Enter primary phone"
                        className="h-11 rounded-md pl-10"
                      />
                    </div>

                    {field.state.meta.errors.map((error, index) => (
                      <p key={index} className="text-xs text-red-500">
                        {error}
                      </p>
                    ))}
                  </div>
                )}
              </form.Field>

              <form.Field name="alternatePhone">
                {(field) => (
                  <div className="space-y-2">
                    <label htmlFor={field.name} className="text-sm font-medium">
                      Alternate phone
                    </label>

                    <div className="relative">
                      <Phone className="text-foreground/40 pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />

                      <Input
                        id={field.name}
                        type="tel"
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        placeholder="Enter alternate phone"
                        className="h-11 rounded-md pl-10"
                      />
                    </div>
                  </div>
                )}
              </form.Field>
            </div>
          </div>
        </form>

        <DialogFooter className="border-foreground/10 border-t pt-4 sm:justify-between">
          <Button
            type="button"
            appearance="outline"
            variant="destructive"
            disabled={form.state.isSubmitting}
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                form="edit-employee-profile-form"
                disabled={
                  !canSubmit ||
                  isSubmitting ||
                  isUpdateUserPending ||
                  isUpdateEmployeeProfilePending
                }
                className={cn("min-w-32")}
              >
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            )}
          </form.Subscribe>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ToastMessageForProfileUpdateSuccess({
  message = "Your profile has been updated successfully.",
  onClose,
}: {
  message?: string;
  onClose?: () => void;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "bg-background relative isolate flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-xl border border-green-500/20 p-4 shadow-lg shadow-green-950/5 after:absolute after:inset-0 after:-z-1 after:overflow-clip after:backdrop-blur-xs dark:border-green-500/25 dark:bg-green-950/80",
      )}
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-green-500" />

      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
        <UserRoundCheck className="size-5" />
      </div>

      <div className="min-w-0 flex-1 space-y-1 pt-0.5">
        <p className="text-sm font-semibold text-green-700 dark:text-green-300">
          Profile updated successfully
        </p>

        <p className="text-foreground/70 text-sm leading-relaxed">{message}</p>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-md",
            "text-foreground/45 transition-colors",
            "hover:bg-green-500/10 hover:text-green-600",
            "focus-visible:ring-2 focus-visible:ring-green-500/50 focus-visible:outline-none",
          )}
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

function ToastMessageForProfileUpdateError({
  message = "Some error happened while updating you profile.",
  onClose,
}: {
  message?: string;
  onClose?: () => void;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "bg-background relative isolate flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-xl border border-red-500/20 p-4 shadow-lg shadow-red-950/5 after:absolute after:inset-0 after:-z-1 after:overflow-clip after:backdrop-blur-xs dark:border-red-500/25 dark:bg-red-950/80",
      )}
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-red-500" />

      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-600 dark:text-red-400">
        <UserRoundCheck className="size-5" />
      </div>

      <div className="min-w-0 flex-1 space-y-1 pt-0.5">
        <p className="text-sm font-semibold text-red-700 dark:text-red-300">
          Profile updation failed
        </p>

        <p className="text-foreground/70 text-sm leading-relaxed">{message}</p>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-md",
            "text-foreground/45 transition-colors",
            "hover:bg-red-500/10 hover:text-red-600",
            "focus-visible:ring-2 focus-visible:ring-red-500/50 focus-visible:outline-none",
          )}
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

const MIN_YEAR = 1950;
const MAX_YEAR = new Date().getFullYear() + 10; // allow expected passing year

const educationalQualificationSchema = z.object({
  qualification: z
    .string()
    .trim()
    .min(1, "Qualification is required")
    .max(100, "Keep it under 100 characters"),
  institution: z
    .string()
    .trim()
    .min(1, "Institution is required")
    .max(150, "Keep it under 150 characters"),
  year: z
    .string()
    .trim()
    .min(1, "Year is required")
    .regex(/^\d{4}$/, "Enter a valid 4-digit year")
    .refine(
      (v) => Number(v) >= MIN_YEAR && Number(v) <= MAX_YEAR,
      `Year must be between ${MIN_YEAR} and ${MAX_YEAR}`,
    ),
});

const educationalQualificationFields = [
  {
    name: "qualification",
    label: "Qualification",
    placeholder: "e.g. MBBS, BDS, B.Sc Nursing, BPT",
  },
  {
    name: "institution",
    label: "Institution",
    placeholder: "e.g. Medical College Kolkata",
  },
  {
    name: "year",
    label: "Year of Completion",
    placeholder: `e.g. ${new Date().getFullYear()}`,
    inputMode: "numeric",
    maxLength: 4,
  },
] as const;

const inputClass = cn(
  "h-9 rounded-md border-foreground/15 bg-background text-foreground font-brand-primary text-sm shadow-none",
  "placeholder:text-foreground/40",
  "transition-colors duration-200 hover:border-foreground/25",
  "focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/30",
  "aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/30",
);

export function AddEducationalQualificationButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    mutateAsync: createEducationalQualification,
    isPending: isCreateEducationalQualificationPending,
  } = useCreateEducationalQualification();
  const { employeeDetails } = useLoaderData({
    from: "/(authenticated-routes)/dashboard/employee/$employeeId/",
  });
  const { data: employeeProfile } = useReadOneEmployeeProfile({
    associatedUserId: employeeDetails.id,
  });

  const defaultValues: z.infer<typeof educationalQualificationSchema> = {
    qualification: "",
    institution: "",
    year: "",
  };

  const form = useForm({
    defaultValues: defaultValues,

    validators: {
      onChange: educationalQualificationSchema,
    },

    onSubmit: async ({ value }) => {
      if (!employeeProfile) {
        return;
      }

      await createEducationalQualification({
        data: {
          dataToInsert: { ...value, associatedProfileId: employeeProfile.id },
        },
      });

      toast.custom(() => <ToastMessageForQualificationAdditionSuccess />);
      setIsDialogOpen(false);
      form.reset();
    },
  });

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}
    >
      <DialogTrigger asChild>
        <Button appearance="ghost" variant="primary" size="sm">
          <span>
            <Plus className="mr-1.5 size-3.5" />
          </span>
          <span>Add</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add qualification</DialogTitle>
          <DialogDescription>
            Fill in your qualification details. All
            educationalQualificationFields are required.
          </DialogDescription>
        </DialogHeader>

        <form
          id="add-education-qualification-form"
          noValidate
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {educationalQualificationFields.map((config) => (
            <form.Field key={config.name} name={config.name}>
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const errorId = `${field.name}-error`;
                const firstError = field.state.meta.errors[0];
                const errorMessage =
                  typeof firstError === "string"
                    ? firstError
                    : firstError?.message;

                return (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor={field.name}
                      className={cn(
                        "font-brand-primary text-foreground/80 text-sm font-medium",
                        isInvalid && "text-red-500",
                      )}
                    >
                      {config.label}
                      <span aria-hidden className="ml-0.5 text-red-500">
                        *
                      </span>
                    </label>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          config.name === "year"
                            ? e.target.value.replace(/\D/g, "")
                            : e.target.value,
                        )
                      }
                      placeholder={config.placeholder}
                      inputMode={
                        "inputMode" in config ? config.inputMode : undefined
                      }
                      maxLength={
                        "maxLength" in config ? config.maxLength : undefined
                      }
                      autoComplete="off"
                      required
                      aria-required
                      aria-invalid={isInvalid}
                      aria-describedby={isInvalid ? errorId : undefined}
                      className={inputClass}
                    />

                    {isInvalid && errorMessage && (
                      <p
                        id={errorId}
                        role="alert"
                        className="font-brand-primary text-xs text-red-500"
                      >
                        {errorMessage}
                      </p>
                    )}
                  </div>
                );
              }}
            </form.Field>
          ))}
        </form>

        <DialogFooter className="justify-between sm:justify-between">
          <DialogClose asChild>
            <Button
              type="button"
              appearance="ghost"
              variant="destructive"
              size="sm"
              className=""
            >
              Cancel
            </Button>
          </DialogClose>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                form="add-education-qualification-form"
                size="sm"
                disabled={
                  !canSubmit ||
                  isSubmitting ||
                  isCreateEducationalQualificationPending
                }
              >
                {isSubmitting ? "Saving…" : "Save"}
              </Button>
            )}
          </form.Subscribe>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditEducationalQualificationButton({
  qualificationRecordId,
}: {
  qualificationRecordId: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    mutateAsync: updateEducationalQualification,
    isPending: isUpdateEducationalQualificationPending,
  } = useUpdateEducationalQualification();
  const { data: educationalQualification } = useReadOneEducationalQualification(
    {
      id: qualificationRecordId,
    },
  );

  const defaultValues: z.infer<typeof educationalQualificationSchema> = {
    qualification: educationalQualification?.qualification ?? "",
    institution: educationalQualification?.institution ?? "",
    year: educationalQualification?.year ?? "",
  };

  const form = useForm({
    defaultValues: defaultValues,

    validators: {
      onChange: educationalQualificationSchema,
    },

    onSubmit: async ({ value }) => {
      await updateEducationalQualification({
        data: {
          identifier: {
            id: qualificationRecordId,
          },
          dataToUpdate: {
            qualification: value.qualification,
            institution: value.institution,
            year: value.year,
          },
        },
      });

      toast.custom(() => <ToastMessageForQualificationUpdateSuccess />);

      setIsDialogOpen(false);
    },
  });

  const handleDialogChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);

    if (isOpen) {
      form.reset();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
      <Button
        type="button"
        appearance="ghost"
        variant="primary"
        size="icon"
        aria-label="Edit educational qualification"
        className=""
        asChild
      >
        <DialogTrigger>
          <Pencil className="size-4" />
        </DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <div className="border-primary-500/20 bg-primary-500/10 text-primary-600 dark:text-primary-400 mb-2 flex size-11 items-center justify-center rounded-xl border">
            <GraduationCap className="size-5" />
          </div>

          <DialogTitle>Edit qualification</DialogTitle>

          <DialogDescription>
            Update the academic qualification details below. Your existing
            information has been filled in automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="border-foreground/10 bg-foreground/3 mb-1 flex items-center gap-2 rounded-lg border px-3 py-2.5">
          <GraduationCap className="text-primary-500 size-4 shrink-0" />

          <p className="text-foreground/60 min-w-0 truncate text-xs">
            Editing academic record
          </p>

          <span className="border-primary-500/15 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-2.5 ml-auto shrink-0 rounded-md border px-2 py-1 font-semibold">
            EDIT MODE
          </span>
        </div>

        <form
          id="edit-qualification-form"
          noValidate
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          {educationalQualificationFields.map((config) => (
            <form.Field key={config.name} name={config.name}>
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                const errorId = `${field.name}-error`;
                const firstError = field.state.meta.errors[0];

                const errorMessage =
                  typeof firstError === "string"
                    ? firstError
                    : firstError?.message;

                return (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor={field.name}
                      className={cn(
                        "font-brand-primary text-foreground/80 text-sm font-medium",
                        isInvalid && "text-red-500",
                      )}
                    >
                      {config.label}
                      <span aria-hidden className="ml-0.5 text-red-500">
                        *
                      </span>
                    </label>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(
                          config.name === "year"
                            ? event.target.value.replace(/\D/g, "")
                            : event.target.value,
                        )
                      }
                      placeholder={config.placeholder}
                      inputMode={
                        "inputMode" in config ? config.inputMode : undefined
                      }
                      maxLength={
                        "maxLength" in config ? config.maxLength : undefined
                      }
                      autoComplete="off"
                      required
                      aria-required
                      aria-invalid={isInvalid}
                      aria-describedby={isInvalid ? errorId : undefined}
                      className={inputClass}
                    />

                    {isInvalid && errorMessage && (
                      <p
                        id={errorId}
                        role="alert"
                        className="font-brand-primary text-xs text-red-500"
                      >
                        {errorMessage}
                      </p>
                    )}
                  </div>
                );
              }}
            </form.Field>
          ))}
        </form>

        <DialogFooter className="justify-between sm:justify-between" >
          <DialogClose asChild>
            <Button
              type="button"
              appearance="ghost"
              variant="destructive"
              size="sm"
              className=""
            >
              Cancel
            </Button>
          </DialogClose>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                form="edit-qualification-form"
                size="sm"
                disabled={
                  !canSubmit ||
                  isSubmitting ||
                  isUpdateEducationalQualificationPending
                }
              >
                {isSubmitting || isUpdateEducationalQualificationPending
                  ? "Updating..."
                  : "Save changes"}
              </Button>
            )}
          </form.Subscribe>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const professionalQualificationSchema = z.object({
  qualification: z
    .string()
    .trim()
    .min(1, "Qualification is required")
    .max(100, "Keep it under 100 characters"),
  issuer: z
    .string()
    .trim()
    .min(1, "Issuer is required")
    .max(150, "Keep it under 150 characters"),
  year: z
    .string()
    .trim()
    .min(1, "Year is required")
    .regex(/^\d{4}$/, "Enter a valid 4-digit year")
    .refine(
      (v) => Number(v) >= MIN_YEAR && Number(v) <= MAX_YEAR,
      `Year must be between ${MIN_YEAR} and ${MAX_YEAR}`,
    ),
});

const professionalQualificationFields = [
  {
    name: "qualification",
    label: "Professional Qualification",
    placeholder: "e.g. MD (General Medicine), MS (General Surgery), DNB",
  },
  {
    name: "issuer",
    label: "Issuing Medical Council / Institution",
    placeholder: "e.g. West Bengal Medical Council",
  },
  {
    name: "year",
    label: "Year of Registration / Certification",
    placeholder: `e.g. ${new Date().getFullYear()}`,
    inputMode: "numeric",
    maxLength: 4,
  },
] as const;

export function AddProfessionalQualificationButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    mutateAsync: createProfessionalQualification,
    isPending: isCreateProfessionalQualificationPending,
  } = useCreateProfessionalQualification();
  const { employeeDetails } = useLoaderData({
    from: "/(authenticated-routes)/dashboard/employee/$employeeId/",
  });
  const { data: employeeProfile } = useReadOneEmployeeProfile({
    associatedUserId: employeeDetails.id,
  });

  const defaultValues: z.infer<typeof professionalQualificationSchema> = {
    qualification: "",
    issuer: "",
    year: "",
  };

  const form = useForm({
    defaultValues: defaultValues,

    validators: {
      onChange: professionalQualificationSchema,
    },

    onSubmit: async ({ value }) => {
      if (!employeeProfile) {
        return;
      }

      await createProfessionalQualification({
        data: {
          dataToInsert: { ...value, associatedProfileId: employeeProfile.id },
        },
      });

      toast.custom(() => <ToastMessageForQualificationAdditionSuccess />);
      setIsDialogOpen(false);
      form.reset();
    },
  });

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}
    >
      <DialogTrigger asChild>
        <Button appearance="ghost" variant="primary" size="sm">
          <span>
            <Plus className="mr-1.5 size-3.5" />
          </span>
          <span>Add</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add qualification</DialogTitle>
          <DialogDescription>
            Fill in your qualification details. All Professional Qualification
            Fields are required.
          </DialogDescription>
        </DialogHeader>

        <form
          id="add-profession-qualification-form"
          noValidate
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {professionalQualificationFields.map((config) => (
            <form.Field key={config.name} name={config.name}>
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const errorId = `${field.name}-error`;
                const firstError = field.state.meta.errors[0];
                const errorMessage =
                  typeof firstError === "string"
                    ? firstError
                    : firstError?.message;

                return (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor={field.name}
                      className={cn(
                        "font-brand-primary text-foreground/80 text-sm font-medium",
                        isInvalid && "text-red-500",
                      )}
                    >
                      {config.label}
                      <span aria-hidden className="ml-0.5 text-red-500">
                        *
                      </span>
                    </label>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          config.name === "year"
                            ? e.target.value.replace(/\D/g, "")
                            : e.target.value,
                        )
                      }
                      placeholder={config.placeholder}
                      inputMode={
                        "inputMode" in config ? config.inputMode : undefined
                      }
                      maxLength={
                        "maxLength" in config ? config.maxLength : undefined
                      }
                      autoComplete="off"
                      required
                      aria-required
                      aria-invalid={isInvalid}
                      aria-describedby={isInvalid ? errorId : undefined}
                      className={inputClass}
                    />

                    {isInvalid && errorMessage && (
                      <p
                        id={errorId}
                        role="alert"
                        className="font-brand-primary text-xs text-red-500"
                      >
                        {errorMessage}
                      </p>
                    )}
                  </div>
                );
              }}
            </form.Field>
          ))}
        </form>

        <DialogFooter className="justify-between sm:justify-between">
          <DialogClose asChild>
            <Button
              type="button"
              appearance="ghost"
              variant="destructive"
              size="sm"
              className=""
            >
              Cancel
            </Button>
          </DialogClose>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                form="add-profession-qualification-form"
                size="sm"
                disabled={
                  !canSubmit ||
                  isSubmitting ||
                  isCreateProfessionalQualificationPending
                }
              >
                {isSubmitting ? "Saving…" : "Save"}
              </Button>
            )}
          </form.Subscribe>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditProfessionalQualificationButton({
  qualificationRecordId,
}: {
  qualificationRecordId: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    mutateAsync: updateProfessionalQualification,
    isPending: isUpdateProfessionalQualificationPending,
  } = useUpdateProfessionalQualification();
  const { data: professionalQualification } =
    useReadOneProfessionalQualification({
      id: qualificationRecordId,
    });

  const defaultValues: z.infer<typeof professionalQualificationSchema> = {
    qualification: professionalQualification?.qualification ?? "",
    issuer: professionalQualification?.issuer ?? "",
    year: professionalQualification?.year ?? "",
  };

  const form = useForm({
    defaultValues: defaultValues,

    validators: {
      onChange: professionalQualificationSchema,
    },

    onSubmit: async ({ value }) => {
      await updateProfessionalQualification({
        data: {
          identifier: {
            id: qualificationRecordId,
          },
          dataToUpdate: {
            qualification: value.qualification,
            issuer: value.issuer,
            year: value.year,
          },
        },
      });

      toast.custom(() => <ToastMessageForQualificationUpdateSuccess />);

      setIsDialogOpen(false);
    },
  });

  const handleDialogChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);

    if (isOpen) {
      form.reset();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
      <Button
        type="button"
        appearance="ghost"
        variant="primary"
        size="icon"
        aria-label="Edit professional qualification"
        className=""
        asChild
      >
        <DialogTrigger>
          <Pencil className="size-4" />
        </DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <div className="border-primary-500/20 bg-primary-500/10 text-primary-600 dark:text-primary-400 mb-2 flex size-11 items-center justify-center rounded-xl border">
            <GraduationCap className="size-5" />
          </div>

          <DialogTitle>Edit qualification</DialogTitle>

          <DialogDescription>
            Update the academic qualification details below. Your existing
            information has been filled in automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="border-foreground/10 bg-foreground/3 mb-1 flex items-center gap-2 rounded-lg border px-3 py-2.5">
          <BriefcaseBusiness className="text-primary-500 size-4 shrink-0" />

          <p className="text-foreground/60 min-w-0 truncate text-xs">
            Editing profession record
          </p>

          <span className="border-primary-500/15 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-2.5 ml-auto shrink-0 rounded-md border px-2 py-1 font-semibold">
            EDIT MODE
          </span>
        </div>

        <form
          id="edit-qualification-form"
          noValidate
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          {professionalQualificationFields.map((config) => (
            <form.Field key={config.name} name={config.name}>
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                const errorId = `${field.name}-error`;
                const firstError = field.state.meta.errors[0];

                const errorMessage =
                  typeof firstError === "string"
                    ? firstError
                    : firstError?.message;

                return (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor={field.name}
                      className={cn(
                        "font-brand-primary text-foreground/80 text-sm font-medium",
                        isInvalid && "text-red-500",
                      )}
                    >
                      {config.label}
                      <span aria-hidden className="ml-0.5 text-red-500">
                        *
                      </span>
                    </label>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(
                          config.name === "year"
                            ? event.target.value.replace(/\D/g, "")
                            : event.target.value,
                        )
                      }
                      placeholder={config.placeholder}
                      inputMode={
                        "inputMode" in config ? config.inputMode : undefined
                      }
                      maxLength={
                        "maxLength" in config ? config.maxLength : undefined
                      }
                      autoComplete="off"
                      required
                      aria-required
                      aria-invalid={isInvalid}
                      aria-describedby={isInvalid ? errorId : undefined}
                      className={inputClass}
                    />

                    {isInvalid && errorMessage && (
                      <p
                        id={errorId}
                        role="alert"
                        className="font-brand-primary text-xs text-red-500"
                      >
                        {errorMessage}
                      </p>
                    )}
                  </div>
                );
              }}
            </form.Field>
          ))}
        </form>

        <DialogFooter className="justify-between sm:justify-between" >
          <DialogClose asChild>
            <Button
              type="button"
              appearance="ghost"
              variant="destructive"
              size="sm"
              className=""
            >
              Cancel
            </Button>
          </DialogClose>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                form="edit-qualification-form"
                size="sm"
                disabled={
                  !canSubmit ||
                  isSubmitting ||
                  isUpdateProfessionalQualificationPending
                }
              >
                {isSubmitting || isUpdateProfessionalQualificationPending
                  ? "Updating..."
                  : "Save changes"}
              </Button>
            )}
          </form.Subscribe>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ToastMessageForQualificationAdditionSuccess({
  message = "New qualification has been added successfully.",
  onClose,
}: {
  message?: string;
  onClose?: () => void;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "bg-background relative isolate flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-xl border border-green-500/20 p-4 shadow-lg shadow-green-950/5 after:absolute after:inset-0 after:-z-1 after:overflow-clip after:backdrop-blur-xs dark:border-green-500/25 dark:bg-green-950/80",
      )}
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-green-500" />

      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
        <UserRoundCheck className="size-5" />
      </div>

      <div className="min-w-0 flex-1 space-y-1 pt-0.5">
        <p className="text-sm font-semibold text-green-700 dark:text-green-300">
          Qualification added successfully
        </p>

        <p className="text-foreground/70 text-sm leading-relaxed">{message}</p>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-md",
            "text-foreground/45 transition-colors",
            "hover:bg-green-500/10 hover:text-green-600",
            "focus-visible:ring-2 focus-visible:ring-green-500/50 focus-visible:outline-none",
          )}
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

function ToastMessageForQualificationUpdateSuccess({
  message = "Your qualification has been updated successfully.",
  onClose,
}: {
  message?: string;
  onClose?: () => void;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "bg-background relative isolate flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-xl border border-green-500/20 p-4 shadow-lg shadow-green-950/5",
        "dark:border-green-500/25 dark:bg-green-950/80",
      )}
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-green-500" />

      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
        <GraduationCap className="size-5" />
      </div>

      <div className="min-w-0 flex-1 space-y-1 pt-0.5">
        <p className="text-sm font-semibold text-green-700 dark:text-green-300">
          Qualification updated successfully
        </p>

        <p className="text-foreground/70 text-sm leading-relaxed">{message}</p>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="text-foreground/45 flex size-7 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-green-500/10 hover:text-green-600 focus-visible:ring-2 focus-visible:ring-green-500/50 focus-visible:outline-none"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
