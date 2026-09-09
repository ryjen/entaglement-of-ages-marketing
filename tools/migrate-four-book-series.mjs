#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';

const manifestPath = 'public-manifest.json';
const sitemapPath = 'src/sitemap.xml';

function sha256(path) {
  return crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex');
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const byPath = new Map(manifest.artifacts.map(entry => [entry.path, entry]));

function rebind(path, patch = {}) {
  const entry = byPath.get(path);
  if (!entry) throw new Error(`missing manifest entry: ${path}`);
  Object.assign(entry, patch, { checksum_sha256: sha256(path) });
}

function ensurePage({ id, path, title, summary, canonical_url }) {
  let entry = byPath.get(path);
  if (!entry) {
    entry = {
      id,
      path,
      title,
      summary,
      content_type: 'page',
      spoiler_tier: 'premise',
      approval_state: 'approved',
      rights_status: 'repository-authored',
      provenance_class: 'public-native',
      publication_date: null,
      canonical_url,
      checksum_sha256: sha256(path),
      replacement_status: 'current',
    };
    manifest.artifacts.push(entry);
    byPath.set(path, entry);
    return;
  }
  Object.assign(entry, { title, summary, canonical_url, checksum_sha256: sha256(path) });
}

rebind('src/books/index.html', {
  summary: 'Public Entanglement of Ages book index with premise-level summaries for the four-book cycle.',
});
rebind('src/books/the-fatherless/index.html', {
  summary: 'Public premise overview of Book II, The Fatherless, in the Aurelian Republic.',
});

ensurePage({
  id: 'site-book-age-of-embers',
  path: 'src/books/age-of-embers/index.html',
  title: 'The Fatherless: Age of Embers',
  summary: 'Public premise overview of Book I and its survival, migration, possession, and stewardship conflict.',
  canonical_url: '/books/age-of-embers/',
});
ensurePage({
  id: 'site-book-neurion',
  path: 'src/books/neurion/index.html',
  title: 'The Fatherless II: Neurion',
  summary: 'Public premise overview of Book III and its synthetic-personhood, ownership, consent, and plural-agency conflict.',
  canonical_url: '/books/neurion/',
});
ensurePage({
  id: 'site-book-age-of-forms',
  path: 'src/books/age-of-forms/index.html',
  title: 'The Age of Forms',
  summary: 'Public premise overview of Book IV: inherited technology, ranking, desirability, comparative value, and the realization that nobody wins.',
  canonical_url: '/books/age-of-forms/',
});

let sitemap = fs.readFileSync(sitemapPath, 'utf8');
sitemap = sitemap
  .replace('https://fatherless.ryanjennin.gs/books/prequel/', 'https://fatherless.ryanjennin.gs/books/age-of-embers/')
  .replace('https://fatherless.ryanjennin.gs/books/sequel/', 'https://fatherless.ryanjennin.gs/books/neurion/');
if (!sitemap.includes('https://fatherless.ryanjennin.gs/books/age-of-forms/')) {
  sitemap = sitemap.replace(
    '  <url><loc>https://fatherless.ryanjennin.gs/books/the-fatherless/</loc></url>',
    '  <url><loc>https://fatherless.ryanjennin.gs/books/the-fatherless/</loc></url>\n  <url><loc>https://fatherless.ryanjennin.gs/books/age-of-forms/</loc></url>',
  );
}
fs.writeFileSync(sitemapPath, sitemap);
rebind('src/sitemap.xml', {
  summary: 'Sitemap containing approved or published canonical reader-facing artifacts, including the four-book series routes.',
});

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log('Rebound public manifest for four-book series migration.');
