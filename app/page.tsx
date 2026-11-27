import Link from 'next/link';
import QRCode from 'qrcode';
import { Header } from '../components/header';
import { HeroSlider } from '../components/hero-slider';
import { PhotoGallery } from '../components/photo-gallery';
import { MobileActions } from '../components/mobile-actions';
import { MaterialsLibrary } from '../components/materials-library';
import { EducationSchedule } from '../components/education-schedule';
import { ShareSite } from '../components/share-site';
import { company } from '../lib/company';
import { educationInfo } from '../lib/education-info';
import { RegistrationEvidence } from '../components/registration-evidence';
import { isPublicProduction, organizationStructuredData, pageMetadata, siteDescription, siteTitle, siteUrl } from '../lib/seo';

export const metadata = pageMetadata({ title: siteTitle, description: siteDescription, path: '/' });

const naverMap = `https://map.naver.com/p/search/${encodeURIComponent(company.shortAddress)}`;
const kakaoMap = `https://map.kakao.com/link/search/${encodeURIComponent(company.shortAddress)}`;
const embeddedMap = `https://www.google.com/maps?q=${encodeURIComponent(company.address)}&hl=ko&z=17&output=embed`;

const instructors = [
  { name: '최현주', position: '대표이사', field: '안전교육총괄', initial: '최', description: '한국안전교육의 안전교육 운영을 총괄합니다.' },
  { name: '안정현', position: '교육 담당', field: '보건교육', initial: '안', description: '건설업 기초안전보건교육의 보건교육을 담당합니다.' },
  { name: '신윤철', position: '교육 담당', field: '안전교육', initial: '신', description: '건설업 기초안전보건교육의 안전교육을 담당합니다.' },
];

const faqs = [
  ['교육은 몇 시간인가요?', '건설업 기초안전보건교육은 4시간 과정으로 안내합니다. 평일은 13:00~17:00, 토요일은 사전 예약제로 09:00~13:00에 운영합니다.'],
  ['당일 접수 가능한가요?', '평일 접수는 12:40까지입니다. 방문 전 접수 가능 인원을 055-389-0302로 확인해 주세요. 토요일은 사전 예약제이며 일요일·법정공휴일은 휴무입니다.'],
  ['신분증이 꼭 필요한가요?', '본인 확인을 위해 신분증을 반드시 지참해 주세요. 인정 가능한 신분증의 종류는 접수 전에 전화로 확인할 수 있습니다.'],
  ['교육비는 얼마인가요?', '현재 센터 안내금액은 80,000원입니다. 교육비 부담 원칙과 최종 납부 금액은 교육 대상과 지원 조건에 따라 달라질 수 있으므로 접수 전에 확인해 주세요.'],
  ['토요일에도 교육하나요?', '토요일 교육은 09:00~13:00 사전 예약제로 안내합니다. 운영 여부는 매주 달라질 수 있으니 미리 전화로 확인해 주세요.'],
  ['무료교육 대상은 누구인가요?', `${educationInfo.freeTargets.join('·')} 대상 선착순 안내입니다. ${educationInfo.portalNotice} 방문 전에 지원 가능 여부와 증빙서류를 전화로 확인해 주세요.`],
  ['주차 가능한가요?', `${educationInfo.parking}을 이용하실 수 있습니다.`],
  ['외국인도 교육을 받을 수 있나요?', '교육 가능 여부, 필요한 서류와 지원 가능한 언어는 방문 전에 전화로 확인해 주세요.'],
  ['교육에 늦게 도착하면 어떻게 되나요?', '교육 진행과 이수 확인에 영향을 줄 수 있습니다. 부득이하게 늦는 경우에는 가능한 빨리 센터로 연락해 안내를 받아 주세요.'],
  ['이수 확인은 언제 하나요?', '출석과 이수 확인 절차는 교육 당일 안내합니다. 이수증 발급 방식과 시점은 교육 전에 확인해 주세요.'],
  ['예약을 취소하려면 어떻게 하나요?', '현재 홈페이지에서는 온라인 예약·취소를 운영하지 않습니다. 일정 변경이나 취소 문의는 055-389-0302로 연락해 주세요.'],
];

