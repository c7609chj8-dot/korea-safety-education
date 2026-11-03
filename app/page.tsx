import Image from 'next/image';
import Link from 'next/link';
import QRCode from 'qrcode';
import { Header } from '../components/header';
import { HeroSlider } from '../components/hero-slider';
import { MaterialsLibrary } from '../components/materials-library';
import { ScheduleDemo } from '../components/schedule-demo';
import { ShareSite } from '../components/share-site';
import { company } from '../lib/company';
import { isPublicProduction, organizationStructuredData, pageMetadata, siteDescription, siteTitle, siteUrl } from '../lib/seo';

export const metadata = pageMetadata({ title: siteTitle, description: siteDescription, path: '/' });

const naverMap = `https://map.naver.com/p/search/${encodeURIComponent(company.shortAddress)}`;
const kakaoMap = `https://map.kakao.com/link/search/${encodeURIComponent(company.shortAddress)}`;
const embeddedMap = `https://www.google.com/maps?q=${encodeURIComponent(company.address)}&hl=ko&z=17&output=embed`;

const instructors = [
  { name: '최현주', position: '대표이사', field: '안전총괄', initial: '최' },
  { name: '안정현', position: '대표이사', field: '보건', initial: '안' },
  { name: '신윤철', position: '원장', field: '안전', initial: '신' },
];

const notices = [
  { label: '공지', title: '교육 신청 전 꼭 확인해 주세요', text: '교육 당일 본인 확인을 위해 신분증을 반드시 지참해 주세요.' },
  { label: '접수', title: '당일 접수 가능 여부', text: '교육 운영 여부와 접수 가능 인원은 방문 전 전화로 확인해 주세요.' },
  { label: '주차', title: '교육생 주차 안내', text: '교육생 주차가 가능합니다. 이용 위치는 방문 전 문의해 주세요.' },
];

const preparations = [
  { number: '01', title: '신분증 필수', text: '본인 확인을 위해 반드시 지참해 주세요.' },
  { number: '02', title: '20분 전 도착', text: '원활한 접수를 위해 교육 시작 전에 도착해 주세요.' },
  { number: '03', title: '교육비 확인', text: '센터 안내금액은 80,000원이며 최종 금액은 접수 전에 확인해 주세요.' },
];

const faqs = [
  ['교육은 몇 시간인가요?', '건설업 기초안전보건교육은 4시간 과정으로 안내합니다. 평일은 13:00~17:00, 토요일은 사전 예약제로 09:00~13:00에 운영합니다.'],
  ['당일 접수 가능한가요?', '당일 현장 접수 가능 여부와 접수 인원은 교육 전에 055-389-0302로 확인해 주세요. 토요일은 사전 예약이 필요합니다.'],
  ['신분증이 꼭 필요한가요?', '본인 확인을 위해 신분증을 반드시 지참해 주세요. 인정 가능한 신분증의 종류는 접수 전에 전화로 확인할 수 있습니다.'],
  ['교육비는 얼마인가요?', '현재 센터 안내금액은 80,000원입니다. 교육비 부담 원칙과 최종 납부 금액은 교육 대상과 지원 조건에 따라 달라질 수 있으므로 접수 전에 확인해 주세요.'],
  ['토요일에도 교육하나요?', '토요일 교육은 09:00~13:00 사전 예약제로 안내합니다. 운영 여부는 매주 달라질 수 있으니 미리 전화로 확인해 주세요.'],
  ['주차 가능한가요?', '교육생 주차가 가능합니다. 주차 위치와 이용 방법은 방문 전에 센터로 문의해 주세요.'],
  ['외국인도 교육을 받을 수 있나요?', '교육 가능 여부, 필요한 서류와 지원 가능한 언어는 방문 전에 전화로 확인해 주세요.'],
  ['교육에 늦게 도착하면 어떻게 되나요?', '교육 진행과 이수 확인에 영향을 줄 수 있습니다. 부득이하게 늦는 경우에는 가능한 빨리 센터로 연락해 안내를 받아 주세요.'],
  ['이수 확인은 언제 하나요?', '출석과 이수 확인 절차는 교육 당일 안내합니다. 이수증 발급 방식과 시점은 교육 전에 확인해 주세요.'],
  ['예약을 취소하려면 어떻게 하나요?', '현재 홈페이지에서는 온라인 예약·취소를 운영하지 않습니다. 일정 변경이나 취소 문의는 055-389-0302로 연락해 주세요.'],
];

