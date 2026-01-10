import Hero from '@/components/home/Hero';
import SelectedWork from '@/components/home/SelectedWork';
import ValueProposition from '@/components/home/ValueProposition';
import HowIWork from '@/components/home/HowIWork';
import WhyChooseMe from '@/components/home/WhyChooseMe';
import RecentInsights from '@/components/home/RecentInsights';
import Testimonials from '@/components/home/Testimonials';
import TechStack from '@/components/home/TechStack';
import EnhancedCTA from '@/components/home/EnhancedCTA';
import { getAllArticles } from '@/lib/articles';

export default function Home() {
  const articles = getAllArticles();

  return (
    <>
      {/* Section 1: Hero (Light) */}
      <Hero />
      
      {/* Section 2: Selected Work (Dark) */}
      <SelectedWork />
      
      {/* Section 3: Value Proposition (Light) */}
      <ValueProposition />
      
      {/* Section 4: How I Work (Dark) */}
      <HowIWork />
      
      {/* Section 5: Why Choose Me (Light) */}
      <WhyChooseMe />
      
      {/* Section 6: Recent Insights (Dark) */}
      <RecentInsights articles={articles} />
      
      {/* Section 7: Testimonials (Light) */}
      <Testimonials />
      
      {/* Section 8: Tech Stack (Dark) */}
      <TechStack />
      
      {/* Section 9: Enhanced CTA (Light) */}
      <EnhancedCTA />
    </>
  );
}
