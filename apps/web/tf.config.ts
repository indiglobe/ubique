import { defineConfig } from "taskforge-cli/config";
import { env } from "node:process";

export default defineConfig({
  envDir: "../../",
  scripts: {
    "serve:app": {
      execute: "node dist/server/index.mjs",
      envFile: ".env.production",
    },
    "build:app": {
      execute: "vite build",
      envFile: ".env.production",
    },
    "dev:app": {
      execute: "vite dev",
      envFile:
        env.PLATFORM === "devcontainer"
          ? ".env.devcontainer"
          : ".env.development",
    },
    "sb:dev": {
      execute: "storybook dev -p 10594",
      envFile:
        env.PLATFORM === "devcontainer"
          ? ".env.devcontainer"
          : ".env.development",
    },
    "sb:build": {
      execute: "storybook build",
      envFile: ".env.production",
    },
  },
});
