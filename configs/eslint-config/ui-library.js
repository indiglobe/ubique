import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import baseConfig from "./base.js";

/**
 * A custom ESLint configuration for React libraries/apps.
 *
 * ESLint v10 compatible.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  ...baseConfig,

  /**
   * React + JSX support
   *
   * NOTE:
   * We intentionally DO NOT use:
   * pluginReact.configs.flat.recommended
   *
   * because some rules inside that preset are not yet
   * compatible with ESLint v10.
   */
  {
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
    },

    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",

        ecmaFeatures: {
          jsx: true,
        },
      },

      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      /**
       * React Hooks
       */
      ...pluginReactHooks.configs.recommended.rules,

      /**
       * Safe React rules
       */
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-target-blank": "warn",
      "react/jsx-uses-vars": "error",

      /**
       * New JSX Transform
       */
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      /**
       * Temporarily disabled because
       * eslint-plugin-react is not fully
       * ESLint v10 compatible yet.
       */
      "react/display-name": "off",
      "react/prop-types": "off",
    },
  },
];
