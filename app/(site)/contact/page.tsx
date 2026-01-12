import { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Start a Project – Jainam Shah',
  description:
    "Let's build something that wins. Get in touch to discuss your product.",
  openGraph: {
    title: 'Start a Project – Jainam Shah',
    description: "Let's build something that wins. Get in touch to discuss your product.",
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
