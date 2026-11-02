import { Header } from '../components/header';
import { ScheduleDemo } from '../components/schedule-demo';

const address = '경남 양산시 북정서길 22, 201호';
const naverMap = `https://map.naver.com/p/search/${encodeURIComponent(address)}`;
const kakaoMap = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`;
const faqs = [
  ['교육은 몇 시간인가요?', '건설업 기초안전보건교육은 4시간 과정으로 안내하고 있습니다. 평일은 13:00~17:00, 토요일은 사전 예약제로 09:00~13:00에 운영합니다. 방문 전 운영 여부를 확인해 주세요.'],
  ['당일 현장 접수도 가능한가요?', '현장 접수가 가능합니다. 다만 교육 운영 여부와 접수 가능 인원은 방문 전 055-389-0302로 확인해 주세요. 토요일은 사전 예약이 필요합니다.'],
  ['무엇을 준비해야 하나요?', '본인 확인을 위한 신분증과 교육비를 준비해 주세요. 원활한 접수를 위해 교육 시작 20분 전에 도착해 주세요. 결제 수단과 인정 신분증은 전화로 문의해 주세요.'],
  ['외국인도 교육을 받을 수 있나요?', '교육 가능 여부와 필요한 서류, 지원 가능한 언어를 방문 전에 전화로 확인해 주세요.'],
  ['주차가 가능한가요?', '교육생 주차가 가능합니다. 주차 위치와 이용 방법은 방문 전에 센터로 문의해 주세요.'],
];

function SafetyIllustration() {
  return <div className="hero-art" aria-hidden="true">
    <div className="art-topline"><span>KOREA SAFETY EDUCATION</span><span>AUTUMN IN YANGSAN</span></div>
    <svg className="construction-art" viewBox="0 0 520 390" fill="none">
      <defs><pattern id="grid" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M26 0H0V26" stroke="#d0a075" strokeWidth=".6" /></pattern><linearGradient id="helmet" x1="150" y1="170" x2="340" y2="360" gradientUnits="userSpaceOnUse"><stop stopColor="#f9d798"/><stop offset="1" stopColor="#da963f"/></linearGradient><radialGradient id="autumn-glow"><stop stopColor="#d89554" stopOpacity=".32"/><stop offset="1" stopColor="#d89554" stopOpacity="0"/></radialGradient></defs>
      <circle cx="260" cy="190" r="210" fill="url(#autumn-glow)"/>
      <path fill="url(#grid)" opacity=".38" d="M0 0h520v390H0z"/>
      <g stroke="#d0a783" strokeWidth="1.5" opacity=".85"><path d="M306 326V90h130v236M325 90V70h92v20M324 117h27v33h-27zM371 117h46v33h-46zM324 173h27v33h-27zM371 173h46v33h-46zM371 230h46v33h-46zM64 326V168h90v95M80 193h20v24H80zM119 193h20v24h-20zM80 239h20v24H80zM193 185V44M177 44h181M193 44l58-30 67 30M251 14v30M318 44v46M177 61h181M212 44v17M241 44v17M272 44v17M303 44v17M193 82l-16 30h32l-16 30M193 142l-16 30h32M48 327h420"/></g>
      <g transform="translate(57 50) rotate(-24)" fill="#d88b4e"><path d="M0 0C42 0 58 23 45 50 17 52-3 34 0 0Z"/><path d="m3 6 45 49M18 21l15-2M26 30l-2 13" stroke="#f3c994" strokeWidth="1.3"/></g>
      <g transform="translate(455 172) rotate(28)" fill="#c7a35c"><path d="M0 0C35 0 49 20 38 43 14 44-2 29 0 0Z"/><path d="m3 6 37 40M14 18l14-2M22 27l-2 11" stroke="#f8dfac" strokeWidth="1.2"/></g>
      <g transform="translate(405 350) rotate(-72)" fill="#c4693f"><path d="M0 0C22 0 32 13 25 28 10 29-2 19 0 0Z"/><path d="m3 4 24 27" stroke="#edb48b" strokeWidth="1.1"/></g>
      <ellipse cx="244" cy="341" rx="142" ry="16" fill="#48281e"/>
      <path d="M128 300c0-68 41-115 104-120v-10c0-7 6-13 13-13h14c7 0 13 6 13 13v11c57 9 93 55 93 119l21 11c7 4 5 16-4 18-86 18-188 18-268 0-9-2-11-14-3-18l17-11Z" fill="url(#helmet)"/>
      <path d="M233 182v96M271 182v96" stroke="#c2873e" strokeWidth="5"/>
      <path d="M127 300c72 16 165 16 238 0M146 278c0-26 11-49 25-62" stroke="#b77a35" strokeWidth="3" strokeLinecap="round"/>
      <path d="m227 229 16 16 30-33" stroke="#75432d" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="440" cy="46" r="22" stroke="#c79b72" strokeDasharray="3 4"/>
      <path d="M440 36v20M430 46h20" stroke="#efc47f"/>
    </svg>
    <div className="art-bottomline"><span>안전의 기본을 배우는 시간</span><strong>4<span>HOURS</span></strong></div>
  </div>;
}

export default function Home() {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  return <>
    <Header />
    <main id="main">
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="season-label"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M4 3c12 0 18 6 14 15C9 21 3 14 4 3Z" fill="currentColor"/><path d="m6 6 14 15" stroke="#fff5e6" strokeWidth="1.3"/></svg><span>AUTUMN</span><span>가을에도, 안전한 시작</span></div>
            <p className="eyebrow"><span className="tiny-line" /> 양산 · 부산 · 경남 건설근로자를 위한 교육</p>
            <h1>현장의 첫걸음,<br /><em>안전</em>에서<br className="mobile-break" /> 시작합니다.</h1>
            <p className="hero-description">건설업 기초안전보건교육<br />현장에 필요한 안전의 기본을 한국안전교육과 함께.</p>
            <div className="hero-actions"><a href="#schedule" className="button button-dark">교육 일정 확인하기 <span aria-hidden="true">↗</span></a><a href="tel:0553890302" className="hero-phone">전화로 문의하기 <span aria-hidden="true">→</span></a></div>
            <p className="hero-location"><span className="location-dot" aria-hidden="true" />경남 양산시 북정서길 22, 201호</p>
          </div>
          <SafetyIllustration />
        </div>
        <div className="container quick-facts">
          <div><span>01 / 평일 교육</span><strong>13:00–17:00</strong></div>
          <div><span>02 / 토요일 예약제</span><strong>09:00–13:00</strong></div>
          <div><span>03 / 교육비</span><strong>80,000<span>원</span></strong></div>
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
      </section>

      <section className="schedule-section section" id="schedule"><div className="container">
        <div className="section-heading"><div><p className="eyebrow">EDUCATION SCHEDULE</p><h2>나에게 맞는<br />교육일을 확인하세요.</h2></div><div className="schedule-heading-note"><span className="outline-tag">일정 미리보기</span><p className="section-description">날짜를 선택해 교육시간을 살펴보세요.<br />실제 교육 일정은 전화 확인이 필요합니다.</p></div></div>
        <ScheduleDemo today={today} />
      </div></section>

      <section className="section container faq-section" id="faq"><div className="faq-intro"><p className="eyebrow">FREQUENTLY ASKED</p><h2>궁금한 점을<br />먼저 확인하세요.</h2><p>찾으시는 답변이 없으신가요?</p><a href="tel:0553890302" className="text-link">전화 상담하기 <span aria-hidden="true">↗</span></a></div><div className="faq-list">{faqs.map(([q, a], i) => <details key={q}><summary><span className="faq-number">0{i + 1}</span>{q}<span className="faq-plus" aria-hidden="true" /></summary><p>{a}</p></details>)}</div></section>

      <section className="location-section" id="location"><div className="container location-grid">
        <div><p className="eyebrow">COME VISIT US</p><h2>한국안전교육으로<br />오시는 길</h2><p className="location-address">{address}</p><dl className="location-info"><div><dt>교육 문의</dt><dd><a href="tel:0553890302">055-389-0302</a></dd></div><div><dt>팩스</dt><dd>0504-006-2558</dd></div><div><dt>주차 안내</dt><dd>교육생 주차 가능 · 방문 전 위치 문의</dd></div></dl><div className="map-links"><a className="button button-dark" href={naverMap} target="_blank" rel="noopener noreferrer">네이버지도 열기 <span aria-hidden="true">↗</span></a><a className="button button-outline" href={kakaoMap} target="_blank" rel="noopener noreferrer">카카오맵 <span aria-hidden="true">↗</span></a></div></div>
        <div className="location-card"><div className="location-card-top"><span>한국안전교육</span><span>YANGSAN</span></div><div className="building-art" aria-hidden="true"><div className="building-roof"/><div className="building-floor"><span/><span/><span/></div><div className="building-sign">한국안전교육 <b>2F</b></div><div className="building-floor"><span/><span/><span/></div><div className="building-ground"/><div className="tree tree-left"/><div className="tree tree-right"/></div><p>북정서길 22 <span>201호 · 2층</span></p><small>위치 이해를 돕기 위한 일러스트입니다.</small></div>
      </div></section>

      <section className="contact-strip"><div className="container"><div><p className="eyebrow">WE ARE HERE TO HELP</p><h2>교육 준비, 편하게 물어보세요.</h2></div><a href="tel:0553890302">055-389-0302 <span aria-hidden="true">↗</span></a></div></section>
    </main>
    <footer className="footer"><div className="container"><div className="footer-top"><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">K<span>.</span></span><span><strong>한국안전교육</strong><small>KOREA SAFETY EDUCATION</small></span></a><a href="#top" className="back-top">맨 위로 <span aria-hidden="true">↑</span></a></div><p>대표자 최현주·안정현 <span className="divider">|</span> 사업자등록번호 217-86-02371</p><p>{address} <span className="divider">|</span> 전화 055-389-0302</p><div className="footer-bottom"><span>© {today.slice(0, 4)} 한국안전교육</span><span>화면 확인용 · 온라인 예약 접수 전</span></div></div></footer>
    <a className="mobile-call" href="tel:0553890302">교육 문의 <strong>055-389-0302</strong><span aria-hidden="true">↗</span></a>
  </>;
}
