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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jainamshah.studio';

  const workSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${siteUrl}/work/${project.slug}/#webpage`,
    url: `${siteUrl}/work/${project.slug}`,
    name: project.name,
    description: project.impactSummary || project.shortDescription,
    image: project.heroImageUrl ? `${siteUrl}${project.heroImageUrl}` : undefined,
    creator: {
      '@type': 'Person',
      name: 'Jainam Shah',
      url: siteUrl,
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
    },
    temporalCoverage: project.year,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(workSchema),
        }}
      />
      <CaseStudyContent project={project} />
    </>
  );
}
