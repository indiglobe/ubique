import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
  X,
} from "lucide-react";
import { cn } from "@repo/styles/cn";
import { useServerFn } from "@tanstack/react-start";
import { serverFn__loginUser } from "@/integrations/tanstack/server-function/form-actions/login.sfn";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { tryCatch } from "@repo/utils/try-catch";
import { toast } from "sonner";

export function LoginForm() {
  const navigate = useNavigate();
  const loginUser = useServerFn(serverFn__loginUser);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      const [loginError, loginResponse] = await tryCatch(
        loginUser({
          data: { email: value.email, password: value.password },
        }),
      );

      if (loginError) {
        toast.custom(() => (
          <ToastMessageForLoginError message="Something went wrong, try again." />
        ));
        return;
      }

      if (loginResponse) {
        if (loginResponse.code) {
          if (loginResponse.code === "EPASSWORD") {
            toast.custom(() => (
              <ToastMessageForLoginError message="Please provide correct password." />
            ));
            return;
          }

          if (loginResponse.code === "NOUSER") {
            toast.custom(() => (
              <ToastMessageForLoginError message="No user exists." />
            ));
            return;
          }
          toast.custom(() => (
            <ToastMessageForLoginError message="Something went wrong, try again." />
          ));
          return;
        }

        toast.custom(() => (
          <ToastMessageForLoginSuccess message="Congratulation, login successful." />
        ));
      }

      navigate({ to: "/dashboard" });
    },
  });

  return (
    <main className="bg-background relative isolate flex min-h-svh items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-primary-500/6 absolute -top-40 -left-40 size-112 rounded-full blur-[100px]" />
        <div className="bg-secondary-500/[0.07] absolute -right-40 -bottom-40 size-112 rounded-full blur-[100px]" />

        <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary-500)_0.7px,transparent_0.7px)] bg-size-[24px_24px] opacity-[0.06]" />
      </div>

      <div className="w-full max-w-107.5">
        {/* Header */}
        <div className="mb-7 flex flex-col items-center text-center">
          <h1 className="font-brand-accent text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back<span className="text-primary-500">.</span>
          </h1>

          <p className="text-muted-foreground mt-2 max-w-xs text-sm leading-relaxed">
            Sign in to your account and continue managing your operations.
          </p>
        </div>

        {/* Login Card */}
        <div
          className={cn(
            "border-border/80 relative overflow-hidden rounded-xl border",
            "bg-background/95 shadow-primary-950/5 p-6 shadow-xl",
            "sm:p-8",
          )}
        >
          <div className="from-primary-400 via-primary-600 to-secondary-500 absolute inset-x-0 top-0 h-1 bg-linear-to-r" />

          <div className="mb-7">
            <h2 className="font-brand-secondary text-foreground text-lg font-bold tracking-tight">
              Sign in to your account
            </h2>

            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              Enter your registered credentials to access your dashboard.
            </p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            {/* Email */}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value) {
                    return "Email address is required";
                  }

                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Invalid email address format";
                  }

                  return undefined;
                },
              }}
            >
              {(field) => {
                const hasError =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;

                return (
                  <div className="space-y-2">
                    <label
                      htmlFor={field.name}
                      className="text-foreground/75 block text-xs font-semibold tracking-wide"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <Mail
                        className={cn(
                          "absolute top-1/2 left-3.5 z-10 size-4 -translate-y-1/2 transition-colors",
                          hasError ? "text-red-500" : "text-muted-foreground",
                        )}
                        strokeWidth={1.8}
                      />

                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        autoComplete="email"
                        placeholder="name@company.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        aria-invalid={hasError}
                        aria-describedby={
                          hasError ? `${field.name}-error` : undefined
                        }
                        className={cn(
                          "h-11 rounded-md pr-3 pl-10 text-sm",
                          hasError &&
                            "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                        )}
                      />
                    </div>

                    {hasError && (
                      <FieldError
                        id={`${field.name}-error`}
                        errors={field.state.meta.errors}
                      />
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* Password */}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  if (!value) {
                    return "Password is required";
                  }

                  if (value.length < 6) {
                    return "Password must be at least 6 characters";
                  }

                  return undefined;
                },
              }}
            >
              {(field) => {
                const hasError =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;

                return (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <label
                        htmlFor={field.name}
                        className="text-foreground/75 text-xs font-semibold tracking-wide"
                      >
                        Password
                      </label>

                      <a
                        href="#forgot"
                        className="text-primary-600 hover:text-primary-500 dark:text-primary-400 text-xs font-semibold transition-colors hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <div className="relative">
                      <Lock
                        className={cn(
                          "absolute top-1/2 left-3.5 z-10 size-4 -translate-y-1/2 transition-colors",
                          hasError ? "text-red-500" : "text-muted-foreground",
                        )}
                        strokeWidth={1.8}
                      />

                      <Input
                        id={field.name}
                        name={field.name}
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        aria-invalid={hasError}
                        aria-describedby={
                          hasError ? `${field.name}-error` : undefined
                        }
                        className={cn(
                          "h-11 rounded-md pr-11 pl-10 text-sm",
                          hasError &&
                            "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                        )}
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        corner="rounded"
                        onClick={() => setShowPassword((previous) => !previous)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-1 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </Button>
                    </div>

                    {hasError && (
                      <FieldError
                        id={`${field.name}-error`}
                        errors={field.state.meta.errors}
                      />
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* Submit */}
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  corner="rounded"
                  disabled={!canSubmit}
                  className={cn(
                    "group shadow-primary-600/15 mt-2 h-11 w-full rounded-md text-sm font-semibold shadow-md transition-all",
                    "hover:shadow-primary-600/20 hover:-translate-y-0.5 hover:shadow-lg",
                    "active:translate-y-0",
                    "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="size-4" />
                      Sign in to dashboard
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              )}
            </form.Subscribe>
          </form>

          {/* Security note */}
          <div className="border-border/70 bg-muted/30 mt-6 flex items-center justify-center gap-2 rounded-md border px-3 py-3">
            <ShieldCheck className="size-4 shrink-0 text-green-600 dark:text-green-400" />

            <p className="text-muted-foreground text-2.75 text-center leading-relaxed">
              Your connection is protected with secure authentication.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 space-y-3 text-center">
          <p className="text-muted-foreground text-xs">
            Don't have an account yet?{" "}
            <a
              href="#signup"
              className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-bold transition-colors hover:underline"
            >
              Request access
            </a>
          </p>

          <div className="text-muted-foreground/60 text-2.5 flex items-center justify-center gap-2 font-medium tracking-wider uppercase">
            <span className="bg-border h-px w-8" />
            Secure employee portal
            <span className="bg-border h-px w-8" />
          </div>
        </div>
      </div>
    </main>
  );
}

function FieldError({
  id,
  errors,
}: {
  id?: string;
  errors: Array<string | undefined>;
}) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <p
      id={id}
      role="alert"
      className="flex items-center gap-1.5 text-xs font-medium text-red-500"
    >
      <AlertCircle className="size-3.5 shrink-0" />
      {errors.join(", ")}
    </p>
  );
}

function ToastMessageForLoginError({
  message = "Please provide correct password.",
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
          Login error
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

function ToastMessageForLoginSuccess({
  message = "Congratulation, login successful.",
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
        <AlertCircle className="size-5" />
      </div>

      <div className="min-w-0 flex-1 space-y-1 pt-0.5">
        <p className="text-sm font-semibold text-green-700 dark:text-green-300">
          Login in successful
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
