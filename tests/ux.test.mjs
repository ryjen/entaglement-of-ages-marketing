import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relative => readFile(path.join(root, relative), 'utf8');

test('homepage keeps a focused story-first journey', async () => {
  const html = await read('src/index.html');
  const heroStart = html.indexOf('<section class="hero hero--trilogy');
  const heroEnd = html.indexOf('</section>', heroStart);
  assert.ok(heroStart >= 0 && heroEnd > heroStart, 'homepage hero must exist');

  const hero = html.slice(heroStart, heroEnd);
  const heroActions = [...hero.matchAll(/<a class="button(?: button--quiet)?"[^>]*>([^<]+)<\/a>/g)]
    .map(match => match[1].trim());
  assert.deepEqual(heroActions, ['Explore the trilogy', 'Help shape the books']);

  const betaStatus = html.indexOf('class="beta-status"');
  const trilogy = html.indexOf('id="trilogy"');
  const arcs = html.indexOf('id="arcs-title"');
  const editorial = html.indexOf('id="editorial-beta"');
  const updates = html.indexOf('id="release-updates"');

  assert.ok([betaStatus, trilogy, arcs, editorial, updates].every(index => index >= 0), 'all journey stages must exist');
  assert.ok(betaStatus < trilogy, 'beta status should be visible before the trilogy');
  assert.ok(trilogy < arcs, 'the trilogy should lead into recurring questions');
  assert.ok(arcs < editorial, 'editorial participation should follow story and themes');
  assert.ok(editorial < updates, 'release follow-up should come after editorial participation');
});

test('mobile reader navigation stays compact and touch sized', async () => {
  const css = await read('src/styles/base.v1.css');

  assert.match(css, /min-height:\s*2\.75rem;/, 'navigation should preserve a 44px-equivalent touch target');
  assert.doesNotMatch(
    css,
    /grid-template-columns:\s*repeat\(auto-fit,\s*minmax\(min\(9rem,\s*100%\),\s*1fr\)\)/,
    'mobile navigation should not return to full-width grid cells',
  );
  assert.match(
    css,
    /\.primary-nav ul \{\s*display: flex;\s*flex-wrap: wrap;\s*gap: 0\.25rem 0\.4rem;/s,
    'mobile navigation should wrap compact links',
  );
  assert.match(
    css,
    /\.primary-nav a \{\s*width: auto;\s*justify-content: flex-start;\s*padding-inline: 0\.55rem;\s*border: 0;\s*border-bottom: 1px solid var\(--border\);/s,
    'mobile links should remain compact without losing a visible affordance',
  );
});
