import { Job } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { formatStatus } from '@/lib/statusUtils';
import { StatusBadge, Card } from './ui';
import { getJobStatusConfig } from '@/lib/constants';

interface Props {
  readonly job: Job;
}

export default function JobListItem({ job }: Props) {
  const statusConfig = getJobStatusConfig(job.status);

  const renderSalaryInfo = () => {
    if (!job.salaryMin && !job.salaryMax) return null;

    let salaryText = '';
    if (job.salaryMin && job.salaryMax) {
      salaryText = `$${(job.salaryMin / 1000).toFixed(0)}k - $${(
        job.salaryMax / 1000
      ).toFixed(0)}k`;
    } else if (job.salaryMin) {
      salaryText = `$${(job.salaryMin / 1000).toFixed(0)}k+`;
    } else {
      salaryText = `Up to $${(job.salaryMax! / 1000).toFixed(0)}k`;
    }

    return (
      <div className="flex items-center gap-1">
        <span>💰</span>
        <span>{salaryText}</span>
      </div>
    );
  };

  return (
    <Link href={`/job/${job.id}`} className="block group">
      <Card variant="surface-variant" hoverable clickable className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <StatusBadge
                status={job.status}
                config={statusConfig}
                formatter={formatStatus}
                size="sm"
              />
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
              {renderSalaryInfo()}
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
      </Card>
    </Link>
  );
}
