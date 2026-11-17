import { defineConfig } from "taskforge-cli/config";
import os from "node:os";

export default defineConfig({
  envDir: "../../",
  scripts: {
    dev: {
      execute: "tsx --watch src/index.ts",
      envFile:
        os.platform() === "linux" ? ".env.devcontainer" : ".env.development",
      envValues: {
        PORT: 13371,
        NODE_ENV: "development",
      },
    },
    start: {
      execute: "node ./dist/index.cjs",
      envFile: ".env.development",
      envValues: {
        NODE_ENV: "production",
      },
    },
  },
});
