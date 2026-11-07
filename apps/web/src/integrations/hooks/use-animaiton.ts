import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * Animation tracking store (Zustand hook).
 *
 * This store is used to keep track of whether UI elements have already
 * completed their animation at least once during the application's lifecycle.
 *
 * It is commonly used for:
 * - Preventing repeat entrance animations (e.g. "only animate on first mount")
 * - Ensuring elements do not re-animate when re-rendered or revisited
 * - Persisting "animation has played" state in memory (per session)
 *
 * Example use case:
 * - An element with ID "hero-title" should animate only the first time it appears.
 * - After that, it is marked as "played" and subsequent renders skip animation.
 *
 * Note:
 * This state is in-memory only (not persisted to localStorage or backend).
 */
type Animation = {
  /**
   * Map of animation IDs to boolean flags indicating whether they have played.
   */
  played: Map<string, boolean>;

  /**
   * Checks whether a given animation ID has already been played.
   *
   * @param id - Unique identifier for the animated element
   * @returns true if the animation has already played, otherwise false
   */
  hasPlayed: (id: string) => boolean;

  /**
   * Marks an animation as played so it will not re-run in future renders.
   *
   * @param id - Unique identifier for the animated element
   * @returns void
   */
  markPlayed: (id: string) => void;
};

/**
 * useAnimation (Zustand store hook)
 *
 * This hook manages a lightweight in-memory registry of animation states
 * for UI elements.
 *
 * It tracks whether a specific element (identified by a string ID) has
 * already completed its animation at least once.
 *
 * Purpose:
 * - Prevent re-running entrance animations on re-renders
 * - Ensure animations only play once per session
 * - Provide a simple "has this animated before?" lookup
 *
 * Concept:
 * Each animated element is assigned a unique ID. When its animation
 * completes, `markPlayed(id)` is called. Future checks via `hasPlayed(id)`
 * will return `true`, allowing components to skip re-animation logic.
 *
 * Note:
 * This state is ephemeral (in-memory only). It resets on page refresh.
 *
 * @returns Zustand store with animation tracking utilities
 */
export const useAnimation = create<Animation>()(
  devtools(
    (set, get) => ({
      played: {},

      hasPlayed: (id) => {
        return !!get().played.get(id);
      },

      markPlayed: (id) =>
        set(
          (state) => ({
            played: { ...state.played, [id]: true },
          }),
          false,
          "animation/markPlayed",
        ),
    }),
    { name: "animation-store" },
  ),
);
