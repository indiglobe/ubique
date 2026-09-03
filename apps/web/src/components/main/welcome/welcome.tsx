import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { useForm } from "@tanstack/react-form";
import { cn } from "@repo/styles/cn";
import { useRouteContext } from "@tanstack/react-router";
import Main from "@/components/main/main";
import { useServerFn } from "@tanstack/react-start";
import { serverFn__createOneUser } from "@/integrations/server-function/query/user.sf";

export function WelcomePage() {
  return (
    <Main className={cn(``)}>
      <section
        className={cn(
          "border-primary-100 bg-primary-50/40 shadow-primary-950/10 dark:border-primary-900 dark:bg-primary-950/20 dark:shadow-primary-950/30 mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border shadow-xl lg:grid-cols-[0.9fr_1.1fr]",
        )}
      >
        <SideSection />
        <WelcomeForm />
      </section>
    </Main>
  );
}

function SideSection({ className, ...props }: ComponentProps<"aside">) {
  return (
    <aside
      className={cn(
        `from-primary-800 via-primary-600 to-secondary-600 relative overflow-hidden bg-linear-to-br px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:min-h-175 lg:flex-col lg:justify-between lg:px-12 lg:py-14`,
        className,
      )}
      {...props}
    >
      {/* MEDICAL 3D BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Ambient glow */}

        <div
          className={cn(
            "bg-primary-200/20 absolute -top-24 -left-20 h-80 w-80 rounded-full blur-3xl",
          )}
        />

        <div
          className={cn(
            "bg-secondary-300/20 absolute -right-20 -bottom-28 h-96 w-96 rounded-full blur-3xl",
          )}
        />

        {/* Large decorative medical circle */}

        <div
          className={cn(
            "border-primary-50/10 absolute top-16 -right-14 h-52 w-52 rounded-full border",
          )}
        />

        <div
          className={cn(
            "border-primary-50/10 absolute top-25 -right-5 h-32 w-32 rounded-full border",
          )}
        />

        {/* CAPSULE 3D CARD */}

        <div
          className={cn(
            "border-primary-50/15 bg-primary-50/10 shadow-primary-950/20 absolute top-10 right-8 hidden h-24 w-24 rotate-12 items-center justify-center rounded-3xl border shadow-2xl backdrop-blur-xl sm:flex",
          )}
        >
          <div
            className={cn(
              "shadow-primary-950/20 relative h-14 w-8 -rotate-35 overflow-hidden rounded-full shadow-lg",
            )}
          >
            <div
              className={cn("bg-primary-50/90 absolute inset-x-0 top-0 h-1/2")}
            />

            <div
              className={cn(
                "bg-accent-300/90 absolute inset-x-0 bottom-0 h-1/2",
              )}
            />

            <div
              className={cn(
                "bg-primary-950/5 absolute top-0 left-1/2 h-full w-px",
              )}
            />
          </div>
        </div>

        {/* PRESCRIPTION RX CARD */}

        <div
          className={cn(
            "border-primary-50/15 bg-primary-50/10 shadow-primary-950/20 absolute top-[33%] right-4 hidden w-28 -rotate-6 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl lg:block",
          )}
        >
          <div
            className={cn(
              "font-brand-secondary text-primary-50/80 text-xl font-bold",
            )}
          >
            Rx
          </div>

          <div
            className={cn("bg-primary-50/20 mt-3 h-1.5 w-full rounded-full")}
          />

          <div
            className={cn("bg-primary-50/15 mt-2 h-1.5 w-3/4 rounded-full")}
          />

          <div
            className={cn("bg-primary-50/10 mt-2 h-1.5 w-1/2 rounded-full")}
          />
        </div>

        {/* FLOATING MEDICAL CROSS */}

        <div
          className={cn(
            "border-primary-50/15 bg-primary-50/10 shadow-primary-950/15 absolute bottom-40 left-7 hidden h-20 w-20 -rotate-12 items-center justify-center rounded-2xl border shadow-2xl backdrop-blur-lg sm:flex",
          )}
        >
          <div className="relative h-10 w-10">
            <div
              className={cn(
                "bg-primary-50/75 absolute top-0 left-1/2 h-10 w-3 -translate-x-1/2 rounded-full",
              )}
            />

            <div
              className={cn(
                "bg-primary-50/75 absolute top-1/2 left-0 h-3 w-10 -translate-y-1/2 rounded-full",
              )}
            />
          </div>
        </div>

        {/* TABLET STRIP */}

        <div
          className={cn(
            "border-primary-50/15 bg-primary-50/10 shadow-primary-950/20 absolute right-8 bottom-7 hidden w-36 rotate-6 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl lg:block",
          )}
        >
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "border-primary-50/20 bg-primary-50/20 aspect-square rounded-full border shadow-inner",
                )}
              />
            ))}
          </div>
        </div>

        {/* MEDICINE BOTTLE */}

        <div
          className={cn(
            "border-primary-50/15 bg-primary-50/10 shadow-primary-950/15 absolute bottom-14 left-[45%] hidden h-24 w-16 -rotate-6 rounded-xl border shadow-xl backdrop-blur-lg lg:block",
          )}
        >
          <div
            className={cn(
              "bg-primary-50/20 border-primary-50/15 absolute -top-3 left-1/2 h-4 w-9 -translate-x-1/2 rounded-t-lg border",
            )}
          />

          <div
            className={cn(
              "bg-primary-50/10 absolute top-6 right-2 left-2 rounded-lg px-2 py-3 text-center",
            )}
          >
            <span
              className={cn(
                "font-brand-secondary text-primary-50/70 text-xs font-bold",
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
            "border-primary-50/15 bg-primary-50/10 shadow-primary-950/10 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg backdrop-blur-md",
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

            <path strokeLinecap="round" strokeLinejoin="round" d="M17 3h4v4" />
          </svg>
        </div>

        <h1
          className={cn(
            "font-brand-secondary text-primary-50 mt-8 max-w-md text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
          )}
        >
          Your account is almost ready.
        </h1>

        <p
          className={cn(
            "font-brand-primary text-primary-100/80 mt-5 max-w-md text-sm leading-7 sm:text-base",
          )}
        >
          Add a few final details to complete your profile and get started. Your
          information helps keep your daily activity organised and personalised.
        </p>
      </div>

      {/* SIDE CARDS */}

      <div
        className={cn(
          "2xs:grid-cols-3 relative z-10 mt-10 grid gap-3 lg:mt-16 lg:grid-cols-1",
        )}
      >
        <div
          className={cn(
            "border-primary-50/15 bg-primary-50/10 shadow-primary-950/10 rounded-2xl border p-4 shadow-lg backdrop-blur-xl",
          )}
        >
          <p
            className={cn(
              "font-brand-secondary text-primary-50 text-sm font-semibold",
            )}
          >
            Profile Setup
          </p>

          <p className="text-primary-100/70 mt-1 text-xs">
            Add your personal details
          </p>
        </div>

        <div
          className={cn(
            "border-primary-50/15 bg-primary-50/10 shadow-primary-950/10 rounded-2xl border p-4 shadow-lg backdrop-blur-xl",
          )}
        >
          <p
            className={cn(
              "font-brand-secondary text-primary-50 text-sm font-semibold",
            )}
          >
            Account Ready
          </p>

          <p className="text-primary-100/70 mt-1 text-xs">
            Secure and verify your profile
          </p>
        </div>

        <div
          className={cn(
            "border-primary-50/15 bg-primary-50/10 shadow-primary-950/10 rounded-2xl border p-4 shadow-lg backdrop-blur-xl",
          )}
        >
          <p
            className={cn(
              "font-brand-secondary text-primary-50 text-sm font-semibold",
            )}
          >
            Begin Journey
          </p>

          <p className="text-primary-100/70 mt-1 text-xs">
            Complete setup to continue
          </p>
        </div>
      </div>
    </aside>
  );
}

