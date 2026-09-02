import { useEffect, useState } from "react";

import { useForm } from "@tanstack/react-form";

import { useAppStore } from "@/hooks/use-app-store";

import { cn } from "@repo/styles/cn";

export default function WelcomePage() {
  const profileName = useAppStore((state) => state.profileName);

  const profileEmail = useAppStore((state) => state.profileEmail);

  const profilePhone = useAppStore((state) => state.profilePhone);

  const profileAvatar = useAppStore((state) => state.profileAvatar);

  const saveProfile = useAppStore((state) => state.saveProfile);

  const username = profileEmail.split("@")[0] ?? "";

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    typeof profileAvatar === "string" ? profileAvatar : null,
  );

  const form = useForm({
    defaultValues: {
      name: profileName,
      email: profileEmail,
      username: username,
      phone: profilePhone,
      avatar: profileAvatar as File | string | null,
    },

    onSubmit: async ({ value }) => {
      console.log("Welcome Form Data:", value);

      console.log("Name:", value.name);

      console.log("Email:", value.email);

      console.log("Username:", value.username);

      console.log("Phone:", value.phone);

      console.log("Avatar:", value.avatar);

      saveProfile({
        name: value.name,
        phone: value.phone,
        avatar: value.avatar,
      });
    },
  });

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <main
      className={cn(
        "bg-background",
        "min-h-svh",
        "px-4 py-6",
        "3xs:px-5",
        "2xs:px-6",
        "sm:px-8 sm:py-8",
        "lg:flex lg:items-center lg:justify-center lg:px-10",
      )}
    >
      <section
        className={cn(
          "mx-auto grid w-full max-w-6xl",
          "overflow-hidden rounded-3xl",
          "border border-primary-100",
          "bg-primary-50/40",
          "shadow-xl shadow-primary-950/10",
          "dark:border-primary-900",
          "dark:bg-primary-950/20",
          "dark:shadow-primary-950/30",
          "lg:grid-cols-[0.9fr_1.1fr]",
        )}
      >
        {/* SIDE SECTION */}

        <aside
          className={cn(
            "relative overflow-hidden",
            "bg-gradient-to-br",
            "from-primary-800",
            "via-primary-600",
            "to-secondary-600",
            "px-6 py-10",
            "sm:px-10 sm:py-12",
            "lg:flex lg:min-h-[700px]",
            "lg:flex-col lg:justify-between",
            "lg:px-12 lg:py-14",
          )}
        >
          {/* MEDICAL 3D BACKGROUND */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Ambient glow */}

            <div
              className={cn(
                "absolute -left-20 -top-24",
                "h-80 w-80",
                "rounded-full",
                "bg-primary-200/20",
                "blur-3xl",
              )}
            />

            <div
              className={cn(
                "absolute -bottom-28 -right-20",
                "h-96 w-96",
                "rounded-full",
                "bg-secondary-300/20",
                "blur-3xl",
              )}
            />

            {/* Large decorative medical circle */}

            <div
              className={cn(
                "absolute -right-14 top-16",
                "h-52 w-52 rounded-full",
                "border border-primary-50/10",
              )}
            />

            <div
              className={cn(
                "absolute -right-5 top-25",
                "h-32 w-32 rounded-full",
                "border border-primary-50/10",
              )}
            />

            {/* CAPSULE 3D CARD */}

            <div
              className={cn(
                "absolute right-8 top-10",
                "hidden",
                "h-24 w-24",
                "rotate-12",
                "items-center justify-center",
                "rounded-3xl",
                "border border-primary-50/15",
                "bg-primary-50/10",
                "shadow-2xl shadow-primary-950/20",
                "backdrop-blur-xl",
                "sm:flex",
              )}
            >
              <div
                className={cn(
                  "relative",
                  "h-14 w-8",
                  "-rotate-35",
                  "overflow-hidden",
                  "rounded-full",
                  "shadow-lg shadow-primary-950/20",
                )}
              >
                <div
                  className={cn(
                    "absolute inset-x-0 top-0",
                    "h-1/2",
                    "bg-primary-50/90",
                  )}
                />

                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0",
                    "h-1/2",
                    "bg-accent-300/90",
                  )}
                />

                <div
                  className={cn(
                    "absolute left-1/2 top-0",
                    "h-full w-px",
                    "bg-primary-950/5",
                  )}
                />
              </div>
            </div>

            {/* PRESCRIPTION RX CARD */}

            <div
              className={cn(
                "absolute right-4 top-[33%]",
                "hidden",
                "w-28",
                "-rotate-6",
                "rounded-2xl",
                "border border-primary-50/15",
                "bg-primary-50/10",
                "p-4",
                "shadow-2xl shadow-primary-950/20",
                "backdrop-blur-xl",
                "lg:block",
              )}
            >
              <div
                className={cn(
                  "font-brand-secondary",
                  "text-xl font-bold",
                  "text-primary-50/80",
                )}
              >
                Rx
              </div>

              <div
                className={cn(
                  "mt-3",
                  "h-1.5 w-full",
                  "rounded-full",
                  "bg-primary-50/20",
                )}
              />

              <div
                className={cn(
                  "mt-2",
                  "h-1.5 w-3/4",
                  "rounded-full",
                  "bg-primary-50/15",
                )}
              />

              <div
                className={cn(
                  "mt-2",
                  "h-1.5 w-1/2",
                  "rounded-full",
                  "bg-primary-50/10",
                )}
              />
            </div>

            {/* FLOATING MEDICAL CROSS */}

            <div
              className={cn(
                "absolute bottom-40 left-7",
                "hidden",
                "h-20 w-20",
                "-rotate-12",
                "items-center justify-center",
                "rounded-2xl",
                "border border-primary-50/15",
                "bg-primary-50/10",
                "shadow-2xl shadow-primary-950/15",
                "backdrop-blur-lg",
                "sm:flex",
              )}
            >
              <div className="relative h-10 w-10">
                <div
                  className={cn(
                    "absolute left-1/2 top-0",
                    "h-10 w-3",
                    "-translate-x-1/2",
                    "rounded-full",
                    "bg-primary-50/75",
                  )}
                />

                <div
                  className={cn(
                    "absolute left-0 top-1/2",
                    "h-3 w-10",
                    "-translate-y-1/2",
                    "rounded-full",
                    "bg-primary-50/75",
                  )}
                />
              </div>
            </div>

            {/* TABLET STRIP */}

            <div
              className={cn(
                "absolute bottom-7 right-8",
                "hidden",
                "w-36",
                "rotate-6",
                "rounded-2xl",
                "border border-primary-50/15",
                "bg-primary-50/10",
                "p-4",
                "shadow-2xl shadow-primary-950/20",
                "backdrop-blur-xl",
                "lg:block",
              )}
            >
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "aspect-square",
                      "rounded-full",
                      "border border-primary-50/20",
                      "bg-primary-50/20",
                      "shadow-inner",
                    )}
                  />
                ))}
              </div>
            </div>

            {/* MEDICINE BOTTLE */}

            <div
              className={cn(
                "absolute bottom-14 left-[45%]",
                "hidden",
                "h-24 w-16",
                "-rotate-6",
                "rounded-xl",
                "border border-primary-50/15",
                "bg-primary-50/10",
                "shadow-xl shadow-primary-950/15",
                "backdrop-blur-lg",
                "lg:block",
              )}
            >
              <div
                className={cn(
                  "absolute -top-3 left-1/2",
                  "h-4 w-9",
                  "-translate-x-1/2",
                  "rounded-t-lg",
                  "bg-primary-50/20",
                  "border border-primary-50/15",
                )}
              />

              <div
                className={cn(
                  "absolute left-2 right-2 top-6",
                  "rounded-lg",
                  "bg-primary-50/10",
                  "px-2 py-3",
                  "text-center",
                )}
              >
                <span
                  className={cn(
                    "font-brand-secondary",
                    "text-xs font-bold",
                    "text-primary-50/70",
                  )}
                >
                  MED
                </span>
              </div>
            </div>
          </div>

          {/* SIDE CONTENT */}

          <div className="relative z-10">
            <div
              className={cn(
                "flex h-12 w-12",
                "items-center justify-center",
                "rounded-2xl",
                "border border-primary-50/15",
                "bg-primary-50/10",
                "shadow-lg shadow-primary-950/10",
                "backdrop-blur-md",
              )}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6 text-primary-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2a10 10 0 1 0 10 10"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 2"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 3h4v4"
                />
              </svg>
            </div>

            <h1
              className={cn(
                "mt-8 max-w-md",
                "font-brand-secondary",
                "text-3xl font-bold",
                "tracking-tight",
                "text-primary-50",
                "sm:text-4xl",
                "lg:text-5xl",
              )}
            >
              Your account is almost ready.
            </h1>

            <p
              className={cn(
                "mt-5 max-w-md",
                "font-brand-primary",
                "text-sm leading-7",
                "text-primary-100/80",
                "sm:text-base",
              )}
            >
              Add a few final details to complete your profile and get started.
              Your information helps keep your daily activity organised and
              personalised.
            </p>
          </div>

          {/* SIDE CARDS */}

          <div
            className={cn(
              "relative z-10",
              "mt-10 grid gap-3",
              "2xs:grid-cols-3",
              "lg:mt-16 lg:grid-cols-1",
            )}
          >
            <div
              className={cn(
                "rounded-2xl",
                "border border-primary-50/15",
                "bg-primary-50/10",
                "p-4",
                "shadow-lg shadow-primary-950/10",
                "backdrop-blur-xl",
              )}
            >
              <p
                className={cn(
                  "font-brand-secondary",
                  "text-sm font-semibold",
                  "text-primary-50",
                )}
              >
                Profile Setup
              </p>

              <p className="mt-1 text-xs text-primary-100/70">
                Add your personal details
              </p>
            </div>

            <div
              className={cn(
                "rounded-2xl",
                "border border-primary-50/15",
                "bg-primary-50/10",
                "p-4",
                "shadow-lg shadow-primary-950/10",
                "backdrop-blur-xl",
              )}
            >
              <p
                className={cn(
                  "font-brand-secondary",
                  "text-sm font-semibold",
                  "text-primary-50",
                )}
              >
                Account Ready
              </p>

              <p className="mt-1 text-xs text-primary-100/70">
                Secure and verify your profile
              </p>
            </div>

            <div
              className={cn(
                "rounded-2xl",
                "border border-primary-50/15",
                "bg-primary-50/10",
                "p-4",
                "shadow-lg shadow-primary-950/10",
                "backdrop-blur-xl",
              )}
            >
              <p
                className={cn(
                  "font-brand-secondary",
                  "text-sm font-semibold",
                  "text-primary-50",
                )}
              >
                Begin Journey
              </p>

              <p className="mt-1 text-xs text-primary-100/70">
                Complete setup to continue
              </p>
            </div>
          </div>
        </aside>

        {/* FORM SECTION */}

        <div
          className={cn(
            "bg-background",
            "px-5 py-8",
            "3xs:px-6",
            "2xs:px-8",
            "sm:px-10 sm:py-12",
            "lg:px-14 lg:py-14",
          )}
        >
          <div>
            <p
              className={cn(
                "font-brand-accent",
                "text-sm font-semibold",
                "tracking-[0.18em] uppercase",
                "text-primary-600",
                "dark:text-primary-300",
              )}
            >
              Welcome
            </p>

            <h2
              className={cn(
                "mt-2",
                "font-brand-secondary",
                "text-3xl font-bold tracking-tight",
                "text-foreground",
                "sm:text-4xl",
              )}
            >
              Complete your profile
            </h2>

            <p
              className={cn(
                "mt-3 max-w-xl",
                "text-sm leading-6",
                "text-primary-800/65",
                "dark:text-primary-200/65",
                "sm:text-base",
              )}
            >
              Check your information and add the remaining details to continue.
            </p>
          </div>

          <form
            className="mt-8"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();

              form.handleSubmit();
            }}
          >
            {/* AVATAR */}

            <form.Field
              name="avatar"
              validators={{
                onChange: ({ value }) => {
                  if (
                    value instanceof File &&
                    !value.type.startsWith("image/")
                  ) {
                    return "Please select a valid image";
                  }

                  return undefined;
                },
              }}
            >
              {(field) => (
                <div>
                  <p className="mb-3 text-sm font-semibold text-foreground">
                    Profile Picture
                  </p>

                  <div className="flex items-center gap-5">
                    <div className="relative shrink-0">
                      <label
                        htmlFor="avatar"
                        className={cn(
                          "group relative block",
                          "h-28 w-28",
                          "cursor-pointer rounded-full",
                          "transition-all duration-200",
                          "sm:h-32 sm:w-32",
                        )}
                      >
                        <div
                          className={cn(
                            "relative h-full w-full",
                            "overflow-hidden rounded-full",
                            "border-4 border-background",
                            "bg-primary-100",
                            "shadow-lg shadow-primary-950/15",
                            "ring-2 ring-primary-200",
                            "transition-all duration-200",
                            "group-hover:ring-4",
                            "group-hover:ring-primary-300",
                            "dark:bg-primary-900",
                            "dark:ring-primary-800",
                            "dark:group-hover:ring-primary-700",
                          )}
                        >
                          {previewUrl ? (
                            <>
                              <img
                                src={previewUrl}
                                alt="Avatar Preview"
                                className="h-full w-full object-cover"
                              />

                              <div
                                className={cn(
                                  "absolute inset-0",
                                  "flex items-center justify-center",
                                  "bg-primary-950/0",
                                  "opacity-0",
                                  "transition-all duration-200",
                                  "group-hover:bg-primary-950/40",
                                  "group-hover:opacity-100",
                                )}
                              >
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  className="h-7 w-7 text-primary-50"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.5 4H9.5L8 6H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3l-1.5-2Z"
                                  />

                                  <circle cx="12" cy="12.5" r="3.5" />
                                </svg>
                              </div>
                            </>
                          ) : (
                            <div
                              className={cn(
                                "flex h-full w-full",
                                "items-center justify-center",
                                "bg-primary-100",
                                "text-primary-500",
                                "dark:bg-primary-900",
                                "dark:text-primary-300",
                              )}
                            >
                              <svg
                                viewBox="0 0 64 64"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="5"
                                className="h-16 w-16 sm:h-20 sm:w-20"
                              >
                                <circle cx="32" cy="20" r="12" />

                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 56V48C12 38 20 32 32 32C44 32 52 38 52 48V56"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        {!previewUrl && (
                          <div
                            className={cn(
                              "absolute -bottom-2 -right-2 z-20",
                              "flex h-11 w-11",
                              "items-center justify-center",
                              "rounded-full",
                              "border-4 border-background",
                              "bg-primary-600",
                              "text-primary-50",
                              "shadow-lg shadow-primary-950/25",
                              "transition-all duration-200",
                              "group-hover:scale-110",
                              "group-hover:bg-primary-700",
                              "dark:bg-primary-500",
                              "dark:group-hover:bg-primary-600",
                            )}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="h-5 w-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.5 4H9.5L8 6H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3l-1.5-2Z"
                              />

                              <circle cx="12" cy="12.5" r="3" />
                            </svg>
                          </div>
                        )}
                      </label>

                      {previewUrl && (
                        <button
                          type="button"
                          aria-label="Remove profile picture"
                          onClick={() => {
                            if (previewUrl.startsWith("blob:")) {
                              URL.revokeObjectURL(previewUrl);
                            }

                            setPreviewUrl(null);

                            field.handleChange(null);

                            const input = document.getElementById(
                              "avatar",
                            ) as HTMLInputElement | null;

                            if (input) {
                              input.value = "";
                            }
                          }}
                          className={cn(
                            "absolute -right-2 -top-2 z-30",
                            "flex h-8 w-8",
                            "items-center justify-center",
                            "rounded-full",
                            "border-2 border-background",
                            "bg-primary-950",
                            "text-primary-50",
                            "shadow-lg shadow-primary-950/20",
                            "transition-all duration-200",
                            "hover:scale-110",
                            "hover:bg-primary-800",
                            "active:scale-95",
                            "dark:bg-primary-50",
                            "dark:text-primary-950",
                            "dark:hover:bg-primary-200",
                          )}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 6L18 18M18 6L6 18"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-brand-secondary font-semibold text-foreground">
                        Your avatar
                      </p>

                      <p
                        className={cn(
                          "mt-1 text-sm leading-5",
                          "text-primary-700/60",
                          "dark:text-primary-300/60",
                        )}
                      >
                        {previewUrl
                          ? "Click the image to change it, or use the cross to remove it."
                          : "Add a profile picture to personalise your account."}
                      </p>

                      <label
                        htmlFor="avatar"
                        className={cn(
                          "mt-3 inline-flex",
                          "cursor-pointer",
                          "items-center justify-center",
                          "rounded-lg",
                          "border border-primary-300",
                          "px-4 py-2",
                          "text-sm font-semibold",
                          "text-primary-600",
                          "transition-all duration-200",
                          "hover:bg-primary-100/70",
                          "active:scale-95",
                          "dark:border-primary-700",
                          "dark:text-primary-300",
                          "dark:hover:bg-primary-900/50",
                        )}
                      >
                        {previewUrl ? "Change Photo" : "Add Photo"}
                      </label>

                      <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onBlur={field.handleBlur}
                        onChange={(event) => {
                          const file = event.target.files?.[0] ?? null;

                          if (!file) {
                            return;
                          }

                          field.handleChange(file);

                          if (previewUrl?.startsWith("blob:")) {
                            URL.revokeObjectURL(previewUrl);
                          }

                          const newPreviewUrl = URL.createObjectURL(file);

                          setPreviewUrl(newPreviewUrl);
                        }}
                      />
                    </div>
                  </div>

                  {field.state.meta.errors.length > 0 && (
                    <p
                      className={cn(
                        "mt-2 text-sm font-medium",
                        "text-primary-700",
                        "dark:text-primary-300",
                      )}
                    >
                      {String(field.state.meta.errors[0])}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* INPUT GRID */}

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) => {
                    if (!value.trim()) {
                      return "Name is required";
                    }

                    if (value.trim().length < 2) {
                      return "Enter a valid name";
                    }

                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="mb-2 block text-sm font-semibold text-foreground"
                    >
                      Name
                    </label>

                    <input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      className={cn(
                        "w-full rounded-xl",
                        "border border-primary-200",
                        "bg-background",
                        "px-4 py-3",
                        "font-brand-primary text-sm",
                        "text-foreground",
                        "outline-none",
                        "transition-all duration-200",
                        "placeholder:text-primary-400",
                        "focus:border-primary-500",
                        "focus:ring-4 focus:ring-primary-100",
                        "dark:border-primary-800",
                        "dark:focus:border-primary-500",
                        "dark:focus:ring-primary-900",
                      )}
                    />

                    {field.state.meta.errors.length > 0 && (
                      <p
                        className={cn(
                          "mt-1.5 text-sm font-medium",
                          "text-primary-700",
                          "dark:text-primary-300",
                        )}
                      >
                        {String(field.state.meta.errors[0])}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="phone"
                validators={{
                  onChange: ({ value }) => {
                    if (!value.trim()) {
                      return "Phone number is required";
                    }

                    if (!/^[0-9]{10}$/.test(value.trim())) {
                      return "Enter a valid 10 digit phone number";
                    }

                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="mb-2 block text-sm font-semibold text-foreground"
                    >
                      Phone Number
                    </label>

                    <input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      inputMode="numeric"
                      placeholder="Enter phone number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      className={cn(
                        "w-full rounded-xl",
                        "border border-primary-200",
                        "bg-background",
                        "px-4 py-3",
                        "font-brand-primary text-sm",
                        "text-foreground",
                        "outline-none",
                        "transition-all duration-200",
                        "placeholder:text-primary-400",
                        "focus:border-primary-500",
                        "focus:ring-4 focus:ring-primary-100",
                        "dark:border-primary-800",
                        "dark:focus:border-primary-500",
                        "dark:focus:ring-primary-900",
                      )}
                    />

                    {field.state.meta.errors.length > 0 && (
                      <p
                        className={cn(
                          "mt-1.5 text-sm font-medium",
                          "text-primary-700",
                          "dark:text-primary-300",
                        )}
                      >
                        {String(field.state.meta.errors[0])}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field name="email">
                {(field) => (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="mb-2 block text-sm font-semibold text-foreground"
                    >
                      Email
                    </label>

                    <input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      readOnly
                      className={cn(
                        "w-full cursor-not-allowed",
                        "rounded-xl",
                        "border border-primary-100",
                        "bg-primary-100/50",
                        "px-4 py-3",
                        "font-brand-primary text-sm",
                        "text-primary-700",
                        "outline-none",
                        "dark:border-primary-900",
                        "dark:bg-primary-900/40",
                        "dark:text-primary-300",
                      )}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="username">
                {(field) => (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="mb-2 block text-sm font-semibold text-foreground"
                    >
                      Username
                    </label>

                    <div className="relative">
                      <span
                        className={cn(
                          "absolute left-4 top-1/2",
                          "-translate-y-1/2",
                          "font-semibold",
                          "text-primary-500",
                        )}
                      >
                        @
                      </span>

                      <input
                        id={field.name}
                        name={field.name}
                        type="text"
                        value={field.state.value}
                        readOnly
                        className={cn(
                          "w-full cursor-not-allowed",
                          "rounded-xl",
                          "border border-primary-100",
                          "bg-primary-100/50",
                          "py-3 pl-9 pr-4",
                          "font-brand-primary text-sm",
                          "text-primary-700",
                          "outline-none",
                          "dark:border-primary-900",
                          "dark:bg-primary-900/40",
                          "dark:text-primary-300",
                        )}
                      />
                    </div>

                    <p
                      className={cn(
                        "mt-1.5 text-xs",
                        "text-primary-600/60",
                        "dark:text-primary-400/60",
                      )}
                    >
                      Automatically generated from your email.
                    </p>
                  </div>
                )}
              </form.Field>
            </div>

            {/* SUBMIT */}

            <form.Subscribe
              selector={(state) =>
                [state.canSubmit, state.isSubmitting] as const
              }
            >
              {([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className={cn(
                    "mt-8 flex w-full",
                    "items-center justify-center",
                    "rounded-xl",
                    "px-6 py-3.5",
                    "font-brand-primary font-semibold",
                    "transition-all duration-200",
                    "sm:text-lg",

                    canSubmit &&
                      !isSubmitting && [
                        "bg-primary-600",
                        "text-primary-50",
                        "shadow-lg shadow-primary-600/20",
                        "hover:bg-primary-700",
                        "hover:shadow-xl",
                        "hover:shadow-primary-700/25",
                        "active:scale-[0.98]",
                        "focus:outline-none",
                        "focus:ring-4 focus:ring-primary-200",
                        "dark:bg-primary-500",
                        "dark:hover:bg-primary-600",
                        "dark:focus:ring-primary-800",
                      ],

                    (!canSubmit || isSubmitting) && [
                      "cursor-not-allowed",
                      "bg-primary-100",
                      "text-primary-400",
                      "dark:bg-primary-900",
                      "dark:text-primary-600",
                    ],
                  )}
                >
                  {isSubmitting ? "Please Wait..." : "Save and Continue"}
                </button>
              )}
            </form.Subscribe>
          </form>
        </div>
      </section>
    </main>
  );
}