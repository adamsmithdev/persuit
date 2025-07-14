'use client';

import { useState, useMemo } from 'react';
import { Job } from '@prisma/client';
import Link from 'next/link';
import Button from '@/components/Button';
import JobList from '@/components/JobList';
import DashboardStats from '@/components/DashboardStats';
import SearchAndFilter from '@/components/SearchAndFilter';

interface Props {
  readonly jobs: Job[];
}

export default function Dashboard({ jobs }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = searchQuery === '' || 
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.position.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === '' || job.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchQuery, statusFilter]);

  const renderJobsContent = () => {
    if (filteredJobs.length > 0) {
      return <JobList jobs={filteredJobs} />;
    }
    
    if (jobs.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
            No job applications yet
          </h3>
          <p className="text-gray-400 mb-6">
            Start tracking your job applications to stay organized and increase your chances of success.
          </p>
          <Link href="/job/new">
            <Button>Add Your First Job</Button>
          </Link>
        </div>
      );
    }
    
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
          No jobs match your filters
        </h3>
        <p className="text-gray-400">
          Try adjusting your search terms or filters to see more results.
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Dashboard</h1>
          <p className="text-gray-400 mt-1">Track and manage your job applications</p>
        </div>
        <Link href="/job/new">
          <Button>
            + Add Job
          </Button>
        </Link>
      </div>

      <DashboardStats jobs={jobs} />

      <div className="bg-[var(--elementBackground)] rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Your Applications ({filteredJobs.length})
          </h2>
        </div>

        <SearchAndFilter
          onSearch={setSearchQuery}
          onFilterStatus={setStatusFilter}
          currentFilter={statusFilter}
        />

        {renderJobsContent()}
      </div>
    </div>
  );
}
