import { Metadata } from 'next';
import { getAllArticles } from '@/lib/articles';
import InsightsContent from './InsightsContent';

export const metadata: Metadata = {
  title: 'Insights | Jainam Shah',
  description:
    'Thoughts on AI, product development, and growth strategy from an engineer building products that win.',
  openGraph: {
    title: 'Insights | Jainam Shah',
    description: 'Thoughts on AI, product development, and growth strategy.',
    type: 'website',
  },
};

export default function InsightsPage() {
  const articles = getAllArticles();
  return <InsightsContent articles={articles} />;
}
