import tsupBaseConfig from "@repo/tsup-config/base";
import { defineConfig } from "tsup";

export default defineConfig({
  ...tsupBaseConfig,

  entry: ["src/**/*.ts", "src/**/*.css"],
});
