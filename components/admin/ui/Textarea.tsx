'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  maxLength?: number;
  showCount?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, maxLength, showCount, value, ...props }, ref) => {
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-foreground mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          value={value}
          maxLength={maxLength}
          className={cn(
            'w-full px-4 py-3 bg-white border rounded-md text-foreground placeholder:text-foreground/40',
            'focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground',
            'transition-colors duration-200 resize-y min-h-[100px]',
            error ? 'border-red-500 focus:ring-red-200' : 'border-foreground/20',
            className
          )}
          {...props}
        />
        <div className="flex justify-between mt-1">
          {error && <p className="text-sm text-red-500">{error}</p>}
          {hint && !error && <p className="text-sm text-foreground/60">{hint}</p>}
          {showCount && maxLength && (
            <p className={cn('text-sm ml-auto', charCount > maxLength ? 'text-red-500' : 'text-foreground/60')}>
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;

