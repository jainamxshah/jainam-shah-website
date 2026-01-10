'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { projects, Project } from '@/lib/projects';
import { useCrypticHover } from '@/lib/hooks/useCrypticHover';
import { sectionStagger, cardFadeUp } from '@/lib/animations';

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-foreground">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl md:text-5xl lg:text-6xl mb-16 md:mb-20 text-background"
        >
          Selected Work
        </motion.h2>

        {/* Projects Grid */}
        <motion.div
          variants={sectionStagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 text-center"
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-sans text-base text-background/80 hover:text-accent transition-colors duration-300"
          >
            View All Projects
            <span className="text-lg">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  const { displayText, startAnimation, reverseAnimation } = useCrypticHover({
    originalText: project.name,
    targetText: project.outcomeMetric,
    scrambleDuration: 0.4,
    morphDuration: 0.3,
  });

  const handleMouseEnter = () => {
    setIsHovering(true);
    startAnimation();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    reverseAnimation();
  };

  return (
    <motion.article variants={cardFadeUp} className="group">
      <Link
        href={`/work/${project.slug}`}
        className="block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-background/10">
          {/* Placeholder gradient for missing images */}
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, 
                hsl(${(index * 60) % 360}, 20%, 25%) 0%, 
                hsl(${(index * 60 + 30) % 360}, 25%, 20%) 100%)`,
            }}
          />

          {/* Project Image */}
          <Image
            src={project.thumbnailUrl}
            alt={project.name}
            fill
            className={`object-cover transition-all duration-500 ${
              isHovering ? 'blur-sm opacity-70 scale-105' : 'blur-0 opacity-100 scale-100'
            }`}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={index < 2}
            onError={(e) => {
              e.currentTarget.style.opacity = '0';
            }}
          />

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-background/90"
          >
            <div className="text-center px-6">
              <span
                className="text-xl md:text-2xl lg:text-3xl font-bold text-accent uppercase tracking-wider font-mono"
                aria-label={isHovering ? project.outcomeMetric : project.name}
              >
                {displayText}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Project Meta */}
        <div className="mt-5">
          <h3 className="text-xl md:text-2xl font-medium text-background group-hover:text-accent transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-background/60 mt-1">{project.shortDescription}</p>
        </div>
      </Link>
    </motion.article>
  );
}
