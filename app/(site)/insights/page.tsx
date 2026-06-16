import { Metadata } from 'next';
import { getAllArticles } from '@/lib/articles';
import InsightsContent from './InsightsContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jainamshah.studio';

export const metadata: Metadata = {
  title: 'Insights – Jainam Shah',
  description:
    'Essays and frameworks on AI, product strategy, and building software that scales.',
  openGraph: {
    title: 'Insights – Jainam Shah',
    description: 'Essays and frameworks on AI, product strategy, and building software that scales.',
    type: 'website',
  },
};

export default function InsightsPage() {
  const articles = getAllArticles();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${siteUrl}/insights/#webpage`,
    url: `${siteUrl}/insights`,
    name: 'Insights – Jainam Shah',
    description: 'Essays and frameworks on AI, product strategy, and building software that scales.',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
    },
    publisher: {
      '@type': 'Person',
      name: 'Jainam Shah',
      url: siteUrl,
    },
    blogPost: articles.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      datePublished: article.date,
      url: `${siteUrl}/insights/${article.slug}`,
      author: {
        '@type': 'Person',
        name: article.author || 'Jainam Shah',
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />
      <InsightsContent articles={articles} />
    </>
  );
}
