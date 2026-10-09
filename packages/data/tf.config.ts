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

    // ===================================
    // QUERY TEST
    // ===================================
    "db:test:query": {
      execute: "tsx watch ./src/database/helpers/test-query.ts",
      envFile: ".env.development",
    },

    // ===================================
    // PRODUCTION GENERATION
    // ===================================
    "db:generate": {
      execute: "drizzle-kit generate", //
      envFile: ".env.production",
    },
    "db:migrate": {
      execute: "drizzle-kit migrate", //
      envFile: ".env.production",
    },
    "db:pull": {
      execute: "drizzle-kit pull", //
      envFile: ".env.production",
    },
    // ===================================
    // PRODUCTION
    // ===================================
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

    "db:prod": {
      execute: "pnpm db:prod:setup && pnpm db:prod:push && pnpm db:prod:seed",
    },

    // ===================================
    // DEVELOPMENT
    // ===================================
    "db:dev": {
      execute: "pnpm db:dev:setup && pnpm db:dev:push && pnpm db:dev:seed",
      envValues: {
        STRICT: false,
        VERBOSE: false,
      },
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

    // ===================================
    // TEST
    // ===================================
    "db:test": {
      execute: "pnpm db:test:setup && pnpm db:test:push",
      envValues: {
        STRICT: false,
        VERBOSE: false,
      },
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

    // ===================================
    // DATABASE
    // ===================================
  },
});
