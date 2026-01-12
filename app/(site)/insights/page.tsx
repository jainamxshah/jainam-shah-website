import { Metadata } from 'next';
import { getAllArticles } from '@/lib/articles';
import InsightsContent from './InsightsContent';

export const metadata: Metadata = {
  title: 'Insights – Jainam Shah',
  description:
    'Essays and frameworks on AI, product strategy, and building software that scales.',
  openGraph: {
    title: 'Insights – Jainam Shah',
    description: 'Essays and frameworks on AI, product strategy, and building software that scales.',
    type: 'website',
  },
};

export default function InsightsPage() {
  const articles = getAllArticles();
  return <InsightsContent articles={articles} />;
}
