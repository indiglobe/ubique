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
        "min-h-svh",
        "bg-background",
        "px-4 py-6",
        "3xs:px-5",
        "2xs:px-6",
        "sm:px-8 sm:py-8",
        "lg:flex lg:items-center lg:justify-center",
        "lg:px-10",
      )}
    >
      <section
        className={cn(
          "mx-auto",
          "grid w-full",
          "max-w-6xl",
          "overflow-hidden",
          "rounded-3xl",
          "border-primary-100 border",
          "bg-primary-50/40",
          "shadow-primary-950/10 shadow-xl",
          "dark:border-primary-900",
          "dark:bg-primary-950/20",
          "dark:shadow-primary-950/30",
          "lg:grid-cols-[0.9fr_1.1fr]",
        )}
      >
        {/* SIDE SECTION */}

        <aside
          className={cn(
            "relative",
            "overflow-hidden",
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
          {/* Decorative Circle */}

          <div
            className={cn(
              "pointer-events-none",
              "absolute -top-20 -right-20",
              "h-60 w-60",
              "rounded-full",
              "bg-accent-300/20",
              "blur-3xl",
            )}
          />

          <div
            className={cn(
              "pointer-events-none",
              "absolute -bottom-24 -left-20",
              "h-72 w-72",
              "rounded-full",
              "bg-secondary-200/20",
              "blur-3xl",
            )}
          />

          <div
            className={cn(
              "pointer-events-none",
              "absolute top-1/2 right-8",
              "h-32 w-32",
              "rounded-full",
              "border-primary-100/20 border",
            )}
          />

          {/* SIDE CONTENT */}

          <div className="relative z-10">
            <div
              className={cn(
                "flex h-12 w-12",
                "items-center justify-center",
                "rounded-2xl",
                "bg-primary-50/15",
                "ring-primary-50/25 ring-1",
                "backdrop-blur-md",
              )}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="text-primary-50 h-6 w-6"
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
                "mt-8",
                "max-w-md",
                "font-brand-secondary",
                "text-3xl font-bold",
                "tracking-tight",
                "text-primary-50",
                "sm:text-4xl",
                "lg:text-5xl",
              )}
            >
              Welcome to your workspace.
            </h1>

            <p
              className={cn(
                "mt-5",
                "max-w-md",
                "font-brand-primary",
                "text-sm leading-7",
                "text-primary-100/80",
                "sm:text-base",
              )}
            >
              Complete your profile before starting your day. Your information
              helps keep your daily activity organised and personalised.
            </p>
          </div>

          {/* SIDE CARDS */}

          <div
            className={cn(
              "relative z-10",
              "mt-10",
              "grid gap-3",
              "2xs:grid-cols-3",
              "lg:mt-16 lg:grid-cols-1",
            )}
          >
            <div
              className={cn(
                "rounded-2xl",
                "border-primary-50/15 border",
                "bg-primary-50/10",
                "p-4",
                "backdrop-blur-md",
              )}
            >
              <p
                className={cn(
                  "font-brand-secondary",
                  "text-sm font-semibold",
                  "text-primary-50",
                )}
              >
                Profile
              </p>

              <p className={cn("mt-1", "text-xs", "text-primary-100/70")}>
                Personal details
              </p>
            </div>

            <div
              className={cn(
                "rounded-2xl",
                "border-primary-50/15 border",
                "bg-primary-50/10",
                "p-4",
                "backdrop-blur-md",
              )}
            >
              <p
                className={cn(
                  "font-brand-secondary",
                  "text-sm font-semibold",
                  "text-primary-50",
                )}
              >
                Secure
              </p>

              <p className={cn("mt-1", "text-xs", "text-primary-100/70")}>
                Verified identity
              </p>
            </div>

            <div
              className={cn(
                "rounded-2xl",
                "border-primary-50/15 border",
                "bg-primary-50/10",
                "p-4",
                "backdrop-blur-md",
              )}
            >
              <p
                className={cn(
                  "font-brand-secondary",
                  "text-sm font-semibold",
                  "text-primary-50",
                )}
              >
                Ready
              </p>

              <p className={cn("mt-1", "text-xs", "text-primary-100/70")}>
                Start your day
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
          {/* FORM HEADING */}

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
                "text-3xl font-bold",
                "tracking-tight",
                "text-foreground",
                "sm:text-4xl",
              )}
            >
              Complete your profile
            </h2>

            <p
              className={cn(
                "mt-3",
                "max-w-xl",
                "text-sm leading-6",
                "text-primary-800/65",
                "dark:text-primary-200/65",
                "sm:text-base",
              )}
            >
              Check your information and add the remaining details to continue.
            </p>
          </div>

          {/* FORM */}

          <form
            className="mt-8"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();

              form.handleSubmit();
            }}
          >
            {/* AVATAR */}

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
                  <p
                    className={cn(
                      "mb-3",
                      "text-sm font-semibold",
                      "text-foreground",
                    )}
                  >
                    Profile Picture
                  </p>

                  <div className={cn("flex items-center", "gap-5")}>
                    {/* AVATAR */}

                    <div className="relative shrink-0">
                      <label
                        htmlFor="avatar"
                        className={cn(
                          "group relative",
                          "flex h-28 w-28",
                          "cursor-pointer",
                          "items-center justify-center",
                          "overflow-hidden",
                          "rounded-full",
                          "border-background border-4",
                          "bg-primary-100",
                          "shadow-primary-950/15 shadow-lg",
                          "ring-primary-200 ring-2",
                          "transition-all duration-200",
                          "hover:ring-4",
                          "hover:ring-primary-300",
                          "dark:bg-primary-900",
                          "dark:ring-primary-800",
                          "dark:hover:ring-primary-700",
                          "sm:h-32 sm:w-32",
                        )}
                      >
                        {previewUrl ? (
                          <>
                            <img
                              src={previewUrl}
                              alt="Avatar Preview"
                              className={cn("h-full w-full", "object-cover")}
                            />

                            {/* Hover Camera */}

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
                                className="text-primary-50 h-7 w-7"
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
                          /* EMPTY HUMAN AVATAR */

                          <div
                            className={cn(
                              "relative",
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
                              className={cn("h-16 w-16", "sm:h-20 sm:w-20")}
                            >
                              <circle cx="32" cy="20" r="12" />

                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 56V48C12 38 20 32 32 32C44 32 52 38 52 48V56"
                              />
                            </svg>

                            {/* CAMERA + PLUS */}

                            <div
                              className={cn(
                                "absolute right-1 bottom-1",
                                "flex h-9 w-9",
                                "items-center justify-center",
                                "rounded-full",
                                "bg-primary-600",
                                "text-primary-50",
                                "shadow-md",
                                "ring-background ring-2",
                                "transition-transform duration-200",
                                "group-hover:scale-110",
                                "dark:bg-primary-500",
                              )}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.5 4H9.5L8 6H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3l-1.5-2Z"
                                />

                                <circle cx="12" cy="12.5" r="3" />
                              </svg>

                              <span
                                className={cn(
                                  "absolute -top-1 -right-1",
                                  "flex h-4 w-4",
                                  "items-center justify-center",
                                  "rounded-full",
                                  "bg-accent-500",
                                  "text-[12px] font-bold",
                                  "leading-none",
                                  "text-accent-50",
                                  "ring-background ring-1",
                                )}
                              >
                                +
                              </span>
                            </div>
                          </div>
                        )}
                      </label>

                      {/* REMOVE IMAGE CROSS */}

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
                            "absolute -top-1 -right-1",
                            "z-20",
                            "flex h-8 w-8",
                            "items-center justify-center",
                            "rounded-full",
                            "bg-primary-950",
                            "text-primary-50",
                            "shadow-lg",
                            "ring-background ring-2",
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

                    {/* AVATAR DETAILS */}

                    <div className="min-w-0">
                      <p
                        className={cn(
                          "font-brand-secondary",
                          "font-semibold",
                          "text-foreground",
                        )}
                      >
                        Your avatar
                      </p>

                      <p
                        className={cn(
                          "mt-1",
                          "text-sm leading-5",
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
                          "border-primary-300 border",
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

                  {/* ERROR */}

                  {field.state.meta.errors.length > 0 && (
                    <p
                      className={cn(
                        "mt-2",
                        "text-sm font-medium",
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

            <div className={cn("mt-8", "grid gap-5", "sm:grid-cols-2")}>
              {/* NAME */}

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
                      className={cn(
                        "mb-2 block",
                        "text-sm font-semibold",
                        "text-foreground",
                      )}
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
                        "w-full",
                        "rounded-xl",
                        "border-primary-200 border",
                        "bg-background",
                        "px-4 py-3",
                        "font-brand-primary",
                        "text-sm",
                        "text-foreground",
                        "outline-none",
                        "transition-all duration-200",
                        "placeholder:text-primary-400",
                        "focus:border-primary-500",
                        "focus:ring-4",
                        "focus:ring-primary-100",
                        "dark:border-primary-800",
                        "dark:focus:border-primary-500",
                        "dark:focus:ring-primary-900",
                      )}
                    />

                    {field.state.meta.errors.length > 0 && (
                      <p
                        className={cn(
                          "mt-1.5",
                          "text-sm font-medium",
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

              {/* PHONE */}

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
                      className={cn(
                        "mb-2 block",
                        "text-sm font-semibold",
                        "text-foreground",
                      )}
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
                        "w-full",
                        "rounded-xl",
                        "border-primary-200 border",
                        "bg-background",
                        "px-4 py-3",
                        "font-brand-primary",
                        "text-sm",
                        "text-foreground",
                        "outline-none",
                        "transition-all duration-200",
                        "placeholder:text-primary-400",
                        "focus:border-primary-500",
                        "focus:ring-4",
                        "focus:ring-primary-100",
                        "dark:border-primary-800",
                        "dark:focus:border-primary-500",
                        "dark:focus:ring-primary-900",
                      )}
                    />

                    {field.state.meta.errors.length > 0 && (
                      <p
                        className={cn(
                          "mt-1.5",
                          "text-sm font-medium",
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

              {/* EMAIL */}

              <form.Field name="email">
                {(field) => (
                  <div>
                    <label
                      htmlFor={field.name}
                      className={cn(
                        "mb-2 block",
                        "text-sm font-semibold",
                        "text-foreground",
                      )}
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
                        "w-full",
                        "cursor-not-allowed",
                        "rounded-xl",
                        "border-primary-100 border",
                        "bg-primary-100/50",
                        "px-4 py-3",
                        "font-brand-primary",
                        "text-sm",
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

              {/* USERNAME */}

              <form.Field name="username">
                {(field) => (
                  <div>
                    <label
                      htmlFor={field.name}
                      className={cn(
                        "mb-2 block",
                        "text-sm font-semibold",
                        "text-foreground",
                      )}
                    >
                      Username
                    </label>

                    <div className="relative">
                      <span
                        className={cn(
                          "absolute top-1/2 left-4",
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
                          "w-full",
                          "cursor-not-allowed",
                          "rounded-xl",
                          "border-primary-100 border",
                          "bg-primary-100/50",
                          "py-3 pr-4 pl-9",
                          "font-brand-primary",
                          "text-sm",
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
                        "mt-1.5",
                        "text-xs",
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

            {/* SUBMIT BUTTON */}

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
                    "mt-8",
                    "flex w-full",
                    "items-center justify-center",
                    "rounded-xl",
                    "px-6 py-3.5",
                    "font-brand-primary",
                    "font-semibold",
                    "transition-all duration-200",
                    "sm:text-lg",

                    canSubmit &&
                      !isSubmitting && [
                        "bg-primary-600",
                        "text-primary-50",
                        "shadow-primary-600/20 shadow-lg",
                        "hover:bg-primary-700",
                        "hover:shadow-xl",
                        "hover:shadow-primary-700/25",
                        "active:scale-[0.98]",
                        "focus:outline-none",
                        "focus:ring-4",
                        "focus:ring-primary-200",
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
