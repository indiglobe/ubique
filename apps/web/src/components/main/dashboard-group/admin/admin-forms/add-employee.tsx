import { useState } from "react";
import type { ElementType, ReactNode } from "react";
import { useCreateNewUser } from "@/integrations/tanstack/react-query/user-query/admin.rq";
import { useCreateOnroleUserProfile } from "@/integrations/tanstack/react-query/employee-profile-query/admin.rq";
import { useCreateExperience } from "@/integrations/tanstack/react-query/experience-query/admin.rq";
import { useCreateEducationalQualification } from "@/integrations/tanstack/react-query/educational-qualification-query/admin.rq";
import { useCreateProfessionalQualification } from "@/integrations/tanstack/react-query/professional-qualification-query/admin.rq";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@repo/ui/alert-dialog";
import { VisuallyHidden } from "@repo/ui/visually-hidden";
import { Label } from "@repo/ui/label";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { PARTNER_ROLE, EMPLOYEE_ROLE } from "@repo/utils/db-enums";
import {
  generateEmployeeCode,
  generateUsernameFromEmail,
} from "@repo/utils/id";
import { useForm } from "@tanstack/react-form";
import { useRouteContext } from "@tanstack/react-router";
import { cn } from "@repo/styles/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import {
  Plus,
  Trash2,
  UserRound,
  BriefcaseBusiness,
  GraduationCap,
  Award,
  ImagePlus,
  Building2,
  X,
  UserPlus,
  Mail,
  Phone,
  ShieldCheck,
  FileText,
  CalendarDays,
  ChevronDown,
  AlertCircle,
  Trash,
} from "lucide-react";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar } from "@repo/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/popover";
import { tryCatch } from "@repo/utils/try-catch";
import { toast } from "sonner";
import { Image } from "@unpic/react";

const USER_ROLE = [...EMPLOYEE_ROLE, ...PARTNER_ROLE];

const ALLOWED_ROLES_TO_CREATE_BY_THIS_USER: (typeof USER_ROLE)[number][] = [
  "ZSM",
  "RSM",
  "MANAGER",
  "ASM",
  "MR",
];

const qualificationSchema = z.object({
  qualification: z.string().trim().min(1, "Qualification is required."),
  institution: z.string().trim().min(1, "Institution is required."),
  year: z.string().trim().min(1, "Year is required."),
});

const professionalQualificationSchema = z.object({
  qualification: z.string().trim().min(1, "Qualification is required."),
  issuer: z.string().trim().min(1, "Issuing organization is required."),
  year: z.string().trim().min(1, "Year is required."),
});

const experienceSchema = z.object({
  company: z.string().trim().min(1, "Company name is required."),
  designation: z.string().trim().min(1, "Designation is required."),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string(),
  description: z.string().trim(),
});

export const createNewUserFormSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters."),
  email: z.email("Enter a valid email address.").trim(),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s()-]{7,20}$/, "Enter a valid phone number."),
  role: z.enum(ALLOWED_ROLES_TO_CREATE_BY_THIS_USER),
  dateOfBirth: z.string().min(1, "Date of birth is required."),
  photo: z.custom<File | null>(
    (value) =>
      value === null || (typeof File !== "undefined" && value instanceof File),
    "Please select a valid image.",
  ),
  alternatePhone: z
    .string()
    .trim()
    .refine(
      (value) => !value || /^[+]?[\d\s()-]{7,20}$/.test(value),
      "Enter a valid alternate phone number.",
    ),
  joiningDate: z.string().min(1, "Joining date is required."),
  educationalQualifications: z.array(qualificationSchema),
  professionalQualifications: z.array(professionalQualificationSchema),
  experiences: z.array(experienceSchema),
});

export const createNewUserFormDefaultValues: z.infer<
  typeof createNewUserFormSchema
> = {
  name: "",
  email: "",
  phone: "",
  role: ALLOWED_ROLES_TO_CREATE_BY_THIS_USER[0],
  dateOfBirth: "",
  photo: null,
  alternatePhone: "",
  joiningDate: "",
  educationalQualifications: [
    {
      qualification: "",
      institution: "",
      year: "",
    },
  ],
  professionalQualifications: [
    {
      qualification: "",
      issuer: "",
      year: "",
    },
  ],
  experiences: [
    {
      company: "",
      designation: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
};

const inputClassName = "h-11 w-full rounded-lg bg-background px-3.5 text-sm";

const entryCardClassName =
  "border-border bg-muted/15 min-w-0 space-y-5 rounded-xl border p-4 sm:p-6";

function FormSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: ElementType<{ className?: string }>;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0 space-y-6">
      <div className="border-border flex items-start gap-4 border-b pb-5">
        <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-lg">
          <Icon className="size-5" />
        </div>

        <div className="min-w-0">
          <h3 className="font-brand-secondary text-base font-bold tracking-tight sm:text-lg">
            {title}
          </h3>
          <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function FieldError({ errors }: { errors: unknown[] }) {
  if (!errors.length) return null;

  return (
    <div className="space-y-1">
      {errors.map((error, index) => {
        const message =
          typeof error === "string"
            ? error
            : (error as { message?: string })?.message;

        return message ? (
          <p key={index} className="text-destructive text-xs">
            {message}
          </p>
        ) : null;
      })}
    </div>
  );
}

function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor?: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <Label htmlFor={htmlFor} className="text-foreground text-sm font-semibold">
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
    </Label>
  );
}

