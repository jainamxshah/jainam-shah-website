'use client';

import Link from 'next/link';
import Badge from '@/components/admin/ui/Badge';
import { articles as staticArticles, formatDate } from '@/lib/articles';

export default function ArticlesTable() {
  // For now, use static data. Will be replaced with database query.
  const articles = staticArticles;

  if (articles.length === 0) {
    return (
      <div className="bg-white border border-foreground/10 rounded-xl p-16 text-center">
        <svg
          className="w-16 h-16 mx-auto text-foreground/20 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="text-lg font-medium text-foreground mb-2">No articles yet</h3>
        <p className="text-foreground/60 mb-6">Get started by creating your first article.</p>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center px-4 py-2 bg-foreground text-background rounded-md hover:bg-accent hover:text-foreground transition-colors"
        >
          Create your first article
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-foreground/10 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-foreground/[0.03] border-b border-foreground/10">
            <th className="px-6 py-4 text-left text-sm font-medium text-foreground/70">Title</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-foreground/70">Category</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-foreground/70">Status</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-foreground/70">Date</th>
            <th className="px-6 py-4 text-right text-sm font-medium text-foreground/70">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr
              key={article.id}
              className="border-b border-foreground/5 hover:bg-foreground/[0.02] transition-colors"
            >
              <td className="px-6 py-4">
                <Link
                  href={`/admin/articles/${article.id}`}
                  className="text-foreground font-medium hover:text-accent transition-colors"
                >
                  {article.title}
                </Link>
                <p className="text-sm text-foreground/60 mt-0.5 line-clamp-1">{article.excerpt}</p>
              </td>
              <td className="px-6 py-4">
                <Badge>{article.category}</Badge>
              </td>
              <td className="px-6 py-4">
                <Badge variant="success">Published</Badge>
              </td>
              <td className="px-6 py-4 text-foreground/60 text-sm">{formatDate(article.date)}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/articles/${article.id}`}
                    className="p-2 text-foreground/60 hover:text-foreground hover:bg-foreground/5 rounded-md transition-colors"
                    title="Edit"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </Link>
                  <Link
                    href={`/insights/${article.slug}`}
                    target="_blank"
                    className="p-2 text-foreground/60 hover:text-foreground hover:bg-foreground/5 rounded-md transition-colors"
                    title="View"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                  <button
                    className="p-2 text-red-500/60 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

