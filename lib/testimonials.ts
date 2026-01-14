export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Jainam transformed our entire product strategy. Within 6 months, we saw a 3x increase in user engagement and finally achieved product-market fit.',
    author: 'Sarah Chen',
    role: 'CEO',
    company: 'TechFlow AI',
  },
  {
    id: '2',
    quote: 'The AI features he built into our platform gave us a massive competitive advantage. Our conversion rate jumped 40% in the first quarter.',
    author: 'Marcus Rodriguez',
    role: 'Founder',
    company: 'DataPulse',
  },
  {
    id: '3',
    quote: 'Working with Jainam was like having a technical co-founder. He understood our business goals and delivered solutions that actually moved the needle.',
    author: 'Emily Watson',
    role: 'Head of Product',
    company: 'Elevate Health',
  },
];



