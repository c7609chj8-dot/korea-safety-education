import { Header } from '../components/header';
import { HeroSlider } from '../components/hero-slider';
import { ScheduleDemo } from '../components/schedule-demo';
import { company } from '../lib/company';
import Link from 'next/link';

const naverMap = `https://map.naver.com/p/search/${encodeURIComponent(company.shortAddress)}`;
const kakaoMap = `https://map.kakao.com/link/search/${encodeURIComponent(company.shortAddress)}`;
const faqs = [
  ['누가 이 교육을 받아야 하나요?', '건설 일용근로자를 채용하는 사업주에게 교육 이수 의무가 있습니다. 채용 전에 이미 해당 교육을 이수한 경우에는 법령상 예외가 적용됩니다. 본인의 적용 여부와 기존 이수정보를 확인해 주세요.'],
  ['교육은 몇 시간인가요?', '건설업 기초안전보건교육은 4시간 과정으로 안내하고 있습니다. 평일은 13:00~17:00, 토요일은 사전 예약제로 09:00~13:00에 운영합니다. 방문 전 운영 여부를 확인해 주세요.'],
  ['교육비는 개인이 부담해야 하나요?', '고용노동부는 해당 교육 비용을 사업주가 부담하는 것으로 안내합니다. 표시된 80,000원은 센터 안내금액이며, 개인 부담 의무를 뜻하지 않습니다. 비용지원 자격과 최종 금액은 접수 전에 확인해 주세요.'],
  ['당일 현장 접수도 가능한가요?', '현장 접수가 가능합니다. 다만 교육 운영 여부와 접수 가능 인원은 방문 전 055-389-0302로 확인해 주세요. 토요일은 사전 예약이 필요합니다.'],
  ['무엇을 준비해야 하나요?', '본인 확인을 위한 신분증과 교육비를 준비해 주세요. 원활한 접수를 위해 교육 시작 20분 전에 도착해 주세요. 결제 수단과 인정 신분증은 전화로 문의해 주세요.'],
  ['외국인도 교육을 받을 수 있나요?', '교육 가능 여부와 필요한 서류, 지원 가능한 언어를 방문 전에 전화로 확인해 주세요.'],
  ['주차가 가능한가요?', '교육생 주차가 가능합니다. 주차 위치와 이용 방법은 방문 전에 센터로 문의해 주세요.'],
];

