import { useState } from "react";

import { useForm } from "@tanstack/react-form";

import { cn } from "@repo/styles/cn";

export function SignIn() {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },

    onSubmit: async ({ value }) => {
      console.log(
        authMode === "signin" ? "Sign In Data:" : "Sign Up Data:",
        value,
      );

      console.log("Auth Mode:", authMode);
      console.log("Email:", value.email);
      console.log("Password:", value.password);
      console.log("Terms Accepted:", value.agreeToTerms);

      if (authMode === "signup") {
        console.log("Name:", value.name);
      }
    },
  });

  const handleModeChange = (mode: "signin" | "signup") => {
    setAuthMode(mode);

    form.reset();
  };

  const handleGoogleAuth = () => {
    console.log(authMode === "signin" ? "Google Sign In" : "Google Sign Up");
  };

  return (
    <main
      className={cn(
        "min-h-svh",
        "bg-background",
        "px-4 py-6",
        "3xs:px-5",
        "2xs:px-6",
        "sm:px-8 sm:py-8",
        "lg:flex",
        "lg:items-center",
        "lg:justify-center",
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
          "lg:grid-cols-[0.95fr_1.05fr]",
        )}
      >
        {/* SIDE PANEL */}

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
            "lg:flex",
            "lg:min-h-[760px]",
            "lg:flex-col",
            "lg:justify-between",
            "lg:px-12",
            "lg:py-14",
          )}
        >
          {/* MEDICAL 3D BACKGROUND */}

          <div
            className={cn(
              "pointer-events-none",
              "absolute inset-0",
              "overflow-hidden",
            )}
          >
            {/* Glow */}

            <div
              className={cn(
                "absolute",
                "-top-24 -left-24",
                "h-80 w-80",
                "rounded-full",
                "bg-primary-200/20",
                "blur-3xl",
              )}
            />

            <div
              className={cn(
                "absolute",
                "-right-24 -bottom-28",
                "h-96 w-96",
                "rounded-full",
                "bg-secondary-300/20",
                "blur-3xl",
              )}
            />

            {/* Rings */}

            <div
              className={cn(
                "absolute",
                "top-12 -right-20",
                "h-64 w-64",
                "rounded-full",
                "border-primary-50/10 border",
              )}
            />

            <div
              className={cn(
                "absolute",
                "top-36 right-5",
                "h-32 w-32",
                "rounded-full",
                "border-primary-50/10 border",
              )}
            />

            {/* CAPSULE */}

            <div
              className={cn(
                "absolute",
                "top-10 right-8",
                "hidden",
                "h-24 w-24",
                "rotate-12",
                "items-center justify-center",
                "rounded-3xl",
                "border-primary-50/15 border",
                "bg-primary-50/10",
                "shadow-primary-950/20 shadow-2xl",
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
                  "shadow-primary-950/20 shadow-xl",
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
              </div>
            </div>

            {/* RX CARD */}

            <div
              className={cn(
                "absolute",
                "top-[38%] right-7",
                "hidden",
                "w-28",
                "-rotate-6",
                "rounded-2xl",
                "border-primary-50/15 border",
                "bg-primary-50/10",
                "p-4",
                "shadow-primary-950/20 shadow-2xl",
                "backdrop-blur-xl",
                "lg:block",
              )}
            >
              <p
                className={cn(
                  "font-brand-secondary",
                  "text-xl font-bold",
                  "text-primary-50/90",
                )}
              >
                Rx
              </p>

              <div
                className={cn(
                  "mt-3 h-1.5",
                  "w-full rounded-full",
                  "bg-primary-50/20",
                )}
              />

              <div
                className={cn(
                  "mt-2 h-1.5",
                  "w-3/4 rounded-full",
                  "bg-primary-50/15",
                )}
              />

              <div
                className={cn(
                  "mt-2 h-1.5",
                  "w-1/2 rounded-full",
                  "bg-primary-50/10",
                )}
              />
            </div>

            {/* MEDICAL CROSS */}

            <div
              className={cn(
                "absolute",
                "bottom-42 left-8",
                "hidden",
                "h-20 w-20",
                "-rotate-12",
                "items-center justify-center",
                "rounded-2xl",
                "border-primary-50/15 border",
                "bg-primary-50/10",
                "shadow-primary-950/20 shadow-2xl",
                "backdrop-blur-xl",
                "sm:flex",
              )}
            >
              <div className="relative h-10 w-10">
                <div
                  className={cn(
                    "absolute",
                    "top-0 left-1/2",
                    "h-10 w-3",
                    "-translate-x-1/2",
                    "rounded-full",
                    "bg-primary-50/80",
                  )}
                />

                <div
                  className={cn(
                    "absolute",
                    "top-1/2 left-0",
                    "h-3 w-10",
                    "-translate-y-1/2",
                    "rounded-full",
                    "bg-primary-50/80",
                  )}
                />
              </div>
            </div>

            {/* TABLET STRIP */}

            <div
              className={cn(
                "absolute",
                "right-8 bottom-10",
                "hidden",
                "w-36",
                "rotate-6",
                "rounded-2xl",
                "border-primary-50/15 border",
                "bg-primary-50/10",
                "p-4",
                "shadow-primary-950/20 shadow-2xl",
                "backdrop-blur-xl",
                "lg:block",
              )}
            >
              <div className="grid grid-cols-4 gap-2">
                {Array.from({
                  length: 8,
                }).map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "aspect-square",
                      "rounded-full",
                      "border-primary-50/20 border",
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
                "absolute",
                "bottom-14 left-[43%]",
                "hidden",
                "h-24 w-16",
                "-rotate-6",
                "rounded-xl",
                "border-primary-50/15 border",
                "bg-primary-50/10",
                "shadow-primary-950/15 shadow-xl",
                "backdrop-blur-xl",
                "lg:block",
              )}
            >
              <div
                className={cn(
                  "absolute",
                  "-top-3 left-1/2",
                  "h-4 w-9",
                  "-translate-x-1/2",
                  "rounded-t-lg",
                  "border-primary-50/15 border",
                  "bg-primary-50/20",
                )}
              />

              <div
                className={cn(
                  "absolute",
                  "top-7 right-2 left-2",
                  "rounded-lg",
                  "bg-primary-50/10",
                  "px-1 py-3",
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
            {/* ICON */}

            <div
              className={cn(
                "flex h-14 w-14",
                "items-center justify-center",
                "rounded-2xl",
                "border-primary-50/15 border",
                "bg-primary-50/10",
                "shadow-primary-950/10 shadow-lg",
                "backdrop-blur-xl",
              )}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="text-primary-50 h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v14"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />

                <rect x="3" y="3" width="18" height="18" rx="5" />
              </svg>
            </div>

            <p
              className={cn(
                "mt-10",
                "font-brand-accent",
                "text-xs font-semibold",
                "uppercase",
                "tracking-[0.22em]",
                "text-primary-100/80",
              )}
            >
              Medical Representative Portal
            </p>

            <h1
              className={cn(
                "mt-4",
                "max-w-md",
                "font-brand-secondary",
                "text-3xl font-bold",
                "tracking-tight",
                "text-primary-50",
                "sm:text-4xl",
                "lg:text-5xl",
              )}
            >
              Your workday, connected.
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
              Access your professional workspace, manage your daily activities
              and stay organised throughout every field visit.
            </p>
          </div>

          {/* FEATURE CARDS */}

          <div
            className={cn(
              "relative z-10",
              "mt-10",
              "grid gap-3",
              "2xs:grid-cols-3",
              "lg:mt-16",
              "lg:grid-cols-1",
            )}
          >
            <div
              className={cn(
                "rounded-2xl",
                "border-primary-50/15 border",
                "bg-primary-50/10",
                "p-4",
                "shadow-primary-950/10 shadow-lg",
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
                Secure Access
              </p>

              <p className="text-primary-100/70 mt-1 text-xs">
                Protected professional workspace
              </p>
            </div>

            <div
              className={cn(
                "rounded-2xl",
                "border-primary-50/15 border",
                "bg-primary-50/10",
                "p-4",
                "shadow-primary-950/10 shadow-lg",
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
                Stay Organised
              </p>

              <p className="text-primary-100/70 mt-1 text-xs">
                Keep your daily activity on track
              </p>
            </div>

            <div
              className={cn(
                "rounded-2xl",
                "border-primary-50/15 border",
                "bg-primary-50/10",
                "p-4",
                "shadow-primary-950/10 shadow-lg",
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
                Work Smarter
              </p>

              <p className="text-primary-100/70 mt-1 text-xs">
                Everything you need in one place
              </p>
            </div>
          </div>
        </aside>

        {/* AUTH SECTION */}

        <div
          className={cn(
            "bg-background",
            "px-5 py-8",
            "3xs:px-6",
            "2xs:px-8",
            "sm:px-10 sm:py-12",
            "lg:flex",
            "lg:items-center",
            "lg:px-14",
            "lg:py-14",
          )}
        >
          <div className="mx-auto w-full max-w-md">
            {/* SIGN IN / SIGN UP SWITCH */}

            <div
              className={cn(
                "grid grid-cols-2",
                "rounded-2xl",
                "border-primary-100 border",
                "bg-primary-100/50",
                "p-1.5",
                "dark:border-primary-900",
                "dark:bg-primary-950/50",
              )}
            >
              <button
                type="button"
                onClick={() => handleModeChange("signin")}
                className={cn(
                  "rounded-xl",
                  "px-4 py-2.5",
                  "font-brand-primary",
                  "text-sm font-semibold",
                  "transition-all duration-200",

                  authMode === "signin" && [
                    "bg-background",
                    "text-primary-600",
                    "shadow-primary-950/10 shadow-md",
                    "dark:text-primary-300",
                  ],

                  authMode !== "signin" && [
                    "text-primary-600/60",
                    "hover:text-primary-700",
                    "dark:text-primary-400/60",
                    "dark:hover:text-primary-300",
                  ],
                )}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => handleModeChange("signup")}
                className={cn(
                  "rounded-xl",
                  "px-4 py-2.5",
                  "font-brand-primary",
                  "text-sm font-semibold",
                  "transition-all duration-200",

                  authMode === "signup" && [
                    "bg-background",
                    "text-primary-600",
                    "shadow-primary-950/10 shadow-md",
                    "dark:text-primary-300",
                  ],

                  authMode !== "signup" && [
                    "text-primary-600/60",
                    "hover:text-primary-700",
                    "dark:text-primary-400/60",
                    "dark:hover:text-primary-300",
                  ],
                )}
              >
                Sign Up
              </button>
            </div>

            {/* HEADING */}

            <div className="mt-9">
              <p
                className={cn(
                  "font-brand-accent",
                  "text-xs font-semibold",
                  "uppercase",
                  "tracking-[0.18em]",
                  "text-primary-600",
                  "dark:text-primary-300",
                )}
              >
                {authMode === "signin" ? "Welcome Back" : "Get Started"}
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
                {authMode === "signin"
                  ? "Sign in to your account."
                  : "Create your account."}
              </h2>

              <p
                className={cn(
                  "mt-3",
                  "text-sm leading-6",
                  "text-primary-800/60",
                  "dark:text-primary-200/60",
                )}
              >
                {authMode === "signin"
                  ? "Enter your details to access your medical representative workspace."
                  : "Create your account and get your professional workspace ready."}
              </p>
            </div>

            {/* GOOGLE */}

            <button
              type="button"
              onClick={handleGoogleAuth}
              className={cn(
                "mt-7",
                "flex w-full",
                "items-center justify-center",
                "gap-3",
                "rounded-xl",
                "border-primary-200 border",
                "bg-background",
                "px-5 py-3.5",
                "font-brand-primary",
                "text-sm font-semibold",
                "text-foreground",
                "shadow-primary-950/5 shadow-sm",
                "transition-all duration-200",
                "hover:border-primary-300",
                "hover:bg-primary-50",
                "hover:shadow-md",
                "active:scale-[0.98]",
                "dark:border-primary-800",
                "dark:hover:border-primary-700",
                "dark:hover:bg-primary-950/40",
              )}
            >
              {/* REAL GOOGLE ICON */}

              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
                <path
                  fill="#4285F4"
                  d="M21.805 10.023h-9.62v3.955h5.53c-.24 1.271-.96 2.349-2.045 3.073v2.553h3.31c1.937-1.783 3.055-4.41 3.055-7.534 0-.69-.062-1.355-.18-1.997Z"
                />

                <path
                  fill="#34A853"
                  d="M12.185 22c2.77 0 5.093-.918 6.79-2.486l-3.31-2.553c-.918.615-2.09.978-3.48.978-2.674 0-4.939-1.805-5.75-4.23H3.015v2.655A10.256 10.256 0 0 0 12.185 22Z"
                />

                <path
                  fill="#FBBC05"
                  d="M6.435 13.709a6.18 6.18 0 0 1 0-3.954V7.1H3.015a10.286 10.286 0 0 0 0 9.264l3.42-2.655Z"
                />

                <path
                  fill="#EA4335"
                  d="M12.185 5.525c1.507 0 2.86.518 3.925 1.534l2.94-2.94C17.273 2.463 14.95 1.45 12.185 1.45A10.256 10.256 0 0 0 3.015 7.1l3.42 2.655c.811-2.425 3.076-4.23 5.75-4.23Z"
                />
              </svg>

              {authMode === "signin"
                ? "Continue with Google"
                : "Sign up with Google"}
            </button>
            {/* DIVIDER */}

            <div className={cn("my-7", "flex items-center", "gap-4")}>
              <div
                className={cn(
                  "h-px grow",
                  "bg-primary-100",
                  "dark:bg-primary-900",
                )}
              />

              <span
                className={cn(
                  "shrink-0",
                  "text-xs font-medium",
                  "text-primary-600/50",
                  "dark:text-primary-400/50",
                )}
              >
                More sign-up/sign-in ways upcoming
              </span>

              <div
                className={cn(
                  "h-px grow",
                  "bg-primary-100",
                  "dark:bg-primary-900",
                )}
              />
            </div>

            {/* FORM */}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();

                form.handleSubmit();
              }}
            >
              <div className="space-y-5">
                {/* NAME */}

                {/* {authMode === "signup" && (
                  <form.Field
                    name="name"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value.trim()) {
                          return "Full name is required";
                        }

                        if (
                          value.trim().length < 2
                        ) {
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
                          Full Name
                        </label>

                        <input
                          id={field.name}
                          name={field.name}
                          type="text"
                          placeholder="Enter your full name"
                          value={
                            field.state.value
                          }
                          onBlur={
                            field.handleBlur
                          }
                          onChange={(event) =>
                            field.handleChange(
                              event.target.value,
                            )
                          }
                          className={cn(
                            "w-full",
                            "rounded-xl",
                            "border border-primary-200",
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

                        {field.state.meta.errors
                          .length > 0 && (
                          <p
                            className={cn(
                              "mt-1.5",
                              "text-xs font-medium",
                              "text-primary-700",
                              "dark:text-primary-300",
                            )}
                          >
                            {String(
                              field.state.meta
                                .errors[0],
                            )}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>
                )} */}

                {/* EMAIL */}

                {/* <form.Field
                  name="email"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value.trim()) {
                        return "Email is required";
                      }

                      if (
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                          value,
                        )
                      ) {
                        return "Enter a valid email address";
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
                        Email Address
                      </label>

                      <input
                        id={field.name}
                        name={field.name}
                        type="email"
                        placeholder="name@example.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(
                            event.target.value,
                          )
                        }
                        className={cn(
                          "w-full",
                          "rounded-xl",
                          "border border-primary-200",
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

                      {field.state.meta.errors
                        .length > 0 && (
                        <p
                          className={cn(
                            "mt-1.5",
                            "text-xs font-medium",
                            "text-primary-700",
                            "dark:text-primary-300",
                          )}
                        >
                          {String(
                            field.state.meta
                              .errors[0],
                          )}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field> */}

                {/* PASSWORD */}

                {/* <form.Field
                  name="password"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) {
                        return "Password is required";
                      }

                      if (value.length < 8) {
                        return "Password must be at least 8 characters";
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
                        Password
                      </label>

                      <div className="relative">
                        <input
                          id={field.name}
                          name={field.name}
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="Enter your password"
                          value={
                            field.state.value
                          }
                          onBlur={
                            field.handleBlur
                          }
                          onChange={(event) =>
                            field.handleChange(
                              event.target.value,
                            )
                          }
                          className={cn(
                            "w-full",
                            "rounded-xl",
                            "border border-primary-200",
                            "bg-background",
                            "py-3 pl-4 pr-12",
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

                        <button
                          type="button"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          onClick={() =>
                            setShowPassword(
                              (prev) => !prev,
                            )
                          }
                          className={cn(
                            "absolute",
                            "right-4 top-1/2",
                            "-translate-y-1/2",
                            "text-primary-500",
                            "transition-colors",
                            "hover:text-primary-700",
                            "dark:hover:text-primary-300",
                          )}
                        >
                          {showPassword ? (
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
                                d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 4.24A10.7 10.7 0 0 1 12 4c5 0 9 4 10 8a12.7 12.7 0 0 1-2 4M6.6 6.6C4.3 8 2.8 10 2 12c1.1 4 5 8 10 8 1.7 0 3.2-.5 4.5-1.2"
                              />
                            </svg>
                          ) : (
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
                                d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                              />

                              <circle
                                cx="12"
                                cy="12"
                                r="3"
                              />
                            </svg>
                          )}
                        </button>
                      </div>

                      {field.state.meta.errors
                        .length > 0 && (
                        <p
                          className={cn(
                            "mt-1.5",
                            "text-xs font-medium",
                            "text-primary-700",
                            "dark:text-primary-300",
                          )}
                        >
                          {String(
                            field.state.meta
                              .errors[0],
                          )}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field> */}

                {/* CONFIRM PASSWORD */}

                {/* {authMode === "signup" && (
                  <form.Field
                    name="confirmPassword"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value) {
                          return "Please confirm your password";
                        }

                        if (
                          value !==
                          form.getFieldValue(
                            "password",
                          )
                        ) {
                          return "Passwords do not match";
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
                          Confirm Password
                        </label>

                        <div className="relative">
                          <input
                            id={field.name}
                            name={field.name}
                            type={
                              showConfirmPassword
                                ? "text"
                                : "password"
                            }
                            placeholder="Confirm your password"
                            value={
                              field.state.value
                            }
                            onBlur={
                              field.handleBlur
                            }
                            onChange={(event) =>
                              field.handleChange(
                                event.target.value,
                              )
                            }
                            className={cn(
                              "w-full",
                              "rounded-xl",
                              "border border-primary-200",
                              "bg-background",
                              "py-3 pl-4 pr-12",
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

                          <button
                            type="button"
                            aria-label={
                              showConfirmPassword
                                ? "Hide confirm password"
                                : "Show confirm password"
                            }
                            onClick={() =>
                              setShowConfirmPassword(
                                (prev) =>
                                  !prev,
                              )
                            }
                            className={cn(
                              "absolute",
                              "right-4 top-1/2",
                              "-translate-y-1/2",
                              "text-primary-500",
                              "transition-colors",
                              "hover:text-primary-700",
                              "dark:hover:text-primary-300",
                            )}
                          >
                            {showConfirmPassword ? (
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
                                  d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 4.24A10.7 10.7 0 0 1 12 4c5 0 9 4 10 8a12.7 12.7 0 0 1-2 4M6.6 6.6C4.3 8 2.8 10 2 12c1.1 4 5 8 10 8 1.7 0 3.2-.5 4.5-1.2"
                                />
                              </svg>
                            ) : (
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
                                  d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                                />

                                <circle
                                  cx="12"
                                  cy="12"
                                  r="3"
                                />
                              </svg>
                            )}
                          </button>
                        </div>

                        {field.state.meta.errors
                          .length > 0 && (
                          <p
                            className={cn(
                              "mt-1.5",
                              "text-xs font-medium",
                              "text-primary-700",
                              "dark:text-primary-300",
                            )}
                          >
                            {String(
                              field.state.meta
                                .errors[0],
                            )}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>
                )} */}

                {/* TERMS */}

                {/* TERMS & CONDITIONS - SIGN UP ONLY */}

                {authMode === "signup" && (
                  <form.Field
                    name="agreeToTerms"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value) {
                          return "Please accept the Terms & Conditions to continue";
                        }

                        return undefined;
                      },
                    }}
                  >
                    {(field) => (
                      <div>
                        <label
                          className={cn(
                            "group",
                            "flex",
                            "cursor-pointer",
                            "items-start gap-3.5",
                            "rounded-2xl",
                            "border",
                            "p-4",
                            "transition-all duration-300",

                            field.state.value
                              ? [
                                  "border-primary-200",
                                  "bg-primary-50/70",
                                  "shadow-primary-600/10 shadow-sm",
                                  "dark:border-primary-800",
                                  "dark:bg-primary-950/40",
                                ]
                              : [
                                  "border-primary-100",
                                  "bg-primary-50/30",
                                  "hover:border-primary-200",
                                  "hover:bg-primary-50/60",
                                  "dark:border-primary-900",
                                  "dark:bg-primary-950/20",
                                  "dark:hover:border-primary-800",
                                  "dark:hover:bg-primary-950/40",
                                ],
                          )}
                        >
                          {/* CHECKBOX */}

                          <div className={cn("relative", "mt-0.5", "shrink-0")}>
                            <input
                              type="checkbox"
                              checked={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(event) =>
                                field.handleChange(event.target.checked)
                              }
                              className="peer sr-only"
                            />

                            <div
                              className={cn(
                                "flex",
                                "h-6 w-6",
                                "items-center justify-center",
                                "rounded-lg",
                                "border-2",
                                "transition-all duration-300",
                                "peer-focus-visible:ring-4",
                                "peer-focus-visible:ring-primary-100",
                                "dark:peer-focus-visible:ring-primary-900",

                                field.state.value
                                  ? [
                                      "scale-100",
                                      "border-primary-600",
                                      "bg-primary-600",
                                      "shadow-primary-600/25 shadow-md",
                                      "dark:border-primary-500",
                                      "dark:bg-primary-500",
                                    ]
                                  : [
                                      "border-primary-300",
                                      "bg-background",
                                      "group-hover:border-primary-500",
                                      "dark:border-primary-700",
                                      "dark:bg-primary-950",
                                    ],
                              )}
                            >
                              {/* TICK */}

                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3.5"
                                className={cn(
                                  "h-4 w-4",
                                  "text-primary-50",
                                  "transition-all duration-200",

                                  field.state.value
                                    ? "scale-100 opacity-100"
                                    : "scale-50 opacity-0",
                                )}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 12.5L9.5 17L19 7"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* TEXT */}

                          <div className="min-w-0">
                            <p
                              className={cn(
                                "text-sm leading-6",
                                "text-primary-800/75",
                                "dark:text-primary-200/75",
                              )}
                            >
                              I agree to the{" "}
                              <span
                                className={cn(
                                  "font-semibold",
                                  "text-primary-600",
                                  "transition-colors",
                                  "hover:text-primary-700",
                                  "dark:text-primary-300",
                                  "dark:hover:text-primary-200",
                                )}
                              >
                                Terms & Conditions
                              </span>{" "}
                              and{" "}
                              <span
                                className={cn(
                                  "font-semibold",
                                  "text-primary-600",
                                  "transition-colors",
                                  "hover:text-primary-700",
                                  "dark:text-primary-300",
                                  "dark:hover:text-primary-200",
                                )}
                              >
                                Privacy Policy
                              </span>
                              .
                            </p>
                          </div>
                        </label>

                        {/* ERROR */}

                        {field.state.meta.errors.length > 0 && (
                          <p
                            className={cn(
                              "mt-2",
                              "text-xs font-medium",
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
                )}
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
                      "mt-7",
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
                    {isSubmitting
                      ? "Please Wait..."
                      : authMode === "signin"
                        ? "Sign In"
                        : "Create Account"}
                  </button>
                )}
              </form.Subscribe>
            </form>

            {/* BOTTOM SWITCH */}

            <p
              className={cn(
                "mt-6",
                "text-center",
                "text-sm",
                "text-primary-800/60",
                "dark:text-primary-200/60",
              )}
            >
              {authMode === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() =>
                  handleModeChange(authMode === "signin" ? "signup" : "signin")
                }
                className={cn(
                  "font-semibold",
                  "text-primary-600",
                  "transition-colors",
                  "hover:text-primary-700",
                  "dark:text-primary-300",
                  "dark:hover:text-primary-200",
                )}
              >
                {authMode === "signin" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
