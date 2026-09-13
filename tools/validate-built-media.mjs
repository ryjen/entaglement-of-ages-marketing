#!/usr/bin/env node
import crypto from 'node:crypto';
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

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

if (!fs.existsSync(DIST)) throw new Error('missing dist/; build before validating built media');

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const heroes = new Map();
for (const artifact of manifest.artifacts ?? []) {
  if (typeof artifact.path !== 'string' || !artifact.path.startsWith('src/media/heroes/') || !artifact.path.endsWith('.webp')) continue;
  if (typeof artifact.checksum_sha256 !== 'string' || !/^[0-9a-f]{64}$/.test(artifact.checksum_sha256)) continue;
  const basename = path.basename(artifact.path);
  const stem = basename.slice(0, -'.webp'.length);
  const token = artifact.checksum_sha256.slice(0, 12);
  const fingerprinted = `${stem}.${token}.webp`;
  const metadata = await sharp(path.join(ROOT, artifact.path)).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`missing dimensions for ${artifact.path}`);
  heroes.set(stem, {
    checksum: artifact.checksum_sha256,
    fingerprinted,
    width: metadata.width,
    height: metadata.height,
  });
}

const errors = [];
const seen = new Map([...heroes.keys()].map((key) => [key, 0]));
for (const [stem, hero] of heroes) {
  const builtPath = path.join(DIST, 'media', 'heroes', hero.fingerprinted);
  if (!fs.existsSync(builtPath)) {
    errors.push(`missing fingerprinted built hero: media/heroes/${hero.fingerprinted}`);
    continue;
  }
  const actual = sha256(fs.readFileSync(builtPath));
  if (actual !== hero.checksum) {
    errors.push(`fingerprinted built hero checksum mismatch for ${stem}: expected ${hero.checksum}, got ${actual}`);
  }
}

for (const file of walk(DIST).filter((file) => file.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(DIST, file).split(path.sep).join('/');

  for (const match of html.matchAll(/([a-z0-9-]+-hero)(?:\.([0-9a-f]{12}))?\.webp(?:\?v=([0-9a-f]{12}))?/gi)) {
    const stem = match[1];
    const expected = heroes.get(stem);
    if (!expected) {
      errors.push(`${rel}: hero reference is not backed by the public manifest: ${match[0]}`);
      continue;
    }
    seen.set(stem, (seen.get(stem) ?? 0) + 1);
    if (match[0] !== expected.fingerprinted) {
      errors.push(`${rel}: stale or non-immutable hero reference ${match[0]}; expected ${expected.fingerprinted}`);
    }
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const heroEntry = [...heroes.entries()].find(([, hero]) => tag.includes(hero.fingerprinted));
    if (!heroEntry) continue;
    const [stem, expected] = heroEntry;
    const width = tag.match(/\bwidth=["'](\d+)["']/i)?.[1];
    const height = tag.match(/\bheight=["'](\d+)["']/i)?.[1];
    if (Number(width) !== expected.width || Number(height) !== expected.height) {
      errors.push(`${rel}: intrinsic dimensions for ${stem} must be ${expected.width}x${expected.height}; got ${width ?? 'missing'}x${height ?? 'missing'}`);
    }
  }
}

for (const [stem, count] of seen) {
  if (count === 0) errors.push(`built site never references manifest-backed hero ${stem}`);
}

if (errors.length) {
  console.error(`Built-media validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log('Built-media validation passed: hero URLs use immutable content fingerprints, copied bytes match the manifest, and intrinsic dimensions match source rasters.');
