import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '한국안전교육 | 양산 건설업 기초안전보건교육',
  description: '양산 한국안전교육의 건설업 기초안전보건교육 안내. 교육시간, 준비물, 교육비와 오시는 길을 확인하세요.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
