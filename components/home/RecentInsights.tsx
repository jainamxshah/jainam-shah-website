'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/articles';

interface RecentInsightsProps {
  articles: Article[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function RecentInsights({ articles }: RecentInsightsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  // Take only the 3 most recent articles
  const recentArticles = articles.slice(0, 3);

  return (
    <section className="bg-foreground py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 md:mb-16 gap-4">
            <motion.h2
              variants={itemVariants}
              className="font-display text-3xl md:text-4xl lg:text-5xl text-background"
            >
              Recent Insights
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Link
                href="/insights"
                className="font-sans text-base text-background/80 hover:text-accent transition-colors duration-300 inline-flex items-center gap-2"
              >
                View All Articles
                <span className="text-lg">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
              <motion.article
                key={article.slug}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/insights/${article.slug}`}>
                  {/* Article Image */}
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-5 bg-background/10">
                    {article.featuredImage ? (
                      <Image
                        src={article.featuredImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent/20 to-background/5" />
                    )}
                  </div>

                  {/* Category Badge */}
                  <span className="inline-block font-sans text-xs uppercase tracking-wider bg-accent/20 text-accent px-3 py-1 rounded mb-3">
                    {article.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-sans text-lg md:text-xl font-medium text-background mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-sans text-sm text-background/70 leading-relaxed line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>

                  {/* Read Time */}
                  <span className="font-sans text-xs text-background/60">
                    {article.readTime}
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


