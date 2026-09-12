#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "public-manifest.json"), "utf8"));
const errors = [];

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

for (const artifact of manifest.artifacts ?? []) {
  if (!new Set(["approved", "published"]).has(artifact.approval_state)) continue;
  if (typeof artifact.path !== "string" || typeof artifact.checksum_sha256 !== "string") continue;
  const file = path.join(ROOT, artifact.path);
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) continue;
  const actual = sha256(fs.readFileSync(file));
  if (actual !== artifact.checksum_sha256) {
    errors.push({ id: artifact.id, path: artifact.path, expected: artifact.checksum_sha256, actual });
  }
}

if (errors.length) {
  console.error(`Manifest checksum validation failed with ${errors.length} mismatch(es):`);
  for (const error of errors) {
    console.error(`  - ${error.id} ${error.path} expected=${error.expected} actual=${error.actual}`);
  }
  process.exitCode = 1;
} else {
  console.log("Manifest checksum validation passed.");
}
