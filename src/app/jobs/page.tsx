'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ClientAuthWrapper } from '@/components/ClientAuthWrapper';
import Link from 'next/link';
import Button from '@/components/Button';
import JobList from '@/components/JobList';
import SearchAndFilter from '@/components/SearchAndFilter';
import { Job } from '@prisma/client';
import { EmptyState } from '@/components/ui';

export default function JobsPage() {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch jobs
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/job');
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [session]);

  // Filter jobs based on search and status
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.notes?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = !statusFilter || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchQuery, statusFilter]);

  if (loading) {
    return (
      <ClientAuthWrapper>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-[var(--foreground-muted)]">
            Loading applications...
          </div>
        </div>
      </ClientAuthWrapper>
    );
  }

  return (
    <ClientAuthWrapper>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">
              All Applications
            </h1>
            <p className="text-[var(--foreground-muted)] mt-2">
              Manage and track all your job applications ({jobs.length} total)
            </p>
          </div>
          <Link href="/job/new">
            <Button size="lg">
              <span className="mr-2">+</span>
              <span>Add New Application</span>
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        {jobs.length > 0 && (
          <SearchAndFilter
            onSearch={setSearchQuery}
            onFilterStatus={setStatusFilter}
            currentFilter={statusFilter}
          />
        )}

        {/* Jobs List */}
        {(() => {
          if (jobs.length === 0) {
            return (
              <EmptyState
                icon="📄"
                title="No applications yet"
                description="Start tracking your job search by adding your first application."
                actionLabel="Add Your First Job"
                actionHref="/job/new"
              />
            );
          }

          if (filteredJobs.length === 0) {
            return (
              <EmptyState
                icon="🔍"
                title="No jobs match your filters"
                description="Try adjusting your search terms or filters to see more results."
              />
            );
          }

          return <JobList jobs={filteredJobs} />;
        })()}
      </div>
    </ClientAuthWrapper>
  );
}
