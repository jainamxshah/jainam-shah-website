export interface ProjectImage {
  url: string;
  caption: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  outcomeMetric: string;
  thumbnailUrl: string;
  tags: string[];

  // Case study fields
  heroImageUrl: string;
  impactSummary: string;
  year: string;
  role: string;
  techStack?: string[];

  // Work page canvas fields
  identityTag: string; // e.g., "Growth Engine", "Knowledge OS"
  workPageVisualUrl: string; // Large hero image for canvas
  workPageDescription: string; // Short description for right column
  workPageOutcome: string; // One-line outcome in accent color

  // Content sections
  context: {
    title: string;
    body: string;
  };
  approach: {
    title: string;
    body: string;
    callout?: string;
  };
  execution: {
    title: string;
    body: string;
    images?: ProjectImage[];
  };
  outcome: {
    title: string;
    metrics: ProjectMetric[];
    summary: string;
  };

  // Navigation
  nextProjectSlug?: string;
  prevProjectSlug?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'Surfgeo',
    slug: 'surfgeo',
    shortDescription: 'AI-powered SEO engine for compounding organic growth and GEO optimization.',
    outcomeMetric: 'GEO ↑ 400%',
    thumbnailUrl: '/images/projects/surfgeo.jpg',
    heroImageUrl: '/images/projects/surfgeo-hero.jpg',
    impactSummary: 'Pioneered AI-driven optimization that increased organic visibility by 400%',
    year: '2024–2025',
    role: 'Product Design & Development',
    tags: ['AI', 'GEO', 'SEO', 'SaaS'],
    techStack: ['Next.js', 'GPT-4', 'Vercel', 'Python'],
    identityTag: 'Growth Engine',
    workPageVisualUrl: '/images/projects/surfgeo-dashboard.jpg',
    workPageDescription: 'AI-powered SEO and growth platform for AI companies.',
    workPageOutcome: 'Turns organic search into a predictable acquisition channel.',
    context: {
      title: 'The Challenge',
      body: `Traditional SEO was failing in the age of AI answers. Businesses were watching their organic traffic decline as users shifted to AI-powered search experiences (GEO - Generative Engine Optimization) that synthesized answers instead of linking to sources. AI companies were building great products that nobody could find. The challenge wasn't just about ranking anymore—it was about being cited, referenced, and included in AI-generated responses from ChatGPT, Perplexity, and other LLM-powered search tools.`,
    },
    approach: {
      title: 'Strategy & AI Leverage',
      body: `We reframed SEO for the LLM era. By analyzing patterns across major AI responses, we identified the signals that differentiate cited sources from ignored content. The strategy focused on three pillars: structural optimization for AI comprehension, authority signals that LLMs recognize, and real-time adaptation based on how AI search behavior evolves.`,
      callout: 'AI doesn\'t rank pages—it evaluates trustworthiness. We optimized for trust signals, not keyword density.',
    },
    execution: {
      title: 'Building It',
      body: `Surfgeo was built as a real-time analysis and optimization platform that scores content across 40+ factors specific to AI citation patterns. It features a GEO Score Dashboard for real-time citability tracking, competitor citation analysis, and automated page generation optimized for LLM retrieval.`,
      images: [
        { url: '/images/projects/surfgeo-dashboard.jpg', caption: 'Real-time GEO scoring dashboard' },
      ],
    },
    outcome: {
      title: 'Results & Impact',
      metrics: [
        { value: '400%', label: 'Increase in AI citations' },
        { value: '10K+', label: 'Monthly active users' },
        { value: '2.5x', label: 'Faster content optimization' },
      ],
      summary: 'Surfgeo has become the leading GEO platform for businesses serious about visibility in the AI era. Clients report an average 400% increase in AI search citations within the first 90 days, fundamentally changing how their content performs in the new discovery landscape.',
    },
    nextProjectSlug: 'natasha',
    prevProjectSlug: 'punchly',
  },
  {
    id: '2',
    name: 'Natasha',
    slug: 'natasha',
    shortDescription: 'Voice-first AI assistant with persistent memory and autonomous capabilities.',
    outcomeMetric: 'Speed ↑ 10x',
    thumbnailUrl: '/images/projects/natasha.jpg',
    heroImageUrl: '/images/projects/natasha-hero.jpg',
    impactSummary: 'Designed an agentic AI identity with zero context loss across sessions.',
    year: '2024',
    role: 'Lead AI Engineer',
    tags: ['Agentic AI', 'Voice', 'Vision', 'Persistance'],
    techStack: ['GPT-4', 'Whisper', 'ElevenLabs', 'Computer Vision'],
    identityTag: 'Agentic Identity',
    workPageVisualUrl: '/images/projects/natasha-visual.jpg',
    workPageDescription: 'Persistent AI assistant that learns your patterns and anticipates needs.',
    workPageOutcome: 'Feels less like a tool and more like a trusted partner.',
    context: {
      title: 'The Challenge',
      body: `AI assistants were becoming commoditized—same voice, same responses, no personality, no memory. Users needed an AI that felt like a real assistant: one that remembers conversations, maintains context across sessions, adapts to communication preferences, and operates proactively with its own schedule and personality.`,
    },
    approach: {
      title: 'Strategy & AI Leverage',
      body: `Build an agentic AI identity inspired by Natasha Romanoff—intelligent, adaptive, proactive, and memorable. Not just a chatbot, but a persistent identity that learns your patterns, anticipates your needs, and evolves with you.`,
      callout: 'Natasha doesn\'t just respond to commands; she anticipates needs, maintains context, and operates proactively.',
    },
    execution: {
      title: 'Building It',
      body: `Natasha was built as a multi-modal agentic system with persistent memory using vector embeddings, personality engines, and proactive scheduling capabilities. It integrates Whisper for transcription and ElevenLabs for natural voice synthesis.`,
      images: [
        { url: '/images/projects/natasha-memory.jpg', caption: 'Persistent Context Graph' },
      ],
    },
    outcome: {
      title: 'Results & Impact',
      metrics: [
        { value: '10x', label: 'Faster task completion' },
        { value: 'Infinite', label: 'Memory persistence' },
        { value: 'Multi-modal', label: 'Voice, Text, Vision' },
      ],
      summary: 'Natasha is a personal AI assistant that feels genuinely intelligent. It has achieved a state of zero context loss across sessions, executing tasks autonomously without constant prompting.',
    },
    nextProjectSlug: 'lexrag',
    prevProjectSlug: 'surfgeo',
  },
  {
    id: '3',
    name: 'LexRAG',
    slug: 'lexrag',
    shortDescription: 'AI contract analysis and legal risk intelligence system for law firms.',
    outcomeMetric: 'Review ↓ 75%',
    thumbnailUrl: '/images/projects/lexrag.jpg',
    heroImageUrl: '/images/projects/lexrag-hero.jpg',
    impactSummary: 'Reduced contract review time by 75% while hitting 90% risk detection accuracy.',
    year: '2023–2024',
    role: 'System Architecture & AI Development',
    tags: ['LegalTech', 'RAG', 'Risk Analysis'],
    techStack: ['LangChain', 'Pinecone', 'FastAPI', 'React'],
    identityTag: 'Legal Intelligence',
    workPageVisualUrl: '/images/projects/lexrag-dashboard.jpg',
    workPageDescription: 'High-performance legal RAG for clause-level contract understanding.',
    workPageOutcome: 'AI built for legal defensibility, not just convenience.',
    context: {
      title: 'The Challenge',
      body: `Law firms and corporate legal teams were drowning in contracts. Manual review was slow, expensive, and error-prone. Critical risks were being missed in dense legal language. Due diligence processes took weeks. Legal teams needed AI that understood clauses, identified risks, and provided evidence-backed answers—not generic summaries.`,
    },
    approach: {
      title: 'Strategy & AI Leverage',
      body: `Build an AI-powered legal intelligence platform that doesn't just search contracts—it understands them. LexRAG operates at the clause level, linking risks to precedents, and providing litigation context.`,
      callout: 'We didn\'t just build a document search. We built evidence-backed legal reasoning at the clause level.',
    },
    execution: {
      title: 'Building It',
      body: `LexRAG uses customized legal NER models for clause extraction and LangChain for RAG orchestration. It features clause-aware search, contract risk scoring, and version-diffing for material changes.`,
      images: [
        { url: '/images/projects/lexrag-interface.jpg', caption: 'Clause-level analysis interface' },
      ],
    },
    outcome: {
      title: 'Results & Impact',
      metrics: [
        { value: '75%', label: 'Reduction in review time' },
        { value: '90%', label: 'Risk detection accuracy' },
        { value: '3x', label: 'Faster due diligence' },
      ],
      summary: 'LexRAG has been adopted by 12 law firms, saving millions in review costs and ensuring zero missed risks in primary deployments.',
    },
    nextProjectSlug: 'carag',
    prevProjectSlug: 'natasha',
  },
  {
    id: '4',
    name: 'CARag',
    slug: 'carag',
    shortDescription: 'AI compliance and tax automation platform for chartered accountants.',
    outcomeMetric: 'Notices ↓ 80%',
    thumbnailUrl: '/images/projects/carag.jpg',
    heroImageUrl: '/images/projects/carag-hero.jpg',
    impactSummary: 'Automated notice interpretation and compliance tracking for 50+ CA firms.',
    year: '2024',
    role: 'Lead AI Developer',
    tags: ['Compliance', 'Tax Law', 'RAG', 'Automation'],
    techStack: ['Python', 'RAG', 'OpenAI', 'Next.js'],
    identityTag: 'Compliance Co-Pilot',
    workPageVisualUrl: '/images/projects/carag-app.jpg',
    workPageDescription: 'Tax section-aware AI specifically trained for Indian compliance workflows.',
    workPageOutcome: 'Turns complex tax notices into instant action items.',
    context: {
      title: 'The Challenge',
      body: `Chartered Accountants were overwhelmed with compliance work. Tax notices required hours of interpretation. Filing deadlines were tracked manually. Clients expected instant answers about GST mismatches, penalty risks, and compliance gaps. CAs needed AI that understood tax sections and interpreted notices.`,
    },
    approach: {
      title: 'Strategy & AI Leverage',
      body: `Build an AI compliance co-pilot specifically trained on Indian tax law and CA workflows. CARag understands references like Section 80C, 194J, and GST Section X.`,
      callout: 'Generic AI doesn\'t work for tax. CARag speaks the language of chartered accountants.',
    },
    execution: {
      title: 'Building It',
      body: `CARag features a tax section-aware search engine, notice interpretation engine with OCR, and financial statement analyzer for anomaly detection. It uses a multi-tenant architecture for secure client isolation.`,
      images: [
        { url: '/images/projects/carag-notice.jpg', caption: 'Automated notice interpretation' },
      ],
    },
    outcome: {
      title: 'Results & Impact',
      metrics: [
        { value: '80%', label: 'Reduction in notice time' },
        { value: '95%', label: 'Compliance accuracy' },
        { value: 'Zero', label: 'Missed deadlines' },
      ],
      summary: 'CARag is used by 50+ firms managing 2000+ clients, reducing notice interpretation time from hours to minutes.',
    },
    nextProjectSlug: 'punchly',
    prevProjectSlug: 'lexrag',
  },
  {
    id: '5',
    name: 'Punchly',
    slug: 'punchly',
    shortDescription: 'Modern time tracking and workforce productivity platform for teams.',
    outcomeMetric: 'Accuracy ↑ 95%',
    thumbnailUrl: '/images/projects/punchly.jpg',
    heroImageUrl: '/images/projects/punchly-hero.jpg',
    impactSummary: 'Recovered 18% more billable hours for agencies through smart tracking.',
    year: '2023–2024',
    role: 'Full-Stack Development',
    tags: ['Productivity', 'B2B', 'SaaS', 'Mobile'],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    identityTag: 'Time Intelligence',
    workPageVisualUrl: '/images/projects/punchly-stats.jpg',
    workPageDescription: 'Effortless time management platform for high-performance teams.',
    workPageOutcome: 'Recovers thousands of billable hours that would otherwise be lost.',
    context: {
      title: 'The Challenge',
      body: `Teams were losing thousands of hours annually to inaccurate time tracking. Manual timesheets were prone to errors, forgotten entries, and billing disputes. Businesses struggled with payroll accuracy, project profitability visibility, and workforce productivity insights.`,
    },
    approach: {
      title: 'Strategy & AI Leverage',
      body: `Build a modern time tracking platform that eliminates friction. Focus on accuracy first, effortless tracking across any device, and actionable productivity insights.`,
      callout: 'Punchly doesn\'t add complexity—it removes it. This isn\'t just tracking—it\'s time intelligence.',
    },
    execution: {
      title: 'Building It',
      body: `Punchly combines a React frontend with a scalable Node.js/PostgreSQL backend. It features a one-click timer, smart timesheets with approval workflows, and deep project & billable hour management.`,
      images: [
        { url: '/images/projects/punchly-dashboard.jpg', caption: 'Team productivity dashboard' },
      ],
    },
    outcome: {
      title: 'Results & Impact',
      metrics: [
        { value: '95%', label: 'Time tracking accuracy' },
        { value: '40%', label: 'Admin time reduction' },
        { value: '18%', label: 'Increase in billable recovery' },
      ],
      summary: 'Used by 500+ teams, Punchly has increased billing accuracy to 98% and optimized team utilization by 25%.',
    },
    nextProjectSlug: 'surfgeo',
    prevProjectSlug: 'carag',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
