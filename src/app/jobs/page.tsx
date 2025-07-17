'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ClientAuthWrapper } from '@/components/ClientAuthWrapper';
import Link from 'next/link';
import Button from '@/components/Button';
import JobList from '@/components/JobList';
import SearchAndFilter from '@/components/SearchAndFilter';
import { Job } from '@prisma/client';

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
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[var(--surface-variant)] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">�</span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  No applications yet
                </h3>
                <p className="text-[var(--foreground-muted)] mb-8 max-w-md mx-auto leading-relaxed">
                  Start tracking your job search by adding your first
                  application.
                </p>
                <Link href="/job/new">
                  <Button size="lg">
                    <span className="mr-2">+</span>
                    <span>Add Your First Job</span>
                  </Button>
                </Link>
              </div>
            );
          }

          if (filteredJobs.length === 0) {
            return (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[var(--surface-variant)] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">�</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">
                  No jobs match your filters
                </h3>
                <p className="text-[var(--foreground-muted)] max-w-sm mx-auto">
                  Try adjusting your search terms or filters to see more
                  results.
                </p>
              </div>
            );
          }

          return <JobList jobs={filteredJobs} />;
        })()}
      </div>
    </ClientAuthWrapper>
  );
}
