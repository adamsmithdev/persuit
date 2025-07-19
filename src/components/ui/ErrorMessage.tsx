'use client';

import React from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export default function ErrorMessage({
  message,
  className = '',
}: Readonly<ErrorMessageProps>) {
  return (
    <div
      className={`mb-6 p-4 bg-[var(--error)] bg-opacity-10 border border-[var(--error)] rounded-xl ${className}`}
    >
      <p className="text-[var(--error)] text-sm">{message}</p>
    </div>
  );
}
