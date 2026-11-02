import type { MetadataRoute } from 'next';
import { isPublicProduction, siteUrl } from '../lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isPublicProduction) return [];
  return [{ url: `${siteUrl}/` }, { url: `${siteUrl}/education-guide` }];
}
