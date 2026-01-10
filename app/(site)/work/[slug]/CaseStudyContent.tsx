'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Project } from '@/lib/projects';
import CaseStudyHero from '@/components/work/CaseStudyHero';
import CaseStudySection from '@/components/work/CaseStudySection';
import MetricCard from '@/components/work/MetricCard';
import ProjectNavigation from '@/components/work/ProjectNavigation';

interface CaseStudyContentProps {
  project: Project;
}

export default function CaseStudyContent({ project }: CaseStudyContentProps) {
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: '-100px' });

  return (
    <article className="min-h-screen pb-24 md:pb-32">
      {/* Hero Section */}
      <CaseStudyHero project={project} />

      {/* Main Content */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Context Section */}
        <CaseStudySection
          title={project.context.title}
          body={project.context.body}
          index={0}
        />

        {/* Approach Section */}
        <CaseStudySection
          title={project.approach.title}
          body={project.approach.body}
          callout={project.approach.callout}
          index={1}
        />

        {/* Execution Section */}
        <CaseStudySection
          title={project.execution.title}
          body={project.execution.body}
          images={project.execution.images}
          index={2}
        />

        {/* Outcome Section */}
        <section className="mt-20 md:mt-24 pt-8 border-t border-foreground/10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mb-12"
          >
            {project.outcome.title}
          </motion.h2>

          {/* Metrics Grid */}
          <div
            ref={metricsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12"
          >
            {project.outcome.metrics.map((metric, index) => (
              <MetricCard
                key={index}
                value={metric.value}
                label={metric.label}
                index={index}
              />
            ))}
          </div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={metricsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-foreground leading-relaxed max-w-[680px]"
          >
            {project.outcome.summary}
          </motion.p>
        </section>

        {/* Project Navigation */}
        <ProjectNavigation currentProject={project} />
      </div>
    </article>
  );
}

