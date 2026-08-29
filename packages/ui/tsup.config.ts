import { defineConfig } from "tsup";
import base from "@repo/tsup-config/base";

export default defineConfig({
  ...base,

  entry: ["src/components/*.tsx", "src/index.tsx"],
});
