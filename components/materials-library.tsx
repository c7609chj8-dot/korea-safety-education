'use client';

import { upload } from '@vercel/blob/client';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';

const allowedExtensions = ['pdf', 'doc', 'docx'] as const;
const maxFileSize = 10 * 1024 * 1024;

type Material = {
  downloadUrl: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  url: string;
};

function getExtension(filename: string) {
  return filename.split('.').pop()?.toLowerCase() ?? '';
}

function isAllowedFile(file: File) {
  return allowedExtensions.includes(getExtension(file.name) as typeof allowedExtensions[number]);
}

function makePathname(filename: string) {
  const extension = getExtension(filename);
  const base = filename.slice(0, -(extension.length + 1))
    .normalize('NFC')
    .replace(/[\\/?%*:|"<>]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 72) || 'safety-material';

  return `materials/${Date.now()}-${base}.${extension}`;
}

function displayName(pathname: string) {
  const filename = pathname.replace(/^materials\//, '').replace(/^\d+-/, '');
  return filename.replace(/-[A-Za-z0-9_-]{8,}(?=\.[^.]+$)/, '');
}

function formatSize(size: number) {
  return size < 1024 * 1024 ? `${Math.max(1, Math.round(size / 1024))} KB` : `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function MaterialsLibrary() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const loadMaterials = useCallback(async () => {
    try {
      const response = await fetch('/api/materials', { cache: 'no-store' });
      const payload = await response.json() as { items?: Material[] };

      if (!response.ok) throw new Error('자료 목록을 불러올 수 없습니다.');
      setMaterials(Array.isArray(payload.items) ? payload.items : []);
    } catch {
      setMessage('자료 목록을 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMaterials();
  }, [loadMaterials]);

  function selectFile(nextFile: File | null) {
    setMessage('');
    setProgress(0);

    if (!nextFile) {
      setFile(null);
      return;
    }

    if (!isAllowedFile(nextFile)) {
      setFile(null);
      setMessage('PDF, DOC, DOCX 형식의 자료만 등록할 수 있습니다.');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    if (nextFile.size > maxFileSize) {
      setFile(null);
      setMessage('자료는 파일당 10MB 이하로 등록해 주세요.');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    setFile(nextFile);
  }

  async function submitUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file || !password) {
      setMessage('등록 암호와 자료 파일을 모두 입력해 주세요.');
      return;
    }

    setIsUploading(true);
    setMessage('');
    setProgress(0);

    try {
      await upload(makePathname(file.name), file, {
        access: 'public',
        handleUploadUrl: '/api/materials/upload',
        headers: { 'x-materials-upload-password': password },
        onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage)),
      });

      setFile(null);
      setPassword('');
      setFormOpen(false);
      if (inputRef.current) inputRef.current.value = '';
      await loadMaterials();
      setMessage('자료를 등록했습니다. 공개 자료 목록에 반영되었습니다.');
    } catch {
      setMessage('자료 등록에 실패했습니다. 등록 암호와 파일 형식을 확인해 주세요.');
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  }

  return <article className="resource-upload-card">
    <span>ADMIN · 자체 자료</span>
    <h3>센터 자체 교육자료</h3>
    <p>센터에서 만든 안내문과 교육자료를 직접 등록해 교육생에게 바로 공유할 수 있습니다.</p>

    {isLoading ? <p className="materials-loading">자료 목록을 불러오는 중입니다.</p> : null}
    {!isLoading && materials.length === 0 ? <p className="materials-empty">등록된 자체 자료가 없습니다.</p> : null}
    {materials.length > 0 ? <ul className="materials-list" aria-label="센터 자체 교육자료 목록">
      {materials.slice(0, 4).map((material) => <li key={material.url}>
        <a href={material.downloadUrl} target="_blank" rel="noopener noreferrer">
          <span>{displayName(material.pathname)}</span>
          <small>{new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium' }).format(new Date(material.uploadedAt))} · {formatSize(material.size)}</small>
        </a>
      </li>)}
    </ul> : null}

    <button type="button" className="resource-upload-trigger" aria-expanded={formOpen} onClick={() => { setFormOpen((current) => !current); setMessage(''); }}>
      {formOpen ? '자료 등록 닫기' : '관리자 자료 올리기'} <b aria-hidden="true">{formOpen ? '−' : '↗'}</b>
    </button>

    {formOpen ? <form className="materials-form" onSubmit={submitUpload}>
      <label>
        <span>관리자 등록 암호</span>
        <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      </label>
      <label>
        <span>자료 파일 <em>PDF · DOC · DOCX / 최대 10MB</em></span>
        <input ref={inputRef} type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => selectFile(event.target.files?.[0] ?? null)} required />
      </label>
      {file ? <p className="materials-selected">선택한 파일: {file.name} · {formatSize(file.size)}</p> : null}
      {isUploading ? <p className="materials-progress" aria-live="polite">자료를 올리는 중입니다. {progress}%</p> : null}
      <button type="submit" className="button button-dark" disabled={isUploading}>{isUploading ? '업로드 중' : '자료 등록'} <span aria-hidden="true">↗</span></button>
    </form> : null}
    <p className="materials-message" aria-live="polite">{message}</p>
  </article>;
}

