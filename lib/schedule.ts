// Upcoming holidays checked on 2026-11-26 against KASI calendar data and KASA's
// 2027 almanac announcement. Recheck annually and when temporary holidays are declared.
// https://astro.kasi.re.kr/kor/life/post/calendarData?year=2027
// https://m.korea.kr/briefing/pressReleaseView.do?newsId=156768474
const holidays: Record<string, string> = {
  '2026-12-25': '성탄절',
  '2027-01-01': '신정',
  '2027-02-06': '설 연휴',
  '2027-02-07': '설날',
  '2027-02-08': '설 연휴',
  '2027-02-09': '설 대체공휴일',
  '2027-03-01': '삼일절',
  '2027-05-01': '노동절',
  '2027-05-03': '노동절 대체공휴일',
  '2027-05-05': '어린이날',
  '2027-05-13': '부처님오신날',
  '2027-06-06': '현충일',
  '2027-07-17': '제헌절',
  '2027-07-19': '제헌절 대체공휴일',
  '2027-08-15': '광복절',
  '2027-08-16': '광복절 대체공휴일',
  '2027-09-14': '추석 연휴',
  '2027-09-15': '추석',
  '2027-09-16': '추석 연휴',
  '2027-10-03': '개천절',
  '2027-10-04': '개천절 대체공휴일',
  '2027-10-09': '한글날',
  '2027-10-11': '한글날 대체공휴일',
  '2027-12-25': '성탄절',
  '2027-12-27': '성탄절 대체공휴일',
};

const koreanDateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
});

export function getKoreanDateKey(now = new Date()): string {
  const parts = koreanDateFormatter.formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find(part => part.type === type)!.value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

export function getScheduleDay(date: string, today: string) {
  const weekday = new Date(`${date}T00:00:00Z`).getUTCDay();
  if (date < today) return { label: '지난 날짜', closed: true, reason: '지난 날짜입니다.' };
  if (holidays[date]) return { label: '공휴일 휴무', closed: true, reason: `${holidays[date]} · 휴무` };
  if (weekday === 0) return { label: '휴무', closed: true, reason: '일요일 휴무' };
  if (date < '2026-11-26' || date > '2027-12-31') {
    return { label: '확인 필요', closed: true, reason: '공휴일과 운영 일정 확인이 필요한 날짜입니다. 전화로 문의해 주세요.' };
  }
  return { label: weekday === 6 ? '예약제' : '평일 예시', closed: false, reason: weekday === 6 ? '토요일 사전 예약제' : '평일 접수 12:40까지' };
}
