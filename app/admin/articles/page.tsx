import { Metadata } from 'next';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import Button from '@/components/admin/ui/Button';
import ArticlesTable from './ArticlesTable';

export const metadata: Metadata = {
  title: 'Articles | Admin',
};

export default function ArticlesPage() {
  return (
    <AdminLayout
      title="Articles"
      actions={
        <Link href="/admin/articles/new">
          <Button>
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Article
          </Button>
        </Link>
      }
    >
      <ArticlesTable />
    </AdminLayout>
  );
}

