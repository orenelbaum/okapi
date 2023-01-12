const esbuild = require("esbuild");
const civetPlugin = require("@danielx/civet/esbuild-plugin");

esbuild
  .build({
    entryPoints: ["src/index.civet"],
    bundle: true,
    outfile: "dist/index.js",
    plugins: [civetPlugin],
  })
  .catch(() => process.exit(1));
