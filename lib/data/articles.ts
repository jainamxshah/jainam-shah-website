import prisma from '@/lib/db/prisma';
import { articles as staticArticles, type Article } from '@/lib/articles';

// Use database when available, fallback to static data
const USE_DATABASE = true;

export async function getAllArticles(): Promise<Article[]> {
  if (USE_DATABASE) {
    try {
      const dbArticles = await prisma.article.findMany({
        where: { published: true },
        orderBy: { publishedAt: 'desc' },
      });

      return dbArticles.map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        category: a.category,
        date: a.publishedAt?.toISOString().split('T')[0] || a.createdAt.toISOString().split('T')[0],
        readTime: a.readTime,
        featuredImage: a.featuredImage || undefined,
        content: a.content,
        author: 'Jainam Shah',
        seo: {
          metaTitle: a.seoTitle,
          metaDescription: a.seoDescription,
          ogImage: a.seoOgImage || undefined,
        },
      }));
    } catch (error) {
      console.error('Error fetching articles from database:', error);
      return staticArticles.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  }

  return staticArticles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  if (USE_DATABASE) {
    try {
      const a = await prisma.article.findUnique({
        where: { slug, published: true },
      });

      if (!a) return undefined;

      return {
        id: a.id,
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        category: a.category,
        date: a.publishedAt?.toISOString().split('T')[0] || a.createdAt.toISOString().split('T')[0],
        readTime: a.readTime,
        featuredImage: a.featuredImage || undefined,
        content: a.content,
        author: 'Jainam Shah',
        seo: {
          metaTitle: a.seoTitle,
          metaDescription: a.seoDescription,
          ogImage: a.seoOgImage || undefined,
        },
      };
    } catch (error) {
      console.error('Error fetching article from database:', error);
      return staticArticles.find((a) => a.slug === slug);
    }
  }

  return staticArticles.find((a) => a.slug === slug);
}

export async function getArticleSlugs(): Promise<string[]> {
  if (USE_DATABASE) {
    try {
      const articles = await prisma.article.findMany({
        where: { published: true },
        select: { slug: true },
      });
      return articles.map((a) => a.slug);
    } catch (error) {
      console.error('Error fetching article slugs from database:', error);
      return staticArticles.map((a) => a.slug);
    }
  }

  return staticArticles.map((a) => a.slug);
}

