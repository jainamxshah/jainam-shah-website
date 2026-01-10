import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import ProjectForm from '@/components/admin/ProjectForm';
import { projects } from '@/lib/projects';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  return {
    title: project ? `Edit ${project.name} | Admin` : 'Edit Project | Admin',
  };
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <AdminLayout title={`Edit: ${project.name}`}>
      <ProjectForm project={project} />
    </AdminLayout>
  );
}

