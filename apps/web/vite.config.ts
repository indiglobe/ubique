import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

const config = defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    resolve: { tsconfigPaths: true },

    server: {
      host: "0.0.0.0",
      allowedHosts: !isProd ? true : undefined,
    },

    plugins: [
      devtools(),
      isProd &&
        nitro({
          rollupConfig: { external: [/^@sentry\//] },
          output: { dir: "dist" },
        }),
      tailwindcss(),
      tanstackStart(),
      viteReact(),
      babel({ presets: [reactCompilerPreset()] }),
    ],
  };
});

export default config;
