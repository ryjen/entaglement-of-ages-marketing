#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

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
const metadataByPath = new Map();
const webpFiles = walk(MEDIA_ROOT).filter((file) => file.endsWith('.webp'));

for (const file of webpFiles) {
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

  try {
    const metadata = await sharp(buffer, { failOn: 'warning' }).metadata();
    metadataByPath.set(rel, metadata);
    if (!metadata.width || !metadata.height) {
      errors.push(`${rel}: raster dimensions are unavailable`);
      continue;
    }
    if (rel.startsWith('src/media/heroes/')) {
      if (metadata.width < 1600 || metadata.height < 900) {
        errors.push(`${rel}: production hero must be at least 1600x900; got ${metadata.width}x${metadata.height}`);
      }
      const ratio = metadata.width / metadata.height;
      if (ratio < 1.7 || ratio > 1.9) {
        errors.push(`${rel}: production hero aspect ratio must remain near 16:9; got ${ratio.toFixed(3)}`);
      }
    } else if (rel.startsWith('src/media/covers/')) {
      if (metadata.width < 1000 || metadata.height < 1500) {
        errors.push(`${rel}: production cover must be at least 1000x1500; got ${metadata.width}x${metadata.height}`);
      }
      const ratio = metadata.width / metadata.height;
      if (ratio < 0.64 || ratio > 0.69) {
        errors.push(`${rel}: production cover aspect ratio must remain near 2:3; got ${ratio.toFixed(3)}`);
      }
    }
  } catch (error) {
    errors.push(`${rel}: Sharp could not decode image: ${error.message}`);
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

const heroSummary = [...metadataByPath.entries()]
  .filter(([rel]) => rel.startsWith('src/media/heroes/'))
  .map(([rel, metadata]) => `${path.basename(rel)}=${metadata.width}x${metadata.height}`)
  .join(', ');
const coverSummary = [...metadataByPath.entries()]
  .filter(([rel]) => rel.startsWith('src/media/covers/'))
  .map(([rel, metadata]) => `${path.basename(rel)}=${metadata.width}x${metadata.height}`)
  .join(', ');

console.log('Media integrity passed: WebP structure, dimensions, and manifest checksums are coherent.');
console.log(`Heroes: ${heroSummary}`);
console.log(`Covers: ${coverSummary}`);
