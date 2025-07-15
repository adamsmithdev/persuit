import { Job } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { formatStatus } from '@/lib/statusUtils';

interface Props {
  readonly job: Job;
}

export default function JobListItem({ job }: Props) {
  const statusConfig = {
    WISHLIST: { emoji: '📝', color: 'bg-[var(--foreground-muted)]' },
    APPLIED: { emoji: '📤', color: 'bg-[var(--primary)]' },
    INTERVIEW: { emoji: '🎯', color: 'bg-[var(--warning)]' },
    OFFER: { emoji: '🎉', color: 'bg-[var(--success)]' },
    REJECTED: { emoji: '❌', color: 'bg-[var(--danger)]' },
    ACCEPTED: { emoji: '✅', color: 'bg-[var(--success)]' },
  } as const;

  const config =
    statusConfig[job.status as keyof typeof statusConfig] ||
    statusConfig.WISHLIST;

  return (
    <Link href={`/job/${job.id}`} className="block group">
      <div className="bg-[var(--surface-variant)] rounded-xl p-6 border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md transition-all duration-200 group-hover:scale-[1.02]">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white ${config.color}`}
              >
                <span>{config.emoji}</span>
                <span>{formatStatus(job.status)}</span>
              </div>
            </div>

            <h3 className="font-semibold text-lg text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
              {job.position}
            </h3>

            <p className="text-[var(--foreground-muted)] font-medium mb-3">
              {job.company}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-[var(--foreground-subtle)]">
              {job.location && (
                <div className="flex items-center gap-1">
                  <span>📍</span>
                  <span>{job.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <span>📅</span>
                <span>
                  Applied{' '}
                  {new Date(job.appliedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 ml-4">
            <div className="w-8 h-8 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:border-[var(--primary)] transition-all duration-200">
              <svg
                className="w-4 h-4 text-[var(--foreground-muted)] group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
