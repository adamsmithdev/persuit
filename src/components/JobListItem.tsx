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

  return (
    <ListItem href={`/job/${job.id}`}>
      <div className="flex items-center gap-3 mb-3">
        <StatusBadge status={job.status} config={statusConfig} size="sm" />
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
    </ListItem>
  );
}
