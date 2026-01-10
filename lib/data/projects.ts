import prisma from '@/lib/db/prisma';
import { projects as staticProjects, type Project } from '@/lib/projects';

// Use database when available, fallback to static data
const USE_DATABASE = true;

export async function getAllProjects(): Promise<Project[]> {
  if (USE_DATABASE) {
    try {
      const dbProjects = await prisma.project.findMany({
        where: { published: true },
        orderBy: { publishedAt: 'desc' },
      });

      // Transform database projects to match the Project interface
      return dbProjects.map((p) => ({
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
        context: p.context as unknown as Project['context'],
        approach: p.approach as unknown as Project['approach'],
        execution: p.execution as unknown as Project['execution'],
        outcome: p.outcome as unknown as Project['outcome'],
        nextProjectSlug: p.nextProjectSlug || undefined,
        prevProjectSlug: p.prevProjectSlug || undefined,
      }));
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

