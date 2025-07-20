import { Application } from '@prisma/client';
import React from 'react';
import { StatusBadge, ListItem } from './ui';
import { getApplicationStatusConfig } from '@/lib/constants';

interface Props {
  readonly application: Application;
}

export default function ApplicationListItem({ application }: Props) {
  const statusConfig = getApplicationStatusConfig(application.status);

  const renderSalaryInfo = () => {
    if (!application.salaryMin && !application.salaryMax) return null;

    let salaryText = '';
    if (application.salaryMin && application.salaryMax) {
      salaryText = `$${(application.salaryMin / 1000).toFixed(0)}k - $${(
        application.salaryMax / 1000
      ).toFixed(0)}k`;
    } else if (application.salaryMin) {
      salaryText = `$${(application.salaryMin / 1000).toFixed(0)}k+`;
    } else {
      salaryText = `Up to $${(application.salaryMax! / 1000).toFixed(0)}k`;
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
    <ListItem href={`/application/${application.id}`}>
      <div className="flex items-center justify-between mb-3">
        <StatusBadge
          status={application.status}
          config={statusConfig}
          size="sm"
        />
        {application.applicationDeadline && (
          <div className="text-xs text-[var(--foreground-muted)] flex items-center gap-1">
            <span>⏰</span>
            <span>
              Deadline:{' '}
              {new Date(application.applicationDeadline).toLocaleDateString(
                'en-US',
                {
                  month: 'short',
                  day: 'numeric',
                }
              )}
            </span>
          </div>
        )}
      </div>

      <h3 className="font-semibold text-lg text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
        {application.position}
      </h3>

      <p className="text-[var(--foreground-muted)] font-medium mb-3">
        {application.company}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-[var(--foreground-subtle)]">
        {application.location && (
          <div className="flex items-center gap-1">
            <span>📍</span>
            <span>{application.location}</span>
          </div>
        )}
        {renderSalaryInfo()}
        <div className="flex items-center gap-1">
          <span>📅</span>
          <span>Applied {getDaysAgo(application.appliedAt)}</span>
        </div>
        {application.companySize && (
          <div className="flex items-center gap-1">
            <span>🏢</span>
            <span className="capitalize">
              {application.companySize.toLowerCase()}
            </span>
          </div>
        )}
      </div>
    </ListItem>
  );
}
