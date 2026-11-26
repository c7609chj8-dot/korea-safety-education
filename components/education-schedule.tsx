'use client';

import { useState, useSyncExternalStore } from 'react';
import { getKoreanDateKey, getScheduleDay } from '../lib/schedule';
import { company } from '../lib/company';

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
const dateKey = (year: number, month: number, day: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

function subscribeToDate(onChange: () => void) {
  const timer = window.setInterval(onChange, 1000);
  window.addEventListener('focus', onChange);
  document.addEventListener('visibilitychange', onChange);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener('focus', onChange);
    document.removeEventListener('visibilitychange', onChange);
  };
}

const getServerDate = () => null;

export function EducationSchedule() {
  // Static HTML must not freeze "today" at deployment time. The server and the
  // first hydration render share a placeholder; the browser then reads Seoul's date.
  const today = useSyncExternalStore(subscribeToDate, getKoreanDateKey, getServerDate);
  if (!today) return <div className="calendar-loading" role="status">한국 시간 기준 교육 달력을 불러오는 중입니다.</div>;
  return <ScheduleCalendar key={today} today={today} />;
}

function ScheduleCalendar({ today }: { today: string }) {
  const [year, month, day] = today.split('-').map(Number);
  const [view, setView] = useState({ year, month: month - 1 });
  const [selected, setSelected] = useState(today);
  const selectedDate = new Date(`${selected}T00:00:00Z`);
  const weekday = selectedDate.getUTCDay();
  const selectedDay = getScheduleDay(selected, today);
  const closed = selectedDay.closed;
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
        <div className="calendar-days" role="group" aria-label={`${view.year}년 ${view.month + 1}월 교육 운영 안내`}>
          {Array.from({ length: start }, (_, i) => <span key={`empty-${i}`} className="empty-day" />)}
          {Array.from({ length: days }, (_, i) => {
            const number = i + 1;
            const key = dateKey(view.year, view.month, number);
            const scheduleDay = getScheduleDay(key, today);
            const unavailable = scheduleDay.closed;
            const status = scheduleDay.label;
            return <button type="button" key={key} className={`calendar-day ${selected === key ? 'selected' : ''} ${unavailable ? 'unavailable' : ''}`} aria-pressed={selected === key} aria-label={`${view.month + 1}월 ${number}일 ${status}`} onClick={() => chooseDate(key)}>
              <span className="day-number">{number}{key === today ? <i className="today-dot" aria-label="오늘" /> : null}</span>
              <span className="day-status">{status}</span>
            </button>;
          })}
        </div>
        <p className="calendar-footnote"><span className="legend-dot" />일요일·법정공휴일은 휴무입니다.<span>운영 여부·임시공휴일은 전화 확인</span></p>
      </div>
      <aside className="date-detail" aria-labelledby="selected-date">
        <span className="eyebrow">선택한 날짜의 운영 안내</span>
        <h3 id="selected-date" aria-live="polite">{selectedLabel}</h3>
        <span className={`status-tag ${closed ? 'muted-tag' : ''}`}>{selectedDay.label}</span>
        <p className="schedule-day-note">{selectedDay.reason}</p>
        <dl className="date-specs">
          <div><dt>교육 과정</dt><dd>건설업 기초안전보건교육</dd></div>
          <div><dt>교육 시간</dt><dd>{selected < today ? '지난 일정' : selectedDay.label === '확인 필요' ? '전화 확인' : closed ? '휴무' : time}</dd></div>
          {!closed ? <div><dt>접수 안내</dt><dd>{weekday === 6 ? '사전 예약 필수' : '12:40까지 접수'}</dd></div> : null}
          <div><dt>교육비</dt><dd>80,000원</dd></div>
          <div><dt>준비물</dt><dd>신분증</dd></div>
        </dl>
        <a className="button button-dark full-width" href={company.phoneHref}>{closed && selectedDay.label !== '확인 필요' ? '다른 교육일 전화 문의' : weekday === 6 ? '토요일 교육 전화 예약' : '교육일·접수 가능 여부 전화 확인'}<span aria-hidden="true">↗</span></a>
        <p className="schedule-contact-number">접수 문의 <a href={company.phoneHref}>{company.phone}</a></p>
        <p className="schedule-caption">달력은 요일별 운영 기준을 안내합니다. 날짜 선택만으로 접수되지 않으며, 실제 개강·휴강 및 접수 가능 인원은 전화로 확인해 주세요.</p>
      </aside>
    </div>
  </>;
}
