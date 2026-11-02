'use client';

import { useState } from 'react';

const links = [
  ['교육 안내', '#guide'], ['교육 일정', '#schedule'], ['자주 묻는 질문', '#faq'], ['오시는 길', '#location'],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <a className="skip-link" href="#main">본문으로 바로가기</a>
    <div className="preview-note">화면 확인용 사이트입니다. 온라인 신청은 접수되지 않습니다.</div>
    <header className="header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="한국안전교육 홈" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">K<span>.</span></span>
          <span><strong>한국안전교육</strong><small>KOREA SAFETY EDUCATION</small></span>
        </a>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? '메뉴 닫기' : '메뉴 열기'}</button>
        <nav id="main-nav" className={`nav ${open ? 'nav-open' : ''}`} aria-label="주 메뉴">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-call" href="tel:0553890302" onClick={() => setOpen(false)}>전화 상담 <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
  </>;
}
