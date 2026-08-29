import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * Navbar state (Zustand store).
 *
 * This store manages the open/close state of the application's
 * navigation bar.
 *
 * It is commonly used for:
 * - Responsive/mobile navigation menus
 * - Controlling navbar visibility globally
 * - Avoiding prop drilling for shared UI state
 *
 * Note:
 * This state is in-memory only and resets on page refresh.
 */
type NavbarState = {
  /**
   * Determines whether the navbar is currently open.
   */
  isNavOpen: boolean;

  /**
   * Opens the navbar.
   */
  openNavBar: () => void;

  /**
   * Closes the navbar.
   */
  closeNavBar: () => void;

  /**
   * Toggles the navbar between open and closed states.
   */
  toggleNavBar: () => void;
};

/**
 * useNavbarState (Zustand store hook)
 *
 * This hook provides a global controller for the navbar's
 * open/close state.
 *
 * Actions are exposed for opening, closing, and toggling
 * the navbar.
 *
 * Note:
 * This state is ephemeral (in-memory only) and resets on
 * page refresh.
 */
export const useNavbarState = create<NavbarState>()(
  devtools(
    (set) => ({
      isNavOpen: false,

      openNavBar: () => set({ isNavOpen: true }, false, "navbar/openNavBar"),

      closeNavBar: () => set({ isNavOpen: false }, false, "navbar/closeNavBar"),

      toggleNavBar: () =>
        set(
          (state) => ({
            isNavOpen: !state.isNavOpen,
          }),
          false,
          "navbar/toggleNavBar",
        ),
    }),
    {
      name: "navbar-store",
    },
  ),
);
