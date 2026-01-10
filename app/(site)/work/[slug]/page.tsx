import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects';
import CaseStudyContent from './CaseStudyContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Jainam Shah',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.name} | Jainam Shah`,
    description: project.impactSummary,
    openGraph: {
      title: `${project.name} - Jainam Shah`,
      description: project.impactSummary,
      images: [project.heroImageUrl],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} - Jainam Shah`,
      description: project.impactSummary,
      images: [project.heroImageUrl],
    },
  };
}

export function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyContent project={project} />;
}
