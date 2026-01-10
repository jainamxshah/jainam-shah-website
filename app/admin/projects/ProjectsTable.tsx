'use client';

import Link from 'next/link';
import Image from 'next/image';
import Badge from '@/components/admin/ui/Badge';
import { projects as staticProjects } from '@/lib/projects';

export default function ProjectsTable() {
  // For now, use static data. Will be replaced with database query.
  const projects = staticProjects;

  if (projects.length === 0) {
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
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <h3 className="text-lg font-medium text-foreground mb-2">No projects yet</h3>
        <p className="text-foreground/60 mb-6">Get started by creating your first project.</p>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center px-4 py-2 bg-foreground text-background rounded-md hover:bg-accent hover:text-foreground transition-colors"
        >
          Create your first project
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-foreground/10 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-foreground/[0.03] border-b border-foreground/10">
            <th className="px-6 py-4 text-left text-sm font-medium text-foreground/70">Image</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-foreground/70">Name</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-foreground/70">Status</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-foreground/70">Year</th>
            <th className="px-6 py-4 text-right text-sm font-medium text-foreground/70">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-b border-foreground/5 hover:bg-foreground/[0.02] transition-colors"
            >
              <td className="px-6 py-4">
                <div className="relative w-20 h-12 rounded-md overflow-hidden bg-foreground/5">
                  <Image
                    src={project.thumbnailUrl}
                    alt={project.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0';
                    }}
                  />
                </div>
              </td>
              <td className="px-6 py-4">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="text-foreground font-medium hover:text-accent transition-colors"
                >
                  {project.name}
                </Link>
                <p className="text-sm text-foreground/60 mt-0.5">{project.shortDescription}</p>
              </td>
              <td className="px-6 py-4">
                <Badge variant="success">Published</Badge>
              </td>
              <td className="px-6 py-4 text-foreground/60">{project.year}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/projects/${project.id}`}
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
                    href={`/work/${project.slug}`}
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

