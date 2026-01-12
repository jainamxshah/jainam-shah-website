'use client';

import Link from 'next/link';
import Button from '@/components/admin/ui/Button';

// Placeholder stats - will be replaced with real data from database
const stats = [
  {
    label: 'Total Projects',
    value: '5',
    subtext: '5 published, 0 draft',
  },
  {
    label: 'Total Articles',
    value: '5',
    subtext: '5 published, 0 draft',
  },
  {
    label: 'Last Updated',
    value: 'Just now',
    subtext: 'Content is up to date',
  },
];

export default function DashboardContent() {
  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-foreground/10 rounded-xl p-6"
          >
            <p className="text-sm uppercase tracking-wide text-foreground/60 mb-2">
              {stat.label}
            </p>
            <p className="text-4xl font-medium text-foreground mb-1">{stat.value}</p>
            <p className="text-sm text-foreground/60">{stat.subtext}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-medium text-foreground mb-6">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/projects/new">
            <Button>
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </Button>
          </Link>
          <Link href="/admin/articles/new">
            <Button>
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Article
            </Button>
          </Link>
          <Link href="/" target="_blank">
            <Button variant="secondary">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              View Site
            </Button>
          </Link>
        </div>
      </section>

      {/* Recent Activity Placeholder */}
      <section className="mt-12">
        <h2 className="text-xl font-medium text-foreground mb-6">Recent Activity</h2>
        <div className="bg-white border border-foreground/10 rounded-xl p-8 text-center">
          <svg
            className="w-12 h-12 mx-auto text-foreground/20 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-foreground/60">
            Activity tracking will be available once the database is connected.
          </p>
        </div>
      </section>
    </div>
  );
}


