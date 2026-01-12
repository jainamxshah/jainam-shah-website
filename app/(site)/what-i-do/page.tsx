import { Metadata } from 'next';
import WhatIDoContent from './WhatIDoContent';

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
  return <WhatIDoContent />;
}
