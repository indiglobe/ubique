import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppState = {
  hasStartedDay: boolean;

  completedStep: number;

  selfie: File | null;

  odometerImage: File | null;

  startDay: () => void;

  saveSelfie: (file: File) => void;

  saveOdometerImage: (file: File) => void;

  completeStep: (step: number) => void;

  resetDay: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasStartedDay: false,

      completedStep: 0,

      selfie: null,

      odometerImage: null,

      startDay: () => {
        set({
          hasStartedDay: true,
        });
      },

      saveSelfie: (file) => {
        set({
          selfie: file,
        });
      },

      saveOdometerImage: (file) => {
        set({
          odometerImage: file,
        });
      },

      completeStep: (step) => {
        set({
          completedStep: step,
        });
      },

      resetDay: () => {
        set({
          hasStartedDay: false,
          completedStep: 0,
          selfie: null,
          odometerImage: null,
        });
      },
    }),

    {
      name: "medical-rep-storage",

      partialize: (state) => ({
        hasStartedDay:
          state.hasStartedDay,

        completedStep:
          state.completedStep,
      }),
    }
  )
);