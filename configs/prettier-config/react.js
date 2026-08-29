import config from "./base";

//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  ...config,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx", "cva"],
};

export default config;
