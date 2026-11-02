import type { Metadata } from 'next';
import { company } from './company';

function resolveSiteUrl(value: string) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new Error('SITE_URL must be a root HTTPS origin without credentials, a path, query, or fragment.');
  }
  return url.origin;
}

export const siteUrl = resolveSiteUrl(process.env.SITE_URL || 'https://korea-safety-education.vercel.app');
export const isPublicProduction = process.env.VERCEL_ENV === 'production';
export const siteTitle = '양산안전교육 · 건설업 기초안전보건교육 | 한국안전교육';
export const siteDescription = '양산 한국안전교육의 건설업 기초안전보건교육 안내. 평일 13~17시, 토요일 오전 예약제, 교육비·신분증·오시는 길을 확인하세요. 경남 양산시 북정서길 22, 201호. 문의 055-389-0302.';
export const shareImage = '/images/safety/01-safety-education-hero.png';

export function pageMetadata({ title, description, path, searchable = true }: { title: string; description: string; path: string; searchable?: boolean }): Metadata {
  const index = isPublicProduction && searchable;
  const url = new URL(path, siteUrl).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index, follow: isPublicProduction, googleBot: { index, follow: isPublicProduction, 'max-image-preview': 'large' } },
    openGraph: {
      title, description, url, siteName: '한국안전교육', type: 'website', locale: 'ko_KR',
      images: [{ url: new URL(shareImage, siteUrl).toString(), width: 1536, height: 1024, alt: '한국안전교육 안전모·보안경·장갑 교육용 생성 이미지' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [new URL(shareImage, siteUrl).toString()] },
  };
}

export function organizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'EducationalOrganization'],
        '@id': `${siteUrl}/#organization`,
        name: '한국안전교육',
        legalName: company.legalName,
        url: siteUrl,
        description: '경상남도 양산시의 건설업 기초안전보건교육 안내 기관',
        telephone: `+82-${company.phone.replace(/^0/, '')}`,
        faxNumber: `+82-${company.fax.replace(/^0/, '')}`,
        taxID: company.businessNumber,
        image: new URL(shareImage, siteUrl).toString(),
        address: {
          '@type': 'PostalAddress',
          streetAddress: '북정서길 22, 201호(북정동, 새롬성원네오파트 상가)',
          addressLocality: '양산시',
          addressRegion: '경상남도',
          addressCountry: 'KR',
        },
      },
      { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: '한국안전교육', inLanguage: 'ko-KR', publisher: { '@id': `${siteUrl}/#organization` } },
    ],
  };
}
