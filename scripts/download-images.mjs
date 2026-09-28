// Downloads every Unsplash photo used by the site into /public/images
// and rewrites src/data/images.js to use the local copies.
// Usage:  npm run images:download      (needs internet, Node 18+)
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const file = new URL('../src/data/images.js', import.meta.url);
const outDir = new URL('../public/images/', import.meta.url);
await mkdir(outDir, { recursive: true });

let src = await readFile(file, 'utf8');
const entries = [...src.matchAll(/^\s*(\w+):\s*u\('([\w-]+)',\s*(\d+)(?:,\s*(\d+))?\),?/gm)];
if (!entries.length) {
  console.log('No Unsplash entries found — images may already be local.');
  process.exit(0);
}

for (const [line, key, id, w, h] of entries) {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=75&fm=jpg`;
  const name = `${key}.jpg`;
  const dest = new URL(name, outDir);
  if (!existsSync(dest)) {
    const res = await fetch(url);
    if (!res.ok) { console.warn(`✗ ${key} (${res.status})`); continue; }
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    console.log(`✓ ${key}`);
  }
  src = src.replace(line, line.replace(/u\('[^)]*\)/, `'./images/${name}'`));
}
await writeFile(file, src);
console.log('\nDone. src/data/images.js now points to /public/images.');
