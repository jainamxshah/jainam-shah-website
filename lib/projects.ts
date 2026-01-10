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
    shortDescription: 'Flagship generative engine optimization app',
    outcomeMetric: 'GEO ↑ 400%',
    thumbnailUrl: '/images/projects/surfgeo.jpg',
    heroImageUrl: '/images/projects/surfgeo-hero.jpg',
    impactSummary: 'Pioneered AI-driven optimization that increased organic visibility by 400%',
    year: '2024',
    role: 'Product Design & Development',
    tags: ['AI', 'SEO', 'NEXTJS', 'GENERATIVE'],
    techStack: ['Next.js', 'OpenAI', 'Vercel', 'PostgreSQL'],
    context: {
      title: 'The Challenge',
      body: `Traditional SEO was failing in the age of AI answers. Businesses were watching their organic traffic decline as users shifted to AI-powered search experiences that synthesized answers instead of linking to sources.

The challenge wasn't just about ranking anymore—it was about being cited, referenced, and included in AI-generated responses. Surfgeo was built to solve this existential shift in how information is discovered and consumed.

Existing tools offered generic keyword suggestions and backlink analysis. None were designed for the new paradigm where AI models evaluate content for authority, comprehensiveness, and trustworthiness differently than traditional search crawlers.`,
    },
    approach: {
      title: 'Strategy & AI Leverage',
      body: `We started with a fundamental question: What makes AI systems trust and cite certain content? By analyzing patterns across major LLM responses, we identified the signals that differentiate cited sources from ignored content.

The strategy focused on three pillars: structural optimization for AI comprehension, authority signals that LLMs recognize, and real-time adaptation based on how AI search behavior evolves.

Rather than fighting AI, we built tools that help businesses become the sources AI wants to reference.`,
      callout: 'The key insight: AI doesn\'t rank pages—it evaluates trustworthiness. We optimized for trust signals, not keyword density.',
    },
    execution: {
      title: 'Building It',
      body: `Surfgeo was built as a real-time analysis platform that scores content across 40+ factors specific to AI citation patterns. The dashboard provides actionable recommendations, not just metrics.

Key features include competitive intelligence showing which competitors are getting AI citations, content gap analysis identifying missing topics that AI expects from authoritative sources, and automated monitoring that alerts when AI search behavior shifts.

The interface was designed for marketing teams, not developers—clear visualizations, plain-language recommendations, and one-click implementation guides.`,
      images: [
        { url: '/images/projects/surfgeo-dashboard.jpg', caption: 'Real-time GEO scoring dashboard' },
        { url: '/images/projects/surfgeo-analysis.jpg', caption: 'Competitive citation analysis' },
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
    nextProjectSlug: 'nexus-ai',
    prevProjectSlug: 'voxel-commerce',
  },
  {
    id: '2',
    name: 'Nexus AI',
    slug: 'nexus-ai',
    shortDescription: 'Enterprise knowledge management platform',
    outcomeMetric: 'Productivity ↑ 280%',
    thumbnailUrl: '/images/projects/nexus-ai.jpg',
    heroImageUrl: '/images/projects/nexus-ai-hero.jpg',
    impactSummary: 'Transformed enterprise knowledge access, boosting team productivity by 280%',
    year: '2024',
    role: 'Technical Architecture & Product Strategy',
    tags: ['AI', 'ENTERPRISE', 'RAG', 'KNOWLEDGE'],
    techStack: ['Python', 'LangChain', 'Pinecone', 'React'],
    context: {
      title: 'The Challenge',
      body: `A Fortune 500 technology company was drowning in its own knowledge. With 15 years of documentation, Confluence pages, Slack threads, and institutional wisdom scattered across dozens of systems, employees spent an average of 2.5 hours daily searching for information they knew existed.

The cost wasn't just time—it was decision quality. Teams were making choices without access to critical context because finding that context took longer than the decision timeline allowed.

Previous solutions had failed: better search tools returned too many results, documentation initiatives created more to search through, and tribal knowledge remained locked in the heads of senior employees.`,
    },
    approach: {
      title: 'Strategy & AI Leverage',
      body: `We reframed the problem from "better search" to "intelligent synthesis." The goal wasn't to find documents—it was to answer questions with the combined knowledge of the organization.

Our RAG architecture was designed for enterprise complexity: multiple knowledge sources with different permissions, real-time updates as documentation changed, and citation trails for audit and verification.

The breakthrough came from modeling how senior employees actually answered questions—connecting dots across departments, referencing historical context, and knowing which sources to trust.`,
      callout: 'We didn\'t build a search engine. We built a digital colleague with 15 years of institutional memory.',
    },
    execution: {
      title: 'Building It',
      body: `Nexus AI ingests content from 12 different source systems, maintaining permission boundaries while creating unified semantic understanding. The system processes over 2 million documents with incremental updates every 15 minutes.

The interface is conversational but enterprise-grade: users ask questions in natural language and receive synthesized answers with full source citations. They can drill down into specific documents or ask follow-up questions that build on previous context.

Security was paramount—we implemented role-based access that respects source system permissions, ensuring users only see information they're authorized to access.`,
      images: [
        { url: '/images/projects/nexus-chat.jpg', caption: 'Conversational knowledge interface' },
        { url: '/images/projects/nexus-sources.jpg', caption: 'Multi-source citation system' },
      ],
    },
    outcome: {
      title: 'Results & Impact',
      metrics: [
        { value: '280%', label: 'Productivity increase' },
        { value: '18min', label: 'Average time to answer (from 2.5hrs)' },
        { value: '94%', label: 'User satisfaction rate' },
      ],
      summary: 'Nexus AI reduced information retrieval time from hours to minutes, fundamentally changing how knowledge flows through the organization. The platform has been adopted by 8,000+ employees and is now considered critical infrastructure for the company\'s operations.',
    },
    nextProjectSlug: 'quantflow',
    prevProjectSlug: 'surfgeo',
  },
  {
    id: '3',
    name: 'Quantflow',
    slug: 'quantflow',
    shortDescription: 'Real-time trading analytics engine',
    outcomeMetric: 'Scale → 50K Users',
    thumbnailUrl: '/images/projects/quantflow.jpg',
    heroImageUrl: '/images/projects/quantflow-hero.jpg',
    impactSummary: 'Built a real-time analytics platform that scaled to 50,000 active traders',
    year: '2023',
    role: 'Full-Stack Development & System Architecture',
    tags: ['FINTECH', 'ANALYTICS', 'PYTHON', 'REALTIME'],
    techStack: ['Python', 'FastAPI', 'Redis', 'React', 'WebSocket'],
    context: {
      title: 'The Challenge',
      body: `Retail traders were making decisions with institutional-grade complexity using consumer-grade tools. The gap between professional trading terminals and retail apps wasn't just features—it was the speed and depth of analysis available.

Existing retail platforms offered delayed data, basic charts, and generic news feeds. Traders needed real-time pattern recognition, cross-market correlation analysis, and sentiment signals—the same advantages institutions take for granted.

The challenge: deliver institutional-quality analytics at retail scale without institutional-grade pricing or complexity.`,
    },
    approach: {
      title: 'Strategy & AI Leverage',
      body: `We built a streaming analytics architecture that processes market data in real-time, applying machine learning models that previously required significant infrastructure investment.

The strategy prioritized actionable intelligence over comprehensive data. Instead of overwhelming users with every metric, we focused on surfacing the signals that predict significant price movements.

AI was applied to three core functions: pattern recognition across multiple timeframes, sentiment analysis from news and social signals, and anomaly detection for unusual market behavior.`,
      callout: 'Institutional tools show you everything. We built tools that show you what matters.',
    },
    execution: {
      title: 'Building It',
      body: `Quantflow processes over 10 million data points per second across 5,000+ securities. The backend uses a custom streaming architecture built on Redis Streams and FastAPI, with ML models running on dedicated GPU infrastructure.

The interface was designed for speed: zero unnecessary clicks, customizable layouts, and keyboard-first navigation for power users. Charts update in real-time without refresh, and alerts can be configured with natural language rules.

We implemented a tiered architecture that ensures latency stays under 50ms for all users, regardless of load—critical for trading decisions where milliseconds matter.`,
      images: [
        { url: '/images/projects/quantflow-dashboard.jpg', caption: 'Real-time trading dashboard' },
        { url: '/images/projects/quantflow-alerts.jpg', caption: 'Intelligent alert system' },
      ],
    },
    outcome: {
      title: 'Results & Impact',
      metrics: [
        { value: '50K+', label: 'Active traders' },
        { value: '<50ms', label: 'Data latency' },
        { value: '99.97%', label: 'Platform uptime' },
      ],
      summary: 'Quantflow grew from beta to 50,000 active users in 18 months, becoming one of the fastest-growing retail analytics platforms in the market. Users report an average 23% improvement in trade timing decisions.',
    },
    nextProjectSlug: 'aura-health',
    prevProjectSlug: 'nexus-ai',
  },
  {
    id: '4',
    name: 'Aura Health',
    slug: 'aura-health',
    shortDescription: 'AI-powered diagnostic assistance system',
    outcomeMetric: 'Accuracy ↑ 94%',
    thumbnailUrl: '/images/projects/aura-health.jpg',
    heroImageUrl: '/images/projects/aura-health-hero.jpg',
    impactSummary: 'Achieved 94% diagnostic accuracy in preliminary patient assessments',
    year: '2023',
    role: 'AI/ML Development & Product Design',
    tags: ['HEALTHCARE', 'ML', 'REACT', 'DIAGNOSTIC'],
    techStack: ['PyTorch', 'FastAPI', 'React', 'PostgreSQL'],
    context: {
      title: 'The Challenge',
      body: `Primary care physicians face an impossible task: accurate diagnosis under time pressure. With average appointment times of 15 minutes and thousands of possible conditions, even experienced doctors miss patterns or overlook rare presentations.

The stakes in healthcare are uniquely high. A missed diagnosis isn't a business metric—it's a patient outcome. Yet the tools available to doctors had barely evolved in decades: paper questionnaires, manual history review, and pattern matching from memory.

The challenge wasn't replacing physicians—it was augmenting their expertise with systematic analysis that humans alone can't perform consistently at scale.`,
    },
    approach: {
      title: 'Strategy & AI Leverage',
      body: `We designed Aura as a decision support system, not a replacement for clinical judgment. The AI analyzes patient intake data, medical history, and symptom patterns to surface considerations a physician might want to explore.

The approach focused on explainability over black-box predictions. Every suggestion includes reasoning that physicians can evaluate, matching how medical education trains doctors to think through differential diagnoses.

We trained on anonymized data from 2 million patient encounters, with continuous validation against actual diagnostic outcomes.`,
      callout: 'AI doesn\'t make diagnoses—physicians do. Aura ensures nothing important gets overlooked.',
    },
    execution: {
      title: 'Building It',
      body: `Aura integrates with existing EHR systems, analyzing patient data as it's entered and providing real-time suggestions. The interface is designed for clinical workflows: non-intrusive, quick to review, and easy to dismiss irrelevant suggestions.

Key features include symptom pattern analysis that considers rare presentations, medication interaction warnings that account for the full patient profile, and follow-up recommendations based on similar patient outcomes.

We implemented strict privacy controls exceeding HIPAA requirements, with all patient data encrypted and processing happening within the healthcare system's infrastructure.`,
      images: [
        { url: '/images/projects/aura-interface.jpg', caption: 'Clinical decision support interface' },
        { url: '/images/projects/aura-analysis.jpg', caption: 'Diagnostic pattern analysis' },
      ],
    },
    outcome: {
      title: 'Results & Impact',
      metrics: [
        { value: '94%', label: 'Diagnostic accuracy' },
        { value: '12min', label: 'Time saved per patient' },
        { value: '340+', label: 'Physicians using daily' },
      ],
      summary: 'Aura Health has been adopted across three major hospital networks, assisting physicians with over 50,000 patient encounters monthly. Independent validation shows a 94% accuracy rate in preliminary assessments, with physicians reporting significant reduction in diagnostic uncertainty.',
    },
    nextProjectSlug: 'voxel-commerce',
    prevProjectSlug: 'quantflow',
  },
  {
    id: '5',
    name: 'Voxel Commerce',
    slug: 'voxel-commerce',
    shortDescription: 'Conversational shopping experience',
    outcomeMetric: 'Conversion ↑ 32%',
    thumbnailUrl: '/images/projects/voxel-commerce.jpg',
    heroImageUrl: '/images/projects/voxel-commerce-hero.jpg',
    impactSummary: 'Revolutionized e-commerce discovery, increasing conversion rates by 32%',
    year: '2024',
    role: 'Product Strategy & AI Development',
    tags: ['E-COMMERCE', 'LLM', 'NEXTJS', 'CONVERSATIONAL'],
    techStack: ['Next.js', 'GPT-4', 'Vercel', 'Shopify'],
    context: {
      title: 'The Challenge',
      body: `E-commerce search was stuck in 2010. Users typed keywords, scrolled through endless grids, and applied filters they didn't fully understand. For complex purchases—"something for my nephew's birthday, he's into science but not chemistry"—the experience failed completely.

Conversion rates had plateaued across the industry. Retailers invested in better photos, faster shipping, and lower prices, but the fundamental discovery experience remained broken.

The opportunity: bring the helpful guidance of an excellent sales associate to digital shopping.`,
    },
    approach: {
      title: 'Strategy & AI Leverage',
      body: `We reimagined product discovery as conversation rather than search. Instead of translating needs into keywords, users describe what they're looking for in natural language, and the system guides them to the right products.

The AI doesn't just match keywords—it understands intent, asks clarifying questions, and makes recommendations based on the full context of the conversation. It remembers preferences across sessions and learns from browsing behavior.

Critical to adoption: the conversational interface augments rather than replaces traditional navigation. Users can seamlessly switch between chat and browse.`,
      callout: 'We didn\'t add a chatbot to e-commerce. We rebuilt discovery around conversation.',
    },
    execution: {
      title: 'Building It',
      body: `Voxel Commerce integrates with existing Shopify stores as a lightweight SDK. The system indexes product catalogs and enhances them with AI-generated attributes for better conversational matching.

The interface feels like messaging a knowledgeable friend: natural language, quick responses, and helpful suggestions. Product recommendations appear inline with conversation, allowing users to explore without losing context.

We implemented real-time personalization that adapts recommendations based on conversation history, browsing behavior, and purchase patterns—all while respecting privacy preferences.`,
      images: [
        { url: '/images/projects/voxel-chat.jpg', caption: 'Conversational shopping interface' },
        { url: '/images/projects/voxel-recs.jpg', caption: 'Contextual product recommendations' },
      ],
    },
    outcome: {
      title: 'Results & Impact',
      metrics: [
        { value: '32%', label: 'Conversion rate increase' },
        { value: '4.2x', label: 'Products viewed per session' },
        { value: '89%', label: 'User satisfaction' },
      ],
      summary: 'Voxel Commerce has been deployed across 50+ Shopify stores, driving an average 32% increase in conversion rates. Users who engage with the conversational interface show 4.2x higher product discovery and significantly lower bounce rates.',
    },
    nextProjectSlug: 'surfgeo',
    prevProjectSlug: 'aura-health',
  },
];

// Utility functions
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

