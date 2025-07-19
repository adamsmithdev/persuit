'use client';

import React from 'react';

interface StatusBadgeProps {
  status: string;
  config: {
    emoji: string;
    color: string;
    label?: string;
  };
  size?: 'sm' | 'md';
}

export default function StatusBadge({
  status,
  config,
  size = 'md',
}: Readonly<StatusBadgeProps>) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-xs',
  };

  const displayText = config.label || status;

  // Use primary color as default if no valid color is provided
  const getBackgroundColor = (color: string) => {
    // If it's already a valid CSS class (starts with bg-), use it
    if (color.startsWith('bg-')) {
      return color;
    }

    // Map simple color names to CSS variable classes
    const colorMap: Record<string, string> = {
      red: 'bg-[var(--error)]',
      yellow: 'bg-[var(--warning)]',
      blue: 'bg-[var(--info)]',
      green: 'bg-[var(--success)]',
      gray: 'bg-[var(--foreground-muted)]',
      grey: 'bg-[var(--foreground-muted)]',
    };

    // Return mapped color or default to primary
    return colorMap[color.toLowerCase()] || 'bg-[var(--primary)]';
  };

  const backgroundColor = getBackgroundColor(config.color);

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full font-medium text-white ${backgroundColor} ${sizeClasses[size]}`}
    >
      <span>{config.emoji}</span>
      <span>{displayText}</span>
    </div>
  );
}
