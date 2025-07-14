import { Job } from '@prisma/client';
import React from 'react';
import JobListItem from './JobListItem';

interface Props {
  readonly jobs: Job[];
}

export default function JobList({ jobs }: Props) {
  return (
    <ul className="rounded mt-4 border">
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
    </ul>
  );
}
