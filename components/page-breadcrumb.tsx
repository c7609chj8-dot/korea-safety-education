import Link from 'next/link';

export function PageBreadcrumb({ title }: { title: string }) {
  return <nav className="page-breadcrumb" aria-label="현재 위치"><Link href="/">홈</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>;
}
