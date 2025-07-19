import { Job } from '@prisma/client';
import React from 'react';
import { StatusBadge, ListItem } from './ui';
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

  const getDaysAgo = (date: Date) => {
    const today = new Date();
    const appliedDate = new Date(date);
    const diffTime = Math.abs(today.getTime() - appliedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return appliedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <ListItem href={`/job/${job.id}`}>
      <div className="flex items-center justify-between mb-3">
        <StatusBadge status={job.status} config={statusConfig} size="sm" />
        {job.applicationDeadline && (
          <div className="text-xs text-[var(--foreground-muted)] flex items-center gap-1">
            <span>⏰</span>
            <span>
              Deadline:{' '}
              {new Date(job.applicationDeadline).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        )}
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
          <span>Applied {getDaysAgo(job.appliedAt)}</span>
        </div>
        {job.companySize && (
          <div className="flex items-center gap-1">
            <span>🏢</span>
            <span className="capitalize">{job.companySize.toLowerCase()}</span>
          </div>
        )}
      </div>
    </ListItem>
  );
}
