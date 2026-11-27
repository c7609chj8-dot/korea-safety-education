import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { initialMaterials, filterMaterials, materialFromBlob } from '../lib/materials.ts';

test('all six initial posts resolve to real, unchanged-size PDF documents', async () => {
  assert.equal(initialMaterials.length, 6);
  assert.equal(new Set(initialMaterials.map(item => item.id)).size, 6);
  for (const item of initialMaterials) {
    const pdf = await readFile(new URL(`../public${item.url}`, import.meta.url));
    assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
    assert.equal(pdf.length, item.size);
  }
});

test('Korean title searches ignore spacing and Unicode composition without ignoring category', () => {
  assert.equal(filterMaterials(initialMaterials, '이동식 비계', '전체')[0].id, 'mobile-scaffold-fall');
  assert.equal(filterMaterials(initialMaterials, '지붕'.normalize('NFD'), '사고사례').length, 1);
  assert.equal(filterMaterials(initialMaterials, '지붕', '교육자료').length, 0);
  assert.equal(filterMaterials(initialMaterials, '없는 자료', '전체').length, 0);
});

test('legacy and categorized uploads retain titles and correct category', () => {
  const base = { url: 'https://example.test/file.pdf', downloadUrl: 'https://example.test/download', size: 123, uploadedAt: new Date('2026-11-27') };
  assert.equal(materialFromBlob({ ...base, pathname: 'materials/123-교육-안내-AbCdEfGhIjKl.pdf' }).title, '교육 안내');
  assert.equal(materialFromBlob({ ...base, pathname: 'materials/cases/123-사고사례-AbCdEfGhIjKl.pdf' }).category, '사고사례');
  assert.equal(materialFromBlob({ ...base, pathname: 'materials/guides/123-교육자료.pdf' }).category, '교육자료');
});

test('English multiword upload titles remain complete and searchable after the Blob suffix is removed', () => {
  const item = materialFromBlob({ pathname: 'materials/guides/123-Safety-Training-Guide-AbCdEfGhIjKl.pdf', url: 'https://example.test/file.pdf', downloadUrl: 'https://example.test/download', size: 123, uploadedAt: '2026-11-27' });
  assert.equal(item.title, 'Safety Training Guide');
  assert.equal(filterMaterials([item], 'training guide', '전체').length, 1);
});
