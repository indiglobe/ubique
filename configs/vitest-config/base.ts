import { defineConfig } from "vitest/config";

type ConfigOptions = Parameters<typeof defineConfig>[0];

export default {
  test: {
    globals: true,
  },
} satisfies ConfigOptions;
