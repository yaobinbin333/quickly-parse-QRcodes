const path = require("path");
const AdmZip = require("adm-zip");
const { version } = require('./apps/manifest.json');
const { name } = require('./apps/manifest.json');
const MAIN_JS_PATH = path.resolve(__dirname, "./apps");
const isRelease = process.argv.includes("--release");
const EXTENSION_NAME = `${name}${version}.zip`;
const ARTIFACT_PATH = path.resolve(__dirname, `./release/${EXTENSION_NAME}`);
const createZip = () => {
  const zip = new AdmZip();
  zip.addLocalFolder(MAIN_JS_PATH);
  zip.writeZip(isRelease ? ARTIFACT_PATH : path.relative(__dirname, `./dist/${EXTENSION_NAME}`));
  console.log(new Date(), "Zip created");
}
require("esbuild")
  .build({
    entryPoints: ["src/index.js", "options/index.js"],
    bundle: true,
    platform: "browser",
    treeShaking: false,
    outdir: `${MAIN_JS_PATH}/dist`,
    minify: true,
    sourcemap: isRelease ? false : 'inline',
    bundle: true,
    watch: !isRelease,
    drop: isRelease ? ['console'] : []
  })
  .then(() => {
    if(isRelease) {
      createZip();
    }
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });