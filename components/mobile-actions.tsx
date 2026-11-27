import { company } from '../lib/company';

export function MobileActions({ scheduleHref = '/#schedule' }: { scheduleHref?: string }) {
  return <nav className="mobile-actions" aria-label="빠른 문의 및 접수 안내"><a href={company.phoneHref} className="mobile-contact"><span>전화 문의</span><strong>{company.phone}</strong></a><a href={scheduleHref} className="mobile-schedule">교육시간·접수 <span aria-hidden="true">↗</span></a></nav>;
}
