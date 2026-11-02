'use client';

import { useState } from 'react';

type ShareSiteProps = {
  siteUrl: string;
  qrCodeSvg: string;
};

export function ShareSite({ siteUrl, qrCodeSvg }: ShareSiteProps) {
  const [message, setMessage] = useState('');

  async function copySiteUrl() {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setMessage('공식 홈페이지 주소를 복사했습니다.');
    } catch {
      setMessage(`공식 홈페이지 주소: ${siteUrl}`);
    }
  }

  async function shareSite() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '한국안전교육',
          text: '한국안전교육 교육일정과 준비물을 확인하세요.',
          url: siteUrl,
        });
        setMessage('공유 창을 열었습니다.');
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }

    await copySiteUrl();
  }

  return <section className="share-section" aria-labelledby="share-title">
    <div className="container share-panel">
      <div className="share-qr" role="img" aria-label="한국안전교육 공식 홈페이지 QR 코드" dangerouslySetInnerHTML={{ __html: qrCodeSvg }} />
      <div className="share-copy">
        <p className="eyebrow">OFFICIAL WEBSITE</p>
        <h2 id="share-title">휴대전화로 일정 확인</h2>
        <p>공식 홈페이지 주소를 저장하거나 공유해 교육일정과 준비물을 언제든 확인하세요.</p>
        <code>{siteUrl.replace(/^https:\/\//, '')}</code>
      </div>
      <div className="share-actions">
        <button type="button" className="button button-outline" onClick={copySiteUrl}>주소 복사 <span aria-hidden="true">⧉</span></button>
        <button type="button" className="button button-dark" onClick={shareSite}>홈페이지 공유 <span aria-hidden="true">↗</span></button>
        <p className="share-result" aria-live="polite">{message}</p>
      </div>
    </div>
  </section>;
}

