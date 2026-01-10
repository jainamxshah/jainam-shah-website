import { Metadata } from 'next';
import WhatIDoContent from './WhatIDoContent';

export const metadata: Metadata = {
  title: 'What I Do | Jainam Shah',
  description:
    'AI-powered product strategy, design, and development. I build digital products that convert, rank, and scale for ambitious companies.',
  openGraph: {
    title: 'What I Do | Jainam Shah',
    description: 'AI-powered product strategy, design, and development.',
    type: 'website',
  },
};

export default function WhatIDoPage() {
  return <WhatIDoContent />;
}
