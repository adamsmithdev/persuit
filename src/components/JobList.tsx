import { Job } from '@prisma/client';
import React from 'react';
import JobListItem from './JobListItem';

interface Props {
  readonly jobs: Job[];
}

export default function JobList({ jobs }: Props) {
  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
    </div>
  );
}
