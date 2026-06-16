import { Metadata } from 'next';
import { getAllProjects } from '@/lib/projects';
import WorkPageContent from './WorkPageContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jainamshah.studio';

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

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${siteUrl}/work/#webpage`,
    url: `${siteUrl}/work`,
    name: 'Work | Jainam Shah',
    description: 'Selected projects showcasing AI-powered products built for scale and real-world impact.',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
    },
    about: {
      '@type': 'Person',
      name: 'Jainam Shah',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/work/${project.slug}`,
        name: project.name,
        description: project.shortDescription,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />
      <WorkPageContent projects={projects} />
    </>
  );
}
