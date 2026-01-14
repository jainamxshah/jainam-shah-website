import { Metadata } from 'next';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import Button from '@/components/admin/ui/Button';
import ProjectsTable from './ProjectsTable';

export const metadata: Metadata = {
  title: 'Projects | Admin',
};

export default function ProjectsPage() {
  return (
    <AdminLayout
      title="Projects"
      actions={
        <Link href="/admin/projects/new">
          <Button>
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Project
          </Button>
        </Link>
      }
    >
      <ProjectsTable />
    </AdminLayout>
  );
}



