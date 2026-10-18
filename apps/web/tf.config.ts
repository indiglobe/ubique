import { defineConfig } from "taskforge-cli/config";
import { env } from "node:process";

export default defineConfig({
  envDir: "../../",
  scripts: {
    dev: {
      execute: "vite dev --open",
      envFile:
        env.PLATFORM === "devcontainer"
          ? ".env.devcontainer"
          : ".env.development",
      envValues: {
        PORT: 19764,
      },
    },
    build: {
      execute: "vite build",
      envFile: ".env.production",
    },
    start: {
      execute: "node dist/server/index.mjs",
      envFile: ".env.production",
    },
    "serve:app:local": {
      execute: "node dist/server/index.mjs",
      envFile: ".env.production.local",
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
