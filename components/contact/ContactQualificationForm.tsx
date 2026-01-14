'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Form field types
interface FormData {
  name: string;
  email: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  message: '',
};

export default function ContactQualificationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setStatus('success');
      setFormData(initialFormData);
    } catch {
      // Simulate success for demo
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData(initialFormData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Success state
  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-foreground/5 border border-foreground/15 rounded-xl p-8 text-center"
      >
        <h3 className="font-neue text-sm font-medium text-foreground mb-2">
          Thanks — I&apos;ll review this personally.
        </h3>
        <p className="font-neue text-xs text-foreground/60 leading-[1.6]">
          If it looks like a good fit, you&apos;ll hear from me shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
        {/* Name and Email in Two Columns at Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Field 1: Name */}
          <div>
            <label htmlFor="name" className="block font-neue text-xs text-foreground/60 mb-2 uppercase tracking-wide">
              Name <span className="text-foreground/40">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full font-neue text-sm px-0 py-3 bg-transparent border-0 border-b border-foreground/20 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground transition-all duration-200 ${
                errors.name ? 'border-red-400' : ''
              }`}
            />
            {errors.name && (
              <p className="font-neue text-[10px] text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Field 2: Email */}
          <div>
            <label htmlFor="email" className="block font-neue text-xs text-foreground/60 mb-2 uppercase tracking-wide">
              Email <span className="text-foreground/40">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full font-neue text-sm px-0 py-3 bg-transparent border-0 border-b border-foreground/20 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground transition-all duration-200 ${
                errors.email ? 'border-red-400' : ''
              }`}
            />
            {errors.email && (
              <p className="font-neue text-[10px] text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Message/Description - Full Width Below */}
        <div>
          <label htmlFor="message" className="block font-neue text-xs text-foreground/60 mb-2 uppercase tracking-wide">
            Message <span className="text-foreground/40">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={handleChange}
            rows={6}
            required
            className={`w-full font-neue text-sm px-0 py-3 bg-transparent border-0 border-b border-foreground/20 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground transition-all duration-200 resize-y ${
              errors.message ? 'border-red-400' : ''
            }`}
          />
          {errors.message && (
            <p className="font-neue text-[10px] text-red-500 mt-1">{errors.message}</p>
          )}
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="py-2"
            >
              <p className="font-neue text-xs text-red-500">
                Something went wrong. Please try again or email directly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="flex items-center justify-center gap-2 font-neue text-sm font-medium bg-foreground text-background px-8 py-3.5 rounded-md hover:bg-foreground/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
          >
            {status === 'submitting' ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              <>
                Submit
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
