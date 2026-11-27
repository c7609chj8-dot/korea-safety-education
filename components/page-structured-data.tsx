import { siteUrl } from '../lib/seo';

export function PageStructuredData({ title, path, description, collection = false }: { title: string; path: string; description: string; collection?: boolean }) {
  const url = new URL(path, siteUrl).toString();
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': collection ? 'CollectionPage' : 'WebPage', '@id': `${url}#webpage`, url, name: title, description, inLanguage: 'ko-KR', isPartOf: { '@id': `${siteUrl}/#website` }, about: { '@id': `${siteUrl}/#organization` }, breadcrumb: { '@id': `${url}#breadcrumb` } },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
        { '@type': 'ListItem', position: 1, name: '한국안전교육', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: title, item: url },
      ] },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
