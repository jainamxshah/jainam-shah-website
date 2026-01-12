import prisma from '@/lib/db/prisma';
import { projects as staticProjects, type Project } from '@/lib/projects';

// Use database when available, fallback to static data
const USE_DATABASE = true;

// Type for database project with optional work page fields
type DbProject = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  outcomeMetric: string;
  thumbnailUrl: string;
  heroImageUrl: string;
  impactSummary: string;
  year: string;
  role: string;
  techStack: string[];
  tags: string[];
  context: unknown;
  approach: unknown;
  execution: unknown;
  outcome: unknown;
  nextProjectSlug: string | null;
  prevProjectSlug: string | null;
  identityTag?: string | null;
  workPageVisualUrl?: string | null;
  workPageDescription?: string | null;
  workPageOutcome?: string | null;
};

export async function getAllProjects(): Promise<Project[]> {
  if (USE_DATABASE) {
    try {
      const dbProjects = await prisma.project.findMany({
        where: { published: true },
        orderBy: { publishedAt: 'desc' },
      });

      // Transform database projects to match the Project interface
      return dbProjects.map((p) => {
        const dbProject = p as unknown as DbProject;
        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          shortDescription: p.shortDescription,
          outcomeMetric: p.outcomeMetric,
          thumbnailUrl: p.thumbnailUrl,
          heroImageUrl: p.heroImageUrl,
          impactSummary: p.impactSummary,
          year: p.year,
          role: p.role,
          techStack: p.techStack,
          tags: p.tags,
          identityTag: dbProject.identityTag || p.shortDescription.split(' ')[0] + ' Platform',
          workPageVisualUrl: dbProject.workPageVisualUrl || p.heroImageUrl,
          workPageDescription: dbProject.workPageDescription || p.shortDescription,
          workPageOutcome: dbProject.workPageOutcome || p.impactSummary,
          context: p.context as unknown as Project['context'],
          approach: p.approach as unknown as Project['approach'],
          execution: p.execution as unknown as Project['execution'],
          outcome: p.outcome as unknown as Project['outcome'],
          nextProjectSlug: p.nextProjectSlug || undefined,
          prevProjectSlug: p.prevProjectSlug || undefined,
        };
      });
    } catch (error) {
      console.error('Error fetching projects from database:', error);
      return staticProjects;
    }
  }

  return staticProjects;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (USE_DATABASE) {
    try {
      const p = await prisma.project.findUnique({
        where: { slug, published: true },
      });

      if (!p) return undefined;

      const dbProject = p as unknown as DbProject;
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        shortDescription: p.shortDescription,
        outcomeMetric: p.outcomeMetric,
        thumbnailUrl: p.thumbnailUrl,
        heroImageUrl: p.heroImageUrl,
        impactSummary: p.impactSummary,
        year: p.year,
        role: p.role,
        techStack: p.techStack,
        tags: p.tags,
        identityTag: dbProject.identityTag || p.shortDescription.split(' ')[0] + ' Platform',
        workPageVisualUrl: dbProject.workPageVisualUrl || p.heroImageUrl,
        workPageDescription: dbProject.workPageDescription || p.shortDescription,
        workPageOutcome: dbProject.workPageOutcome || p.impactSummary,
        context: p.context as unknown as Project['context'],
        approach: p.approach as unknown as Project['approach'],
        execution: p.execution as unknown as Project['execution'],
        outcome: p.outcome as unknown as Project['outcome'],
        nextProjectSlug: p.nextProjectSlug || undefined,
        prevProjectSlug: p.prevProjectSlug || undefined,
      };
    } catch (error) {
      console.error('Error fetching project from database:', error);
      return staticProjects.find((p) => p.slug === slug);
    }
  }

  return staticProjects.find((p) => p.slug === slug);
}

export async function getProjectSlugs(): Promise<string[]> {
  if (USE_DATABASE) {
    try {
      const projects = await prisma.project.findMany({
        where: { published: true },
        select: { slug: true },
      });
      return projects.map((p) => p.slug);
    } catch (error) {
      console.error('Error fetching project slugs from database:', error);
      return staticProjects.map((p) => p.slug);
    }
  }

  return staticProjects.map((p) => p.slug);
}

