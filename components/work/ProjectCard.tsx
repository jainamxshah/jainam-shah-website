'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/lib/projects';
import { useCrypticHover } from '@/lib/hooks/useCrypticHover';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
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
    <motion.article
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <Link
        href={`/work/${project.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 rounded-xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image Container */}
        <motion.div
          className="relative aspect-[16/10] rounded-xl overflow-hidden bg-foreground/5"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Placeholder gradient for missing images */}
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, 
                hsl(${(index * 60) % 360}, 20%, 85%) 0%, 
                hsl(${(index * 60 + 30) % 360}, 25%, 75%) 100%)`,
            }}
          />

          {/* Project Image */}
          <Image
            src={project.thumbnailUrl}
            alt={project.name}
            fill
            className={`object-cover transition-all duration-500 ${
              isHovering ? 'blur-sm opacity-60 scale-105' : 'blur-0 opacity-100 scale-100'
            }`}
            sizes="(max-width: 768px) 100vw, 50vw"
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
            className="absolute inset-0 flex items-center justify-center bg-foreground/85"
          >
            <div className="text-center px-6">
              <motion.span
                initial={{ scale: 1 }}
                animate={{ scale: isHovering ? [1, 1.02, 1] : 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="block text-xl md:text-2xl lg:text-3xl font-bold text-accent uppercase tracking-wider font-mono"
                aria-label={isHovering ? project.outcomeMetric : project.name}
              >
                {displayText}
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* Metadata Section */}
        <div className="mt-6">
          <h3 className="text-xl md:text-2xl font-medium text-foreground group-hover:text-foreground/80 transition-colors">
            {project.name}
          </h3>
          <p className="text-sm md:text-base text-foreground/70 mt-2 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
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
      </Link>
    </motion.article>
  );
}

