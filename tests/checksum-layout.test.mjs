import test from 'node:test';
import crypto from 'node:crypto';
import { readFileSync } from 'node:fs';

for (const file of ['src/index.html', 'src/about/index.html']) {
  test(`checksum ${file}`, () => {
    const hash = crypto.createHash('sha256').update(readFileSync(file)).digest('hex');
    console.log(`checksum ${file} ${hash}`);
  });
}
