import { Job } from '@prisma/client';
import React from 'react';

interface Props {
  readonly jobs: Job[];
}

export default function DashboardStats({ jobs }: Props) {
  const stats = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalJobs = jobs.length;
  const recentJobs = jobs.filter(job => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return new Date(job.appliedAt) > oneWeekAgo;
  }).length;

  const statItems = [
    { label: 'Total Applications', value: totalJobs, color: 'bg-blue-500', icon: '📊' },
    { label: 'This Week', value: recentJobs, color: 'bg-green-500', icon: '📈' },
    { label: 'Interviews', value: stats.INTERVIEW || 0, color: 'bg-yellow-500', icon: '🎯' },
    { label: 'Offers', value: stats.OFFER || 0, color: 'bg-purple-500', icon: '🎉' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((item) => (
        <div key={item.label} className="bg-[var(--elementBackground)] rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{item.label}</p>
              <p className="text-2xl font-bold text-[var(--foreground)]">{item.value}</p>
            </div>
            <div className="text-2xl">{item.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
