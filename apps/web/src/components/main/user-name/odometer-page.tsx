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
        "flex min-h-screen",
        "items-center justify-center",
        "bg-slate-50",
        "px-4 py-8"
      )}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          form.handleSubmit();
        }}
        className={cn(
          "w-full max-w-md",
          "rounded-3xl",
          "bg-white",
          "px-6 py-10",
          "text-center",
          "shadow-[0_10px_40px_rgba(0,0,0,0.12)]",
          "sm:px-10 sm:py-12",
          "md:max-w-lg"
        )}
      >
        {/* STEP INDICATOR */}

        <StepProgress
          completedStep={completedStep}
        />

        {/* HEADING */}

        <h1
          className={cn(
            "text-3xl font-bold",
            "tracking-tight",
            "text-slate-800",
            "sm:text-4xl"
          )}
        >
          Upload Vehicle Odometer
        </h1>

        {/* DESCRIPTION */}

        <p
          className={cn(
            "mt-3",
            "text-sm text-slate-500",
            "sm:text-base"
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
                  "mx-auto mt-8",
                  "flex w-fit cursor-pointer",
                  "items-center justify-center",
                  "rounded-xl",
                  "border-2 border-blue-600",
                  "px-7 py-3",
                  "font-semibold text-blue-600",
                  "transition-all duration-200",
                  "hover:bg-blue-50",
                  "active:scale-95"
                )}
              >
                {field.state.value
                  ? "Change Odometer Photo"
                  : "Select Odometer Photo"}
              </label>

              {/* ERROR */}

              {field.state.meta.errors.length >
                0 && (
                  <p className="mt-2 text-sm text-red-500">
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
              "mb-4",
              "text-lg font-semibold",
              "text-slate-700"
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
                  "h-52 w-full",
                  "max-w-xs",
                  "rounded-2xl",
                  "object-cover",
                  "border border-slate-200",
                  "shadow-md",
                  "sm:h-60"
                )}
              />
            </div>
          ) : (
            <div
              className={cn(
                "mx-auto",
                "flex h-52 w-full",
                "max-w-xs",
                "items-center justify-center",
                "rounded-2xl",
                "border-2 border-dashed",
                "border-slate-300",
                "bg-slate-50",
                "px-4",
                "text-sm text-slate-400"
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
                "mt-6",
                "w-full",
                "rounded-xl",
                "px-6 py-3.5",
                "font-semibold",
                "transition-all duration-200",
                "sm:text-lg",

                odometerImage &&
                !state.isUploaded &&
                !state.isUploading && [
                  "bg-emerald-600",
                  "text-white",
                  "shadow-md",
                  "hover:bg-emerald-700",
                  "hover:shadow-lg",
                  "active:scale-[0.98]",
                ],

                (!odometerImage ||
                  state.isUploaded ||
                  state.isUploading) && [
                  "cursor-not-allowed",
                  "bg-slate-300",
                  "text-slate-500",
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
              "mt-3",
              "text-sm font-medium",
              "text-emerald-600"
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
                "mt-8",
                "w-full",
                "rounded-xl",
                "px-6 py-3.5",
                "font-semibold",
                "transition-all duration-200",
                "sm:text-lg",

                state.isUploaded &&
                !state.isUploading &&
                !isSubmitting &&
                completedStep < 2 && [
                  "bg-blue-600",
                  "text-white",
                  "shadow-md",
                  "hover:bg-blue-700",
                  "hover:shadow-lg",
                  "active:scale-[0.98]",
                ],

                (!state.isUploaded ||
                  state.isUploading ||
                  isSubmitting ||
                  completedStep >= 2) && [
                  "cursor-not-allowed",
                  "bg-slate-300",
                  "text-slate-500",
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