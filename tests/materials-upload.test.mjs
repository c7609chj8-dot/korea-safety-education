import assert from 'node:assert/strict';
import test from 'node:test';
import { getPayloadFromClientToken } from '@vercel/blob/client';
import { POST } from '../app/api/materials/upload/route.ts';

// Invented local-only credentials: these tokens never contact a Blob store.
const password = 'local-test-password';
function tokenRequest(pathname = 'materials/test.pdf', supplied = password) {
  return new Request('https://example.test/api/materials/upload', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(supplied ? { 'x-materials-upload-password': supplied } : {}) },
    body: JSON.stringify({ type: 'blob.generate-client-token', payload: { pathname, clientPayload: null, multipart: false } }),
  });
}

test('materials upload authorization and restrictions work with the patched dependencies', async (t) => {
  const originalPassword = process.env.MATERIALS_UPLOAD_PASSWORD;
  const originalToken = process.env.BLOB_READ_WRITE_TOKEN;
  const originalFetch = globalThis.fetch;
  process.env.MATERIALS_UPLOAD_PASSWORD = password;
  process.env.BLOB_READ_WRITE_TOKEN = 'vercel_blob_rw_localtest_not-a-real-secret';
  globalThis.fetch = async () => { throw new Error('This test must not call an external service.'); };
  try {
    await t.test('missing, incorrect and equal-byte-length passwords cannot issue tokens', async () => {
      for (const supplied of ['', 'incorrect', 'x'.repeat(password.length)]) {
        const response = await POST(tokenRequest('materials/test.pdf', supplied));
        assert.equal(response.status, 400);
        assert.equal((await response.json()).clientToken, undefined);
      }
    });
    await t.test('an unconfigured administrator password rejects registration', async () => {
      delete process.env.MATERIALS_UPLOAD_PASSWORD;
      assert.equal((await POST(tokenRequest())).status, 400);
      process.env.MATERIALS_UPLOAD_PASSWORD = password;
    });
    await t.test('wrong directory, unsupported extension and excessive pathname are rejected', async () => {
      for (const pathname of ['other/test.pdf', 'materials/test.html', `materials/${'a'.repeat(181)}.pdf`]) {
        assert.equal((await POST(tokenRequest(pathname))).status, 400);
      }
    });
    await t.test('authorized document tokens carry the file type and 10 MB limits', async () => {
      for (const extension of ['pdf', 'doc', 'docx']) {
        const pathname = `materials/test.${extension}`;
        const response = await POST(tokenRequest(pathname));
        assert.equal(response.status, 200);
        const { clientToken } = await response.json();
        const payload = getPayloadFromClientToken(clientToken);
        assert.equal(payload.pathname, pathname);
        assert.equal(payload.maximumSizeInBytes, 10 * 1024 * 1024);
        assert.equal(payload.addRandomSuffix, true);
        assert.deepEqual(payload.allowedContentTypes, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']);
      }
    });
    await t.test('malformed requests and unsigned completion callbacks are rejected', async () => {
      for (const body of ['{', JSON.stringify({ type: 'blob.upload-completed', payload: {} })]) {
        const response = await POST(new Request('https://example.test/api/materials/upload', { method: 'POST', headers: { 'content-type': 'application/json' }, body }));
        assert.equal(response.status, 400);
      }
    });
  } finally {
    if (originalPassword === undefined) delete process.env.MATERIALS_UPLOAD_PASSWORD;
    else process.env.MATERIALS_UPLOAD_PASSWORD = originalPassword;
    if (originalToken === undefined) delete process.env.BLOB_READ_WRITE_TOKEN;
    else process.env.BLOB_READ_WRITE_TOKEN = originalToken;
    globalThis.fetch = originalFetch;
  }
});