export default function Home() {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  return <>
    <Header />
    <main id="main">
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="tiny-line" /> 양산 · 부산 · 경남 건설근로자를 위한 교육</p>
            <h1>양산 건설업<br /><em>기초안전보건교육</em></h1>
            <p className="hero-tagline">현장의 첫걸음, 안전에서 시작합니다.</p>
            <p className="hero-description">교육시간과 준비물을 확인하고 편하게 문의하세요.<br />한국안전교육이 접수부터 교육까지 안내합니다.</p>
            <div className="hero-actions"><a href="#schedule" className="button button-dark">교육 일정 확인하기 <span aria-hidden="true">↗</span></a><a href="tel:0553890302" className="hero-phone">전화로 문의하기 <span aria-hidden="true">→</span></a></div>
            <p className="hero-location"><span className="location-dot" aria-hidden="true" />{company.shortAddress}</p>
          </div>
          <HeroSlider />
        </div>
        <div className="container quick-facts">
          <div><span>01 / 평일 교육</span><strong>13:00–17:00</strong></div>
          <div><span>02 / 토요일 예약제</span><strong>09:00–13:00</strong></div>
          <div><span>03 / 센터 안내 교육비</span><strong>80,000<span>원</span></strong></div>
          <div><span>04 / 교육 준비</span><strong>신분증 지참</strong></div>
        </div>
      </section>

      <section className="section container guide-section" id="guide">
        <div className="section-heading"><div><p className="eyebrow">THE FIRST STEP TO SAFETY</p><h2>교육 전, 이것만<br />확인해 주세요.</h2></div><p className="section-description">처음 오시는 분도 편안하게.<br />교육에 필요한 내용을 한눈에 안내합니다.</p></div>
        <div className="guide-grid">
          <article><span className="guide-number">01</span><h3>4시간의 안전교육</h3><p>건설현장에 필요한 기본 안전수칙을 배우는 건설업 기초안전보건교육입니다.</p><span className="guide-label">건설업 기초안전보건교육</span></article>
          <article><span className="guide-number">02</span><h3>20분 전 여유 있게</h3><p>접수와 본인 확인을 위해 신분증을 준비하고 교육 시작 20분 전에 도착해 주세요.</p><span className="guide-label">신분증 필수 지참</span></article>
          <article><span className="guide-number">03</span><h3>방문 전 일정 확인</h3><p>토요일은 사전 예약제로 운영합니다. 당일 접수와 주차는 전화로 확인해 주세요.</p><a href="tel:0553890302" className="guide-label">055-389-0302 <span aria-hidden="true">↗</span></a></article>
        </div>
        <div className="education-legal-note"><div><strong>교육 대상과 비용 부담을 확인하세요.</strong><p>건설 일용근로자 채용 시 사업주의 교육 의무와 기존 이수자의 예외가 적용됩니다. 교육비는 사업주 부담 원칙이며 지원 여부는 접수 전에 확인해 주세요.</p></div><Link href="/education-guide" className="text-link">교육 대상·비용 안내 <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section className="schedule-section section" id="schedule"><div className="container">
        <div className="section-heading"><div><p className="eyebrow">EDUCATION SCHEDULE</p><h2>나에게 맞는<br />교육일을 확인하세요.</h2></div><div className="schedule-heading-note"><span className="outline-tag">일정 미리보기</span><p className="section-description">날짜를 선택해 교육시간을 살펴보세요.<br />실제 교육 일정은 전화 확인이 필요합니다.</p></div></div>
        <ScheduleDemo today={today} />
      </div></section>

      <section className="section container faq-section" id="faq"><div className="faq-intro"><p className="eyebrow">FREQUENTLY ASKED</p><h2>궁금한 점을<br />먼저 확인하세요.</h2><p>찾으시는 답변이 없으신가요?</p><a href="tel:0553890302" className="text-link">전화 상담하기 <span aria-hidden="true">↗</span></a></div><div className="faq-list">{faqs.map(([q, a], i) => <details key={q}><summary><span className="faq-number">0{i + 1}</span>{q}<span className="faq-plus" aria-hidden="true" /></summary><p>{a}</p></details>)}</div></section>

      <section className="location-section" id="location"><div className="container location-grid">
        <div><p className="eyebrow">COME VISIT US</p><h2>한국안전교육으로<br />오시는 길</h2><p className="location-address">{company.address}</p><dl className="location-info"><div><dt>교육 문의</dt><dd><a href={company.phoneHref}>{company.phone}</a></dd></div><div><dt>팩스</dt><dd>{company.fax}</dd></div><div><dt>세금계산서</dt><dd><a href={`mailto:${company.invoiceEmail}`}>{company.invoiceEmail}</a></dd></div><div><dt>주차 안내</dt><dd>교육생 주차 가능 · 방문 전 위치 문의</dd></div></dl><div className="map-links"><a className="button button-dark" href={naverMap} target="_blank" rel="noopener noreferrer">네이버지도 열기 <span aria-hidden="true">↗</span></a><a className="button button-outline" href={kakaoMap} target="_blank" rel="noopener noreferrer">카카오맵 <span aria-hidden="true">↗</span></a></div></div>
        <div className="location-card"><div className="location-card-top"><span>한국안전교육</span><span>YANGSAN</span></div><div className="building-art" aria-hidden="true"><div className="building-roof"/><div className="building-floor"><span/><span/><span/></div><div className="building-sign">한국안전교육 <b>2F</b></div><div className="building-floor"><span/><span/><span/></div><div className="building-ground"/><div className="tree tree-left"/><div className="tree tree-right"/></div><p>북정서길 22 <span>201호 · 2층</span></p><small>위치 이해를 돕기 위한 일러스트입니다.</small></div>
      </div></section>

      <section className="contact-strip"><div className="container"><div><p className="eyebrow">WE ARE HERE TO HELP</p><h2>교육 준비, 편하게 물어보세요.</h2></div><a href="tel:0553890302">055-389-0302 <span aria-hidden="true">↗</span></a></div></section>
    </main>
    <footer className="footer"><div className="container"><div className="footer-top"><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">K<span>.</span></span><span><strong>한국안전교육</strong><small>KOREA SAFETY EDUCATION</small></span></a><a href="#top" className="back-top">맨 위로 <span aria-hidden="true">↑</span></a></div>
      <section className="footer-company" id="business-info" aria-label="사업자 정보">
        <h2>{company.legalName}</h2>
        <dl className="footer-business-info">
          <div><dt>공동대표</dt><dd>{company.representatives}</dd></div>
          <div><dt>사업자등록번호</dt><dd>{company.businessNumber}</dd></div>
          <div className="business-address"><dt>사업장 소재지</dt><dd>{company.address}</dd></div>
          <div><dt>업태</dt><dd>{company.businessType}</dd></div>
          <div><dt>종목</dt><dd>{company.businessItems}</dd></div>
          <div><dt>전화</dt><dd><a href={company.phoneHref}>{company.phone}</a></dd></div>
          <div><dt>팩스</dt><dd>{company.fax}</dd></div>
          <div className="business-email"><dt>세금계산서 이메일</dt><dd><a href={`mailto:${company.invoiceEmail}`}>{company.invoiceEmail}</a></dd></div>
          <div><dt>호스팅 제공</dt><dd>Vercel Inc.</dd></div>
        </dl>
      </section>
      <nav className="footer-policy-links" aria-label="개인정보 및 이용 안내"><Link href="/privacy">개인정보 처리 안내</Link><Link href="/terms">홈페이지 이용안내</Link><Link href="/education-guide">교육 대상·비용 안내</Link></nav>
      <div className="footer-bottom"><span>© {today.slice(0, 4)} {company.legalName}</span><span>화면 확인용 · 온라인 예약 접수 전</span></div></div></footer>
    <nav className="mobile-actions" aria-label="빠른 문의 및 일정"><a href="tel:0553890302" className="mobile-contact"><span>전화 문의</span><strong>055-389-0302</strong></a><a href="#schedule" className="mobile-schedule">교육 일정 확인 <span aria-hidden="true">↗</span></a></nav>
  </>;
}
