/* eslint-disable no-shadow */
import { ScriptOnce } from "@tanstack/react-router";

/**
 * **Purpose:** Executes JavaScript code once during SSR hydration
 */

export function FunctionOnce<T = unknown>({
  children,
  param,
}: {
  children: (param: T) => unknown;
  param?: T;
}) {
  return (
    <ScriptOnce>
      {`(${children.toString()})(${JSON.stringify(param)})`}
    </ScriptOnce>
  );
}

export function HydrateTheme({
  storageKey = "theme",
}: {
  storageKey?: string;
}) {
  return (
    <FunctionOnce param={storageKey}>
      {(storageKey) => {
        const theme: string | null = localStorage.getItem(storageKey);

        if (
          theme === "dark" ||
          ((theme === null || theme === "system") &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
          document.documentElement.classList.add("dark");
          return;
        }

        document.documentElement.classList.add("light");
        return;
      }}
    </FunctionOnce>
  );
}
