export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'tools';
}

export const technologies: Technology[] = [
  // Frontend
  { name: 'Next.js', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Framer Motion', category: 'frontend' },
  
  // Backend
  { name: 'Node.js', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'Redis', category: 'backend' },
  { name: 'GraphQL', category: 'backend' },
  
  // AI/ML
  { name: 'OpenAI', category: 'ai' },
  { name: 'LangChain', category: 'ai' },
  { name: 'TensorFlow', category: 'ai' },
  { name: 'PyTorch', category: 'ai' },
  { name: 'Hugging Face', category: 'ai' },
  
  // Tools
  { name: 'Vercel', category: 'tools' },
  { name: 'AWS', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'Prisma', category: 'tools' },
  { name: 'GitHub Actions', category: 'tools' },
];



