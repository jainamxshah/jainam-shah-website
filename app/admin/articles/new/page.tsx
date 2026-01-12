import { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import ArticleForm from '@/components/admin/ArticleForm';

export const metadata: Metadata = {
  title: 'New Article | Admin',
};

export default function NewArticlePage() {
  return (
    <AdminLayout title="New Article">
      <ArticleForm />
    </AdminLayout>
  );
}


