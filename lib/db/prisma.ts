import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Only initialize Prisma if DATABASE_URL is set
let prismaInstance: PrismaClient | null = null;

if (process.env.DATABASE_URL) {
  prismaInstance =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prismaInstance;
  }
}

// Export a proxy that throws a helpful error if database is not configured
export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    if (!prismaInstance) {
      console.warn('Database not configured. Set DATABASE_URL environment variable.');
      // Return a mock that returns empty data
      return () => Promise.resolve(null);
    }
    return (prismaInstance as unknown as Record<string, unknown>)[prop as string];
  },
});

export default prisma;

