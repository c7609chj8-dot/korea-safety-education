import { list } from '@vercel/blob';
import { initialMaterials, materialFromBlob, type Material } from '../../../lib/materials';

const materialsPrefix = 'materials/';

export async function GET() {
  try {
    const uploaded: Material[] = [];
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: materialsPrefix, limit: 1000, cursor });
      uploaded.push(...page.blobs.map(materialFromBlob));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    const items = [...uploaded, ...initialMaterials].sort((left, right) => Date.parse(right.uploadedAt) - Date.parse(left.uploadedAt));
    return Response.json({ items, uploadsAvailable: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ items: initialMaterials, uploadsAvailable: false }, { headers: { 'Cache-Control': 'no-store' } });
  }
}

