import { Metadata } from 'next';
import { getAllProjects } from '@/lib/projects';
import WorkPageContent from './WorkPageContent';

export const metadata: Metadata = {
  title: 'Work | Jainam Shah',
  description: 'Selected projects showcasing AI-powered products built for scale and real-world impact.',
  openGraph: {
    title: 'Work | Jainam Shah',
    description: 'Selected projects showcasing AI-powered products built for scale.',
    type: 'website',
  },
};

export default function WorkPage() {
  const projects = getAllProjects();

  return <WorkPageContent projects={projects} />;
}
