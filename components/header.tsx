'use client';

import { useEffect, useRef, useState } from 'react';
import { company } from '../lib/company';

const links = [
  ['교육시간·접수', '#schedule'],
  ['교육 현장', '#facility'],
  ['기관·강사 소개', '#about'],
  ['자료실', '/materials'],
  ['오시는 길', '#location'],
];

export function Header({ publicSite = false }: { publicSite?: boolean }) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    function outside(event: MouseEvent) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false);
    }
    const desktop = window.matchMedia('(min-width: 801px)');
    const resize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('keydown', escape);
    document.addEventListener('click', outside);
    desktop.addEventListener('change', resize);
    return () => {
      document.removeEventListener('keydown', escape);
      document.removeEventListener('click', outside);
      desktop.removeEventListener('change', resize);
    };
  }, [open]);
  return <>
    <a className="skip-link" href="#main">본문으로 바로가기</a>
    <div className="preview-note">{publicSite ? '온라인 예약·결제는 제공하지 않습니다. 교육일정과 접수는 전화로 확인해 주세요.' : '화면 확인용 사이트입니다. 온라인 신청은 접수되지 않습니다.'}</div>
    <header className="header" ref={headerRef}>
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="한국안전교육 홈" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">K<span>.</span></span>
          <span><strong>한국안전교육</strong><small>KOREA SAFETY EDUCATION</small></span>
        </a>
        <button className="menu-toggle" ref={toggleRef} type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(value => !value)}>{open ? '메뉴 닫기' : '메뉴 열기'}</button>
        <nav id="main-nav" className={`nav ${open ? 'nav-open' : ''}`} aria-label="주 메뉴">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-call" href={company.phoneHref} onClick={() => setOpen(false)}>전화 문의 <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
  </>;
}

