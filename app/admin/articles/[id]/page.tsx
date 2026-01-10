import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import ArticleForm from '@/components/admin/ArticleForm';
import { articles } from '@/lib/articles';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);

  return {
    title: article ? `Edit ${article.title} | Admin` : 'Edit Article | Admin',
  };
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  return (
    <AdminLayout title={`Edit: ${article.title}`}>
      <ArticleForm article={article} />
    </AdminLayout>
  );
}

