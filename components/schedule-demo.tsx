'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
const dateKey = (year: number, month: number, day: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

export function ScheduleDemo({ today }: { today: string }) {
  const [year, month, day] = today.split('-').map(Number);
  const [view, setView] = useState({ year, month: month - 1 });
  const [selected, setSelected] = useState(today);
  const [formVisible, setFormVisible] = useState(false);
  const [message, setMessage] = useState('');
  const previewRef = useRef<HTMLHeadingElement>(null);
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
            const status = key < today ? '지난 날짜' : w === 0 ? '휴무 예시' : w === 6 ? '토요일 예시' : '평일 예시';
            return <button type="button" key={key} className={`calendar-day ${selected === key ? 'selected' : ''} ${unavailable ? 'unavailable' : ''}`} aria-pressed={selected === key} aria-label={`${view.month + 1}월 ${number}일 ${status}`} onClick={() => chooseDate(key)}>
              <span className="day-number">{number}{key === today ? <i className="today-dot" aria-label="오늘" /> : null}</span>
              <span className="day-status">{status}</span>
            </button>;
          })}
        </div>
        <p className="calendar-footnote"><span className="legend-dot" />요일별 시간 배치를 보여주는 예시입니다.<span>실제 운영 여부는 전화 확인</span></p>
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
        <button type="button" className="button button-dark full-width" disabled={closed} onClick={() => { setFormVisible(true); setMessage(''); setTimeout(() => previewRef.current?.focus(), 0); }}>{closed ? '선택한 날짜는 예시를 제공하지 않습니다' : '예약 절차 예시 보기'}{closed ? null : <span aria-hidden="true">↗</span>}</button>
        <p className="demo-caption">실제 운영 일정·공휴일·잔여석과 연결되지 않은 예시입니다. 온라인 예약·결제는 제공하지 않습니다.</p>
        <a className="text-link" href="tel:0553890302">전화 문의 055-389-0302 <span aria-hidden="true">↗</span></a>
      </aside>
    </div>
    {formVisible ? <div className="application-panel" id="application">
      <div className="application-heading"><div><span className="eyebrow">APPLICATION PREVIEW</span><h3 ref={previewRef} tabIndex={-1}>교육 예약 절차 예시</h3><p>{selectedLabel} · {time}</p></div><button type="button" className="text-link" onClick={() => { setFormVisible(false); setMessage(''); }}>닫기</button></div>
      <p className="form-notice">현재는 예약 접수 전입니다. 개인정보를 입력하는 기능 없이 가상의 정보로 절차만 안내합니다.</p>
      <div>
        <dl className="demo-applicant"><div><dt>예약자 예시</dt><dd>교육생 예시</dd></div><div><dt>연락처 예시</dt><dd>010-0000-0000</dd></div></dl>
        <div className="form-bottom"><p><Link href="/privacy">개인정보 처리 안내</Link> · 실제 예약은 전화 문의를 이용해 주세요.</p><button className="button button-dark" type="button" onClick={() => setMessage('예시 확인이 끝났습니다. 예약이 접수되거나 결제가 진행된 것은 아닙니다. 교육 문의는 055-389-0302로 연락해 주세요.')}>예시 확인하기 <span aria-hidden="true">→</span></button></div>
        <p className="form-result" role="status">{message}</p>
      </div>
    </div> : null}
  </>;
}
