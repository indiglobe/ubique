import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppState = {
  hasStartedDay: boolean;

  completedStep: number;

  selfie: File | null;

  odometerImage: File | null;

  profileName: string;

  profileEmail: string;

  profilePhone: string;

  profileAvatar: File | string | null;

  startDay: () => void;

  saveSelfie: (file: File) => void;

  saveOdometerImage: (file: File) => void;

  completeStep: (step: number) => void;

  resetDay: () => void;

  saveProfile: (profile: {
    name: string;
    phone: string;
    avatar: File | string | null;
  }) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasStartedDay: false,

      completedStep: 0,

      selfie: null,

      odometerImage: null,

      profileName: "Riya Ghosh",

      profileEmail: "riya.ghosh@gmail.com",

      profilePhone: "",

      profileAvatar:
        "https://images.pexels.com/photos/30968488/pexels-photo-30968488.jpeg",

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

      saveProfile: (profile) => {
        set({
          profileName: profile.name,
          profilePhone: profile.phone,
          profileAvatar: profile.avatar,
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
        hasStartedDay: state.hasStartedDay,

        completedStep: state.completedStep,

        profileName: state.profileName,

        profileEmail: state.profileEmail,

        profilePhone: state.profilePhone,
      }),
    },
  ),
);