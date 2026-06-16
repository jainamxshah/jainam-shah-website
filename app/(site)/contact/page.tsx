import { Metadata } from 'next';
import ContactContent from './ContactContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jainamshah.studio';

export const metadata: Metadata = {
  title: 'Start a Project – Jainam Shah',
  description:
    "Let's build something that wins. Get in touch to discuss your product.",
  openGraph: {
    title: 'Start a Project – Jainam Shah',
    description: "Let's build something that wins. Get in touch to discuss your product.",
    type: 'website',
  },
};

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${siteUrl}/contact/#webpage`,
    url: `${siteUrl}/contact`,
    name: 'Start a Project – Jainam Shah',
    description: "Let's build something that wins. Get in touch to discuss your product.",
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
    },
    mainEntity: {
      '@type': 'Person',
      name: 'Jainam Shah',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema),
        }}
      />
      <ContactContent />
    </>
  );
}
