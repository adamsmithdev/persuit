'use client';

import React, { useState } from 'react';

interface Props {
  readonly onSearch: (query: string) => void;
  readonly onFilterStatus: (status: string) => void;
  readonly currentFilter: string;
}

export default function SearchAndFilter({
  onSearch,
  onFilterStatus,
  currentFilter,
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const statusOptions = [
    { value: '', label: 'All Statuses', emoji: '📋' },
    { value: 'WISHLIST', label: 'Wishlist', emoji: '📝' },
    { value: 'APPLIED', label: 'Applied', emoji: '📤' },
    { value: 'INTERVIEW', label: 'Interview', emoji: '🎯' },
    { value: 'OFFER', label: 'Offer', emoji: '🎉' },
    { value: 'REJECTED', label: 'Rejected', emoji: '❌' },
    { value: 'ACCEPTED', label: 'Accepted', emoji: '✅' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-[var(--foreground-muted)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by company or position..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200"
          />
        </div>
      </div>

      <div className="sm:w-56">
        <select
          value={currentFilter}
          onChange={(e) => onFilterStatus(e.target.value)}
          className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] transition-all duration-200 appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.75rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
          }}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.emoji} {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
