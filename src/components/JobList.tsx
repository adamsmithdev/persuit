import { Job } from '@prisma/client';
import React from 'react';
import JobListItem from './JobListItem';
import { List } from './ui';

interface Props {
  readonly jobs: Job[];
}

export default function JobList({ jobs }: Props) {
  return (
    <List>
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
    </List>
  );
}
