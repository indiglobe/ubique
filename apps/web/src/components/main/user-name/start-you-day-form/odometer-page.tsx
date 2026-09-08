import {
  useEffect,
  useState,
} from "react";

import { useForm } from "@tanstack/react-form";

import StepProgress from "./step-progress";

import { useAppStore } from "@/hooks/use-app-store";

import { cn } from "@repo/styles/cn";

const OdometerPage = () => {
  const saveOdometerImage = useAppStore(
    (state) =>
      state.saveOdometerImage
  );

  const completedStep = useAppStore(
    (state) =>
      state.completedStep
  );

  const completeStep = useAppStore(
    (state) =>
      state.completeStep
  );

  const [state, setState] = useState({
    previewUrl: null as string | null,
    isUploaded: false,
    isUploading: false,
  });

  const form = useForm({
    defaultValues: {
      odometerImage: null as File | null,
    },

    onSubmit: async () => {
      if (!state.isUploaded) {
        return;
      }

      // Step 2 completed
      completeStep(2);

      // Step 3 navigation will
      // be added later.
    },
  });

  const handleUpload = async (
    odometerImage: File
  ) => {
    setState((prev) => ({
      ...prev, isUploading: true,
    }));

    try {
      await new Promise((res, rej) => {
        setTimeout(() => {
          Math.random() > 0.5
            ? res("")
            : rej();
        }, 2000);
      }).then(() => {
        saveOdometerImage(
          odometerImage
        );

        setState((prev) => ({
          ...prev,
          isUploaded: true,
        }));
      });
    } catch {
      setState((prev) => ({
        ...prev,
        isUploaded: false,
      }));
    } finally {
      setState((prev) => ({
        ...prev,
        isUploading: false,
      }));
    }
  };

  useEffect(() => {
    return () => {
      if (state.previewUrl) {
        URL.revokeObjectURL(state.previewUrl);
      }
    };
  }, [state.previewUrl]);

  return (
    <main
      className={cn(
        "flex min-h-svh items-center justify-center bg-background px-4 py-8 3xs:px-5 2xs:px-6 sm:px-8"
      )}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          form.handleSubmit();
        }}
        className={cn(
          "w-full max-w-md rounded-3xl border border-primary-100 bg-primary-50/40 px-6 py-10 text-center shadow-xl shadow-primary-950/10 backdrop-blur-sm dark:border-primary-900 dark:bg-primary-950/20 dark:shadow-primary-950/30 sm:px-10 sm:py-12 md:max-w-lg"
        )}
      >
        {/* STEP INDICATOR */}

        <StepProgress
          completedStep={completedStep}
        />

        {/* HEADING */}

        <h1
          className={cn(
            "font-brand-secondary text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          )}
        >
          Upload Vehicle Odometer
        </h1>

        {/* DESCRIPTION */}

        <p
          className={cn(
            "mt-3 font-brand-primary text-sm text-primary-800/70 dark:text-primary-200/70 sm:text-base"
          )}
        >
          Please upload a clear photo of your
          vehicle odometer.
        </p>

        {/* ODOMETER IMAGE FIELD */}

        <form.Field
          name="odometerImage"
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return "Please select an odometer image";
              }

              if (
                !value.type.startsWith("image/")
              ) {
                return "Please select an image file";
              }

              return undefined;
            },
          }}
        >
          {(field) => (
            <>
              {/* Hidden File Input */}

              <input
                id="odometerImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file =
                    event.target.files?.[0] ??
                    null;

                  field.handleChange(file);

                  // New image has not been
                  // uploaded yet.
                  setState((prev) => ({
                    ...prev,
                    isUploaded: false,
                  }));

                  if (state.previewUrl) {
                    URL.revokeObjectURL(
                      state.previewUrl
                    );
                  }

                  if (file) {
                    const newPreviewUrl =
                      URL.createObjectURL(file);

                    setState((
                      prev) => ({
                        ...prev,
                        previewUrl: newPreviewUrl,
                      })
                    );
                  } else {
                    setState((prev) => ({
                      ...prev,
                      previewUrl: null,
                    }));
                  }
                }}
              />

              {/* SELECT IMAGE BUTTON */}

              <label
                htmlFor="odometerImage"
                className={cn(
                  "mx-auto mt-8 flex w-fit cursor-pointer items-center justify-center rounded-xl border-2 border-primary-600 px-7 py-3 font-brand-primary font-semibold text-primary-600 transition-all duration-200 hover:bg-primary-100/60 dark:border-primary-400 dark:text-primary-300 dark:hover:bg-primary-900/40 active:scale-95"
                )}
              >
                {field.state.value
                  ? "Change Odometer Photo"
                  : "Select Odometer Photo"}
              </label>

              {/* ERROR */}

              {field.state.meta.errors.length >
                0 && (
                  <p className="mt-2 text-sm font-medium text-primary-700 dark:text-primary-300">
                    {String(
                      field.state.meta.errors[0]
                    )}
                  </p>
                )}
            </>
          )}
        </form.Field>

        {/* PREVIEW SECTION */}

        <div className="mt-8">
          <h2
            className={cn(
              "mb-4 font-brand-secondary text-lg font-semibold text-foreground"
            )}
          >
            Odometer Preview
          </h2>

          {state.previewUrl ? (
            <div className="flex justify-center">
              <img
                src={state.previewUrl}
                alt="Vehicle Odometer Preview"
                className={cn(
                  "h-52 w-full max-w-xs rounded-2xl object-cover border border-primary-200 shadow-lg shadow-primary-950/10 ring-2 ring-primary-100 dark:border-primary-800 dark:ring-primary-900 sm:h-60"
                )}
              />
            </div>
          ) : (
            <div
              className={cn(
                "mx-auto flex h-52 w-full max-w-xs items-center justify-center rounded-2xl border-2 border-dashed border-primary-200 bg-primary-50/60 px-4 font-brand-primary text-sm text-primary-500 dark:border-primary-800 dark:bg-primary-950/30 dark:text-primary-400"
              )}
            >
              Your odometer photo will appear
              here
            </div>
          )}
        </div>

        {/* UPLOAD BUTTON */}

        <form.Subscribe
          selector={(state) =>
            [
              state.values.odometerImage,
            ] as const
          }
        >
          {([odometerImage]) => (
            <button
              type="button"
              disabled={
                !odometerImage ||
                state.isUploaded ||
                state.isUploading
              }
              onClick={async () => {
                if (!odometerImage) {
                  return;
                }

                await handleUpload(
                  odometerImage
                );
              }}
              className={cn(
                "mt-6 w-full rounded-xl px-6 py-3.5 font-brand-primary font-semibold transition-all duration-200 sm:text-lg",

                odometerImage &&
                !state.isUploaded &&
                !state.isUploading && [
                  "bg-secondary-600 text-secondary-50 shadow-lg shadow-secondary-600/20 hover:bg-secondary-700 hover:shadow-xl hover:shadow-secondary-700/25 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-secondary-200 dark:bg-secondary-500 dark:hover:bg-secondary-600 dark:focus:ring-secondary-900",
                ],

                (!odometerImage ||
                  state.isUploaded ||
                  state.isUploading) && [
                  "cursor-not-allowed bg-primary-100 text-primary-400 dark:bg-primary-900 dark:text-primary-600",
                ]
              )}
            >
              {state.isUploading
                ? "Please Wait..."
                : state.isUploaded
                  ? "Odometer Uploaded"
                  : "Upload"}
            </button>
          )}
        </form.Subscribe>

        {/* SUCCESS MESSAGE */}

        {state.isUploaded && (
          <p
            className={cn(
              "mt-3 font-brand-primary text-sm font-medium text-secondary-700 dark:text-secondary-300"
            )}
          >
            Odometer photo uploaded
            successfully.
          </p>
        )}

        {/* NEXT BUTTON */}

        <form.Subscribe
          selector={(state) =>
            [
              state.isSubmitting,
            ] as const
          }
        >
          {([isSubmitting]) => (
            <button
              type="submit"
              disabled={
                !state.isUploaded ||
                state.isUploading ||
                isSubmitting ||
                completedStep >= 2
              }
              className={cn(
                "mt-8 w-full rounded-xl px-6 py-3.5 font-brand-primary font-semibold transition-all duration-200 sm:text-lg",

                state.isUploaded &&
                !state.isUploading &&
                !isSubmitting &&
                completedStep < 2 && [
                  "bg-primary-600 text-primary-50 shadow-lg shadow-primary-600/20 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-700/25 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary-200 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800",
                ],

                (!state.isUploaded ||
                  state.isUploading ||
                  isSubmitting ||
                  completedStep >= 2) && [
                  "cursor-not-allowed bg-primary-100 text-primary-400 dark:bg-primary-900 dark:text-primary-600",
                ]
              )}
            >
              {isSubmitting
                ? "Please Wait..."
                : "Next"}
            </button>
          )}
        </form.Subscribe>
      </form>
    </main>
  );
};

export default OdometerPage;