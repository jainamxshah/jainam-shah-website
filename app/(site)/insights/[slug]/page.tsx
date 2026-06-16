import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticleSlugs } from '@/lib/articles';
import ArticleContent from '@/components/insights/ArticleContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | Jainam Shah',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: article.seo.metaTitle || `${article.title} | Jainam Shah`,
    description: article.seo.metaDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.seo.ogImage ? [article.seo.ogImage] : article.featuredImage ? [article.featuredImage] : [],
      type: 'article',
      publishedTime: article.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.seo.ogImage ? [article.seo.ogImage] : article.featuredImage ? [article.featuredImage] : [],
    },
  };
}

export function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jainamshah.studio';

  const blogPostSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${siteUrl}/insights/${article.slug}/#webpage`,
    url: `${siteUrl}/insights/${article.slug}`,
    headline: article.title,
    description: article.excerpt || article.seo.metaDescription,
    image: article.featuredImage ? `${siteUrl}${article.featuredImage}` : `${siteUrl}/og-image.jpg`,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: article.author || 'Jainam Shah',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Jainam Shah',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/insights/${article.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostSchema),
        }}
      />
      <ArticleContent article={article} />;
    </>
  );
}

