'use client';

import { useState, useMemo } from 'react';
import { Job } from '@prisma/client';
import Link from 'next/link';
import Button from '@/components/Button';
import JobList from '@/components/JobList';
import DashboardStats from '@/components/DashboardStats';
import SearchAndFilter from '@/components/SearchAndFilter';
import { EmptyState } from './ui';

interface Props {
  readonly jobs: Job[];
}

export default function Dashboard({ jobs }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchQuery === '' ||
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
        <EmptyState
          icon="📝"
          title="Ready to start your job search?"
          description="Track applications, organize interviews, and stay on top of your job search journey with ease."
          actionLabel="Add Your First Job"
          actionHref="/job/new"
          size="lg"
        />
      );
    }

    return (
      <EmptyState
        icon="🔍"
        title="No jobs match your filters"
        description="Try adjusting your search terms or filters to see more results."
        size="md"
      />
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Job Application Dashboard
          </h1>
          <p className="text-[var(--foreground-muted)]">
            Track and manage your job applications in one place
          </p>
        </div>
        <Link href="/job/new">
          <Button size="lg">
            <span className="mr-2">+</span>
            <span>Add New Application</span>
          </Button>
        </Link>
      </div>

      {/* Stats Section */}
      <DashboardStats jobs={jobs} />

      {/* Main Content */}
      <div className="bg-[var(--surface)] rounded-2xl p-6 lg:p-8 border border-[var(--border)] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              Your Applications
            </h2>
            <p className="text-sm text-[var(--foreground-muted)] mt-1">
              {filteredJobs.length} of {jobs.length} applications
            </p>
          </div>
        </div>

        <div className="mb-6">
          <SearchAndFilter
            onSearch={setSearchQuery}
            onFilterStatus={setStatusFilter}
            currentFilter={statusFilter}
          />
        </div>

        {renderJobsContent()}
      </div>
    </div>
  );
}
