import { cva } from "@repo/styles/cva";
import type { VariantProps } from "@repo/styles/cva";
import { cn } from "@repo/styles/cn";
import {
  Badge,
  Ban,
  CheckCircle2,
  CircleMinus,
  Clock,
  Clock3,
  Mail,
  MoreHorizontal,
  Phone,
  Trash2,
} from "lucide-react";
import { Button } from "@repo/ui/button";
import type { USER_STATUS } from "@repo/utils/db-enums";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { createContext, useContext, useState } from "react";
import type { ComponentProps, ElementType } from "react";
import { Image } from "@unpic/react";

const summaryMetricIconVariants = cva(
  "flex size-10 shrink-0 items-center justify-center rounded-md",
  {
    variants: {
      tone: {
        primary: "bg-primary/10 text-primary",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
      },
    },
    defaultVariants: {
      tone: "primary",
    },
  },
);

const summaryMetricVariants = cva("flex min-w-0 items-center gap-3", {
  variants: {
    size: {
      default: "gap-3",
      sm: "gap-2",
      lg: "gap-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type SummaryMetricContextValue = {
  tone: NonNullable<VariantProps<typeof summaryMetricIconVariants>["tone"]>;
};

const SummaryMetricContext = createContext<SummaryMetricContextValue>({
  tone: "primary",
});

type SummaryMetricProps = ComponentProps<"div"> &
  VariantProps<typeof summaryMetricVariants> & {
    tone?: NonNullable<VariantProps<typeof summaryMetricIconVariants>["tone"]>;
  };

function SummaryMetric({
  className,
  size,
  tone = "primary",
  children,
  ...props
}: SummaryMetricProps) {
  return (
    <SummaryMetricContext.Provider value={{ tone }}>
      <div
        data-slot="summary-metric"
        className={cn(summaryMetricVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    </SummaryMetricContext.Provider>
  );
}

function SummaryMetricIcon({ className, ...props }: ComponentProps<"div">) {
  const { tone } = useContext(SummaryMetricContext);

  return (
    <div
      data-slot="summary-metric-icon"
      className={cn(summaryMetricIconVariants({ tone }), className)}
      {...props}
    />
  );
}

function SummaryMetricContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="summary-metric-content"
      className={cn("min-w-0 flex-1", className)}
      {...props}
    />
  );
}

function SummaryMetricLabel({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="summary-metric-label"
      className={cn("text-muted-foreground text-xs font-medium", className)}
      {...props}
    />
  );
}

function SummaryMetricValue({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="summary-metric-value"
      className={cn("mt-1 truncate text-sm font-semibold", className)}
      {...props}
    />
  );
}

export {
  SummaryMetric,
  SummaryMetricIcon,
  SummaryMetricContent,
  SummaryMetricLabel,
  SummaryMetricValue,
};

const profileHeaderVariants = cva(
  "relative isolate overflow-hidden bg-linear-to-br from-primary-950 via-primary-800 to-primary-600 px-5 py-6 text-white sm:px-8 sm:py-8",
  {
    variants: {
      size: {
        default: "",
        sm: "px-4 py-5 sm:px-6 sm:py-6",
        lg: "px-6 py-8 sm:px-10 sm:py-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const profileHeaderAvatarVariants = cva(
  "font-brand-accent shadow-primary-950/20 flex size-24 shrink-0 items-center justify-center rounded-lg border border-white/30 bg-white/15 text-3xl font-bold text-white shadow-lg backdrop-blur-sm sm:size-28",
  {
    variants: {
      size: {
        default: "",
        sm: "size-20 text-2xl sm:size-24",
        lg: "size-28 text-4xl sm:size-32",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type ProfileHeaderContextValue = {
  size: NonNullable<VariantProps<typeof profileHeaderVariants>["size"]>;
  verified: (typeof USER_STATUS)[number];
};

const ProfileHeaderContext = createContext<ProfileHeaderContextValue>({
  size: "default",
  verified: "UNDER_VERIFICATION",
});

type ProfileHeaderProps = ComponentProps<"div"> &
  VariantProps<typeof profileHeaderVariants> & {
    verified?: (typeof USER_STATUS)[number];
  };

function ProfileHeader({
  className,
  size = "default",
  verified = "UNDER_VERIFICATION",
  children,
  ...props
}: ProfileHeaderProps) {
  return (
    <ProfileHeaderContext.Provider
      value={{ size: size ?? "default", verified }}
    >
      <div
        data-slot="profile-header"
        className={cn(profileHeaderVariants({ size }), className)}
        {...props}
      >
        <div
          data-slot="profile-header-decoration"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-28 right-0 size-72 rounded-full border border-white/10" />
          <div className="absolute -top-16 right-8 size-52 rounded-full border border-white/10" />
          <div className="bg-primary-400/20 absolute -right-10 -bottom-36 size-72 rounded-full blur-2xl" />
          <div className="bg-secondary-400/15 absolute top-0 right-1/3 size-32 rounded-full blur-3xl" />
          <div className="from-primary-950/30 absolute inset-0 bg-linear-to-r via-transparent to-transparent" />
        </div>

        {children}
      </div>
    </ProfileHeaderContext.Provider>
  );
}

function ProfileHeaderContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-header-content"
      className={cn(
        "relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between",
        className,
      )}
      {...props}
    />
  );
}

function ProfileHeaderIdentity({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-header-identity"
      className={cn(
        "flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center",
        className,
      )}
      {...props}
    />
  );
}

const profileStatusConfig = {
  ACTIVE: {
    label: "Active",
    icon: CheckCircle2,
    className:
      "border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  INACTIVE: {
    label: "Inactive",
    icon: CircleMinus,
    className:
      "border-gray-300 bg-gray-100 text-gray-600 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-400",
  },
  SUSPENDED: {
    label: "Suspended",
    icon: Ban,
    className:
      "border-red-300 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-950/60 dark:text-red-400",
  },
  UNDER_VERIFICATION: {
    label: "Under Verification",
    icon: Clock,
    className:
      "border-amber-300 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-400",
  },
  DELETED: {
    label: "Deleted",
    icon: Trash2,
    className:
      "border-slate-300 bg-slate-200 text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-400",
  },
} satisfies Record<
  (typeof USER_STATUS)[number],
  {
    label: string;
    icon: ElementType;
    className: string;
  }
>;

function ProfileHeaderAvatar({
  className,
  initials,
  avatarLink,
  ...props
}: ComponentProps<"div"> & {
  initials: string;
  avatarLink: string;
}) {
  const { size, verified } = useContext(ProfileHeaderContext);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  console.log(imageLoaded)

  const status = profileStatusConfig[verified];
  const StatusIcon = status.icon;

  return (
    <div
      data-slot="profile-header-avatar-wrapper"
      className="relative w-fit shrink-0"
    >
      <div
        data-slot="profile-header-avatar"
        className={cn(
          profileHeaderAvatarVariants({ size }),
          "relative overflow-hidden",
          className,
        )}
        {...props}
      >
        {/* Initials fallback */}
        {!imageLoaded && (
          <span className="absolute inset-0 flex items-center justify-center">
            {initials}
          </span>
        )}

        {/* Avatar image */}
        {!imageError && avatarLink && (
          <Image
            src={avatarLink}
            alt="Profile avatar"
            layout="fullWidth"
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity duration-200",
              imageLoaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(false);
            }}
          />
        )}
      </div>

      <span
        data-slot="profile-header-status"
        title={status.label}
        aria-label={status.label}
        className={cn(
          "absolute -right-2 -bottom-2 flex size-7 items-center justify-center rounded-md border-2 shadow-sm",
          status.className,
        )}
      >
        <StatusIcon className="size-4" />
      </span>
    </div>
  );
}

function ProfileHeaderDetails({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-header-details"
      className={cn("min-w-0", className)}
      {...props}
    />
  );
}

function ProfileHeaderBadges({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-header-badges"
      className={cn("mb-3 flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  );
}

function ProfileHeaderRole({
  className,
  ...props
}: ComponentProps<typeof Badge>) {
  return (
    <Badge
      data-slot="profile-header-role"
      className={cn(
        "rounded-sm border border-white/20 bg-white/15 text-white hover:bg-white/20",
        className,
      )}
      {...props}
    />
  );
}

function ProfileHeaderStatus({
  className,
  children,
  ...props
}: ComponentProps<typeof Badge>) {
  return (
    <Badge
      data-slot="profile-header-status"
      className={cn(
        "border-secondary-300/30 bg-secondary-400/20 text-secondary-100 hover:bg-secondary-400/25 rounded-sm border",
        className,
      )}
      {...props}
    >
      <Clock3 className="mr-1 size-3" />
      {children}
    </Badge>
  );
}

function ProfileHeaderName({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      data-slot="profile-header-name"
      className={cn(
        "font-brand-accent text-3xl leading-tight font-bold tracking-tight sm:text-4xl",
        className,
      )}
      {...props}
    />
  );
}

function ProfileHeaderSubtitle({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="profile-header-subtitle"
      className={cn("text-primary-100 mt-2 text-sm font-medium", className)}
      {...props}
    />
  );
}

function ProfileHeaderMeta({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-header-meta"
      className={cn(
        "mt-4 flex flex-col gap-2 text-sm text-white/80 sm:flex-row sm:flex-wrap sm:gap-x-5",
        className,
      )}
      {...props}
    />
  );
}

function ProfileHeaderContact({
  className,
  type,
  children,
  ...props
}: ComponentProps<"a"> & {
  type: "email" | "phone";
}) {
  const Icon = type === "email" ? Mail : Phone;

  return (
    <a
      data-slot={`profile-header-${type}`}
      className={cn(
        "flex min-w-0 items-center gap-2 transition-colors hover:text-white",
        className,
      )}
      {...props}
    >
      <Icon
        className={cn(
          "text-primary-200 size-4 shrink-0",
          type === "phone" && "size-4",
        )}
      />
      {children}
    </a>
  );
}

function ProfileHeaderActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-header-actions"
      className={cn("flex shrink-0 flex-wrap items-center gap-2", className)}
      {...props}
    />
  );
}

function ProfileHeaderContactButton({
  className,
  children = "Contact",
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="profile-header-contact-button"
      asChild
      variant="outline"
      size="sm"
      className={cn(
        "h-9 rounded-md border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

function ProfileHeaderMoreButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="profile-header-more-button"
      variant="outline"
      size="icon"
      aria-label="More profile actions"
      className={cn(
        "size-9 rounded-md border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white",
        className,
      )}
      {...props}
    >
      <MoreHorizontal className="size-4" />
    </Button>
  );
}

export {
  ProfileHeader,
  ProfileHeaderContent,
  ProfileHeaderIdentity,
  ProfileHeaderAvatar,
  ProfileHeaderDetails,
  ProfileHeaderBadges,
  ProfileHeaderRole,
  ProfileHeaderStatus,
  ProfileHeaderName,
  ProfileHeaderSubtitle,
  ProfileHeaderMeta,
  ProfileHeaderContact,
  ProfileHeaderActions,
  ProfileHeaderContactButton,
  ProfileHeaderMoreButton,
};

const profileSectionVariants = cva(
  "overflow-hidden rounded-lg border border-border/70 bg-card py-0 shadow-sm",
  {
    variants: {
      tone: {
        default: "",
        secondary: "",
        accent: "",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  },
);

const profileIconVariants = cva(
  "flex size-10 shrink-0 items-center justify-center rounded-md",
  {
    variants: {
      tone: {
        default: "bg-primary/10 text-primary",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  },
);

const profileRecordVariants = cva(
  "flex items-start gap-3 rounded-md border border-border/70 p-3",
  {
    variants: {
      tone: {
        default: "bg-muted/30",
        secondary: "bg-muted/30",
        accent: "bg-muted/30",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  },
);

type ProfileTone = NonNullable<
  VariantProps<typeof profileSectionVariants>["tone"]
>;

const ProfileContext = createContext<ProfileTone>("default");

type ProfileSectionProps = ComponentProps<typeof Card> &
  VariantProps<typeof profileSectionVariants>;

function ProfileSection({
  className,
  tone = "default",
  children,
  ...props
}: ProfileSectionProps) {
  return (
    <ProfileContext.Provider value={tone ?? "default"}>
      <Card
        data-slot="profile-section"
        className={cn(
          profileSectionVariants({ tone }),
          "bg-foreground/2",
          className,
        )}
        {...props}
      >
        {children}
      </Card>
    </ProfileContext.Provider>
  );
}

function ProfileSectionHeader({
  className,
  ...props
}: ComponentProps<typeof CardHeader>) {
  return (
    <CardHeader
      data-slot="profile-section-header"
      className={cn(
        "flex flex-row items-start justify-between gap-3 px-5 py-5",
        className,
      )}
      {...props}
    />
  );
}

function ProfileSectionHeading({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: ElementType;
  title: string;
  description?: string;
  className?: string;
}) {
  const tone = useContext(ProfileContext);

  return (
    <div className={cn("flex min-w-0 items-start gap-3", className)}>
      <div className={cn(profileIconVariants({ tone }))}>
        <Icon className="size-4" />
      </div>

      <div className="min-w-0">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>

        {description && (
          <CardDescription className="mt-1 text-xs">
            {description}
          </CardDescription>
        )}
      </div>
    </div>
  );
}

function ProfileSectionAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-section-action"
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  );
}

function ProfileSectionContent({
  className,
  ...props
}: ComponentProps<typeof CardContent>) {
  return (
    <CardContent
      data-slot="profile-section-content"
      className={cn("px-5 pt-0 pb-5", className)}
      {...props}
    />
  );
}

function ProfileDetailGrid({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-detail-grid"
      className={cn("grid grid-cols-1 gap-5 sm:grid-cols-2", className)}
      {...props}
    />
  );
}

function ProfileDetail({
  label,
  children,
  className,
}: ComponentProps<"div"> & {
  label: string;
}) {
  return (
    <div
      data-slot="profile-detail"
      className={cn("min-w-0 space-y-1", className)}
    >
      <p className="text-muted-foreground text-xs font-medium">{label}</p>

      <div className="flex min-w-0 items-center gap-2 text-sm font-medium">
        {children}
      </div>
    </div>
  );
}

function ProfileDetailIcon({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      data-slot="profile-detail-icon"
      className={cn("text-muted-foreground size-3.5 shrink-0", className)}
      {...props}
    />
  );
}

function ProfileDetailValue({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="profile-detail-value"
      className={cn("min-w-0 wrap-break-word", className)}
      {...props}
    />
  );
}

function ProfileRecordList({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-record-list"
      className={cn("space-y-3", className)}
      {...props}
    />
  );
}

function ProfileRecord({ className, ...props }: ComponentProps<"div">) {
  const tone = useContext(ProfileContext);

  return (
    <div
      data-slot="profile-record"
      className={cn(profileRecordVariants({ tone }), `group`, className)}
      {...props}
    />
  );
}

function ProfileRecordIcon({ className, ...props }: ComponentProps<"div">) {
  const tone = useContext(ProfileContext);

  return (
    <div
      data-slot="profile-record-icon"
      className={cn(profileIconVariants({ tone }), className)}
      {...props}
    />
  );
}

function ProfileRecordContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-record-content"
      className={cn("min-w-0 flex-1 space-y-1", className)}
      {...props}
    />
  );
}

function ProfileRecordTitle({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="profile-record-title"
      className={cn("text-sm leading-snug font-semibold", className)}
      {...props}
    />
  );
}

function ProfileRecordDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      data-slot="profile-record-description"
      className={cn("text-muted-foreground text-xs leading-relaxed", className)}
      {...props}
    />
  );
}

function ProfileRecordMeta({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-record-meta"
      className={cn("flex flex-wrap items-center gap-2 pt-1", className)}
      {...props}
    />
  );
}

function ProfileRecordAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-record-action"
      className={cn(
        "flex flex-wrap items-center gap-2 pt-1 opacity-0 transition-all group-hover:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

function ProfileManager({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-manager"
      className={cn(
        "border-border/70 bg-muted/30 flex items-center gap-3 rounded-md border p-3",
        className,
      )}
      {...props}
    />
  );
}

function ProfileManagerAvatar({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-manager-avatar"
      className={cn(
        "bg-secondary text-secondary-foreground flex size-11 shrink-0 items-center justify-center rounded-md text-sm font-semibold",
        className,
      )}
      {...props}
    />
  );
}

function ProfileManagerContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-manager-content"
      className={cn("min-w-0 flex-1", className)}
      {...props}
    />
  );
}

function ProfileManagerName({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="profile-manager-name"
      className={cn("truncate text-sm font-semibold", className)}
      {...props}
    />
  );
}

function ProfileManagerRole({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="profile-manager-role"
      className={cn("text-muted-foreground mt-1 text-xs", className)}
      {...props}
    />
  );
}

export {
  ProfileSection,
  ProfileSectionHeader,
  ProfileSectionHeading,
  ProfileSectionAction,
  ProfileSectionContent,
  ProfileDetailGrid,
  ProfileDetail,
  ProfileDetailIcon,
  ProfileDetailValue,
  ProfileRecordList,
  ProfileRecord,
  ProfileRecordIcon,
  ProfileRecordContent,
  ProfileRecordTitle,
  ProfileRecordDescription,
  ProfileRecordMeta,
  ProfileManager,
  ProfileManagerAvatar,
  ProfileManagerContent,
  ProfileManagerName,
  ProfileManagerRole,
  ProfileRecordAction,
};
