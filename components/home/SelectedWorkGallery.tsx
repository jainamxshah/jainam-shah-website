'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/projects';

interface SelectedWorkGalleryProps {
  projects: Project[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function SelectedWorkGallery({ projects }: SelectedWorkGalleryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="bg-background py-24 md:py-32" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-2xl md:text-3xl lg:text-[36px] text-foreground mb-10 md:mb-12"
        >
          Selected Work
        </motion.h2>

        {/* Project Cards - Vertical Stack */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-12 md:gap-16"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
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
  const cardRef = useRef(null);

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      className="group"
    >
      <Link href={`/work/${project.slug}`} className="block">
        <div className="bg-white border border-foreground/8 rounded-2xl p-6 md:p-10 lg:p-12 hover:shadow-xl transition-shadow duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Visual */}
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-foreground/5">
              {/* Gradient placeholder */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, 
                    hsl(${(index * 60) % 360}, 15%, 88%) 0%, 
                    hsl(${(index * 60 + 30) % 360}, 20%, 85%) 100%)`,
                }}
              />

              {/* Project Image */}
              <Image
                src={project.thumbnailUrl}
                alt={project.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}
              />
            </div>

            {/* Right Side - Meta */}
            <div className="flex flex-col">
              {/* Project Name */}
              <h3 className="font-kalice text-xl md:text-2xl lg:text-[28px] text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                {project.name}
              </h3>

              {/* One-line Outcome */}
              <p className="font-neue text-sm md:text-base text-foreground/75 mb-4">
                {project.shortDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-foreground/8 rounded-full text-[10px] font-neue uppercase tracking-wider text-foreground/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* View Case Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto"
              >
                <span className="inline-flex items-center gap-2 px-6 py-2.5 border border-foreground text-foreground rounded-lg font-neue text-xs font-medium group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                  View Case
                  <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

