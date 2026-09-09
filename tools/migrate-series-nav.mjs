#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

const changed = new Set();
for (const file of walk('src').filter(file => file.endsWith('.html'))) {
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  text = text.replaceAll('>The trilogy</a>', '>The series</a>');

  if (file === 'src/books/index.html' && !text.includes('>The series</a>')) {
    text = text.replace(
      '<li><a href="../">Home</a></li><li><a href="./" aria-current="page">Books</a></li>',
      '<li><a href="../">Home</a></li><li><a href="../#trilogy">The series</a></li><li><a href="./" aria-current="page">Books</a></li>',
    );
  }

  if (/^src\/books\/(?:age-of-embers|the-fatherless|neurion|age-of-forms)\/index\.html$/.test(file) && !text.includes('>The series</a>')) {
    text = text.replace(
      '<li><a href="../../">Home</a></li><li><a href="../" aria-current="page">Books</a></li>',
      '<li><a href="../../">Home</a></li><li><a href="../../#trilogy">The series</a></li><li><a href="../" aria-current="page">Books</a></li>',
    );
  }

  if (text !== before) {
    fs.writeFileSync(file, text);
    changed.add(file);
  }
}

const uxPath = 'tests/ux.test.mjs';
let ux = fs.readFileSync(uxPath, 'utf8');
ux = ux.replace("const primaryNavLabels = ['Home', 'The trilogy', 'Books', 'World', 'About', 'News'];", "const primaryNavLabels = ['Home', 'The series', 'Books', 'World', 'About', 'News'];");
fs.writeFileSync(uxPath, ux);

const manifestPath = 'public-manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
for (const entry of manifest.artifacts) {
  if (!changed.has(entry.path)) continue;
  if (entry.approval_state === 'approved' || entry.approval_state === 'published') {
    entry.checksum_sha256 = sha256(entry.path);
  }
}
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Updated series navigation on ${changed.size} public page(s).`);
