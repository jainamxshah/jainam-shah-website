import { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact | Jainam Shah',
  description:
    "Let's build something serious. I work with founders and teams building ambitious AI-powered products.",
  openGraph: {
    title: 'Contact | Jainam Shah',
    description: "Let's build something serious.",
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
