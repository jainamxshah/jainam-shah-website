'use client';

import { motion } from 'framer-motion';
import { Project } from '@/lib/projects';
import ProjectGrid from '@/components/work/ProjectGrid';
import WorkPhilosophy from '@/components/work/WorkPhilosophy';
import ByTheNumbers from '@/components/work/ByTheNumbers';
import Industries from '@/components/work/Industries';
import Approach from '@/components/work/Approach';

interface WorkPageContentProps {
  projects: Project[];
}

export default function WorkPageContent({ projects }: WorkPageContentProps) {
  return (
    <>
      {/* Section 1: Page Intro (Light) */}
      <div className="bg-background pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <header>
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground"
            >
              Selected Work
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-lg md:text-xl text-foreground/70 mt-6 max-w-xl"
            >
              Products designed to win in the real world.
            </motion.p>
          </header>
        </div>
      </div>

      {/* Section 2: Work Philosophy (Dark) */}
      <WorkPhilosophy />

      {/* Section 3: Project Grid (Light) */}
      <div className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <ProjectGrid projects={projects} />
        </div>
      </div>

      {/* Section 4: By The Numbers (Light - continuous with grid) */}
      <ByTheNumbers />

      {/* Section 5: Industries (Dark) */}
      <Industries />

      {/* Section 6: Approach (Light) */}
      <Approach />
    </>
  );
}