const gallery = [
  { file: '04-safety-classroom.png', title: '안전교육 강의', text: '현장에 필요한 안전수칙을 이해하기 쉽게 설명합니다.' },
  { file: '02-personal-protective-equipment.png', title: '보호구 점검 안내', text: '개인보호구의 기본과 착용 전 확인사항을 안내합니다.' },
  { file: '03-fall-prevention.png', title: '추락 예방 교육', text: '주요 위험요인과 예방의 기본을 함께 살펴봅니다.' },
];

const resources = [
  { type: 'PDF · 안전교육 자료', title: '건설현장 주요 위험작업 안전자료', text: '안전보건공단의 건설현장 위험작업 교육자료를 확인하세요.', href: 'https://www.kosha.or.kr/' },
];

const relatedSites = [
  { number: '01', name: '고용노동부', href: 'https://www.moel.go.kr/' },
  { number: '02', name: '안전보건공단', href: 'https://www.kosha.or.kr/' },
  { number: '03', name: '국토교통부', href: 'https://www.molit.go.kr/' },
  { number: '04', name: '국가법령정보센터', href: 'https://www.law.go.kr/' },
];

export default async function Home() {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const qrCodeSvg = await QRCode.toString(siteUrl, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 196,
    color: { dark: '#33402f', light: '#fffdf8' },
  });

  return <>
    <Header publicSite={isPublicProduction} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData()).replace(/</g, '\\u003c') }} />
    <main className="site-home" id="main">
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="tiny-line" /> 양산 · 부산 · 경남 교육생을 위한 법정 안전교육</p>
            <h1>건설업 기초<br /><em>안전보건교육</em></h1>
            <p className="hero-tagline">안전한 현장의 첫걸음, 교육에서 시작합니다.</p>
            <p className="hero-description">평일 13:00~17:00 · 토요일 09:00~13:00 예약제<br />신분증 지참 · 교육생 주차 가능 · 현장 접수는 전화 확인</p>
            <div className="hero-actions">
              <a href="#schedule" className="button button-dark">교육 일정 확인 <span aria-hidden="true">↗</span></a>
              <a href={`tel:${company.phone.replaceAll('-', '')}`} className="hero-phone">전화 문의 <span aria-hidden="true">→</span></a>
            </div>
            <p className="hero-location"><span className="location-dot" aria-hidden="true" />{company.shortAddress}</p>
          </div>
          <HeroSlider />
        </div>
        <div className="container quick-facts" aria-label="교육 핵심 안내">
          <div><span>01 / 평일 교육</span><strong>13:00–17:00</strong></div>
          <div><span>02 / 교육비 안내</span><strong>80,000<span>원</span></strong></div>
          <div><span>03 / 준비물</span><strong>신분증</strong></div>
          <div><span>04 / 토요일</span><strong>예약제 운영</strong></div>
        </div>
      </section>

      <section className="section container about-section" id="about">
        <div className="section-heading">
          <div><p className="eyebrow">ABOUT US</p><h2>안전은 교육에서<br />시작됩니다.</h2></div>
          <p className="section-description">건설현장에 처음 들어가는 근로자가 알아야 할 핵심 안전수칙을<br />현장 사례 중심으로 안내합니다.</p>
        </div>
        <div className="about-grid">
          <p className="about-lead">접수부터 이수 절차 안내까지, 처음 방문하는 교육생도 편안하게 준비할 수 있도록 돕겠습니다.</p>
          <dl className="about-stats">
            <div><dt>4시간</dt><dd>법정 교육과정</dd></div>
            <div><dt>당일</dt><dd>이수 절차 안내</dd></div>
            <div><dt>실무형</dt><dd>현장 사례 교육</dd></div>
          </dl>
        </div>
        <div className="education-legal-note">
          <div><strong>교육 대상과 비용 부담을 확인하세요.</strong><p>건설 일용근로자를 채용하는 사업주의 교육 의무와 기존 이수자의 예외가 적용될 수 있습니다. 교육비 부담과 지원 여부는 접수 전에 확인해 주세요.</p></div>
          <Link href="/education-guide" className="text-link">교육 대상·비용 안내 <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="section instructors-section" id="instructors">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">INSTRUCTORS</p><h2>강사소개</h2></div>
            <p className="section-description">현장 경험과 전문성을 갖춘 강사진을 소개합니다.<br />세부 경력과 교육 가능 분야는 전화로 문의해 주세요.</p>
          </div>
          <div className="instructor-grid">
            {instructors.map((instructor) => <article className="instructor-card" key={instructor.name}>
              <div className="instructor-avatar" aria-hidden="true">{instructor.initial}</div>
              <p>{instructor.position}</p><h3>{instructor.name}</h3><span>{instructor.field}</span>
            </article>)}
          </div>
        </div>
      </section>

      <section className="schedule-section section" id="schedule"><div className="container">
        <div className="section-heading"><div><p className="eyebrow">SCHEDULE</p><h2>교육 일정</h2></div><div className="schedule-heading-note"><span className="outline-tag">일정 미리보기</span><p className="section-description">방문 전 일정을 확인하세요.<br />실제 운영 여부는 전화 확인이 필요합니다.</p></div></div>
        <div className="schedule-summary" aria-label="교육 운영 안내"><div><span>평일 교육</span><strong>월요일~금요일 13:00~17:00</strong></div><div><span>토요일 예약제</span><strong>토요일 09:00~13:00</strong></div><div><span>입실 안내</span><strong>교육 시작 20분 전 도착</strong></div></div>
        <ScheduleDemo today={today} />
      </div></section>

      <section className="section container facility-section" id="facility">
        <div className="section-heading"><div><p className="eyebrow">FACILITY</p><h2>교육사진</h2></div><p className="section-description">교육에서 다루는 핵심 안전 주제를 확인하세요.<br />방문 전 교육장과 주차 위치는 전화로 문의해 주세요.</p></div>
        <div className="facility-grid">
          {gallery.map((item, index) => <article className="facility-card" key={item.file}>
            <div className="facility-image"><Image src={`/images/safety/${item.file}`} alt={`${item.title} 교육용 예시 이미지`} width={1536} height={1024} sizes="(max-width: 800px) 100vw, 33vw" priority={index === 0} /></div>
            <div><h3>{item.title}</h3><p>{item.text}</p></div>
          </article>)}
        </div>
        <p className="image-disclaimer">현재 사용한 이미지는 실제 교육장·강사 사진이 아닌 AI 제작 교육용 예시 이미지입니다.</p>
      </section>

      <section className="notice-section section"><div className="container">
        <div className="section-heading"><div><p className="eyebrow">NOTICE</p><h2>교육 안내</h2></div><p className="section-description">교육 전에 알아두면 좋은 내용을<br />한눈에 확인하세요.</p></div>
        <div className="notice-grid">{notices.map((notice) => <article key={notice.title}><span>{notice.label}</span><h3>{notice.title}</h3><p>{notice.text}</p></article>)}</div>
      </div></section>

      <section className="preparation-section section" aria-labelledby="preparation-title">
        <div className="container"><div className="section-heading"><div><p className="eyebrow">BEFORE CLASS</p><h2 id="preparation-title">교육 당일 준비물</h2></div><p className="section-description">교육 시작 전 아래 내용을 다시 한번 확인해 주세요.</p></div>
          <div className="preparation-grid">{preparations.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </div>
      </section>

      <section className="section container faq-section" id="faq"><div className="faq-intro"><p className="eyebrow">FAQ</p><h2>자주 묻는 질문</h2><p>방문 전 많이 궁금해하시는 내용을 확인하세요.</p><a href={company.phoneHref} className="text-link">전화 상담하기 <span aria-hidden="true">↗</span></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question}><summary><span className="faq-number">{String(index + 1).padStart(2, '0')}</span>{question}<span className="faq-plus" aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></section>

      <section className="resource-section section" id="resources"><div className="container">
        <div className="section-heading"><div><p className="eyebrow">RESOURCES</p><h2>자료실</h2></div><p className="section-description">안전교육과 현장에 필요한<br />공식·센터 자체 자료를 확인하세요.</p></div>
        <div className="resource-grid">{resources.map((resource) => <a href={resource.href} target="_blank" rel="noopener noreferrer" key={resource.title}><span>{resource.type}</span><h3>{resource.title}</h3><p>{resource.text}</p><strong>자료 열기 <b aria-hidden="true">↗</b></strong></a>)}<MaterialsLibrary /></div>
      </div></section>

      <section className="links-section section" id="links"><div className="container">
        <div className="section-heading"><div><p className="eyebrow">RELATED SITES</p><h2>관련사이트</h2></div><p className="section-description">안전·건설 관련 공식기관 바로가기</p></div>
        <div className="related-grid">{relatedSites.map((site) => <a href={site.href} target="_blank" rel="noopener noreferrer" key={site.name}><span>{site.number}</span><strong>{site.name}</strong><b aria-hidden="true">↗</b></a>)}</div>
      </div></section>

      <section className="location-section" id="location"><div className="container location-grid">
        <div><p className="eyebrow">LOCATION</p><h2>오시는 길</h2><h3 className="location-name">한국안전교육</h3><p className="location-address">{company.address}</p><dl className="location-info"><div><dt>전화</dt><dd><a href={company.phoneHref}>{company.phone}</a></dd></div><div><dt>팩스</dt><dd>{company.fax}</dd></div><div><dt>주차</dt><dd>교육생 주차 가능</dd></div></dl><div className="map-links"><a className="button button-dark" href={naverMap} target="_blank" rel="noopener noreferrer">네이버지도 길찾기 <span aria-hidden="true">↗</span></a><a className="button button-outline" href={kakaoMap} target="_blank" rel="noopener noreferrer">카카오맵 <span aria-hidden="true">↗</span></a></div></div>
        <div className="location-map-card"><div className="location-map-top"><span>한국안전교육</span><span>YANGSAN</span></div><iframe className="location-map-frame" title="한국안전교육 위치 지도" src={embeddedMap} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="location-map-caption"><strong>경남 양산시 북정서길 22</strong><span>201호 · 2층</span></div></div>
      </div></section>

      <ShareSite siteUrl={siteUrl} qrCodeSvg={qrCodeSvg} />

      <section className="contact-strip" id="contact"><div className="container"><div><p className="eyebrow">교육 신청 및 문의</p><h2>안전교육, 지금 편하게 상담하세요.</h2><p>교육일정과 준비물을 친절하게 안내해 드립니다.</p></div><div className="contact-actions"><a href={company.phoneHref}>전화 상담 {company.phone} <span aria-hidden="true">↗</span></a><a href={`sms:01072592558?body=${encodeURIComponent('안녕하세요. 건설업 기초안전보건교육 문의드립니다.')}`}>문자 문의 <span aria-hidden="true">↗</span></a></div></div></section>
    </main>
    <footer className="footer"><div className="container"><div className="footer-top"><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">K<span>.</span></span><span><strong>한국안전교육</strong><small>KOREA SAFETY EDUCATION</small></span></a><a href="#top" className="back-top">맨 위로 <span aria-hidden="true">↑</span></a></div>
      <section className="footer-company" id="business-info" aria-label="사업자 정보"><h2>{company.legalName}</h2><dl className="footer-business-info"><div><dt>공동대표</dt><dd>{company.representatives}</dd></div><div><dt>사업자등록번호</dt><dd>{company.businessNumber}</dd></div><div className="business-address"><dt>사업장 소재지</dt><dd>{company.address}</dd></div><div><dt>전화</dt><dd><a href={company.phoneHref}>{company.phone}</a></dd></div><div><dt>팩스</dt><dd>{company.fax}</dd></div></dl></section>
      <nav className="footer-policy-links" aria-label="개인정보 및 이용 안내"><Link href="/privacy">개인정보 처리 안내</Link><Link href="/terms">홈페이지 이용안내</Link><Link href="/education-guide">교육 대상·비용 안내</Link></nav>
      <div className="footer-bottom"><span>© {today.slice(0, 4)} {company.legalName}</span><span>{isPublicProduction ? '교육 문의 055-389-0302 · 온라인 예약·결제 미운영' : '화면 확인용 · 온라인 신청은 접수되지 않습니다.'}</span></div></div></footer>
    <nav className="mobile-actions" aria-label="빠른 문의 및 일정"><a href={company.phoneHref} className="mobile-contact"><span>전화 문의</span><strong>{company.phone}</strong></a><a href="#schedule" className="mobile-schedule">교육 일정 확인 <span aria-hidden="true">↗</span></a></nav>
  </>;
}

