// @ts-check

import { tanstackConfig } from "@tanstack/eslint-config";

export default [
  ...tanstackConfig,

  {
    rules: {
      "import/no-cycle": "off",
      "import/order": "off",
      "sort-imports": "off",

      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",

      "pnpm/json-enforce-catalog": "off",

      // Tailwind IntelliSense / class conflict noise
      "tailwindcss/no-contradicting-classname": "off",
    },
  },

  {
    ignores: [
      "eslint.config.js",
      "prettier.config.js",
      "dist",
      ".output",
      ".tanstack",
      "coverage",
    ],
  },
];
