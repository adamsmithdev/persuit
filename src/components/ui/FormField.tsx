'use client';

import React, { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  required?: boolean;
  children: ReactNode;
  description?: string;
  error?: string;
}

export default function FormField({
  label,
  id,
  required = false,
  children,
  description,
  error,
}: Readonly<FormFieldProps>) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--foreground)] mb-2"
      >
        {label} {required && '*'}
      </label>
      {description && (
        <p className="text-xs text-[var(--foreground-muted)] mb-2">
          {description}
        </p>
      )}
      {children}
      {error && <p className="text-xs text-[var(--error)] mt-1">{error}</p>}
    </div>
  );
}
