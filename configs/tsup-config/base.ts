import { type Options } from "tsup";

export default {
  entry: [],

  format: ["esm", "cjs"],

  dts: true,

  splitting: false,

  clean: true,

  external: ["react", "react-dom", "@video/react"],
} satisfies Options;
