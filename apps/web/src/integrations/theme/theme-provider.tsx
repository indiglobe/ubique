import React, { createContext, use, useEffect, useMemo, useState } from "react";
import { HydrateTheme } from "@/integrations/theme/function-once";

export type ResolvedTheme = "dark" | "light";
export type Theme = ResolvedTheme | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const isBrowser = typeof window !== "undefined";

/**
 * @link [Themeing docs for Tanstack](https://dev.to/tigawanna/tanstack-start-ssr-friendly-theme-provider-5gee)
 */

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (isBrowser
        ? (localStorage.getItem(storageKey) as Theme)
        : defaultTheme) || defaultTheme,
  );

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function updateTheme() {
      root.classList.remove("light", "dark");

      if (theme === "system") {
        const systemTheme = mediaQuery.matches ? "dark" : "light";
        setResolvedTheme(systemTheme);
        root.classList.add(systemTheme);
        return;
      }

      setResolvedTheme(theme);
      root.classList.add(theme);
    }

    mediaQuery.addEventListener("change", updateTheme);
    updateTheme();

    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, [theme]);

  const value = useMemo(() => {
    return {
      theme,
      resolvedTheme,
      setTheme: (newTheme: Theme) => {
        localStorage.setItem(storageKey, newTheme);
        setTheme(newTheme);
      },
    };
  }, [theme, resolvedTheme, storageKey]);

  return (
    <ThemeProviderContext value={value}>
      <HydrateTheme />
      {children}
    </ThemeProviderContext>
  );
}

export function useTheme() {
  const context = use(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}