export function AddNewEmployee() {
  const { mutateAsync: createNewUser, isPending: isCreateNewUserPending } =
    useCreateNewUser();
  const {
    mutateAsync: createOnroleUserProfile,
    isPending: isCreateOnroleUserProfilePending,
  } = useCreateOnroleUserProfile();
  const {
    mutateAsync: createExperience,
    isPending: isCreateExperiencePending,
  } = useCreateExperience();
  const {
    mutateAsync: createEducationalQualification,
    isPending: isCreateEducationalQualificationPending,
  } = useCreateEducationalQualification();
  const {
    mutateAsync: createProfessionalQualification,
    isPending: isCreateProfessionalQualificationPending,
  } = useCreateProfessionalQualification();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const isPending =
    isCreateNewUserPending ||
    isCreateOnroleUserProfilePending ||
    isCreateExperiencePending ||
    isCreateEducationalQualificationPending ||
    isCreateProfessionalQualificationPending;

  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({ from: "/(authenticated-routes)/dashboard/" });

  const form = useForm({
    defaultValues: createNewUserFormDefaultValues,

    validators: {
      onSubmit: createNewUserFormSchema,
    },

    onSubmit: async ({ value }) => {
      const {
        email,
        name,
        phone,
        role,
        alternatePhone,
        dateOfBirth,
        joiningDate,
        photo,
        experiences,
        educationalQualifications,
        professionalQualifications,
      } = value;

      if (!photo) {
        return;
      }

      const formData = new FormData();
      formData.append("file", photo);

      console.log({
        name: photo.name,
        size: photo.size,
        sizeInMB: (photo.size / (1024 * 1024)).toFixed(2),
        type: photo.type,
      });

      const [uploadError, uploadResponse] = await tryCatch(
        fetch("/api/upload", {
          method: "POST",
          body: formData,
        }),
      );

      if (uploadError) {
        toast.custom(() => <ToastMessageForImageUploadError />);
        return;
      }

      const result = (await uploadResponse.json()) as {
        publicURL?: string;
        message?: string;
      };

      console.log(result);

      if (!uploadResponse.ok) {
        toast.custom(() => <ToastMessageForImageUploadError />);
        return;
      }

      const publicURL = result.publicURL;

      const [newUserCreationError, createdUserDetails] = await tryCatch(
        createNewUser({
          data: {
            dataToInsert: {
              email,
              name,
              phone,
              role,
              employeeCode: generateEmployeeCode({ role }),
              username: generateUsernameFromEmail({ email }),
              profilePicture: publicURL,
            },
          },
        }),
      );

      if (newUserCreationError) {
        toast.custom(() => <ToastMessageForUserCreation />);
        return;
      }

      const [newUserProfileCreationError, createdUserProfileDetails] =
        await tryCatch(
          createOnroleUserProfile({
            data: {
              dataToInsert: {
                associatedUserId: Array.isArray(createdUserDetails)
                  ? createdUserDetails[0].id
                  : createdUserDetails.id,
                joiningDate: new Date(joiningDate),
                dateOfBirth: new Date(dateOfBirth),
                alternatePhone: alternatePhone,
              },
            },
          }),
        );

      if (newUserProfileCreationError) {
        toast.custom(() => <ToastMessageForUserCreation />);
        return;
      }

      const [newExperienceCreationError] = await tryCatch(
        createExperience({
          data: {
            dataToInsert: experiences.map((e) => ({
              ...e,
              assciatedProfile: Array.isArray(createdUserProfileDetails)
                ? createdUserProfileDetails[0].id
                : createdUserProfileDetails.id,
            })),
          },
        }),
      );

      if (newExperienceCreationError) {
        toast.custom(() => <ToastMessageForUserCreation />);
        return;
      }

      const [newEducationalQualificationError] = await tryCatch(
        createEducationalQualification({
          data: {
            dataToInsert: educationalQualifications.map((e) => ({
              ...e,
              assciatedProfile: Array.isArray(createdUserProfileDetails)
                ? createdUserProfileDetails[0].id
                : createdUserProfileDetails.id,
            })),
          },
        }),
      );

      if (newEducationalQualificationError) {
        toast.custom(() => <ToastMessageForUserCreation />);
        return;
      }

      const [newProfessionalQualificationError] = await tryCatch(
        createProfessionalQualification({
          data: {
            dataToInsert: professionalQualifications.map((e) => ({
              ...e,
              assciatedProfile: Array.isArray(createdUserProfileDetails)
                ? createdUserProfileDetails[0].id
                : createdUserProfileDetails.id,
            })),
          },
        }),
      );

      if (newProfessionalQualificationError) {
        toast.custom(() => <ToastMessageForUserCreation />);
        return;
      }

      form.reset();

      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
      setIsModalOpen(false);
    },
  });

  function handleModalChange(open: boolean) {
    setIsModalOpen(open);

    if (!open) {
      form.reset();

      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
    }
  }

  function handlePhotoChange(
    file: File | null,
    onChange: (value: File | null) => void,
  ) {
    if (file && !file.type.startsWith("image/")) return;

    if (photoPreview) URL.revokeObjectURL(photoPreview);

    setPhotoPreview(file ? URL.createObjectURL(file) : null);
    onChange(file);
  }

  return (
    <AlertDialog open={isModalOpen} onOpenChange={handleModalChange}>
      <AlertDialogTrigger asChild>
        <Button variant="primary" className="h-11 w-full gap-2 rounded-lg">
          <UserPlus className="size-4" />
          <span>Add new employee</span>
          <Plus className="ml-auto size-4" />
        </Button>
      </AlertDialogTrigger>

      <VisuallyHidden>
        <AlertDialogHeader>Create a new employee</AlertDialogHeader>
        <AlertDialogDescription>
          A form to create new user along with their details
        </AlertDialogDescription>
      </VisuallyHidden>

      <AlertDialogContent
        className={cn(
          "flex h-[calc(100svh-1rem)] max-w-none flex-col gap-0 overflow-hidden rounded-xl p-0 data-[size=default]:max-w-[95vw] sm:h-[calc(100svh-2rem)] data-[size=default]:sm:max-w-[90vw] xl:h-[94svh]",
        )}
      >
        <VisuallyHidden>
          <AlertDialogTitle>Add new employee form</AlertDialogTitle>
        </VisuallyHidden>
        <div className="border-border from-primary-50 via-background to-secondary-50 dark:from-primary-950/40 dark:via-background dark:to-secondary-950/20 shrink-0 border-b bg-linear-to-r px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
          <div className="flex items-center gap-4">
            <div className="bg-primary text-primary-50 flex size-12 shrink-0 items-center justify-center rounded-xl shadow-sm sm:size-14">
              <UserPlus className="size-6" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-brand-accent text-xl font-bold tracking-tight sm:text-2xl">
                Add new employee
              </h2>
              <p className="text-muted-foreground mt-1.5 max-w-2xl text-sm leading-relaxed">
                Create an employee account and organize their personal,
                employment, educational and professional details.
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground -mr-2 shrink-0 rounded-lg"
              aria-label="Close form"
              onClick={() => handleModalChange(false)}
            >
              <X className="size-5" />
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs">
            <span className="text-muted-foreground inline-flex items-center gap-2">
              <span className="bg-primary size-2 rounded-full" />
              Personal information
            </span>
            <span className="text-muted-foreground inline-flex items-center gap-2">
              <span className="bg-secondary-500 size-2 rounded-full" />
              Employment
            </span>
            <span className="text-muted-foreground inline-flex items-center gap-2">
              <span className="bg-accent-500 size-2 rounded-full" />
              Qualifications & experience
            </span>
          </div>
        </div>

        <form
          className="flex min-h-0 flex-1 flex-col"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <div className="min-h-0 flex-1 scrollbar-none space-y-10 overflow-y-auto px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
            <FormSection
              icon={UserRound}
              title="Personal information"
              description="Identity, contact details and employee access level."
            >
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
                <form.Field
                  name="name"
                  validators={{
                    onChange: ({ value }) =>
                      value.trim().length < 2
                        ? "Name must contain at least 2 characters."
                        : undefined,
                  }}
                >
                  {(field) => (
                    <div className="min-w-0 space-y-2.5">
                      <FieldLabel htmlFor={field.name} required>
                        Full name
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        className={inputClassName}
                        placeholder="Enter full name"
                        autoComplete="name"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name="email"
                  validators={{
                    onChange: ({ value }) =>
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
                        ? undefined
                        : "Enter a valid email address.",
                  }}
                >
                  {(field) => (
                    <div className="min-w-0 space-y-2.5">
                      <FieldLabel htmlFor={field.name} required>
                        Email address
                      </FieldLabel>
                      <div className="relative">
                        <Mail className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          className={cn(inputClassName, "pl-10")}
                          placeholder="employee@example.com"
                          autoComplete="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                        />
                      </div>
                      <FieldError errors={field.state.meta.errors} />
                    </div>
                  )}
                </form.Field>

                <form.Field name="phone">
                  {(field) => (
                    <div className="min-w-0 space-y-2.5">
                      <FieldLabel htmlFor={field.name} required>
                        Primary mobile
                      </FieldLabel>
                      <div className="relative">
                        <Phone className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                        <Input
                          id={field.name}
                          name={field.name}
                          type="tel"
                          className={cn(inputClassName, "pl-10")}
                          placeholder="+91 98765 43210"
                          autoComplete="tel"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                        />
                      </div>
                      <FieldError errors={field.state.meta.errors} />
                    </div>
                  )}
                </form.Field>

                <form.Field name="alternatePhone">
                  {(field) => (
                    <div className="min-w-0 space-y-2.5">
                      <FieldLabel htmlFor={field.name}>
                        Alternate mobile
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="tel"
                        className={inputClassName}
                        placeholder="Enter alternate mobile"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </div>
                  )}
                </form.Field>

                <form.Field name="dateOfBirth">
                  {(field) => {
                    const selectedDate = field.state.value
                      ? new Date(`${field.state.value}T00:00:00`)
                      : undefined;

                    return (
                      <div className="min-w-0 space-y-2.5">
                        <FieldLabel htmlFor={field.name} required>
                          Date of birth
                        </FieldLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id={field.name}
                              type="button"
                              variant="outline"
                              size="lg"
                              corner="rounded"
                              aria-invalid={field.state.meta.errors.length > 0}
                              className={cn(
                                "font-brand-primary text-foregroundfocus-visible:border-primary-500 hover:border-foreground/25 dark:bg-background border-foreground/15 bg-background shadow-primary-950/2 focus-visible:ring-primary-500/20 hover:bg:background dark:hover:bg-background h-11 w-full justify-between border px-3.5 text-sm font-normal shadow-sm focus-visible:ring-2",
                                field.state.meta.errors.length > 0 &&
                                  "border-red-400 focus-visible:ring-red-400/20",
                              )}
                              onBlur={field.handleBlur}
                            >
                              <span className="flex min-w-0 items-center gap-3">
                                <span className="bg-primary-50 text-primary-600 dark:bg-primary-950/70 dark:text-primary-300 flex size-8 shrink-0 items-center justify-center rounded-lg">
                                  <CalendarDays className="size-4" />
                                </span>

                                <span
                                  className={cn(
                                    "truncate",
                                    !selectedDate && "text-foreground/45",
                                  )}
                                >
                                  {selectedDate
                                    ? format(selectedDate, "MMMM dd, yyyy")
                                    : "Select date of birth"}
                                </span>
                              </span>

                              <ChevronDown className="text-foreground/40 size-4 shrink-0 transition-transform" />
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent
                            align="start"
                            sideOffset={8}
                            className="border-primary-200/80 dark:border-primary-900 w-auto max-w-[calc(100vw-2rem)] rounded-xl p-2 shadow-xl"
                          >
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={(date) => {
                                field.handleChange(
                                  date ? format(date, "yyyy-MM-dd") : "",
                                );
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

                        <FieldError errors={field.state.meta.errors} />
                      </div>
                    );
                  }}
                </form.Field>

                <form.Field name="role">
                  {(field) => (
                    <div className="min-w-0 space-y-2.5">
                      <FieldLabel htmlFor={field.name} required>
                        User role
                      </FieldLabel>
                      <Select
                        value={field.state.value}
                        onValueChange={(value) =>
                          field.handleChange(
                            value as (typeof ALLOWED_ROLES_TO_CREATE_BY_THIS_USER)[number],
                          )
                        }
                      >
                        <SelectTrigger
                          id={field.name}
                          className={cn(
                            inputClassName,
                            "min-h-11 justify-between",
                          )}
                          onBlur={field.handleBlur}
                        >
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {ALLOWED_ROLES_TO_CREATE_BY_THIS_USER.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role.replaceAll("_", " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError errors={field.state.meta.errors} />
                    </div>
                  )}
                </form.Field>
              </div>
            </FormSection>

            <FormSection
              icon={BriefcaseBusiness}
              title="Employment information"
              description="Joining date and automatically generated account identifiers."
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <form.Field name="joiningDate">
                    {(field) => {
                      const selectedDate = field.state.value
                        ? new Date(`${field.state.value}T00:00:00`)
                        : undefined;

                      return (
                        <div className="min-w-0 space-y-2.5">
                          <FieldLabel htmlFor={field.name} required>
                            Joining date
                          </FieldLabel>

                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id={field.name}
                                type="button"
                                variant="outline"
                                size="lg"
                                corner="rounded"
                                aria-invalid={
                                  field.state.meta.errors.length > 0
                                }
                                className={cn(
                                  "font-brand-primary text-foreground focus-visible:border-primary-500 hover:border-foreground/25 dark:bg-background border-foreground/15 bg-background shadow-primary-950/2 focus-visible:ring-primary-500/20 hover:bg-background dark:hover:bg-background h-11 w-full justify-between border px-3.5 text-sm font-normal shadow-sm focus-visible:ring-2",
                                  field.state.meta.errors.length > 0 &&
                                    "border-red-400 focus-visible:ring-red-400/20",
                                )}
                                onBlur={field.handleBlur}
                              >
                                <span className="flex min-w-0 items-center gap-3">
                                  <span className="bg-primary-50 text-primary-600 dark:bg-primary-950/70 dark:text-primary-300 flex size-8 shrink-0 items-center justify-center rounded-lg">
                                    <CalendarDays className="size-4" />
                                  </span>

                                  <span
                                    className={cn(
                                      "truncate",
                                      !selectedDate && "text-foreground/45",
                                    )}
                                  >
                                    {selectedDate
                                      ? format(selectedDate, "MMMM dd, yyyy")
                                      : "Select joining date"}
                                  </span>
                                </span>

                                <ChevronDown className="text-foreground/40 size-4 shrink-0 transition-transform" />
                              </Button>
                            </PopoverTrigger>

                            <PopoverContent
                              align="start"
                              sideOffset={8}
                              className="border-primary-200/80 dark:border-primary-900 w-auto max-w-[calc(100vw-2rem)] rounded-xl p-2 shadow-xl"
                            >
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => {
                                  field.handleChange(
                                    date ? format(date, "yyyy-MM-dd") : "",
                                  );
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

                          <FieldError errors={field.state.meta.errors} />
                        </div>
                      );
                    }}
                  </form.Field>

                  <div className="min-w-0 space-y-2.5">
                    <FieldLabel>Employee code</FieldLabel>
                    <div className="border-border bg-muted/40 flex min-h-11 items-center gap-3 rounded-lg border px-3.5">
                      <div className="bg-background flex size-8 shrink-0 items-center justify-center rounded-md border">
                        <ShieldCheck className="text-primary size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Auto-generated</p>
                        <p className="text-muted-foreground text-xs">
                          Based on selected role
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0 space-y-2.5">
                    <FieldLabel>Username</FieldLabel>
                    <div className="border-border bg-muted/40 flex min-h-11 items-center gap-3 rounded-lg border px-3.5">
                      <div className="bg-background flex size-8 shrink-0 items-center justify-center rounded-md border">
                        <UserRound className="text-primary size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Auto-generated</p>
                        <p className="text-muted-foreground text-xs">
                          Derived from email address
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <form.Field name="photo">
                    {(field) => (
                      <div className="space-y-3">
                        <FieldLabel htmlFor={field.name}>
                          Profile photograph
                        </FieldLabel>

                        <div className="border-border bg-muted/15 flex flex-col gap-5 rounded-xl border border-dashed p-4 sm:flex-row sm:items-center sm:p-5">
                          <div className="border-border bg-background flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border sm:size-28">
                            {photoPreview ? (
                              <Image
                                src={photoPreview}
                                layout="fullWidth"
                                alt="Profile preview"
                                className="size-full object-cover"
                              />
                            ) : (
                              <div className="text-muted-foreground flex flex-col items-center gap-2">
                                <ImagePlus className="size-7" />
                                <span className="text-2.5 font-semibold tracking-wider uppercase">
                                  No photo
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 flex-1 space-y-2">
                            <p className="text-sm font-semibold">
                              Upload an employee photo
                            </p>
                            <p className="text-muted-foreground text-xs leading-relaxed">
                              Choose a clear image from your device. JPG, PNG or
                              other browser-supported image formats are
                              accepted.
                            </p>

                            <div
                              className={cn(`flex w-full items-center gap-4`)}
                            >
                              <Input
                                id={field.name}
                                name={field.name}
                                type="file"
                                accept="image/*"
                                className="h-auto min-h-10 cursor-pointer rounded-lg py-2 text-xs"
                                onBlur={field.handleBlur}
                                onChange={(event) => {
                                  const file = event.target.files?.[0] ?? null;

                                  if (!file) return;

                                  if (!file.type.startsWith("image/")) {
                                    event.target.value = "";
                                    return;
                                  }

                                  handlePhotoChange(file, field.handleChange);
                                }}
                              />

                              {field.state.value && (
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="destructive"
                                  className="shrink-0 rounded-lg  min-h-10 aspect-square"
                                  onClick={() => {
                                    handlePhotoChange(null, field.handleChange);

                                    const input = document.getElementById(
                                      field.name,
                                    ) as HTMLInputElement | null;

                                    if (input) input.value = "";
                                  }}
                                >
                                  <span>
                                    <Trash className="size-4" />
                                  </span>
                                </Button>
                              )}
                            </div>

                            {field.state.value && (
                              <p className="text-muted-foreground truncate text-xs">
                                Selected: {field.state.value.name}
                              </p>
                            )}
                          </div>
                        </div>

                        <FieldError errors={field.state.meta.errors} />
                      </div>
                    )}
                  </form.Field>
                </div>
              </div>
            </FormSection>

            <FormSection
              icon={GraduationCap}
              title="Educational qualifications"
              description="Add academic degrees, institutions and completion years."
            >
              <form.Field name="educationalQualifications" mode="array">
                {(field) => (
                  <div className="space-y-4">
                    {field.state.value.map((item, index) => (
                      <div key={index} className={entryCardClassName}>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-background text-primary flex size-9 shrink-0 items-center justify-center rounded-lg border">
                              <GraduationCap className="size-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">
                                Qualification {index + 1}
                              </p>
                              <p className="text-muted-foreground mt-0.5 text-xs">
                                Academic background
                              </p>
                            </div>
                          </div>

                          {field.state.value.length > 1 && (
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="text-destructive hover:bg-destructive/10 size-9 shrink-0 rounded-lg"
                              aria-label={`Remove educational qualification ${index + 1}`}
                              onClick={() =>
                                field.handleChange(
                                  field.state.value.filter(
                                    (_, itemIndex) => itemIndex !== index,
                                  ),
                                )
                              }
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                          <div className="min-w-0 space-y-2.5">
                            <FieldLabel required>Qualification</FieldLabel>
                            <Input
                              className={inputClassName}
                              placeholder="e.g. B.Sc. Chemistry"
                              value={item.qualification}
                              onChange={(event) =>
                                field.handleChange(
                                  field.state.value.map((current, itemIndex) =>
                                    itemIndex === index
                                      ? {
                                          ...current,
                                          qualification: event.target.value,
                                        }
                                      : current,
                                  ),
                                )
                              }
                            />
                          </div>

                          <div className="min-w-0 space-y-2.5">
                            <FieldLabel required>Institution</FieldLabel>
                            <Input
                              className={inputClassName}
                              placeholder="College or university"
                              value={item.institution}
                              onChange={(event) =>
                                field.handleChange(
                                  field.state.value.map((current, itemIndex) =>
                                    itemIndex === index
                                      ? {
                                          ...current,
                                          institution: event.target.value,
                                        }
                                      : current,
                                  ),
                                )
                              }
                            />
                          </div>

                          <div className="min-w-0 space-y-2.5">
                            <FieldLabel required>Completion year</FieldLabel>
                            <Input
                              className={inputClassName}
                              placeholder="e.g. 2022"
                              inputMode="numeric"
                              value={item.year}
                              onChange={(event) =>
                                field.handleChange(
                                  field.state.value.map((current, itemIndex) =>
                                    itemIndex === index
                                      ? { ...current, year: event.target.value }
                                      : current,
                                  ),
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className={cn(`flex w-full`)}>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="ml-auto h-10 px-4"
                        onClick={() =>
                          field.pushValue({
                            qualification: "",
                            institution: "",
                            year: "",
                          })
                        }
                      >
                        <Plus className="mr-2 size-4" />
                        Add qualification
                      </Button>
                    </div>
                  </div>
                )}
              </form.Field>
            </FormSection>

            <FormSection
              icon={Award}
              title="Professional qualifications"
              description="Add certifications, licenses, training and professional courses."
            >
              <form.Field name="professionalQualifications" mode="array">
                {(field) => (
                  <div className="space-y-4">
                    {field.state.value.map((item, index) => (
                      <div key={index} className={entryCardClassName}>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-background text-primary flex size-9 shrink-0 items-center justify-center rounded-lg border">
                              <Award className="size-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">
                                Certification {index + 1}
                              </p>
                              <p className="text-muted-foreground mt-0.5 text-xs">
                                Professional development
                              </p>
                            </div>
                          </div>

                          {field.state.value.length > 1 && (
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="text-destructive hover:bg-destructive/10 size-9 shrink-0 rounded-lg"
                              aria-label={`Remove professional qualification ${index + 1}`}
                              onClick={() =>
                                field.handleChange(
                                  field.state.value.filter(
                                    (_, itemIndex) => itemIndex !== index,
                                  ),
                                )
                              }
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                          <div className="min-w-0 space-y-2.5">
                            <FieldLabel required>Qualification</FieldLabel>
                            <Input
                              className={inputClassName}
                              placeholder="e.g. Sales certification"
                              value={item.qualification}
                              onChange={(event) =>
                                field.handleChange(
                                  field.state.value.map((current, itemIndex) =>
                                    itemIndex === index
                                      ? {
                                          ...current,
                                          qualification: event.target.value,
                                        }
                                      : current,
                                  ),
                                )
                              }
                            />
                          </div>

                          <div className="min-w-0 space-y-2.5">
                            <FieldLabel required>
                              Issuing organization
                            </FieldLabel>
                            <Input
                              className={inputClassName}
                              placeholder="Organization or institution"
                              value={item.issuer}
                              onChange={(event) =>
                                field.handleChange(
                                  field.state.value.map((current, itemIndex) =>
                                    itemIndex === index
                                      ? {
                                          ...current,
                                          issuer: event.target.value,
                                        }
                                      : current,
                                  ),
                                )
                              }
                            />
                          </div>

                          <div className="min-w-0 space-y-2.5">
                            <FieldLabel required>Completion year</FieldLabel>
                            <Input
                              className={inputClassName}
                              placeholder="e.g. 2024"
                              inputMode="numeric"
                              value={item.year}
                              onChange={(event) =>
                                field.handleChange(
                                  field.state.value.map((current, itemIndex) =>
                                    itemIndex === index
                                      ? { ...current, year: event.target.value }
                                      : current,
                                  ),
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className={cn(`flex w-full`)}>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="ml-auto h-10 px-4"
                        onClick={() =>
                          field.pushValue({
                            qualification: "",
                            issuer: "",
                            year: "",
                          })
                        }
                      >
                        <Plus className="mr-2 size-4" />
                        Add certification
                      </Button>
                    </div>
                  </div>
                )}
              </form.Field>
            </FormSection>

            <FormSection
              icon={Building2}
              title="Work experience"
              description="Record current or previous employment, job titles and responsibilities."
            >
              <form.Field name="experiences" mode="array">
                {(field) => (
                  <div className="space-y-4">
                    {field.state.value.map((item, index) => {
                      const startDate = item.startDate
                        ? new Date(`${item.startDate}T00:00:00`)
                        : undefined;

                      const endDate = item.endDate
                        ? new Date(`${item.endDate}T00:00:00`)
                        : undefined;

                      return (
                        <div key={index} className={entryCardClassName}>
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="bg-background text-primary flex size-9 shrink-0 items-center justify-center rounded-lg border">
                                <BriefcaseBusiness className="size-4" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold">
                                  Experience {index + 1}
                                </p>
                                <p className="text-muted-foreground mt-0.5 text-xs">
                                  Employment history
                                </p>
                              </div>
                            </div>

                            {field.state.value.length > 1 && (
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="text-destructive hover:bg-destructive/10 size-9 shrink-0 rounded-lg"
                                aria-label={`Remove experience ${index + 1}`}
                                onClick={() =>
                                  field.handleChange(
                                    field.state.value.filter(
                                      (_, itemIndex) => itemIndex !== index,
                                    ),
                                  )
                                }
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                            <div className="min-w-0 space-y-2.5 xl:col-span-2">
                              <FieldLabel required>Company</FieldLabel>
                              <Input
                                className={inputClassName}
                                placeholder="Company name"
                                value={item.company}
                                onChange={(event) =>
                                  field.handleChange(
                                    field.state.value.map(
                                      (current, itemIndex) =>
                                        itemIndex === index
                                          ? {
                                              ...current,
                                              company: event.target.value,
                                            }
                                          : current,
                                    ),
                                  )
                                }
                              />
                            </div>

                            <div className="min-w-0 space-y-2.5 xl:col-span-2">
                              <FieldLabel required>Designation</FieldLabel>
                              <Input
                                className={inputClassName}
                                placeholder="Job title or designation"
                                value={item.designation}
                                onChange={(event) =>
                                  field.handleChange(
                                    field.state.value.map(
                                      (current, itemIndex) =>
                                        itemIndex === index
                                          ? {
                                              ...current,
                                              designation: event.target.value,
                                            }
                                          : current,
                                    ),
                                  )
                                }
                              />
                            </div>

                            {/* Start date */}
                            <div className="min-w-0 space-y-2.5">
                              <FieldLabel required>Start date</FieldLabel>

                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    corner="rounded"
                                    className={cn(
                                      "font-brand-primary text-foreground focus-visible:border-primary-500 hover:border-foreground/25 dark:bg-background border-foreground/15 bg-background shadow-primary-950/2 focus-visible:ring-primary-500/20 hover:bg-background dark:hover:bg-background h-11 w-full justify-between border px-3.5 text-sm font-normal shadow-sm focus-visible:ring-2",
                                    )}
                                  >
                                    <span className="flex min-w-0 items-center gap-3">
                                      <span className="bg-primary-50 text-primary-600 dark:bg-primary-950/70 dark:text-primary-300 flex size-8 shrink-0 items-center justify-center rounded-lg">
                                        <CalendarDays className="size-4" />
                                      </span>

                                      <span
                                        className={cn(
                                          "truncate",
                                          !startDate && "text-foreground/45",
                                        )}
                                      >
                                        {startDate
                                          ? format(startDate, "MMMM dd, yyyy")
                                          : "Select start date"}
                                      </span>
                                    </span>

                                    <ChevronDown className="text-foreground/40 size-4 shrink-0 transition-transform" />
                                  </Button>
                                </PopoverTrigger>

                                <PopoverContent
                                  align="start"
                                  sideOffset={8}
                                  className="border-primary-200/80 dark:border-primary-900 w-auto max-w-[calc(100vw-2rem)] rounded-xl p-2 shadow-xl"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={(date) => {
                                      field.handleChange(
                                        field.state.value.map(
                                          (current, itemIndex) =>
                                            itemIndex === index
                                              ? {
                                                  ...current,
                                                  startDate: date
                                                    ? format(date, "yyyy-MM-dd")
                                                    : "",
                                                }
                                              : current,
                                        ),
                                      );
                                    }}
                                    captionLayout="dropdown"
                                    startMonth={new Date(1940, 0)}
                                    endMonth={new Date()}
                                    disabled={(date) => date > new Date()}
                                    defaultMonth={
                                      startDate ?? new Date(2000, 0)
                                    }
                                    autoFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>

                            {/* End date */}
                            <div className="min-w-0 space-y-2.5">
                              <FieldLabel>End date</FieldLabel>

                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    corner="rounded"
                                    className={cn(
                                      "font-brand-primary text-foreground focus-visible:border-primary-500 hover:border-foreground/25 dark:bg-background border-foreground/15 bg-background shadow-primary-950/2 focus-visible:ring-primary-500/20 hover:bg-background dark:hover:bg-background h-11 w-full justify-between border px-3.5 text-sm font-normal shadow-sm focus-visible:ring-2",
                                    )}
                                  >
                                    <span className="flex min-w-0 items-center gap-3">
                                      <span className="bg-primary-50 text-primary-600 dark:bg-primary-950/70 dark:text-primary-300 flex size-8 shrink-0 items-center justify-center rounded-lg">
                                        <CalendarDays className="size-4" />
                                      </span>

                                      <span
                                        className={cn(
                                          "truncate",
                                          !endDate && "text-foreground/45",
                                        )}
                                      >
                                        {endDate
                                          ? format(endDate, "MMMM dd, yyyy")
                                          : "Select end date"}
                                      </span>
                                    </span>

                                    <ChevronDown className="text-foreground/40 size-4 shrink-0 transition-transform" />
                                  </Button>
                                </PopoverTrigger>

                                <PopoverContent
                                  align="start"
                                  sideOffset={8}
                                  className="border-primary-200/80 dark:border-primary-900 w-auto max-w-[calc(100vw-2rem)] rounded-xl p-2 shadow-xl"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={(date) => {
                                      field.handleChange(
                                        field.state.value.map(
                                          (current, itemIndex) =>
                                            itemIndex === index
                                              ? {
                                                  ...current,
                                                  endDate: date
                                                    ? format(date, "yyyy-MM-dd")
                                                    : "",
                                                }
                                              : current,
                                        ),
                                      );
                                    }}
                                    captionLayout="dropdown"
                                    startMonth={new Date(1940, 0)}
                                    endMonth={new Date()}
                                    disabled={(date) => date > new Date()}
                                    defaultMonth={endDate ?? new Date(2000, 0)}
                                    autoFocus
                                  />
                                </PopoverContent>
                              </Popover>

                              <p className="text-muted-foreground text-xs">
                                Leave empty for current employment.
                              </p>
                            </div>

                            <div className="min-w-0 space-y-2.5 md:col-span-2 xl:col-span-2">
                              <FieldLabel>
                                Responsibilities / description
                              </FieldLabel>
                              <textarea
                                className={cn(
                                  "border-input bg-background placeholder:text-muted-foreground",
                                  "focus-visible:border-ring focus-visible:ring-ring/50",
                                  "min-h-28 w-full resize-y rounded-lg border px-3.5 py-3 text-sm shadow-none",
                                  "transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
                                )}
                                placeholder="Describe responsibilities, achievements or key duties..."
                                value={item.description}
                                onChange={(event) =>
                                  field.handleChange(
                                    field.state.value.map(
                                      (current, itemIndex) =>
                                        itemIndex === index
                                          ? {
                                              ...current,
                                              description: event.target.value,
                                            }
                                          : current,
                                    ),
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className={cn("flex w-full")}>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="ml-auto h-10 px-4"
                        onClick={() =>
                          field.pushValue({
                            company: "",
                            designation: "",
                            startDate: "",
                            endDate: "",
                            description: "",
                          })
                        }
                      >
                        <Plus className="mr-2 size-4" />
                        Add experience
                      </Button>
                    </div>
                  </div>
                )}
              </form.Field>
            </FormSection>

            <div className="border-border bg-muted/15 flex items-start gap-3 rounded-xl border p-4 sm:p-5">
              <div className="bg-background flex size-9 shrink-0 items-center justify-center rounded-lg border">
                <FileText className="text-primary size-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Before you continue</p>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  Review the employee details before submitting. Fields marked
                  with an asterisk are required.
                </p>
              </div>
            </div>
          </div>

          <AlertDialogFooter className="border-border bg-background/95 sticky bottom-0 z-10 flex shrink-0 flex-col gap-3 border-t px-5 py-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
            <p className="text-muted-foreground hidden text-xs sm:block">
              <span className="text-destructive">*</span> Required fields
            </p>

            <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row sm:items-center">
              <Button
                asChild
                type="button"
                variant="destructive"
                className="h-11 w-full px-6 sm:w-auto"
                disabled={isPending}
              >
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </Button>

              <form.Subscribe
                selector={(state) => ({
                  canSubmit: state.canSubmit,
                  isSubmitting: state.isSubmitting,
                })}
              >
                {({ canSubmit, isSubmitting }) => (
                  <Button
                    type="submit"
                    variant="primary"
                    className="h-11 w-full px-6 sm:w-auto"
                    disabled={!canSubmit || isSubmitting || isPending}
                  >
                    {isPending || isSubmitting ? (
                      <>
                        <span className="border-primary-foreground/30 border-t-primary-foreground size-4 animate-spin rounded-full border-2" />
                        Creating user...
                      </>
                    ) : (
                      <>
                        <UserPlus className="size-4" />
                        Create user
                      </>
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function ToastMessageForImageUploadError({
  message = "Something went wrong while uploading your photo.",
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
        <AlertCircle className="size-5" />
      </div>

      <div className="min-w-0 flex-1 space-y-1 pt-0.5">
        <p className="text-sm font-semibold text-red-700 dark:text-red-300">
          Upload failed
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

function ToastMessageForUserCreation({
  message = "Something went wrong while creating profile.",
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
        <AlertCircle className="size-5" />
      </div>

      <div className="min-w-0 flex-1 space-y-1 pt-0.5">
        <p className="text-sm font-semibold text-red-700 dark:text-red-300">
          User creation error
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