function WelcomeForm({ className, ...props }: ComponentProps<"div">) {
  const { session } = useRouteContext({
    from: "/(authenticated-routes)/(new-user)/welcome/",
  });
  const createOneUser = useServerFn(serverFn__createOneUser);

  const {
    user: { email, name, image },
  } = session;

  // const profileAvatar = useAppStore((state) => state.profileAvatar);
  const [profileAvatar] = useState<File | string | null>(image ?? null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    typeof profileAvatar === "string" ? profileAvatar : null,
  );

  const username = email.split("@")[0] ?? "";

  const form = useForm({
    defaultValues: {
      name: name,
      email: email,
      username: username,
      phone: "",
      avatar: profileAvatar,
    },

    onSubmit: async ({ value }) => {
      console.log("Welcome Form Data:", value);

      // eslint-disable-next-line no-shadow
      const { email, name, phone, username } = value;
      let { avatar } = value;

      // todo: upload the image to backend
      if (avatar && avatar instanceof File) {
        // const res = await fetch("", { method: "POST" }).then((res) =>
        //   res.json(),
        // );

        avatar = "";
      }

      await createOneUser({
        data: {
          email,
          name,
          phone,
          username,
          avatarUrl: avatar,
          role: "MR",
          status: "UNDER_VERIFICATION",
        },
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
    <div
      className={cn(
        `bg-background 3xs:px-6 2xs:px-8 px-5 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14`,
        className,
      )}
      {...props}
    >
      <div>
        <p
          className={cn(
            "font-brand-accent text-primary-600 dark:text-primary-300 text-sm font-semibold tracking-[0.18em] uppercase",
          )}
        >
          Welcome
        </p>

        <h2
          className={cn(
            "font-brand-secondary text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl",
          )}
        >
          Complete your profile
        </h2>

        <p
          className={cn(
            "text-primary-800/65 dark:text-primary-200/65 mt-3 max-w-xl text-sm leading-6 sm:text-base",
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
              if (value instanceof File && !value.type.startsWith("image/")) {
                return "Please select a valid image";
              }

              return undefined;
            },
          }}
        >
          {(field) => (
            <div>
              <p className="text-foreground mb-3 text-sm font-semibold">
                Profile Picture
              </p>

              <div className="flex items-center gap-5">
                <div className="relative shrink-0">
                  <label
                    htmlFor="avatar"
                    className={cn(
                      "group relative block h-28 w-28 cursor-pointer rounded-full transition-all duration-200 sm:h-32 sm:w-32",
                    )}
                  >
                    <div
                      className={cn(
                        "border-background bg-primary-100 shadow-primary-950/15 ring-primary-200 group-hover:ring-primary-300 dark:bg-primary-900 dark:ring-primary-800 dark:group-hover:ring-primary-700 relative h-full w-full overflow-hidden rounded-full border-4 shadow-lg ring-2 transition-all duration-200 group-hover:ring-4",
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
                              "bg-primary-950/0 group-hover:bg-primary-950/40 absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-200 group-hover:opacity-100",
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
                        <div
                          className={cn(
                            "bg-primary-100 text-primary-500 dark:bg-primary-900 dark:text-primary-300 flex h-full w-full items-center justify-center",
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
                          "border-background bg-primary-600 text-primary-50 shadow-primary-950/25 group-hover:bg-primary-700 dark:bg-primary-500 dark:group-hover:bg-primary-600 absolute -right-2 -bottom-2 z-20 flex h-11 w-11 items-center justify-center rounded-full border-4 shadow-lg transition-all duration-200 group-hover:scale-110",
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
                        "border-background bg-primary-950 text-primary-50 shadow-primary-950/20 hover:bg-primary-800 dark:bg-primary-50 dark:text-primary-950 dark:hover:bg-primary-200 absolute -top-2 -right-2 z-30 flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-lg transition-all duration-200 hover:scale-110 active:scale-95",
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
                  <p className="font-brand-secondary text-foreground font-semibold">
                    Your avatar
                  </p>

                  <p
                    className={cn(
                      "text-primary-700/60 dark:text-primary-300/60 mt-1 text-sm leading-5",
                    )}
                  >
                    {previewUrl
                      ? "Click the image to change it, or use the cross to remove it."
                      : "Add a profile picture to personalise your account."}
                  </p>

                  <label
                    htmlFor="avatar"
                    className={cn(
                      "border-primary-300 text-primary-600 hover:bg-primary-100/70 dark:border-primary-700 dark:text-primary-300 dark:hover:bg-primary-900/50 mt-3 inline-flex cursor-pointer items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95",
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
                    "text-primary-700 dark:text-primary-300 mt-2 text-sm font-medium",
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
                  className="text-foreground mb-2 block text-sm font-semibold"
                >
                  Name
                </label>

                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className={cn(
                    "border-primary-200 bg-background font-brand-primary text-foreground placeholder:text-primary-400 focus:border-primary-500 focus:ring-primary-100 dark:border-primary-800 dark:focus:border-primary-500 dark:focus:ring-primary-900 w-full rounded-xl border px-4 py-3 text-sm transition-all duration-200 outline-none focus:ring-4",
                  )}
                />

                {field.state.meta.errors.length > 0 && (
                  <p
                    className={cn(
                      "text-primary-700 dark:text-primary-300 mt-1.5 text-sm font-medium",
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
                  className="text-foreground mb-2 block text-sm font-semibold"
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
                  onChange={(event) => field.handleChange(event.target.value)}
                  className={cn(
                    "border-primary-200 bg-background font-brand-primary text-foreground placeholder:text-primary-400 focus:border-primary-500 focus:ring-primary-100 dark:border-primary-800 dark:focus:border-primary-500 dark:focus:ring-primary-900 w-full rounded-xl border px-4 py-3 text-sm transition-all duration-200 outline-none focus:ring-4",
                  )}
                />

                {field.state.meta.errors.length > 0 && (
                  <p
                    className={cn(
                      "text-primary-700 dark:text-primary-300 mt-1.5 text-sm font-medium",
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
                  className="text-foreground mb-2 block text-sm font-semibold"
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
                    "border-primary-100 bg-primary-100/50 font-brand-primary text-primary-700 dark:border-primary-900 dark:bg-primary-900/40 dark:text-primary-300 w-full cursor-not-allowed rounded-xl border px-4 py-3 text-sm outline-none",
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
                  className="text-foreground mb-2 block text-sm font-semibold"
                >
                  Username
                </label>

                <div className="relative">
                  <span
                    className={cn(
                      "text-primary-500 absolute top-1/2 left-4 -translate-y-1/2 font-semibold",
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
                      "border-primary-100 bg-primary-100/50 font-brand-primary text-primary-700 dark:border-primary-900 dark:bg-primary-900/40 dark:text-primary-300 w-full cursor-not-allowed rounded-xl border py-3 pr-4 pl-9 text-sm outline-none",
                    )}
                  />
                </div>

                <p
                  className={cn(
                    "text-primary-600/60 dark:text-primary-400/60 mt-1.5 text-xs",
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
          selector={(state) => [state.canSubmit, state.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className={cn(
                "font-brand-primary mt-8 flex w-full items-center justify-center rounded-xl px-6 py-3.5 font-semibold transition-all duration-200 sm:text-lg",

                canSubmit &&
                  !isSubmitting && [
                    "bg-primary-600 text-primary-50 shadow-primary-600/20 hover:bg-primary-700 hover:shadow-primary-700/25 focus:ring-primary-200 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800 shadow-lg hover:shadow-xl focus:ring-4 focus:outline-none active:scale-[0.98]",
                  ],

                (!canSubmit || isSubmitting) && [
                  "bg-primary-100 text-primary-400 dark:bg-primary-900 dark:text-primary-600 cursor-not-allowed",
                ],
              )}
            >
              {isSubmitting ? "Please Wait..." : "Save and Continue"}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
