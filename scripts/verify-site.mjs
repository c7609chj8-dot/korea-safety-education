import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { initialMaterials } from '../lib/materials.ts';

// Read-only production smoke check, plus one deliberately unauthenticated token request.
const origin = new URL(process.argv[2] || 'https://korea-safety-education.vercel.app').origin;
const canonical = 'https://korea-safety-education.vercel.app';
const production = origin === canonical;
const publicPaths = ['/', '/education-guide', '/materials'];
const pages = new Map();
const request = (path, options = {}) => fetch(new URL(path, origin), { ...options, signal: AbortSignal.timeout(15000) });

for (const path of [...publicPaths, '/privacy', '/terms', '/admin/materials']) {
  const response = await request(path);
  assert.equal(response.status, 200, `${path}: HTTP status`);
  const html = await response.text();
  pages.set(path, html);
  assert.equal([...html.matchAll(/<h1(?:\s[^>]*)?>/g)].length, 1, `${path}: one main heading`);
  const metas = [...html.matchAll(/<meta\b([^>]+)>/g)].map(match => Object.fromEntries([...match[1].matchAll(/([\w:-]+)="([^"]*)"/g)].map(attr => [attr[1], attr[2]])));
  const meta = name => metas.find(item => item.name === name || item.property === name)?.content;
  assert.equal(meta('robots').startsWith('index'), production && publicPaths.includes(path), `${path}: indexing`);
  assert.equal(new URL(meta('og:url')).href, canonical + path, `${path}: share URL`);
  assert.ok(meta('description')?.length > 15, `${path}: description`);
  if (!production || path.startsWith('/admin')) assert.match(response.headers.get('x-robots-tag'), /noindex/);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
}

let fragmentCount = 0;
for (const [path, html] of pages) {
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)) {
    const url = new URL(match[1].replaceAll('&amp;', '&'), origin + path);
    if (url.origin !== origin || !url.hash) continue;
    const target = pages.get(url.pathname);
    if (!target) continue;
    assert.ok(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${path}: missing fragment ${url.hash}`);
    fragmentCount++;
  }
}

for (const item of initialMaterials) {
  const response = await request(item.url);
  assert.equal(response.status, 200, item.title);
  assert.match(response.headers.get('content-type'), /application\/pdf/);
  const downloaded = Buffer.from(await response.arrayBuffer());
  const original = await readFile(new URL(`../public${item.url}`, import.meta.url));
  const hash = bytes => createHash('sha256').update(bytes).digest('hex');
  assert.equal(hash(downloaded), hash(original), `${item.title}: PDF differs from registered original`);
}

const api = await request('/api/materials');
assert.equal(api.status, 200);
assert.match(api.headers.get('x-robots-tag'), /noindex/);
const catalog = await api.json();
assert.ok(catalog.items.length >= 6);
if (production) assert.equal(catalog.uploadsAvailable, true, 'Live file store must be available');
const rejected = await request('/api/materials/upload', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type: 'blob.generate-client-token', payload: { pathname: 'materials/guides/permission-check.pdf', clientPayload: null, multipart: false } }) });
assert.ok(rejected.status >= 400 && rejected.status < 500, 'Anonymous uploads must be rejected');
assert.equal((await rejected.json()).clientToken, undefined);

const robots = await (await request('/robots.txt')).text();
const sitemap = await (await request('/sitemap.xml')).text();
if (production) {
  assert.match(robots, /Sitemap: https:\/\/korea-safety-education.vercel.app\/sitemap.xml/);
  assert.equal([...sitemap.matchAll(/<loc>/g)].length, 3);
  assert.equal([...sitemap.matchAll(/<image:loc>/g)].length, 7);
} else assert.match(robots, /Disallow: \//);
console.log(JSON.stringify({ origin, pages: pages.size, validInternalFragments: fragmentCount, originalPdfsVerified: initialMaterials.length, libraryItems: catalog.items.length, anonymousUploadRejected: true, indexingAndSitemap: 'passed' }, null, 2));
