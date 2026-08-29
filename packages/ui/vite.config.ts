import { defineConfig } from "vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import babel from "@rolldown/plugin-babel";
import path from "node:path";

const config = defineConfig(() => {
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    plugins: [
      tailwindcss(),

      viteReact(),

      babel({
        presets: [reactCompilerPreset()],
      }),
    ],
  };
});

export default config;
