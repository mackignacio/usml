const esbuild = require("esbuild");
const gzipPlugin = require("@luncheon/esbuild-plugin-gzip");

esbuild.build({
  entryPoints: ["src/uxml.ts"],
  outfile: "uxml.js",
  bundle: true,
  minify: true,
  target: "es2020",
  write: false, // write must be false
  plugins: [gzipPlugin({ gzip: true })],
});
