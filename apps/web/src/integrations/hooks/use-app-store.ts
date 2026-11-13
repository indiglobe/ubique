import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  hasStartedDay: boolean;
  completedStep: number;
  attendanceDate: string | null;

  selfieImage: File | null;
  odometerImage: File | null;

  startDay: () => void;
  completeStep: (step: number) => void;
  saveSelfie: (file: File) => void;
  saveOdometerImage: (file: File) => void;
  resetDay: () => void;
  checkDailyReset: () => void;
}

/**
 * Returns today's LOCAL date.
 *
 * Example:
 * 2026-09-09
 */
const getTodayDate = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * Checks whether the attendance stored in
 * localStorage belongs to today.
 */
function isTodaysAttendance(): {
  isToday: boolean;
  completedStep: number;
} {
  try {
    // Prevent errors during SSR / server rendering.
    if (typeof window === "undefined") {
      return {
        isToday: false,
        completedStep: 0,
      };
    }

    const storedData = localStorage.getItem(
      "medical-rep-storage",
    );

    if (!storedData) {
      return {
        isToday: false,
        completedStep: 0,
      };
    }

    const parsedData = JSON.parse(storedData);

    const existingAttendanceDate =
      parsedData.state?.attendanceDate;

    const completedStep =
      typeof parsedData.state?.completedStep === "number"
        ? parsedData.state.completedStep
        : 0;

    if (!existingAttendanceDate) {
      return {
        isToday: false,
        completedStep: 0,
      };
    }

    const today = new Date();

    const attendanceDate = new Date(
      existingAttendanceDate,
    );

    const isToday =
      today.getFullYear() ===
        attendanceDate.getFullYear() &&
      today.getMonth() ===
        attendanceDate.getMonth() &&
      today.getDate() ===
        attendanceDate.getDate();

    return {
      isToday,
      completedStep: isToday ? completedStep : 0,
    };
  } catch {
    return {
      isToday: false,
      completedStep: 0,
    };
  }
}

export const useAppStore =
  create<AppState>()(
    persist(
      (set, get) => {
        /**
         * Check existing attendance only once
         * while creating the initial store.
         */
        const attendance =
          isTodaysAttendance();

        return {
          // =========================
          // Initial Attendance State
          // =========================

          hasStartedDay:
            attendance.isToday,

          completedStep:
            attendance.isToday
              ? attendance.completedStep
              : 0,

          attendanceDate:
            attendance.isToday
              ? getTodayDate()
              : null,

          // =========================
          // Initial Uploaded Files
          // =========================

          selfieImage: null,
          odometerImage: null,

          // =========================
          // Start Today's Attendance
          // =========================

          startDay: () => {
            const today =
              getTodayDate();

            set({
              hasStartedDay: true,

              completedStep: 0,

              attendanceDate: today,

              // Every new attendance begins
              // with fresh images.
              selfieImage: null,

              odometerImage: null,
            });
          },

          // =========================
          // Complete Step
          // =========================

          completeStep: (
            step: number,
          ) => {
            const today =
              getTodayDate();

            const state = get();

            /**
             * If attendance belongs to
             * another day, do not allow
             * previous progress to continue.
             */
            if (
              state.attendanceDate !==
              today
            ) {
              set({
                hasStartedDay: false,

                completedStep: 0,

                attendanceDate: null,

                selfieImage: null,

                odometerImage: null,
              });

              return;
            }

            set({
              completedStep: step,
            });
          },

          // =========================
          // Save Selfie
          // =========================

          saveSelfie: (
            file: File,
          ) => {
            set({
              selfieImage: file,
            });
          },

          // =========================
          // Save Odometer
          // =========================

          saveOdometerImage: (
            file: File,
          ) => {
            set({
              odometerImage: file,
            });
          },

          // =========================
          // Manual Reset
          // =========================

          resetDay: () => {
            set({
              hasStartedDay: false,

              completedStep: 0,

              attendanceDate: null,

              selfieImage: null,

              odometerImage: null,
            });
          },

          // =========================
          // Daily Reset Check
          // =========================

          checkDailyReset: () => {
            const attendance =
              isTodaysAttendance();

            /**
             * Today's attendance exists.
             *
             * Restore today's progress.
             */
            if (attendance.isToday) {
              set({
                hasStartedDay: true,

                completedStep:
                  attendance.completedStep,

                attendanceDate:
                  getTodayDate(),
              });

              return;
            }

            /**
             * No attendance for today.
             *
             * Start from the beginning.
             */
            set({
              hasStartedDay: false,

              completedStep: 0,

              attendanceDate: null,

              selfieImage: null,

              odometerImage: null,
            });
          },
        };
      },

      {
        name: "medical-rep-storage",

        /**
         * Only persist attendance information.
         *
         * File objects should not be stored
         * directly in localStorage.
         */
        partialize: (state) => ({
          hasStartedDay:
            state.hasStartedDay,

          completedStep:
            state.completedStep,

          attendanceDate:
            state.attendanceDate,
        }),

        /**
         * IMPORTANT:
         *
         * Zustand normally restores everything
         * from localStorage during hydration.
         *
         * Here we prevent yesterday's attendance
         * from being restored.
         */
        merge: (
          persistedState,
          currentState,
        ) => {
          const persisted =
            persistedState as Partial<AppState>;

          const attendance =
            isTodaysAttendance();

          /**
           * Attendance belongs to another day.
           */
          if (!attendance.isToday) {
            return {
              ...currentState,

              hasStartedDay: false,

              completedStep: 0,

              attendanceDate: null,

              selfieImage: null,

              odometerImage: null,
            };
          }

          /**
           * Attendance belongs to today.
           */
          return {
            ...currentState,
            ...persisted,

            hasStartedDay: true,

            completedStep:
              attendance.completedStep,

            attendanceDate:
              getTodayDate(),

            /**
             * File objects are intentionally
             * never restored from localStorage.
             */
            selfieImage: null,

            odometerImage: null,
          };
        },
      },
    ),
  );