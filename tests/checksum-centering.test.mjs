import test from 'node:test';
import crypto from 'node:crypto';
import { readFileSync } from 'node:fs';

test('print centered homepage checksum', () => {
  const hash = crypto.createHash('sha256').update(readFileSync('src/index.html')).digest('hex');
  console.log(`checksum src/index.html ${hash}`);
});
