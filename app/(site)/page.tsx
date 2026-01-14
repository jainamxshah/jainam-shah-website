import Hero from '@/components/home/Hero';
import HowIShowUp from '@/components/home/HowIShowUp';
import ProofStrip from '@/components/home/ProofStrip';
import DomainMastery from '@/components/home/DomainMastery';
import FlagshipStory from '@/components/home/FlagshipStory';
import Philosophy from '@/components/home/Philosophy';
import CallToAction from '@/components/home/CallToAction';

export default function Home() {
  return (
    <>
      {/* Section 1: Hero – Identity + Mission + Trust (Light) */}
      <Hero />

      {/* Section 2: How I Show Up – Operating Principles (Light) */}
      <ProofStrip />

      {/* Section 3: Proof Strip – Where I've Done This (Dark) */}
      <HowIShowUp />

      {/* Section 4: Domain Mastery – Where I Operate (Light) */}
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
