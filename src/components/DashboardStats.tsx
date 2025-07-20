import { Application } from '@prisma/client';
import React from 'react';

interface Props {
  readonly applications: Application[];
}

export default function DashboardStats({ applications }: Props) {
  const stats = applications.reduce((acc, application) => {
    acc[application.status] = (acc[application.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalApplications = applications.length;
  const recentApplications = applications.filter((application) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return new Date(application.appliedAt) > oneWeekAgo;
  }).length;

  const statItems = [
    {
      label: 'Total Applications',
      value: totalApplications,
      gradient: 'from-[var(--primary)] to-[var(--info)]',
      icon: '📊',
      description: 'All time applications',
    },
    {
      label: 'This Week',
      value: recentApplications,
      gradient: 'from-[var(--success)] to-emerald-400',
      icon: '📈',
      description: 'Recent activity',
    },
    {
      label: 'Interviews',
      value: stats.INTERVIEW || 0,
      gradient: 'from-[var(--warning)] to-orange-400',
      icon: '🎯',
      description: 'In progress',
    },
    {
      label: 'Offers',
      value: stats.OFFER || 0,
      gradient: 'from-purple-500 to-pink-500',
      icon: '🎉',
      description: 'Received offers',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item) => (
        <div key={item.label} className="group">
          <div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)] shadow-sm hover:shadow-md transition-all duration-200 group-hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-sm`}
              >
                <span className="text-xl">{item.icon}</span>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[var(--foreground)] mb-1">
                  {item.value}
                </p>
                <p className="text-xs text-[var(--foreground-subtle)]">
                  {item.description}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--foreground-muted)]">
                {item.label}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
