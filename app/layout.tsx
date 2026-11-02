import type { Metadata } from 'next';
import { isPublicProduction, pageMetadata, siteDescription, siteTitle, siteUrl } from '../lib/seo';
import './globals.css';

export const metadata: Metadata = {
  ...pageMetadata({ title: siteTitle, description: siteDescription, path: '/' }),
  metadataBase: new URL(siteUrl),
  applicationName: '한국안전교육',
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined },
  robots: { index: isPublicProduction, follow: isPublicProduction },
  referrer: 'no-referrer',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
