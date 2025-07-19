'use client';

import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  hoverable?: boolean;
  clickable?: boolean;
  className?: string;
  variant?: 'default' | 'surface-variant';
}

export default function Card({
  children,
  hoverable = false,
  clickable = false,
  className = '',
  variant = 'default',
}: Readonly<CardProps>) {
  const baseClasses =
    'rounded-xl border border-[var(--border)] shadow-sm transition-all duration-200';

  const variantClasses = {
    default: 'bg-[var(--surface)]',
    'surface-variant': 'bg-[var(--surface-variant)]',
  };

  const interactionClasses = {
    hoverable: hoverable ? 'hover:shadow-md' : '',
    clickable: clickable ? 'hover:border-[var(--primary)] cursor-pointer' : '',
    groupHover: clickable ? 'group-hover:scale-[1.02]' : '',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${interactionClasses.hoverable} ${interactionClasses.clickable} ${interactionClasses.groupHover} ${className}`;

  return <div className={combinedClasses}>{children}</div>;
}