const resources = [
  { type: '공식기관 홈페이지', title: '안전보건공단 자료 찾아보기', text: '안전보건공단 홈페이지에서 필요한 안전보건 교육자료를 찾아보세요.', href: 'https://www.kosha.or.kr/' },
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
    color: { dark: '#172d4a', light: '#ffffff' },
  });

  return <>
    <Header publicSite={isPublicProduction} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData()).replace(/</g, '\\u003c') }} />
    <main className="site-home" id="main">
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="tiny-line" /> 한국안전교육 · 양산</p>
            <h1>건설업 기초<br /><em>안전보건교육</em></h1>
            <p className="hero-tagline">현장에 가기 전, 안전부터 배웁니다.</p>
            <p className="hero-description">건설현장에서 필요한 안전수칙을<br />실제 사례와 교육용 교구로 알기 쉽게 안내합니다.</p>
            <div className="hero-operating"><span>평일 13:00–17:00</span><strong>접수 12:40까지</strong></div>
            <div className="hero-actions">
              <a href="#schedule" className="button button-dark">교육시간 확인 <span aria-hidden="true">↗</span></a>
              <a href={company.phoneHref} className="button button-outline">전화 문의 <span aria-hidden="true">↗</span></a>
            </div>
            <p className="hero-contact">접수 문의 <a href={company.phoneHref}>{company.phone}</a><span>토요일 사전 예약 · 일요일·공휴일 휴무</span></p>
          </div>
          <HeroSlider />
        </div>
      </section>

      <section className="start-section" aria-labelledby="start-title">
        <div className="container">
          <div className="start-heading"><p className="eyebrow">방문 전, 먼저 확인하세요</p><h2 id="start-title">교육 준비, 세 가지만 확인하세요.</h2></div>
          <div className="start-grid">
            <article className="start-card"><span className="card-number">01 / SCHEDULE</span><h3>교육시간</h3><strong className="card-value">평일 13:00–17:00</strong><p>평일 접수는 12:40까지<br />토요일 09:00–13:00 사전 예약제</p><a href="#schedule">교육일·접수 안내 <span aria-hidden="true">↗</span></a></article>
            <article className="start-card"><span className="card-number">02 / PREPARATION</span><h3>준비물과 교육비</h3><strong className="card-value">신분증 필수 지참</strong><p>센터 안내 교육비 {educationInfo.fee}<br />무료교육 대상·지원 가능 여부 사전 확인</p><a href="#free-education">무료교육·준비물 안내 <span aria-hidden="true">↗</span></a></article>
            <article className="start-card"><span className="card-number">03 / LOCATION</span><h3>오시는 길</h3><strong className="card-value">양산시 북정서길 22</strong><p>201호 · 새롬성원네오파트 상가<br />{educationInfo.parking}</p><a href="#location">지도·주차 안내 <span aria-hidden="true">↗</span></a></article>
          </div>
        </div>
      </section>

      <section className="schedule-section section" id="schedule"><div className="container">
        <div className="section-heading"><div><p className="eyebrow">SCHEDULE</p><h2>교육시간·접수 안내</h2></div><div className="schedule-heading-note"><span className="outline-tag">전화·방문 접수</span><p className="section-description">아래 운영시간과 달력을 확인한 뒤<br />전화로 교육일을 문의해 주세요.</p></div></div>
        <div className="schedule-summary" aria-label="교육 운영 안내"><div><span>평일 교육 · 접수 12:40까지</span><strong>월요일~금요일 13:00~17:00</strong></div><div><span>토요일 예약제</span><strong>토요일 09:00~13:00</strong></div><div><span>휴무 안내</span><strong>일요일·법정공휴일 휴무</strong></div></div>
        <ol className="registration-steps" aria-label="교육 접수 방법">
          <li><span>01</span><div><h3>전화로 교육일 확인</h3><p><a href={company.phoneHref}>{company.phone}</a>로 교육일과 접수 가능 인원을 확인하세요. 토요일은 전화로 미리 예약해 주세요.</p></div></li>
          <li><span>02</span><div><h3>신분증 지참 후 방문</h3><p>평일은 12:40까지 접수해 주세요. 토요일은 예약 시 안내받은 시간에 방문하세요.</p></div></li>
          <li><span>03</span><div><h3>현장에서 접수 안내</h3><p>본인 확인과 교육비 등 접수 절차를 안내받으세요. 홈페이지에서는 온라인 신청·결제를 받지 않습니다.</p></div></li>
        </ol>
        <EducationSchedule />
        <article className="free-education-panel" id="free-education" aria-labelledby="free-education-title">
          <div><p className="eyebrow">BEFORE YOUR VISIT</p><h3 id="free-education-title">무료교육 대상·선착순 안내</h3><p>{educationInfo.freeNotice}</p></div>
          <ul className="free-targets" aria-label="무료교육 지원 대상">{educationInfo.freeTargets.map(target => <li key={target}>{target}</li>)}</ul>
          <p className="free-status">{educationInfo.portalNotice}</p>
          <div className="free-preparation"><p><strong>준비물</strong> 신분증 필수 · 지원 대상 증빙서류는 접수 전 확인</p><p><strong>센터 안내 교육비</strong> {educationInfo.fee} · 비용 부담·지원 조건에 따라 최종 금액 확인</p></div>
          <div className="free-links"><a className="text-link" href={company.phoneHref}>지원 가능 여부 문의 {company.phone} <span aria-hidden="true">↗</span></a><Link className="text-link" href="/education-guide">교육 대상·비용 자세히 보기 <span aria-hidden="true">↗</span></Link></div>
        </article>
      </div></section>

      <section className="section container facility-section" id="facility">
        <div className="section-heading"><div><p className="eyebrow">OUR CLASSROOM</p><h2>교육 현장과 실습</h2></div><p className="section-description">한국안전교육의 실제 강의실과<br />안전보건교육 모습을 확인하세요.</p></div>
        <PhotoGallery />
        <p className="image-disclaimer">위 사진은 한국안전교육에서 제공한 실제 교육 현장 사진입니다. 촬영 당시 모습으로 현재 교육 구성은 달라질 수 있습니다.</p>
      </section>

      <section className="section container about-section" id="about">
        <div className="section-heading">
          <div><p className="eyebrow">ABOUT US</p><h2>현장을 이해하는 교육,<br />안전을 준비하는 시간.</h2></div>
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
        <RegistrationEvidence />
        <div className="education-legal-note">
          <div><strong>교육 대상과 비용 부담을 확인하세요.</strong><p>건설 일용근로자를 채용하는 사업주의 교육 의무와 기존 이수자의 예외가 적용될 수 있습니다. 교육비 부담과 지원 여부는 접수 전에 확인해 주세요.</p></div>
          <Link href="/education-guide" className="text-link">교육 대상·비용 안내 <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="section instructors-section" id="instructors">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">INSTRUCTORS</p><h2>강사소개</h2></div>
            <p className="section-description">안전교육총괄·보건교육·안전교육 담당 강사진입니다.<br />교육 관련 문의는 대표전화로 안내합니다.</p>
          </div>
          <div className="instructor-grid">
            {instructors.map((instructor) => <article className="instructor-card" key={instructor.name}>
              <div className="instructor-avatar" aria-hidden="true">{instructor.initial}</div>
              <p>{instructor.position}</p><h3>{instructor.name}</h3><span>{instructor.field}</span>
              <p className="instructor-description">{instructor.description}</p>
            </article>)}
          </div>
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
        <div><p className="eyebrow">LOCATION</p><h2>오시는 길</h2><h3 className="location-name">한국안전교육</h3><p className="location-address">{company.address}</p><dl className="location-info"><div><dt>전화</dt><dd><a href={company.phoneHref}>{company.phone}</a></dd></div><div><dt>팩스</dt><dd>{company.fax}</dd></div><div><dt>주차</dt><dd>{educationInfo.parking}</dd></div></dl><div className="map-links"><a className="button button-dark" href={naverMap} target="_blank" rel="noopener noreferrer">네이버지도 길찾기 <span aria-hidden="true">↗</span></a><a className="button button-outline" href={kakaoMap} target="_blank" rel="noopener noreferrer">카카오맵 <span aria-hidden="true">↗</span></a></div></div>
        <div className="location-map-card"><div className="location-map-top"><span>한국안전교육</span><span>YANGSAN</span></div><iframe className="location-map-frame" title="한국안전교육 위치 지도" src={embeddedMap} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="location-map-caption"><strong>경남 양산시 북정서길 22</strong><span>201호 · 2층</span></div></div>
      </div></section>

      <ShareSite siteUrl={siteUrl} qrCodeSvg={qrCodeSvg} />

      <section className="contact-strip" id="contact"><div className="container"><div><p className="eyebrow">전화 접수 및 문의</p><h2>안전교육, 지금 편하게 상담하세요.</h2><p>교육일정·접수·주차 문의를 안내합니다.</p></div><div className="contact-actions"><a href={company.phoneHref}>전화 상담 {company.phone} <span aria-hidden="true">↗</span></a><a href={`sms:01072592558?body=${encodeURIComponent('안녕하세요. 건설업 기초안전보건교육 문의드립니다.')}`}>문자 문의 <span aria-hidden="true">↗</span></a></div></div></section>
    </main>
    <footer className="footer"><div className="container"><div className="footer-top"><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">K<span>.</span></span><span><strong>한국안전교육</strong><small>KOREA SAFETY EDUCATION</small></span></a><a href="#top" className="back-top">맨 위로 <span aria-hidden="true">↑</span></a></div>
      <section className="footer-company" id="business-info" aria-label="사업자 정보"><h2>{company.legalName}</h2><dl className="footer-business-info"><div><dt>공동대표</dt><dd>{company.representatives}</dd></div><div><dt>사업자등록번호</dt><dd>{company.businessNumber}</dd></div><div className="business-address"><dt>사업장 소재지</dt><dd>{company.address}</dd></div><div><dt>전화</dt><dd><a href={company.phoneHref}>{company.phone}</a></dd></div><div><dt>팩스</dt><dd>{company.fax}</dd></div></dl></section>
      <p className="footer-registration">건설업 기초안전·보건교육기관 등록번호 {educationInfo.registrationNumber} · <a href={educationInfo.registrationImage} target="_blank" rel="noopener noreferrer">등록증 보기</a></p>
      <nav className="footer-policy-links" aria-label="개인정보 및 이용 안내"><Link href="/privacy">개인정보 처리 안내</Link><Link href="/terms">홈페이지 이용안내</Link><Link href="/education-guide">교육 대상·비용 안내</Link></nav>
      <div className="footer-bottom"><span>© {today.slice(0, 4)} {company.legalName}</span><span>{isPublicProduction ? '교육 문의 055-389-0302 · 온라인 예약·결제 미운영' : '화면 확인용 · 온라인 신청은 접수되지 않습니다.'}</span></div></div></footer>
    <MobileActions scheduleHref="#schedule" />
  </>;
}

