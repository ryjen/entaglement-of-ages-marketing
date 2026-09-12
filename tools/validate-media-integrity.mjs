#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const MEDIA_ROOT = path.join(ROOT, 'src', 'media');
const MANIFEST_PATH = path.join(ROOT, 'public-manifest.json');

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

const errors = [];
for (const file of walk(MEDIA_ROOT).filter((file) => file.endsWith('.webp'))) {
  const buffer = fs.readFileSync(file);
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  if (buffer.length < 12) {
    errors.push(`${rel}: WebP is shorter than the 12-byte RIFF/WEBP header`);
    continue;
  }
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') {
    errors.push(`${rel}: invalid RIFF/WEBP signature`);
    continue;
  }
  const declaredSize = buffer.readUInt32LE(4) + 8;
  if (declaredSize !== buffer.length) {
    errors.push(`${rel}: truncated or malformed WebP (RIFF declares ${declaredSize} bytes, file has ${buffer.length})`);
  }
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
for (const artifact of manifest.artifacts ?? []) {
  if (typeof artifact.path !== 'string' || !artifact.path.endsWith('.webp')) continue;
  if (typeof artifact.checksum_sha256 !== 'string') continue;
  const diskPath = path.join(ROOT, artifact.path);
  if (!fs.existsSync(diskPath)) continue;
  const actual = sha256(fs.readFileSync(diskPath));
  if (actual !== artifact.checksum_sha256) {
    errors.push(`${artifact.id}: checksum mismatch expected=${artifact.checksum_sha256} actual=${actual}`);
  }
}

if (errors.length) {
  console.error(`Media integrity failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log('Media integrity passed: WebP structure and manifest checksums are coherent.');
