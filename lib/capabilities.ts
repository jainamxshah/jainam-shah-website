export interface Capability {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const capabilities: Capability[] = [
  {
    id: '1',
    title: 'Product Strategy',
    description:
      'Transform ambiguous ideas into executable product roadmaps. I define what moves the needle—market positioning, feature prioritization, and go-to-market fit—backed by competitive analysis and user research.',
    bullets: [
      'Market positioning and competitive analysis',
      'Feature prioritization frameworks',
      'User research and validation',
      'Go-to-market strategy',
    ],
  },
  {
    id: '2',
    title: 'AI-Driven Systems',
    description:
      'Build intelligent products that learn and adapt. From recommendation engines to generative interfaces, I architect AI systems that create measurable competitive advantage and unlock new business models.',
    bullets: [
      'LLM integration and prompt engineering',
      'Recommendation and personalization engines',
      'Generative AI interfaces',
      'ML pipeline architecture',
    ],
  },
  {
    id: '3',
    title: 'Conversion-Focused Design',
    description:
      'Every interface decision optimized for outcomes. I design experiences that guide users toward high-value actions—reducing friction, building trust, and turning visitors into customers at scale.',
    bullets: [
      'User journey optimization',
      'A/B testing and experimentation',
      'Funnel analysis and improvement',
      'Trust-building design patterns',
    ],
  },
  {
    id: '4',
    title: 'Search-First Architecture',
    description:
      'Engineer products to win in organic discovery. From technical SEO to content strategy, I build digital products that rank, get found, and compound their visibility over time.',
    bullets: [
      'Technical SEO implementation',
      'Content strategy and architecture',
      'Performance optimization',
      'Structured data and schema markup',
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the business, users, and market to define what success looks like.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Create experiences that balance user needs with business objectives.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Engineer performant, scalable products using modern tech and AI.',
  },
  {
    number: '04',
    title: 'Scale',
    description: 'Optimize for growth through data, iteration, and strategic positioning.',
  },
];

