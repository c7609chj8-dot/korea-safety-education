import type { MetadataRoute } from 'next';
import { isPublicProduction, siteUrl } from '../lib/seo';
import { galleryPhotos } from '../lib/education-photos';
import { educationInfo } from '../lib/education-info';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isPublicProduction) return [];
  return [
    { url: `${siteUrl}/`, images: galleryPhotos.map(photo => `${siteUrl}/images/center/${photo.file}`) },
    { url: `${siteUrl}/education-guide`, images: [`${siteUrl}${educationInfo.registrationImage}`] },
    { url: `${siteUrl}/materials` },
  ];
}
