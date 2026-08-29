import { defineConfig } from "vitest/config";
import baseVitestConfig from "@repo/vitest-config/base";

export default defineConfig({
  ...baseVitestConfig,

  resolve: { tsconfigPaths: true },

  plugins: [],

  test: {
    ...baseVitestConfig.test,
    include: ["__tests__/**/*.test.ts"],
    coverage: {
      exclude: ["src/schema/**/*"],
    },
  },
});
