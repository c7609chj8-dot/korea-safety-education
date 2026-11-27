import Link from 'next/link';
import { MaterialsLibrary } from '../../components/materials-library';
import { MobileActions } from '../../components/mobile-actions';
import { PageBreadcrumb } from '../../components/page-breadcrumb';
import { PageStructuredData } from '../../components/page-structured-data';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({ title: '교육자료실 | 한국안전교육', description: '건설현장 사고사례와 예방대책 PDF 자료를 검색하고 내려받으세요. 한국안전교육 교육자료 게시판.', path: '/materials' });

export default function MaterialsPage() {
  return <>
    <a className="skip-link" href="#materials-main">본문으로 바로가기</a>
    <header className="policy-header"><div className="container"><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">K<span>.</span></span><span><strong>한국안전교육</strong><small>KOREA SAFETY EDUCATION</small></span></Link><Link className="text-link" href="/">홈페이지로 돌아가기</Link></div></header>
    <PageStructuredData title="교육자료실" path="/materials" description="건설현장 사고사례·예방대책 교육자료 게시판" collection />
    <main className="container materials-page" id="materials-main"><PageBreadcrumb title="교육자료실" /><div className="board-page-heading"><div><p className="eyebrow">SAFETY RESOURCES</p><h1>교육자료실</h1><p>사고사례를 살펴보고, 현장의 안전을 준비하세요.</p></div><Link className="button button-outline" href="/admin/materials">관리자 자료 등록 <span aria-hidden="true">↗</span></Link></div><MaterialsLibrary compact={false} /></main>
    <footer className="policy-footer container materials-footer"><p>한국안전교육 · 교육 문의 <a href="tel:0553890302">055-389-0302</a></p><Link href="/">홈페이지로 돌아가기</Link></footer>
    <MobileActions />
  </>;
}
