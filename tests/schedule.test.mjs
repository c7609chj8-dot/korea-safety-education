import assert from 'node:assert/strict';
import test from 'node:test';
import { getKoreanDateKey, getScheduleDay } from '../lib/schedule.ts';

test('Seoul date crosses midnight independently of UTC, including month/year/leap-day boundaries', () => {
  for (const [instant, expected] of [
    ['2026-11-26T14:59:59Z', '2026-11-26'],
    ['2026-11-26T15:00:00Z', '2026-11-27'],
    ['2026-11-30T15:00:00Z', '2026-12-01'],
    ['2026-12-31T15:00:00Z', '2027-01-01'],
    ['2028-02-28T15:00:00Z', '2028-02-29'],
    ['2028-02-29T15:00:00Z', '2028-03-01'],
  ]) assert.equal(getKoreanDateKey(new Date(instant)), expected);
});

test('past dates, Sundays and public holidays cannot offer a schedule preview', () => {
  const today = '2026-11-26';
  assert.equal(getScheduleDay('2026-11-03', today).label, '지난 날짜');
  assert.equal(getScheduleDay('2026-11-25', today).closed, true);
  assert.equal(getScheduleDay('2026-11-29', today).reason, '일요일 휴무');
  assert.equal(getScheduleDay('2026-12-25', today).reason, '성탄절 · 휴무');
  assert.equal(getScheduleDay('2027-02-09', today).closed, true);
  assert.equal(getScheduleDay('2027-05-03', today).closed, true);
  assert.equal(getScheduleDay('2027-07-19', today).closed, true);
  assert.equal(getScheduleDay('2027-10-11', today).closed, true);
  assert.equal(getScheduleDay('2027-12-27', today).closed, true);
});

test('weekday cutoff and Saturday reservation rules remain distinct', () => {
  assert.equal(getScheduleDay('2026-11-26', '2026-11-26').reason, '평일 접수 12:40까지');
  assert.equal(getScheduleDay('2026-11-28', '2026-11-26').reason, '토요일 사전 예약제');
  assert.equal(getScheduleDay('2027-12-25', '2026-11-26').label, '공휴일 휴무');
});

test('dates beyond the verified holiday range require confirmation instead of implying availability', () => {
  assert.equal(getScheduleDay('2028-01-03', '2026-11-26').label, '확인 필요');
  assert.equal(getScheduleDay('2028-01-03', '2026-11-26').closed, true);
});
