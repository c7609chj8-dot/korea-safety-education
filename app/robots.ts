import type { MetadataRoute } from 'next';
import { isPublicProduction, siteUrl } from '../lib/seo';

export default function robots(): MetadataRoute.Robots {
  if (!isPublicProduction) return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteUrl}/sitemap.xml` };
}
