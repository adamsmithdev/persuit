'use client';

import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search';
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', variant = 'default', error = false, ...props }, ref) => {
    const baseClasses =
      'w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200';

    const variantClasses = {
      default:
        'bg-[var(--surface-variant)] border border-[var(--border)] focus:border-[var(--primary)]',
      search:
        'bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--primary)]',
    };

    const errorClasses = error
      ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]'
      : '';

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${errorClasses} ${className}`;

    return <input ref={ref} className={combinedClasses} {...props} />;
  }
);

Input.displayName = 'Input';

export default Input;
