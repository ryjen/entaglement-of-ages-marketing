import test from 'node:test';
import crypto from 'node:crypto';
import fs from 'node:fs';

const pages = [
  'src/books/prequel/index.html',
  'src/books/the-fatherless/index.html',
  'src/books/sequel/index.html',
];

for (const page of pages) {
  test(`diagnostic checksum ${page}`, () => {
    const digest = crypto.createHash('sha256').update(fs.readFileSync(page)).digest('hex');
    console.log(`CHECKSUM ${page} ${digest}`);
  });
}
