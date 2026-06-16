import { Metadata } from 'next';
import WhatIDoContent from './WhatIDoContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jainamshah.studio';

export const metadata: Metadata = {
  title: 'What I Do – Jainam Shah',
  description:
    'I partner with founders and teams to build AI-powered products that win markets through strategy, systems, and growth.',
  openGraph: {
    title: 'What I Do – Jainam Shah',
    description: 'I partner with founders and teams to build AI-powered products that win markets.',
    type: 'website',
  },
};

export default function WhatIDoPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${siteUrl}/what-i-do/#webpage`,
    url: `${siteUrl}/what-i-do`,
    name: 'What I Do – Jainam Shah',
    description:
      'I partner with founders and teams to build AI-powered products that win markets through strategy, systems, and growth.',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
    },
    mainEntity: {
      '@type': 'Person',
      name: 'Jainam Shah',
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'AI Product Development & Strategy',
    provider: {
      '@type': 'Person',
      name: 'Jainam Shah',
      url: siteUrl,
    },
    description:
      'AI product architecture, full-stack development, and growth/SEO strategies designed to build high-performance digital products.',
    areaServed: 'Worldwide',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([aboutSchema, serviceSchema]),
        }}
      />
      <WhatIDoContent />
    </>
  );
}
