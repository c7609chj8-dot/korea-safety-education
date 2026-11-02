import Link from 'next/link';
import type { ReactNode } from 'react';
import { company } from '../lib/company';

export function LegalPage({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <>
    <a className="skip-link" href="#policy-main">본문으로 바로가기</a>
    <header className="policy-header"><div className="container"><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">K<span>.</span></span><span><strong>한국안전교육</strong><small>KOREA SAFETY EDUCATION</small></span></Link><Link href="/" className="text-link">홈페이지로 돌아가기</Link></div></header>
    <main className="container policy-page" id="policy-main"><p className="eyebrow">WEBSITE INFORMATION</p><h1>{title}</h1><p className="policy-intro">{description}</p><p className="policy-date">확인·적용일: 2026년 11월 2일 · 현재 미리보기 사이트 기준</p>{children}<div className="policy-contact"><strong>{company.legalName}</strong><p>{company.address}</p><p>이용·개인정보 문의 접수: <a href={company.phoneHref}>{company.phone}</a></p></div></main>
    <footer className="policy-footer container"><nav aria-label="사이트 이용 안내"><Link href="/privacy">개인정보 처리 안내</Link><Link href="/terms">홈페이지 이용안내</Link><Link href="/education-guide">교육 대상·비용 안내</Link></nav><p>{company.legalName} · 사업자등록번호 {company.businessNumber}</p></footer>
  </>;
}
