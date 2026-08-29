import { defineConfig } from "taskforge-cli/config";
import os from "node:os";

export default defineConfig({
  envDir: "../../",
  scripts: {
    test: {
      execute: "vitest",
    },
    "test:watch": {
      execute: "vitest",
    },
    "test:run": {
      execute: "vitest run",
      envFile: ".env.test",
    },
    "db:generate": {
      execute: "drizzle-kit generate", //
    },
    "db:migrate": {
      execute: "drizzle-kit migrate", //
    },
    "db:pull": {
      execute: "drizzle-kit pull", //
    },
    "db:test": {
      execute: "pnpm db:test:setup && pnpm db:test:push",
      envValues: {
        STRICT: false,
        VERBOSE: false,
      },
    },
    "db:dev": {
      execute: "pnpm db:dev:setup && pnpm db:dev:push && pnpm db:dev:seed",
      envValues: {
        STRICT: false,
        VERBOSE: false,
      },
    },
    "db:prod": {
      execute: "pnpm db:prod:setup && pnpm db:prod:push && pnpm db:prod:seed",
    },
    "db:prod:local": {
      execute:
        "pnpm db:prod:setup:local && pnpm db:prod:push:local && pnpm db:prod:seed:local",
    },
    "db:dev:setup": {
      execute: "tsx src/helpers/setup-db.ts",
      envFile:
        os.platform() === "linux" ? ".env.devcontainer" : ".env.development",
    },
    "db:dev:push": {
      execute: "drizzle-kit push",
      envFile:
        os.platform() === "linux" ? ".env.devcontainer" : ".env.development",
    },
    "db:dev:seed": {
      execute: "tsx src/helpers/seed-dev.ts",
      envFile:
        os.platform() === "linux" ? ".env.devcontainer" : ".env.development",
    },
    "db:dev:studio": {
      execute: "drizzle-kit studio",
      envFile:
        os.platform() === "linux" ? ".env.devcontainer" : ".env.development",
    },
    "db:test:setup": {
      execute: "tsx src/helpers/setup-db.ts",
      envFile: ".env.test",
    },
    "db:test:push": {
      execute: "drizzle-kit push",
      envFile: ".env.test",
    },
    "db:test:seed": {
      execute: "tsx src/helpers/seed-dev.ts",
      envFile: ".env.test",
    },
    "db:test:studio": {
      execute: "drizzle-kit studio",
      envFile: ".env.test",
    },
    "db:prod:setup": {
      execute: "tsx src/helpers/setup-db.ts",
      envFile: ".env.production",
    },
    "db:prod:push": {
      execute: "drizzle-kit push",
      envFile: ".env.production",
    },
    "db:prod:seed": {
      execute: "tsx src/helpers/seed-prod.ts",
      envFile: ".env.production",
    },
    "db:prod:studio": {
      execute: "drizzle-kit studio",
      envFile: ".env.production",
    },
    "db:prod:setup:local": {
      execute: "tsx src/helpers/setup-db.ts",
      envFile: ".env.production.local",
    },
    "db:prod:push:local": {
      execute: "drizzle-kit push",
      envFile: ".env.production.local",
    },
    "db:prod:seed:local": {
      execute: "tsx src/helpers/seed-prod.ts",
      envFile: ".env.production.local",
    },
    "db:prod:studio:local": {
      execute: "drizzle-kit studio",
      envFile: ".env.production.local",
    },
  },
});
