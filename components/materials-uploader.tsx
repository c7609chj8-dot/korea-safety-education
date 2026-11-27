'use client';

import { upload } from '@vercel/blob/client';
import { FormEvent, useRef, useState } from 'react';
import Link from 'next/link';

const allowedExtensions = ['pdf', 'doc', 'docx'] as const;
const maxFileSize = 10 * 1024 * 1024;

function getExtension(filename: string) {
  return filename.split('.').pop()?.toLowerCase() ?? '';
}

function isAllowedFile(file: File) {
  return allowedExtensions.includes(getExtension(file.name) as typeof allowedExtensions[number]);
}

function makePathname(filename: string, title: string, category: string) {
  const extension = getExtension(filename);
  const base = title.trim()
    .normalize('NFC')
    .replace(/[\\/?%*:|"<>]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 72) || 'safety-material';

  return `materials/${category === '사고사례' ? 'cases' : 'guides'}/${Date.now()}-${base}.${extension}`;
}

function formatSize(size: number) {
  return size < 1024 * 1024 ? `${Math.max(1, Math.round(size / 1024))} KB` : `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function MaterialsUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('교육자료');
  const [password, setPassword] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);

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
    setTitle(nextFile.name.replace(/\.[^.]+$/, '').slice(0, 72));
  }

  async function submitUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file || !password || !title.trim()) {
      setMessage('등록 암호, 자료 제목과 파일을 모두 입력해 주세요.');
      return;
    }

    setIsUploading(true);
    setMessage('');
    setProgress(0);

    try {
      await upload(makePathname(file.name, title, category), file, {
        access: 'public',
        handleUploadUrl: '/api/materials/upload',
        headers: { 'x-materials-upload-password': password },
        onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage)),
      });

      setFile(null);
      setTitle('');
      setPassword('');
      if (inputRef.current) inputRef.current.value = '';
      setMessage('자료를 등록했습니다. 공개 자료 목록에 반영되었습니다.');
    } catch {
      setMessage('자료 등록에 실패했습니다. 등록 암호와 파일 형식을 확인해 주세요.');
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  }

  return <article className="resource-upload-card">
    <span>관리자 자료 등록</span>
    <h2>교육자료 게시글 등록</h2>
    <p>등록 암호가 있는 관리자만 자료를 올릴 수 있습니다. 등록한 파일은 홈페이지 자료실에 공개됩니다.</p>
    <form className="materials-form" onSubmit={submitUpload}>
      <label>
        <span>관리자 등록 암호</span>
        <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} disabled={isUploading} required />
      </label>
      <label>
        <span>자료 파일 <em>PDF · DOC · DOCX / 최대 10MB</em></span>
        <input ref={inputRef} type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => selectFile(event.target.files?.[0] ?? null)} disabled={isUploading} required />
      </label>
      <label><span>자료 제목 <em>최대 72자</em></span><input type="text" maxLength={72} value={title} onChange={event => setTitle(event.target.value)} disabled={isUploading} required /></label>
      <label><span>자료 분류</span><select value={category} onChange={event => setCategory(event.target.value)} disabled={isUploading}><option>교육자료</option><option>사고사례</option></select></label>
      {file ? <p className="materials-selected">선택한 파일: {file.name} · {formatSize(file.size)}</p> : null}
      {isUploading ? <p className="materials-progress" aria-live="polite">자료를 올리는 중입니다. {progress}%</p> : null}
      <button type="submit" className="button button-dark" disabled={isUploading}>{isUploading ? '업로드 중' : '자료 등록'} <span aria-hidden="true">↗</span></button>
    </form>
    <p className="materials-message" aria-live="polite">{message}</p>
    <Link href="/materials" className="text-link">공개 자료실 확인하기</Link>
  </article>;
}

