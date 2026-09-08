import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relative => readFile(path.join(root, relative), 'utf8');

test('homepage uses the versioned layout coherence layer', async () => {
  const [html, css] = await Promise.all([
    read('src/index.html'),
    read('src/styles/layout-polish.v1.css'),
  ]);

  assert.match(html, /styles\/layout-polish\.v1\.css/);
  assert.match(html, /<h1 id="hero-title"><span class="title-lock">Entanglement<\/span><span class="title-lock">of Ages<\/span><\/h1>/);
  assert.equal((html.match(/home-copy-block/g) || []).length, 2, 'editorial and release sections should share the centered copy frame');
  assert.match(css, /\.title-lock\{display:inline-block;white-space:nowrap\}/);
  assert.match(css, /\.home-page \.home-hero__panel h1\{display:flex;flex-wrap:wrap;justify-content:center;/);
  assert.match(css, /\.home-copy-block\{width:min\(52rem,100%\);margin-inline:auto;text-align:left\}/);
  assert.match(css, /\.home-page \.trilogy-question-grid article\{justify-items:start;text-align:left\}/);
});

test('About locks Entanglement without locking the whole title', async () => {
  const html = await read('src/about/index.html');
  assert.match(html, /styles\/layout-polish\.v1\.css/);
  assert.match(html, /About <span class="title-lock">Entanglement<\/span> of Ages/);
});

test('layout polish remains inside the explicit 33 KiB CSS ceiling', async () => {
  const budget = JSON.parse(await read('performance-budget.json'));
  assert.equal(budget.max_css_bytes, 33792);
});
