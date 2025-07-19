'use client';

import React from 'react';

interface StatusBadgeProps {
  status: string;
  config: {
    emoji: string;
    color: string;
  };
  formatter?: (status: string) => string;
  size?: 'sm' | 'md';
}

export default function StatusBadge({
  status,
  config,
  formatter,
  size = 'md',
}: Readonly<StatusBadgeProps>) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-xs',
  };

  const displayText = formatter ? formatter(status) : status;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full font-medium text-white ${config.color} ${sizeClasses[size]}`}
    >
      <span>{config.emoji}</span>
      <span>{displayText}</span>
    </div>
  );
}
