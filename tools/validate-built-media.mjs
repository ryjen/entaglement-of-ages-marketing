#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const MANIFEST = path.join(ROOT, 'public-manifest.json');

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

if (!fs.existsSync(DIST)) throw new Error('missing dist/; build before validating built media');

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const heroes = new Map();
for (const artifact of manifest.artifacts ?? []) {
  if (typeof artifact.path !== 'string' || !artifact.path.startsWith('src/media/heroes/') || !artifact.path.endsWith('.webp')) continue;
  if (typeof artifact.checksum_sha256 !== 'string' || !/^[0-9a-f]{64}$/.test(artifact.checksum_sha256)) continue;
  const basename = path.basename(artifact.path);
  const metadata = await sharp(path.join(ROOT, artifact.path)).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`missing dimensions for ${artifact.path}`);
  heroes.set(basename, {
    token: artifact.checksum_sha256.slice(0, 12),
    width: metadata.width,
    height: metadata.height,
  });
}

const errors = [];
const seen = new Map([...heroes.keys()].map((key) => [key, 0]));
for (const file of walk(DIST).filter((file) => file.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(DIST, file).split(path.sep).join('/');

  for (const match of html.matchAll(/([a-z0-9-]+-hero\.webp)(?:\?v=([0-9a-f]{12}))?/gi)) {
    const basename = match[1];
    const expected = heroes.get(basename);
    if (!expected) {
      errors.push(`${rel}: hero reference is not backed by the public manifest: ${basename}`);
      continue;
    }
    seen.set(basename, (seen.get(basename) ?? 0) + 1);
    if (match[2] !== expected.token) {
      errors.push(`${rel}: stale or missing hero fingerprint for ${basename}; expected ?v=${expected.token}`);
    }
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const basename = [...heroes.keys()].find((name) => tag.includes(`${name}?v=`));
    if (!basename) continue;
    const expected = heroes.get(basename);
    const width = tag.match(/\bwidth=["'](\d+)["']/i)?.[1];
    const height = tag.match(/\bheight=["'](\d+)["']/i)?.[1];
    if (Number(width) !== expected.width || Number(height) !== expected.height) {
      errors.push(`${rel}: intrinsic dimensions for ${basename} must be ${expected.width}x${expected.height}; got ${width ?? 'missing'}x${height ?? 'missing'}`);
    }
  }
}

for (const [basename, count] of seen) {
  if (count === 0) errors.push(`built site never references manifest-backed hero ${basename}`);
}

if (errors.length) {
  console.error(`Built-media validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log('Built-media validation passed: hero URLs are content-addressed and intrinsic dimensions match source rasters.');
