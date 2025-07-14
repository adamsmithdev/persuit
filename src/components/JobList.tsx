import { Job } from '@prisma/client';
import React from 'react';
import JobListItem from './JobListItem';

interface Props {
  readonly jobs: Job[];
}

export default function JobList({ jobs }: Props) {
  return (
    <div className="bg-[var(--elementBackground)] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
    </div>
  );
}
