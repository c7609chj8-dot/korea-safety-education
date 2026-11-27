export type Material = {
  id: string;
  title: string;
  category: '사고사례' | '교육자료';
  pathname: string;
  url: string;
  downloadUrl: string;
  size: number;
  uploadedAt: string;
  source?: string;
};

// Supplied PDFs are published byte-for-byte; this is the posting date, not an accident date.
export const initialMaterials: Material[] = [
  { id: 'lifting-falling-object', title: '자재인양 준비 작업 중 낙하물에 깔림', size: 673237 },
  { id: 'manhole-soil-collapse', title: '맨홀 접지 작업 중 토사가 붕괴되어 깔림', size: 265176 },
  { id: 'mobile-scaffold-fall', title: '이동식비계에서 작업 중 추락', size: 403308 },
  { id: 'logging-struck-by-tree', title: '벌목작업 중 벌도목에 맞음', size: 215312 },
  { id: 'rockfall-net-repair-fall', title: '낙석방지망 보수 작업 중 추락', size: 233599 },
  { id: 'roof-panel-fall', title: '지붕 패널 설치 작업 중 떨어짐', size: 192743 },
].map(item => ({ ...item, category: '사고사례', source: '안전보건공단', uploadedAt: '2026-11-27T00:00:00.000Z', pathname: `${item.id}.pdf`, url: `/materials/${item.id}.pdf`, downloadUrl: `/materials/${item.id}.pdf` }));

export function materialFromBlob(blob: { pathname: string; url: string; downloadUrl: string; size: number; uploadedAt: Date | string }): Material {
  const filename = blob.pathname.split('/').pop() || '교육자료.pdf';
  const title = filename.replace(/^\d+-/, '').replace(/-[A-Za-z0-9_-]{8,}(?=\.[^.]+$)/, '').replace(/\.[^.]+$/, '').replace(/-/g, ' ');
  return { ...blob, id: blob.pathname, title, category: blob.pathname.startsWith('materials/cases/') ? '사고사례' : '교육자료', uploadedAt: new Date(blob.uploadedAt).toISOString() };
}

export function formatMaterialSize(size: number) {
  return size < 1024 * 1024 ? `${Math.max(1, Math.round(size / 1024))} KB` : `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function filterMaterials(items: Material[], query: string, category: string) {
  const normalized = query.normalize('NFC').toLocaleLowerCase('ko').replace(/\s+/g, '');
  return items.filter(item => (category === '전체' || item.category === category) && item.title.normalize('NFC').toLocaleLowerCase('ko').replace(/\s+/g, '').includes(normalized));
}
