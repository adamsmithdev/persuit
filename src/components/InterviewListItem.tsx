'use client';

import React from 'react';
import { ListItem, StatusBadge, Icon } from './ui';
import { getInterviewStatusConfig } from '@/lib/constants';
import {
	faFire,
	faBolt,
	faClock,
	faCalendar,
	faMapMarkerAlt,
	faSyncAlt,
} from '@/lib/fontawesome';

type Interview = {
	id: string;
	date: Date | string;
	time: string | null;
	type: string;
	location: string | null;
	round: number | null;
	status: string;
	application: {
		id: string;
		company: string;
		position: string;
		status: string;
	};
};

interface Props {
	readonly interview: Interview;
}

export default function InterviewListItem({ interview }: Props) {
	// Helper function to parse interview date consistently
	const parseInterviewDate = (interviewDate: Date | string): Date => {
		if (interviewDate instanceof Date) {
			return interviewDate;
		}
		// Handle string date from database - create date in local timezone
		const dateStr = interviewDate.split('T')[0]; // Get just the date part (YYYY-MM-DD)
		return new Date(dateStr + 'T00:00:00'); // Add time to avoid UTC interpretation
	};

	const formatTime = (time: string | null) => {
		if (!time) return '';
		const [hours, minutes] = time.split(':');
		const hour = parseInt(hours);
		const ampm = hour >= 12 ? 'PM' : 'AM';
		const displayHour = hour % 12 || 12;
		return `${displayHour}:${minutes} ${ampm}`;
	};

	const getUrgencyDisplay = (date: Date | string): React.JSX.Element => {
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Reset to midnight for fair comparison

		const compareDate = new Date(date);
		compareDate.setHours(0, 0, 0, 0);

		const diffTime = compareDate.getTime() - today.getTime();
		const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 0)
			return (
				<span className="flex items-center gap-1 text-red-500">
					<Icon icon={faFire} />
					Today
				</span>
			);
		if (diffDays === 1)
			return (
				<span className="flex items-center gap-1 text-orange-500">
					<Icon icon={faBolt} />
					Tomorrow
				</span>
			);
		if (diffDays === -1)
			return (
				<span className="flex items-center gap-1 text-gray-500">
					<Icon icon={faClock} />
					Yesterday
				</span>
			);
		if (diffDays < -1)
			return (
				<span className="flex items-center gap-1 text-gray-500">
					<Icon icon={faClock} />
					{Math.abs(diffDays)} days ago
				</span>
			);
		if (diffDays > 1 && diffDays <= 7)
			return (
				<span className="flex items-center gap-1 text-blue-500">
					<Icon icon={faCalendar} />
					In {diffDays} days
				</span>
			);
		if (diffDays > 7 && diffDays <= 14)
			return (
				<span className="flex items-center gap-1 text-blue-500">
					<Icon icon={faCalendar} />
					In {Math.ceil(diffDays / 7)} week
				</span>
			);
		return (
			<span className="flex items-center gap-1 text-blue-500">
				<Icon icon={faCalendar} />
				{new Date(date).toLocaleDateString()}
			</span>
		);
	};
	const interviewDate = parseInterviewDate(interview.date);
	const today = new Date();
	today.setHours(0, 0, 0, 0); // Reset to midnight for fair comparison

	const isToday = interviewDate.toDateString() === new Date().toDateString();
	const isTomorrow =
		interviewDate.toDateString() ===
		new Date(Date.now() + 86400000).toDateString();
	const isPast = interviewDate < today;

	let cardClassName = '';

	if (isPast) {
		cardClassName = 'opacity-75';
	} else if (isToday) {
		cardClassName = 'border-[var(--error)] border-1';
	} else if (isTomorrow) {
		cardClassName = 'border-[var(--warning)] border-1';
	}

	return (
		<ListItem href={`/interviews/${interview.id}`} className={cardClassName}>
			<div className="flex items-center gap-3 mb-3">
				<StatusBadge
					status={interview.status}
					config={getInterviewStatusConfig(interview.status)}
					size="sm"
				/>
			</div>

			<h3 className="font-semibold text-lg text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
				{interview.application.company}
			</h3>

			<p className="text-[var(--foreground-muted)] font-medium mb-3">
				{interview.application.position}
			</p>

			<div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-[var(--foreground-subtle)]">
				<div className="flex items-center gap-1">
					<span className="font-medium">
						{getUrgencyDisplay(interviewDate)}
					</span>
				</div>

				{interview.time && (
					<div className="flex items-center gap-1">
						<Icon icon={faClock} className="text-blue-500" />
						<span>{formatTime(interview.time)}</span>
					</div>
				)}

				{interview.round && (
					<div className="flex items-center gap-1">
						<Icon icon={faSyncAlt} className="text-purple-500" />
						<span>Round {interview.round}</span>
					</div>
				)}

				{interview.type && (
					<div className="flex items-center gap-1">
						<span className="capitalize">{interview.type.toLowerCase()}</span>
					</div>
				)}
			</div>

			{interview.location && (
				<div className="mt-2 text-xs text-[var(--foreground-muted)] flex items-center gap-1">
					<Icon icon={faMapMarkerAlt} className="text-green-500" />
					<span className="truncate">{interview.location}</span>
				</div>
			)}
		</ListItem>
	);
}
