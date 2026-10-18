import { useForm } from "@tanstack/react-form";
import { AlertCircle, Lock, LogIn as LogInIcon, Mail } from "lucide-react";
import { cn } from "@repo/styles/cn";
import { useServerFn } from "@tanstack/react-start";
import { serverFn__loginUser } from "@/integrations/tanstack/server-function/form-actions/login.sfn";
import { useNavigate } from "@tanstack/react-router";

export function LoginForm() {
  const navigate = useNavigate();
  const loginUser = useServerFn(serverFn__loginUser);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      console.info("Submitting login values:", value);
      await loginUser({
        data: { email: value.email, password: value.password },
      }); 

      navigate({ to: "/dashboard" });
    },
  });

  return (
    <div className={cn(`flex min-h-svh items-center justify-center`)}>
      <div
        className={cn(
          "bg-background border-foreground/10 font-brand-primary mx-auto w-full max-w-md rounded-3xl border p-8 shadow-sm",
        )}
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="font-brand-accent text-accent-600 dark:text-accent-400 text-xs font-bold tracking-widest uppercase">
            Welcome Back
          </span>

          <h1 className="font-brand-secondary text-foreground mt-1 text-2xl font-bold">
            Sign in to your account
          </h1>

          <p className="text-foreground/60 mt-1 text-xs">
            Enter your registered credentials to access your operations
            dashboard.
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
                <div>
                  <label
                    htmlFor={field.name}
                    className="text-foreground/75 mb-1.5 block text-xs font-semibold tracking-wider uppercase"
                  >
                    Email Address
                  </label>

                  <div
                    className={cn(
                      "bg-foreground/3 relative flex items-center overflow-hidden rounded-xl border transition-colors",
                      {
                        "border-red-500/50 bg-red-500/5": hasError,
                        "border-foreground/10 focus-within:border-primary-400 focus-within:bg-background":
                          !hasError,
                      },
                    )}
                  >
                    <span className="text-foreground/40 pl-3.5">
                      <Mail className="size-4" strokeWidth={1.8} />
                    </span>

                    <input
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
                        "text-foreground placeholder:text-foreground/35 font-brand-primary w-full bg-transparent px-3 py-3 text-xs outline-none",
                      )}
                    />
                  </div>

                  {hasError && <FieldError errors={field.state.meta.errors} />}
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
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor={field.name}
                      className="text-foreground/75 block text-xs font-semibold tracking-wider uppercase"
                    >
                      Password
                    </label>

                    <a
                      href="#forgot"
                      className={cn(
                        "text-primary-600 text-xs font-semibold hover:underline",
                      )}
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div
                    className={cn(
                      "bg-foreground/3 relative flex items-center overflow-hidden rounded-xl border transition-colors",
                      {
                        "border-red-500/50 bg-red-500/5": hasError,
                        "border-foreground/10 focus-within:border-primary-400 focus-within:bg-background":
                          !hasError,
                      },
                    )}
                  >
                    <span className="text-foreground/40 pl-3.5">
                      <Lock className="size-4" strokeWidth={1.8} />
                    </span>

                    <input
                      id={field.name}
                      name={field.name}
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
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
                        "text-foreground placeholder:text-foreground/35 font-brand-primary w-full bg-transparent px-3 py-3 text-xs outline-none",
                      )}
                    />
                  </div>

                  {hasError && <FieldError errors={field.state.meta.errors} />}
                </div>
              );
            }}
          </form.Field>

          {/* Submit */}
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit}
                className={cn(
                  "bg-primary-600 hover:bg-primary-700 font-brand-secondary mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-sm transition-all",
                  {
                    "cursor-not-allowed opacity-60": !canSubmit,
                  },
                )}
              >
                {isSubmitting ? (
                  "Signing in..."
                ) : (
                  <>
                    <LogInIcon className="size-4" strokeWidth={1.8} />
                    Sign In to Dashboard
                  </>
                )}
              </button>
            )}
          </form.Subscribe>
        </form>

        {/* Footer */}
        <p
          className={cn(
            "text-foreground/60 border-foreground/10 mt-6 border-t pt-6 text-center text-xs",
          )}
        >
          Don't have an account yet?{" "}
          <a
            href="#signup"
            className={cn("text-primary-600 font-bold hover:underline")}
          >
            Request Access
          </a>
        </p>
      </div>
    </div>
  );
}

function FieldError({ errors }: { errors: Array<string | undefined> }) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <p className="text-2.75 mt-1.5 flex items-center gap-1 font-semibold text-red-500">
      <AlertCircle className="size-3 shrink-0" />
      {errors.join(", ")}
    </p>
  );
}
