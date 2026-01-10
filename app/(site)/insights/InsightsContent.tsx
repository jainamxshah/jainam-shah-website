'use client';

import { motion } from 'framer-motion';
import { Article } from '@/lib/articles';
import ArticleList from '@/components/insights/ArticleList';

interface InsightsContentProps {
  articles: Article[];
}

export default function InsightsContent({ articles }: InsightsContentProps) {
  return (
    <div className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-main">
        {/* Page Intro */}
        <header className="mb-16 md:mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-kalice text-5xl md:text-6xl lg:text-7xl text-foreground"
          >
            Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-foreground/70 mt-6 max-w-xl"
          >
            How I think about products, AI, and growth.
          </motion.p>
        </header>

        {/* Article List */}
        <section className="max-w-4xl">
          <ArticleList articles={articles} />
        </section>
      </div>
    </div>
  );
}

