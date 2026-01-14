import type { Metadata, Viewport } from 'next';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';
import LenisProvider from '@/components/providers/LenisProvider';
import '@/styles/globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jainamshah.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jainam Shah | AI Products Built To Win',
    template: '%s | Jainam Shah',
  },
  description:
    'I build AI-powered digital products that convert, rank, and scale for ambitious companies. Strategy, execution, and growth that compounds.',
  keywords: [
    'AI Engineer',
    'Full Stack Developer',
    'Product Strategy',
    'SEO',
    'Next.js',
    'Machine Learning',
    'Product Development',
  ],
  authors: [{ name: 'Jainam Shah' }],
  creator: 'Jainam Shah',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Jainam Shah',
    title: 'Jainam Shah | AI Products Built To Win',
    description: 'AI-powered products engineered for serious companies.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jainam Shah - AI-Powered Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jainam Shah | AI Products Built To Win',
    description: 'AI-powered products engineered for serious companies.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f0f0f0',
};

// JSON-LD Schema for Person
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jainam Shah',
  jobTitle: 'AI Engineer & Full Stack Developer',
  description: 'Building AI-powered products that win',
  url: siteUrl,
  sameAs: [
    'https://linkedin.com/in/jainam-shah-aiml-ahmedabad',
    'https://github.com/jainamxshah',
    'https://twitter.com/jainamxshahh',
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Product Development',
    'SEO',
    'Full Stack Development',
    'Machine Learning',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to font services */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Using Playfair Display as Kalice substitute and Inter as Neue Montreal substitute */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="bg-background text-foreground font-neue antialiased">
        <LenisProvider>
          {children}
        </LenisProvider>
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  );
}
