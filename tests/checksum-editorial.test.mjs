import test from 'node:test';
import crypto from 'node:crypto';
import { readFileSync } from 'node:fs';

for (const file of [
  'src/about/index.html',
  'src/news/index.html',
  'src/press/index.html',
  'src/news/2026-08-08-public-trilogy-site/index.html',
]) {
  test(`checksum ${file}`, () => {
    const hash = crypto.createHash('sha256').update(readFileSync(file)).digest('hex');
    console.log(`checksum ${file} ${hash}`);
  });
}
