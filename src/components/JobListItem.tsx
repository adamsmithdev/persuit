import { Job } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface Props {
  readonly job: Job;
}

export default function JobListItem({ job }: Props) {
  return (
    <li
      key={job.id}
      className="p-4 hover:bg-[var(--elementBackground)] transition"
    >
      <Link href={`/job/${job.id}`} className="block">
        <p className="font-semibold">
          {job.position} @ {job.company}
        </p>
        <p className="text-sm text-gray-400">{job.status}</p>
      </Link>
    </li>
  );
}
