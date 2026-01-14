import { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import ProjectForm from '@/components/admin/ProjectForm';

export const metadata: Metadata = {
  title: 'New Project | Admin',
};

export default function NewProjectPage() {
  return (
    <AdminLayout title="New Project">
      <ProjectForm />
    </AdminLayout>
  );
}



