import { defineConfig, mergeConfig } from "vitest/config";
import baseVitestConfig from "@repo/vitest-config/base";

export default mergeConfig(
  defineConfig({
    ...baseVitestConfig,

    test: {
      ...baseVitestConfig.test,
      include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
      exclude: ["src/tests/e2e/**/*.ts", "src/tests/e2e/**/*.test.tsx"],
      environment: "jsdom",
    },
  }),
);
