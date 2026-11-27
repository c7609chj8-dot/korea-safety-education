import assert from 'node:assert/strict';
import test from 'node:test';
import config from '../next.config.mjs';

test('production pages remain indexable while management/API routes and all previews get HTTP noindex', async () => {
  const previous = process.env.VERCEL_ENV;
  try {
    process.env.VERCEL_ENV = 'production';
    const production = await config.headers();
    assert.deepEqual(production.map(rule => rule.source), ['/admin/:path*', '/api/:path*']);
    for (const rule of production) assert.equal(rule.headers[0].value, 'noindex, nofollow');
    for (const environment of ['preview', 'development', '']) {
      process.env.VERCEL_ENV = environment;
      const rules = await config.headers();
      assert.equal(rules.length, 1);
      assert.equal(rules[0].source, '/:path*');
      assert.equal(rules[0].headers[0].value, 'noindex, nofollow');
    }
  } finally {
    if (previous === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = previous;
  }
});
