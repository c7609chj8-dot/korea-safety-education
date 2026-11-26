'use client';

import { useEffect, useState } from 'react';

type Material = { downloadUrl: string; pathname: string; size: number; uploadedAt: string; url: string };

function displayName(pathname: string) {
  return pathname.replace(/^materials\//, '').replace(/^\d+-/, '').replace(/-[A-Za-z0-9_-]{8,}(?=\.[^.]+$)/, '');
}

function formatSize(size: number) {
  return size < 1024 * 1024 ? `${Math.max(1, Math.round(size / 1024))} KB` : `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function MaterialsLibrary() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch('/api/materials', { cache: 'no-store', signal: controller.signal });
        if (!response.ok) throw new Error('자료 목록 요청 실패');
        const payload = await response.json() as { items?: Material[] };
        setMaterials(Array.isArray(payload.items) ? payload.items : []);
        setStatus('ready');
      } catch {
        if (!controller.signal.aborted) setStatus('error');
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  return <article className="resource-upload-card">
    <span>센터 자료</span>
    <h3>센터 자체 교육자료</h3>
    <p>한국안전교육에서 제공하는 안내문과 교육자료를 확인하세요.</p>
    <div role="status">
      {status === 'loading' ? <p className="materials-loading">자료 목록을 불러오는 중입니다.</p> : null}
      {status === 'error' ? <p className="materials-message">자료 목록을 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.</p> : null}
      {status === 'ready' && materials.length === 0 ? <p className="materials-empty">현재 등록된 자료가 없습니다. 필요한 자료는 전화로 문의해 주세요.</p> : null}
    </div>
    {materials.length > 0 ? <ul className="materials-list" aria-label="센터 자체 교육자료 목록">
      {materials.map(material => <li key={material.url}><a href={material.downloadUrl} target="_blank" rel="noopener noreferrer">
        <span>{displayName(material.pathname)}</span>
        <small>{new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeZone: 'Asia/Seoul' }).format(new Date(material.uploadedAt))} · {formatSize(material.size)}</small>
      </a></li>)}
    </ul> : null}
  </article>;
}
