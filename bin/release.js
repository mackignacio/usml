#!/usr/bin/env node

const { exec } = require("child_process");
const args = {};
let name = "release";

process.argv.forEach(function (val, index) {
  const hasReleaseName = index === 2 && !val.includes("--");
  if (hasReleaseName) {
    name = val;
  }

  if (!hasReleaseName || index > 2) {
    const [key, value] = val.split("=").map((e) => e.replace("--", ""));
    args[key] = value;
  }
});

const preid = args["preid"] ? `--preid=${args.preid}` : "";
const msg = `feat(version): :sparkles: bump ${name !== "release" ? name : ""} version to %s`;
const cmd = `npm version ${preid ? "pre" : ""}${name} ${preid} -m "${msg}"`;

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout: ${stdout}`);
});
