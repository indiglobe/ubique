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
    (state) => state.saveOdometerImage,
  );

  const completedStep = useAppStore(
    (state) => state.completedStep ?? 0,
  );

  const completeStep = useAppStore(
    (state) => state.completeStep,
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

      // Step 3 navigation will be added later.
    },
  });

  const handleUpload = async (
    odometerImage: File,
  ) => {
    setState((prev) => ({
      ...prev,
      isUploading: true,
    }));

    try {
      await new Promise<void>(
        (resolve, reject) => {
          setTimeout(() => {
            if (Math.random() > 0.5) {
              resolve();
            } else {
              reject(
                new Error(
                  "Odometer upload failed",
                ),
              );
            }
          }, 2000);
        },
      );

      saveOdometerImage(
        odometerImage,
      );

      setState((prev) => ({
        ...prev,
        isUploaded: true,
      }));
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
        URL.revokeObjectURL(
          state.previewUrl,
        );
      }
    };
  }, [state.previewUrl]);

  return (
    <main
      className={cn(
        `flex min-h-svh items-center justify-center`,
        `bg-background`,
        `px-4 py-8`,
        `3xs:px-5`,
        `2xs:px-6`,
        `sm:px-8`,
      )}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          void form.handleSubmit();
        }}
        className={cn(
          `w-full max-w-md`,
          `rounded-3xl`,
          `border border-primary-100`,
          `bg-primary-50/40`,
          `px-6 py-10`,
          `text-center`,
          `shadow-xl shadow-primary-950/10`,
          `backdrop-blur-sm`,
          `dark:border-primary-900`,
          `dark:bg-primary-950/20`,
          `dark:shadow-primary-950/30`,
          `sm:px-10 sm:py-12`,
          `md:max-w-lg`,
        )}
      >
        {/* Step Indicator */}
        <StepProgress
          completedStep={completedStep}
        />

        {/* Heading */}
        <h1
          className={cn(
            `font-brand-secondary`,
            `text-3xl font-bold`,
            `tracking-tight`,
            `text-foreground`,
            `sm:text-4xl`,
          )}
        >
          Upload Vehicle Odometer
        </h1>

        {/* Description */}
        <p
          className={cn(
            `mt-3`,
            `font-brand-primary`,
            `text-sm`,
            `text-primary-800/70`,
            `dark:text-primary-200/70`,
            `sm:text-base`,
          )}
        >
          Please upload a clear photo of your
          vehicle odometer.
        </p>

        {/* Odometer Image Field */}
        <form.Field
          name="odometerImage"
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return "Please select an odometer image";
              }

              if (
                !value.type.startsWith(
                  "image/",
                )
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
                className={cn(`hidden`)}
                onChange={(event) => {
                  const file =
                    event.target.files?.[0] ??
                    null;

                  field.handleChange(file);

                  // A newly selected image
                  // has not been uploaded yet.
                  setState((prev) => ({
                    ...prev,
                    isUploaded: false,
                  }));

                  if (
                    state.previewUrl
                  ) {
                    URL.revokeObjectURL(
                      state.previewUrl,
                    );
                  }

                  if (file) {
                    const newPreviewUrl =
                      URL.createObjectURL(
                        file,
                      );

                    setState((prev) => ({
                      ...prev,
                      previewUrl:
                        newPreviewUrl,
                    }));
                  } else {
                    setState((prev) => ({
                      ...prev,
                      previewUrl: null,
                    }));
                  }
                }}
              />

              {/* Select Image Button */}
              <label
                htmlFor="odometerImage"
                className={cn(
                  `mx-auto mt-8`,
                  `flex w-fit cursor-pointer`,
                  `items-center justify-center`,
                  `rounded-md`,
                  `border-2 border-primary-600`,
                  `px-7 py-3`,
                  `font-brand-primary`,
                  `font-semibold`,
                  `text-primary-600`,
                  `transition-all duration-200`,
                  `hover:bg-primary-100/60`,
                  `active:scale-95`,
                  `dark:border-primary-400`,
                  `dark:text-primary-300`,
                  `dark:hover:bg-primary-900/40`,
                )}
              >
                {field.state.value
                  ? "Change Odometer Photo"
                  : "Select Odometer Photo"}
              </label>

              {/* Error */}
              {field.state.meta.errors
                .length > 0 && (
                <p
                  className={cn(
                    `mt-2`,
                    `text-sm font-medium`,
                    `text-primary-700`,
                    `dark:text-primary-300`,
                  )}
                >
                  {String(
                    field.state.meta
                      .errors[0],
                  )}
                </p>
              )}
            </>
          )}
        </form.Field>

        {/* Preview Section */}
        <div
          className={cn(
            `mt-8`,
          )}
        >
          <h2
            className={cn(
              `mb-4`,
              `font-brand-secondary`,
              `text-lg font-semibold`,
              `text-foreground`,
            )}
          >
            Odometer Preview
          </h2>

          {state.previewUrl ? (
            <div
              className={cn(
                `flex justify-center`,
              )}
            >
              <img
                src={state.previewUrl}
                alt="Vehicle Odometer Preview"
                className={cn(
                  `h-52 w-full max-w-xs`,
                  `rounded-2xl`,
                  `border border-primary-200`,
                  `object-cover`,
                  `shadow-lg shadow-primary-950/10`,
                  `ring-2 ring-primary-100`,
                  `dark:border-primary-800`,
                  `dark:ring-primary-900`,
                  `sm:h-60`,
                )}
              />
            </div>
          ) : (
            <div
              className={cn(
                `mx-auto`,
                `flex h-52 w-full max-w-xs`,
                `items-center justify-center`,
                `rounded-2xl`,
                `border-2 border-dashed`,
                `border-primary-200`,
                `bg-primary-50/60`,
                `px-4`,
                `font-brand-primary`,
                `text-sm`,
                `text-primary-500`,
                `dark:border-primary-800`,
                `dark:bg-primary-950/30`,
                `dark:text-primary-400`,
              )}
            >
              Your odometer photo will appear
              here
            </div>
          )}
        </div>

        {/* Upload Button */}
        <form.Subscribe
          selector={(formState) =>
            [
              formState.values
                .odometerImage,
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
                  odometerImage,
                );
              }}
              className={cn(
                `mt-6 w-full`,
                `rounded-md`,
                `px-6 py-3.5`,
                `font-brand-primary`,
                `font-semibold`,
                `transition-all duration-200`,
                `sm:text-lg`,

                odometerImage &&
                  !state.isUploaded &&
                  !state.isUploading &&
                  cn(
                    `bg-secondary-600`,
                    `text-secondary-50`,
                    `shadow-lg shadow-secondary-600/20`,
                    `hover:bg-secondary-700`,
                    `hover:shadow-xl`,
                    `hover:shadow-secondary-700/25`,
                    `active:scale-[0.98]`,
                    `focus:outline-none`,
                    `focus:ring-4`,
                    `focus:ring-secondary-200`,
                    `dark:bg-secondary-500`,
                    `dark:hover:bg-secondary-600`,
                    `dark:focus:ring-secondary-900`,
                  ),

                (!odometerImage ||
                  state.isUploaded ||
                  state.isUploading) &&
                  cn(
                    `cursor-not-allowed`,
                    `bg-primary-100`,
                    `text-primary-400`,
                    `dark:bg-primary-900`,
                    `dark:text-primary-600`,
                  ),
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

        {/* Success Message */}
        {state.isUploaded && (
          <p
            className={cn(
              `mt-3`,
              `font-brand-primary`,
              `text-sm font-medium`,
              `text-secondary-700`,
              `dark:text-secondary-300`,
            )}
          >
            Odometer photo uploaded
            successfully.
          </p>
        )}

        {/* Next Button */}
        <form.Subscribe
          selector={(formState) =>
            [
              formState.isSubmitting,
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
                `mt-8 w-full`,
                `rounded-md`,
                `px-6 py-3.5`,
                `font-brand-primary`,
                `font-semibold`,
                `transition-all duration-200`,
                `sm:text-lg`,

                state.isUploaded &&
                  !state.isUploading &&
                  !isSubmitting &&
                  completedStep < 2 &&
                  cn(
                    `bg-primary-600`,
                    `text-primary-50`,
                    `shadow-lg shadow-primary-600/20`,
                    `hover:bg-primary-700`,
                    `hover:shadow-xl`,
                    `hover:shadow-primary-700/25`,
                    `active:scale-[0.98]`,
                    `focus:outline-none`,
                    `focus:ring-4`,
                    `focus:ring-primary-200`,
                    `dark:bg-primary-500`,
                    `dark:hover:bg-primary-600`,
                    `dark:focus:ring-primary-800`,
                  ),

                (!state.isUploaded ||
                  state.isUploading ||
                  isSubmitting ||
                  completedStep >= 2) &&
                  cn(
                    `cursor-not-allowed`,
                    `bg-primary-100`,
                    `text-primary-400`,
                    `dark:bg-primary-900`,
                    `dark:text-primary-600`,
                  ),
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