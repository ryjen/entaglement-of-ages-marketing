import test from 'node:test';
import crypto from 'node:crypto';
import { readFileSync } from 'node:fs';

const targets = [
  'src/index.html',
  'src/books/index.html',
  'src/books/prequel/index.html',
  'src/books/the-fatherless/index.html',
  'src/books/sequel/index.html',
  'src/world/index.html',
];

test('print governed page checksums', () => {
  for (const path of targets) {
    const hash = crypto.createHash('sha256').update(readFileSync(path)).digest('hex');
    console.log(`checksum ${path} ${hash}`);
  }
});
