import { list } from '@vercel/blob';

const materialsPrefix = 'materials/';

export async function GET() {
  try {
    const { blobs } = await list({ prefix: materialsPrefix, limit: 50 });
    const items = blobs
      .sort((left, right) => right.uploadedAt.getTime() - left.uploadedAt.getTime())
      .map(({ downloadUrl, pathname, size, uploadedAt, url }) => ({ downloadUrl, pathname, size, uploadedAt, url }));

    return Response.json({ items }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: '자료 목록을 불러올 수 없습니다.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}

