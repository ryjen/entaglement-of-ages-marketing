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

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

if (!fs.existsSync(DIST)) throw new Error('missing dist/; build before versioning media');

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
  heroes.set(basename, {
    stem,
    token,
    fingerprinted,
    width: metadata.width,
    height: metadata.height,
  });

  const sourceBuiltPath = path.join(DIST, 'media', 'heroes', basename);
  const fingerprintedPath = path.join(DIST, 'media', 'heroes', fingerprinted);
  if (!fs.existsSync(sourceBuiltPath)) throw new Error(`built hero is missing: ${sourceBuiltPath}`);
  fs.copyFileSync(sourceBuiltPath, fingerprintedPath);
}

if (!heroes.size) throw new Error('no manifest-backed hero media found');

let changedFiles = 0;
let rewrittenReferences = 0;
for (const file of walk(DIST).filter((file) => file.endsWith('.html'))) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  for (const [basename, hero] of heroes) {
    const pattern = new RegExp(`${escapeRegex(hero.stem)}(?:\\.[0-9a-f]{12})?\\.webp(?:\\?v=[0-9a-f]{12})?`, 'g');
    const matches = html.match(pattern)?.length ?? 0;
    if (matches) {
      rewrittenReferences += matches;
      html = html.replace(pattern, hero.fingerprinted);
    }
  }

  html = html.replace(/<img\b[^>]*>/gi, (tag) => {
    const heroEntry = [...heroes.entries()].find(([, hero]) => tag.includes(hero.fingerprinted));
    if (!heroEntry) return tag;
    const [, hero] = heroEntry;
    let next = tag;
    if (/\bwidth=(['"])[^'"]*\1/i.test(next)) next = next.replace(/\bwidth=(['"])[^'"]*\1/i, `width="${hero.width}"`);
    else next = next.replace(/>$/, ` width="${hero.width}">`);
    if (/\bheight=(['"])[^'"]*\1/i.test(next)) next = next.replace(/\bheight=(['"])[^'"]*\1/i, `height="${hero.height}"`);
    else next = next.replace(/>$/, ` height="${hero.height}">`);
    return next;
  });

  if (html !== before) {
    fs.writeFileSync(file, html);
    changedFiles += 1;
  }
}

console.log(`Fingerprinted ${rewrittenReferences} hero reference(s) across ${changedFiles} built HTML file(s).`);
for (const [, hero] of heroes) console.log(`  ${hero.fingerprinted} (${hero.width}x${hero.height})`);
