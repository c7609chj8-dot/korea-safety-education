'use client';

import { useRef, useState, type FormEvent } from 'react';

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
const dateKey = (year: number, month: number, day: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

export function ScheduleDemo({ today }: { today: string }) {
  const [year, month, day] = today.split('-').map(Number);
  const [view, setView] = useState({ year, month: month - 1 });
  const [selected, setSelected] = useState(today);
  const [formVisible, setFormVisible] = useState(false);
  const [message, setMessage] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const selectedDate = new Date(`${selected}T00:00:00Z`);
  const weekday = selectedDate.getUTCDay();
  const closed = weekday === 0 || selected < today;
  const time = weekday === 6 ? '09:00–13:00' : '13:00–17:00';
  const days = new Date(view.year, view.month + 1, 0).getDate();
  const start = new Date(view.year, view.month, 1).getDay();
  const selectedLabel = `${selectedDate.getUTCFullYear()}년 ${selectedDate.getUTCMonth() + 1}월 ${selectedDate.getUTCDate()}일 (${weekdays[weekday]})`;

  function changeMonth(amount: number) {
    const next = new Date(view.year, view.month + amount, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() });
  }

  function chooseDate(value: string) {
    setSelected(value);
    setMessage('');
    setFormVisible(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setMessage('입력 확인이 끝났습니다. 실제 예약은 접수되지 않았으며 입력한 정보는 저장하거나 전송하지 않았습니다. 예약은 055-389-0302로 문의해 주세요.');
  }

  return <>
    <div className="schedule-grid">
      <div className="calendar">
        <div className="calendar-top">
          <h3>{view.year}<span>년</span> {view.month + 1}<span>월</span></h3>
          <div className="calendar-controls">
            <button type="button" aria-label="이전 달" onClick={() => changeMonth(-1)}>←</button>
            <button type="button" onClick={() => { setView({ year, month: month - 1 }); chooseDate(dateKey(year, month - 1, day)); }}>오늘</button>
            <button type="button" aria-label="다음 달" onClick={() => changeMonth(1)}>→</button>
          </div>
        </div>
        <div className="weekdays" aria-hidden="true">{weekdays.map(w => <span key={w}>{w}</span>)}</div>
        <div className="calendar-days" role="group" aria-label={`${view.year}년 ${view.month + 1}월 교육 일정 예시`}>
          {Array.from({ length: start }, (_, i) => <span key={`empty-${i}`} className="empty-day" />)}
          {Array.from({ length: days }, (_, i) => {
            const number = i + 1;
            const key = dateKey(view.year, view.month, number);
            const w = new Date(view.year, view.month, number).getDay();
            const unavailable = w === 0 || key < today;
            const status = key < today ? '지난 날짜' : w === 0 ? '휴무' : w === 6 ? '예약제' : '교육 예정';
            return <button type="button" key={key} className={`calendar-day ${selected === key ? 'selected' : ''} ${unavailable ? 'unavailable' : ''}`} aria-pressed={selected === key} aria-label={`${view.month + 1}월 ${number}일 ${status}`} onClick={() => chooseDate(key)}>
              <span className="day-number">{number}{key === today ? <i className="today-dot" aria-label="오늘" /> : null}</span>
              <span className="day-status">{status}</span>
            </button>;
          })}
        </div>
        <p className="calendar-footnote"><span className="legend-dot" />평일 오후 · 토요일 오전 예약제 <span>일요일 휴무</span></p>
      </div>
      <aside className="date-detail" aria-labelledby="selected-date">
        <span className="eyebrow">선택한 교육일</span>
        <h3 id="selected-date" aria-live="polite">{selectedLabel}</h3>
        <span className={`status-tag ${closed ? 'muted-tag' : ''}`}>{closed ? (selected < today ? '지난 날짜' : '휴무') : '일정 예시'}</span>
        <dl className="date-specs">
          <div><dt>교육 과정</dt><dd>건설업 기초안전보건교육</dd></div>
          <div><dt>교육 시간</dt><dd>{closed ? '신청 불가' : time}</dd></div>
          <div><dt>교육비</dt><dd>80,000원</dd></div>
          <div><dt>준비물</dt><dd>신분증</dd></div>
        </dl>
        <button type="button" className="button button-dark full-width" disabled={closed} onClick={() => { setFormVisible(true); setMessage(''); setTimeout(() => nameRef.current?.focus(), 0); }}>{closed ? '선택한 날짜는 신청할 수 없습니다' : '신청 화면 미리보기'}{closed ? null : <span aria-hidden="true">↗</span>}</button>
        <p className="demo-caption">실제 운영 일정·잔여석과 연결되지 않은 예시입니다.<br />교육 가능 여부는 전화로 확인해 주세요.</p>
        <a className="text-link" href="tel:0553890302">전화 문의 055-389-0302 <span aria-hidden="true">↗</span></a>
      </aside>
    </div>
    {formVisible ? <div className="application-panel" id="application">
      <div className="application-heading"><div><span className="eyebrow">APPLICATION PREVIEW</span><h3>교육 신청 화면 미리보기</h3><p>{selectedLabel} · {time}</p></div><button type="button" className="text-link" onClick={() => { setFormVisible(false); setMessage(''); }}>닫기</button></div>
      <p className="form-notice">체험용 양식입니다. 실제 개인정보 대신 예시를 입력해 주세요. 입력 내용은 저장·전송되지 않습니다.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <label htmlFor="applicant-name">이름 <span>필수</span><input ref={nameRef} id="applicant-name" name="name" autoComplete="off" placeholder="예: 홍길동" maxLength={50} required /></label>
          <label htmlFor="applicant-phone">휴대전화번호 <span>필수</span><input id="applicant-phone" name="phone" type="tel" inputMode="tel" autoComplete="off" placeholder="예: 010-0000-0000" pattern="01[016789][ -]?[0-9]{3,4}[ -]?[0-9]{4}" title="010-0000-0000 형식의 휴대전화번호를 입력해 주세요." required /></label>
        </div>
        <div className="form-bottom"><p>실제 예약은 전화 문의를 이용해 주세요.</p><button className="button button-dark" type="submit">입력 확인하기 <span aria-hidden="true">→</span></button></div>
        <p className="form-result" role="status">{message}</p>
      </form>
    </div> : null}
  </>;
}
