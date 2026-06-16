import Hero from '@/components/home/Hero';
import HowIShowUp from '@/components/home/HowIShowUp';
import ProofStrip from '@/components/home/ProofStrip';
import DomainMastery from '@/components/home/DomainMastery';
import FlagshipStory from '@/components/home/FlagshipStory';
import Philosophy from '@/components/home/Philosophy';
import CallToAction from '@/components/home/CallToAction';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jainamshah.studio';

export default function Home() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Jainam Shah',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/insights?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}/#webpage`,
    url: siteUrl,
    name: 'Jainam Shah | AI Products Built To Win',
    description:
      'I build AI-powered digital products that convert, rank, and scale for ambitious companies. Strategy, execution, and growth that compounds.',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
    },
    about: {
      '@type': 'Person',
      name: 'Jainam Shah',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([websiteSchema, webpageSchema]),
        }}
      />
      {/* Section 1: Hero – Identity + Mission + Trust (Light) */}
      <Hero />

      {/* Section 2: Proof Strip – Where I've Done This (Dark) */}
      <ProofStrip />

      {/* Section 3: How I Show Up – Operating Principles (Light) */}
      <HowIShowUp />

      {/* Section 4: Domain Mastery – Where I Operate (Dark) */}
      <DomainMastery />

      {/* Section 5: Flagship Story – Deep Proof (Dark) */}
      <FlagshipStory />

      {/* Section 6: Philosophy – Why I Do This (Dark) */}
      <Philosophy />

      {/* Section 7: Call to Action (Light) */}
      <CallToAction />

      {/* Section 8: Footer (Dark) - Rendered by layout */}
    </>
  );
}
