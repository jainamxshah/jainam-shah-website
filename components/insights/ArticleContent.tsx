'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Article, formatDate } from '@/lib/articles';
import type { ReactElement } from 'react';

interface ArticleContentProps {
  article: Article;
}

// Premium markdown-like parser for the article content
function parseContent(content: string) {
  const lines = content.split('\n');
  const elements: ReactElement[] = [];
  let inBlockquote = false;
  let blockquoteContent: string[] = [];
  let key = 0;

  const flushBlockquote = () => {
    if (blockquoteContent.length > 0) {
      elements.push(
        <blockquote
          key={key++}
          className="border-l-4 border-accent pl-8 my-12 italic text-foreground/85 text-lg md:text-xl leading-[1.7]"
        >
          {blockquoteContent.join(' ')}
        </blockquote>
      );
      blockquoteContent = [];
    }
    inBlockquote = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Blockquote
    if (line.startsWith('> ')) {
      inBlockquote = true;
      blockquoteContent.push(line.slice(2));
      continue;
    } else if (inBlockquote) {
      flushBlockquote();
    }

    // H2 - Major section headings
    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={key++}
          className="font-neue text-2xl md:text-[32px] font-medium text-foreground mt-16 mb-6 pt-8 border-t border-foreground/8"
        >
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    // H3 - Sub-section headings
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="font-neue text-xl md:text-2xl font-medium text-foreground mt-12 mb-4">
          {line.slice(4)}
        </h3>
      );
      continue;
    }

    // Unordered list item
    if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="font-neue text-foreground text-lg leading-[1.7] ml-6 mb-3 list-disc">
          {processInlineFormatting(line.slice(2))}
        </li>
      );
      continue;
    }

    // Numbered list item
    if (/^\d+\. /.test(line)) {
      const text = line.replace(/^\d+\. /, '');
      elements.push(
        <li key={key++} className="font-neue text-foreground text-lg leading-[1.7] ml-6 mb-3 list-decimal">
          {processInlineFormatting(text)}
        </li>
      );
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      continue;
    }

    // Regular paragraph with inline formatting
    elements.push(
      <p key={key++} className="font-neue text-lg text-foreground leading-[1.8] mb-6">
        {processInlineFormatting(line)}
      </p>
    );
  }

  // Flush any remaining blockquote
  flushBlockquote();

  return elements;
}

// Process inline formatting (bold, links)
function processInlineFormatting(text: string): ReactElement | string {
  // Handle bold text
  if (text.includes('**')) {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return (
      <>
        {parts.map((part, idx) =>
          idx % 2 === 1 ? (
            <strong key={idx} className="font-semibold">
              {part}
            </strong>
          ) : (
            part
          )
        )}
      </>
    );
  }
  return text;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <article className="min-h-screen bg-background pt-32 pb-24 md:pt-40 md:pb-32" data-header-theme="light">
      <div className="max-w-[750px] mx-auto px-6 md:px-12">
        {/* Article Header */}
        <motion.header
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          {/* Category Badge */}
          <span className="inline-block bg-accent text-foreground px-4 py-1.5 rounded text-xs font-neue uppercase tracking-[0.1em] mb-4">
            {article.category}
          </span>

          {/* Title */}
          <h1 className="font-kalice text-3xl md:text-[48px] lg:text-[64px] text-foreground leading-[1.2] mb-6">
            {article.title}
          </h1>

          {/* Meta Row */}
          <div className="flex items-center gap-6 font-neue text-sm text-foreground/60">
            <span>{formatDate(article.date)}</span>
            <span className="text-foreground/30">|</span>
            <span>{article.readTime}</span>
          </div>
        </motion.header>

        {/* Featured Image */}
        {article.featuredImage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[21/9] rounded-xl overflow-hidden mb-16 bg-foreground/5"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, 
                  hsl(${(parseInt(article.id) * 50) % 360}, 20%, 85%) 0%, 
                  hsl(${(parseInt(article.id) * 50 + 40) % 360}, 25%, 75%) 100%)`,
              }}
            />
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
              onError={(e) => {
                e.currentTarget.style.opacity = '0';
              }}
            />
          </motion.div>
        )}

        {/* Article Body */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="article-body"
        >
          {parseContent(article.content)}
        </motion.div>

        {/* Article Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-24 pt-12 border-t border-foreground/8"
        >
          <Link
            href="/insights"
            className="inline-flex items-center font-neue text-base text-foreground hover:text-accent transition-colors duration-300 group"
          >
            <svg
              className="mr-2 w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Insights
          </Link>
        </motion.footer>
      </div>
    </article>
  );
}
