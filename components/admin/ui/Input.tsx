'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-foreground mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-3 bg-white border rounded-md text-foreground placeholder:text-foreground/40',
            'focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground',
            'transition-colors duration-200',
            error ? 'border-red-500 focus:ring-red-200' : 'border-foreground/20',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        {hint && !error && <p className="mt-1 text-sm text-foreground/60">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

