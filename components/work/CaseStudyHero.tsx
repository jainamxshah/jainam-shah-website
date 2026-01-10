'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/lib/projects';

interface CaseStudyHeroProps {
  project: Project;
}

export default function CaseStudyHero({ project }: CaseStudyHeroProps) {
  return (
    <section className="pt-32 md:pt-40">
      {/* Hero Image - Full width breakout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 mb-12 md:mb-16"
      >
        <div className="relative aspect-[21/9] md:aspect-[16/7] rounded-2xl overflow-hidden bg-foreground/5">
          {/* Placeholder gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, 
                hsl(${(parseInt(project.id) * 60) % 360}, 20%, 80%) 0%, 
                hsl(${(parseInt(project.id) * 60 + 45) % 360}, 25%, 70%) 100%)`,
            }}
          />
          <Image
            src={project.heroImageUrl}
            alt={`${project.name} hero image`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            onError={(e) => {
              e.currentTarget.style.opacity = '0';
            }}
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight"
        >
          {project.name}
        </motion.h1>

        {/* Impact Summary */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl lg:text-2xl text-foreground/70 mt-4 md:mt-6 max-w-3xl"
        >
          {project.impactSummary}
        </motion.p>

        {/* Metadata Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mt-10 md:mt-12 pt-8 border-t border-foreground/10"
        >
          {/* Left - Year & Tags */}
          <div>
            <p className="text-sm text-foreground/50 uppercase tracking-wide mb-3">{project.year}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-foreground/5 text-xs text-foreground uppercase tracking-wide rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Role & Tech */}
          <div className="md:text-right">
            <p className="text-sm text-foreground/50 mb-1">Role</p>
            <p className="text-sm text-foreground">{project.role}</p>
            {project.techStack && (
              <p className="text-xs text-foreground/40 mt-2">{project.techStack.join(' · ')}</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

