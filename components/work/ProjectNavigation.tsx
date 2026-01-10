'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project, getProjectBySlug } from '@/lib/projects';

interface ProjectNavigationProps {
  currentProject: Project;
}

export default function ProjectNavigation({ currentProject }: ProjectNavigationProps) {
  const prevProject = currentProject.prevProjectSlug
    ? getProjectBySlug(currentProject.prevProjectSlug)
    : null;
  const nextProject = currentProject.nextProjectSlug
    ? getProjectBySlug(currentProject.nextProjectSlug)
    : null;

  return (
    <nav className="mt-24 md:mt-32 pt-12 border-t border-foreground/10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Previous Project */}
        <div className="w-full md:w-auto">
          {prevProject ? (
            <Link href={`/work/${prevProject.slug}`} className="group block">
              <span className="text-xs text-foreground/50 uppercase tracking-wide mb-1 block">
                ← Previous
              </span>
              <motion.span
                className="text-lg md:text-xl text-foreground group-hover:text-accent transition-colors inline-block"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
              >
                {prevProject.name}
              </motion.span>
            </Link>
          ) : (
            <div className="opacity-30">
              <span className="text-xs text-foreground/50 uppercase tracking-wide mb-1 block">
                ← Previous
              </span>
              <span className="text-lg md:text-xl text-foreground">—</span>
            </div>
          )}
        </div>

        {/* Back to Work */}
        <Link
          href="/work"
          className="text-sm text-foreground/60 hover:text-foreground transition-colors underline-offset-4 hover:underline order-last md:order-none"
        >
          View All Work
        </Link>

        {/* Next Project */}
        <div className="w-full md:w-auto md:text-right">
          {nextProject ? (
            <Link href={`/work/${nextProject.slug}`} className="group block">
              <span className="text-xs text-foreground/50 uppercase tracking-wide mb-1 block">
                Next →
              </span>
              <motion.span
                className="text-lg md:text-xl text-foreground group-hover:text-accent transition-colors inline-block"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {nextProject.name}
              </motion.span>
            </Link>
          ) : (
            <div className="opacity-30">
              <span className="text-xs text-foreground/50 uppercase tracking-wide mb-1 block">
                Next →
              </span>
              <span className="text-lg md:text-xl text-foreground">—</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

