'use client';

import React, { useState } from 'react';
import { Input, Select } from '@/components/ui';
import { APPLICATION_STATUS_CONFIG } from '@/lib/constants';
import { faClipboard } from '@/lib/fontawesome';

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
		{ value: '', label: 'All Statuses', icon: faClipboard },
		...Object.entries(APPLICATION_STATUS_CONFIG).map(([value, config]) => ({
			value,
			label: config.label,
			icon: config.icon,
		})),
	];

	return (
		<div className="flex flex-col sm:flex-row gap-4">
			<div className="flex-1">
				<Input
					type="text"
					placeholder="Search by company, position, location, industry, or contact..."
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
							{option.label}
						</option>
					))}
				</Select>
			</div>
		</div>
	);
}
