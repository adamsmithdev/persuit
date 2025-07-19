'use client';

import React, { useState } from 'react';
import { Input, Select } from '@/components/ui';
import { JOB_STATUS_CONFIG } from '@/lib/constants';

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

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'WISHLIST':
        return 'Wishlist';
      case 'APPLIED':
        return 'Applied';
      case 'INTERVIEW':
        return 'Interview';
      case 'OFFER':
        return 'Offer';
      case 'REJECTED':
        return 'Rejected';
      case 'ACCEPTED':
        return 'Accepted';
      default:
        return status;
    }
  };

  const statusOptions = [
    { value: '', label: 'All Statuses', emoji: '📋' },
    ...Object.entries(JOB_STATUS_CONFIG).map(([value, config]) => ({
      value,
      label: getStatusLabel(value),
      emoji: config.emoji,
    })),
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search by company or position..."
          value={searchQuery}
          onChange={handleSearchChange}
          variant="search"
        />
      </div>

      <div className="sm:w-56">
        <Select
          value={currentFilter}
          onChange={(e) => onFilterStatus(e.target.value)}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.emoji} {option.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
