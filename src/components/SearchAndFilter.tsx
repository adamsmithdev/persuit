'use client';

import React, { useState } from 'react';

interface Props {
  readonly onSearch: (query: string) => void;
  readonly onFilterStatus: (status: string) => void;
  readonly currentFilter: string;
}

export default function SearchAndFilter({ onSearch, onFilterStatus, currentFilter }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'WISHLIST', label: 'Wishlist' },
    { value: 'APPLIED', label: 'Applied' },
    { value: 'INTERVIEW', label: 'Interview' },
    { value: 'OFFER', label: 'Offer' },
    { value: 'REJECTED', label: 'Rejected' },
    { value: 'ACCEPTED', label: 'Accepted' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search jobs by company or position..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 bg-[var(--elementBackground)] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-[var(--foreground)] placeholder-gray-400"
          />
        </div>
      </div>
      
      <div className="sm:w-48">
        <select
          value={currentFilter}
          onChange={(e) => onFilterStatus(e.target.value)}
          className="w-full px-3 py-2 bg-[var(--elementBackground)] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-[var(--foreground)]"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
