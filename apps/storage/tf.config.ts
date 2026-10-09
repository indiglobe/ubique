import { defineConfig } from "taskforge-cli/config";
import os from "node:os";

export default defineConfig({
  envDir: "../../",
  scripts: {
    dev: {
      execute: "tsx watch src/index.ts",
      envFile:
        os.platform() === "linux" ? ".env.devcontainer" : ".env.development",
      envValues: {
        PORT: 15618,
      },
    },
    start: {
      execute: "node dist/index.mjs",
      envFile: ".env.production",
      envValues: {
        NODE_ENV: "production",
      },
    },
    build: {
      execute: "pkgroll",
      envFile: ".env.production",
      envValues: {
        NODE_ENV: "production",
      },
    },
  },
});
