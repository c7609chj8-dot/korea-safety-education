'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { filterMaterials, formatMaterialSize, initialMaterials, type Material } from '../lib/materials';

const pageSize = 10;
const dateFormat = new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeZone: 'Asia/Seoul' });

export function MaterialsLibrary({ compact = true }: { compact?: boolean }) {
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('전체');
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setStatus('loading');
      try {
        const response = await fetch('/api/materials', { cache: 'no-store', signal: controller.signal });
        if (!response.ok) throw new Error('자료 목록 요청 실패');
        const payload = await response.json() as { items?: Material[]; uploadsAvailable?: boolean };
        if (!Array.isArray(payload.items)) throw new Error('자료 목록 형식 오류');
        setMaterials(payload.items);
        setStatus(payload.uploadsAvailable === false ? 'error' : 'ready');
      } catch {
        if (!controller.signal.aborted) setStatus('error');
      }
    }
    void load();
    return () => controller.abort();
  }, [refresh]);

  const filtered = filterMaterials(materials, query, category);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = compact ? materials.slice(0, 3) : filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (compact) return <article className="resource-upload-card">
    <span>교육자료 게시판</span><h3>사고사례·예방대책 자료</h3>
    <p>현장 사고사례와 예방대책을 PDF로 확인하세요.</p>
    <ul className="materials-list" aria-label="최근 교육자료">{visible.map(item => <li key={item.id}><a href={item.url} target="_blank" rel="noopener noreferrer"><span>{item.title}</span><small>{item.category} · {formatMaterialSize(item.size)} · 파일 열기</small></a></li>)}</ul>
    <Link className="text-link board-all-link" href="/materials">자료실 전체 보기 <span aria-hidden="true">↗</span></Link>
  </article>;

  return <section className="materials-board" aria-label="교육자료 게시판">
    <div className="board-toolbar"><div className="board-categories" aria-label="자료 분류">{['전체', '사고사례', '교육자료'].map(value => <button type="button" key={value} aria-pressed={category === value} onClick={() => { setCategory(value); setPage(1); }}>{value}</button>)}</div><label className="board-search"><span>자료 제목 검색</span><input type="search" placeholder="검색어를 입력하세요" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} /></label></div>
    <div className="board-summary"><p aria-live="polite">총 <strong>{filtered.length}</strong>건{query ? ` · ‘${query}’ 검색 결과` : ''}</p><button type="button" onClick={() => setRefresh(value => value + 1)} disabled={status === 'loading'}>{status === 'loading' ? '갱신 중' : '목록 새로고침'}</button></div>
    {status === 'error' ? <p className="board-notice" role="status">추가 등록 자료의 최신 목록을 불러오지 못했습니다. 기본 자료는 계속 열람할 수 있습니다. 잠시 후 목록을 새로고침해 주세요.</p> : null}
    <div className="board-table-heading" aria-hidden="true"><span>분류</span><span>자료 제목</span><span>등록일</span><span>파일</span></div>
    <ul className="board-list" aria-label="교육자료 목록">{visible.map(item => <li key={item.id}>
      <span className="board-category">{item.category}</span>
      <div className="board-title"><a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}<span className="sr-only"> (새 창에서 파일 열기)</span></a><p>{item.source ? `자료 출처: ${item.source} · ` : ''}{formatMaterialSize(item.size)} · {item.pathname.split('.').pop()?.toUpperCase()}</p></div>
      <time dateTime={item.uploadedAt}>{dateFormat.format(new Date(item.uploadedAt))}</time>
      <a className="board-download" href={item.downloadUrl} download={item.url.startsWith('/') ? `${item.title}.pdf` : undefined} aria-label={`${item.title} 다운로드`}>다운로드</a>
    </li>)}</ul>
    {filtered.length === 0 ? <div className="board-empty"><strong>조건에 맞는 자료가 없습니다.</strong><p>다른 검색어를 입력하거나 전체 분류를 선택해 주세요.</p><button type="button" onClick={() => { setQuery(''); setCategory('전체'); setPage(1); }}>전체 자료 보기</button></div> : null}
    {pageCount > 1 ? <nav className="board-pagination" aria-label="자료 목록 페이지"><button type="button" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>이전</button><span>{currentPage} / {pageCount}</span><button type="button" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>다음</button></nav> : null}
    <p className="board-footnote">제목을 누르면 자료가 새 창에서 열립니다. 등록일은 게시판에 올린 날짜이며, 사고 발생일은 자료 원문을 확인해 주세요.</p>
  </section>;
}
