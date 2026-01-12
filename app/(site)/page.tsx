import Hero from '@/components/home/Hero';
import HowIShowUp from '@/components/home/HowIShowUp';
import ProofStrip from '@/components/home/ProofStrip';
import DomainMastery from '@/components/home/DomainMastery';
import FlagshipStory from '@/components/home/FlagshipStory';
import SelectedWorkGallery from '@/components/home/SelectedWorkGallery';
import Philosophy from '@/components/home/Philosophy';
import CallToAction from '@/components/home/CallToAction';
import { getAllProjects } from '@/lib/projects';

export default function Home() {
  const projects = getAllProjects();

  return (
    <>
      {/* Section 1: Hero – Identity + Mission + Trust (Light) */}
      <Hero />
      
      {/* Section 2: How I Show Up – Operating Principles (Light) */}
      <HowIShowUp />
      
      {/* Section 3: Proof Strip – Where I've Done This (Dark) */}
      <ProofStrip />
      
      {/* Section 4: Domain Mastery – Where I Operate (Light) */}
      <DomainMastery />
      
      {/* Section 5: Flagship Story – Deep Proof (Dark) */}
      <FlagshipStory />
      
      {/* Section 6: Selected Work – Gallery (Light) */}
      <SelectedWorkGallery projects={projects} />
      
      {/* Section 7: Philosophy – Why I Do This (Dark) */}
      <Philosophy />
      
      {/* Section 8: Call to Action (Light) */}
      <CallToAction />
      
      {/* Section 9: Footer (Dark) - Rendered by layout */}
    </>
  );
}
