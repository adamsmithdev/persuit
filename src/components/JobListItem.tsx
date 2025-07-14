import { Job } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { getStatusColor, formatStatus } from '@/lib/statusUtils';

interface Props {
  readonly job: Job;
}

export default function JobListItem({ job }: Props) {
  const statusColor = getStatusColor(job.status);
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <Link href={`/job/${job.id}`} className="block p-4 hover:bg-[var(--elementBackground)] transition-colors duration-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-lg text-[var(--foreground)]">
                {job.position}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${statusColor}`}>
                {formatStatus(job.status)}
              </span>
            </div>
            <p className="text-[var(--accent)] font-medium mb-1">{job.company}</p>
            {job.location && (
              <p className="text-sm text-gray-400 mb-2">📍 {job.location}</p>
            )}
            <p className="text-xs text-gray-500">
              Applied: {new Date(job.appliedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}
