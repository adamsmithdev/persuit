import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { getJob } from '@/lib/services/jobsService';
import { DeleteJobButton } from '@/components/DeleteJobButton';
import Button from '@/components/Button';
import { getJobStatusConfig } from '@/lib/constants';
import AuthWrapper from '@/components/AuthWrapper';

interface JobDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    notFound();
  }

  const job = await getJob(id, session.user.email);

  if (!job) {
    notFound();
  }

  const config = getJobStatusConfig(job.status);

  return (
    <AuthWrapper>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">
              Application Details
            </h1>
            <p className="text-[var(--foreground-muted)] mt-2">
              View and manage this job application
            </p>
          </div>
          <Link href="/">
            <Button variant="secondary">
              <span className="mr-2">←</span>
              <span>Back to Dashboard</span>
            </Button>
          </Link>
        </div>

        <div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)] shadow-sm">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="space-y-4 flex-1">
              <div>
                <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                  {job.position}
                </h2>
                <p className="text-xl text-[var(--primary)] font-semibold">
                  {job.company}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white ${config.color}`}
                >
                  <span>{config.emoji}</span>
                  <span>{config.label}</span>
                </div>
                {job.location && (
                  <div className="flex items-center gap-2 text-[var(--foreground-muted)]">
                    <span>📍</span>
                    <span>{job.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div className="bg-[var(--surface-variant)] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide mb-3">
                  Timeline
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-[var(--foreground-muted)] mb-1">
                      Applied Date
                    </p>
                    <p className="text-[var(--foreground)] font-medium">
                      {new Date(job.appliedAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  {job.applicationDeadline && (
                    <div>
                      <p className="text-sm text-[var(--foreground-muted)] mb-1">
                        Application Deadline
                      </p>
                      <p className="text-[var(--foreground)] font-medium">
                        {new Date(job.applicationDeadline).toLocaleDateString(
                          'en-US',
                          {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-[var(--foreground-muted)] mb-1">
                      Last Updated
                    </p>
                    <p className="text-[var(--foreground)] font-medium">
                      {new Date(job.updatedAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Company & Job Details */}
              <div className="bg-[var(--surface-variant)] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide mb-3">
                  Job Details
                </h3>
                <div className="space-y-4">
                  {(job.salaryMin || job.salaryMax) && (
                    <div>
                      <p className="text-sm text-[var(--foreground-muted)] mb-1">
                        Salary Range
                      </p>
                      <p className="text-[var(--foreground)] font-medium">
                        {(() => {
                          if (job.salaryMin && job.salaryMax) {
                            return `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}`;
                          } else if (job.salaryMin) {
                            return `$${job.salaryMin.toLocaleString()}+`;
                          } else {
                            return `Up to $${job.salaryMax?.toLocaleString()}`;
                          }
                        })()}
                      </p>
                    </div>
                  )}

                  {job.companySize && (
                    <div>
                      <p className="text-sm text-[var(--foreground-muted)] mb-1">
                        Company Size
                      </p>
                      <p className="text-[var(--foreground)] font-medium">
                        {job.companySize === 'STARTUP' &&
                          '🚀 Startup (1-10 employees)'}
                        {job.companySize === 'SMALL' &&
                          '🏢 Small (11-50 employees)'}
                        {job.companySize === 'MEDIUM' &&
                          '🏬 Medium (51-200 employees)'}
                        {job.companySize === 'LARGE' &&
                          '🏭 Large (201-1000 employees)'}
                        {job.companySize === 'ENTERPRISE' &&
                          '🏗️ Enterprise (1000+ employees)'}
                      </p>
                    </div>
                  )}

                  {job.industry && (
                    <div>
                      <p className="text-sm text-[var(--foreground-muted)] mb-1">
                        Industry
                      </p>
                      <p className="text-[var(--foreground)] font-medium">
                        {job.industry}
                      </p>
                    </div>
                  )}

                  {job.jobUrl && (
                    <div>
                      <p className="text-sm text-[var(--foreground-muted)] mb-1">
                        Job Posting
                      </p>
                      <a
                        href={job.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--primary)] hover:underline font-medium"
                      >
                        View Original Posting ↗
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Contact Information */}
              {(job.contactName || job.contactEmail || job.contactPhone) && (
                <div className="bg-[var(--surface-variant)] rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide mb-3">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    {job.contactName && (
                      <div>
                        <p className="text-sm text-[var(--foreground-muted)] mb-1">
                          Contact Person
                        </p>
                        <p className="text-[var(--foreground)] font-medium">
                          {job.contactName}
                        </p>
                      </div>
                    )}

                    {job.contactEmail && (
                      <div>
                        <p className="text-sm text-[var(--foreground-muted)] mb-1">
                          Email
                        </p>
                        <a
                          href={`mailto:${job.contactEmail}`}
                          className="text-[var(--primary)] hover:underline font-medium"
                        >
                          {job.contactEmail}
                        </a>
                      </div>
                    )}

                    {job.contactPhone && (
                      <div>
                        <p className="text-sm text-[var(--foreground-muted)] mb-1">
                          Phone
                        </p>
                        <a
                          href={`tel:${job.contactPhone}`}
                          className="text-[var(--primary)] hover:underline font-medium"
                        >
                          {job.contactPhone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {job.notes && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide">
                    Notes
                  </h3>
                  <div className="bg-[var(--surface-variant)] rounded-xl p-6 border border-[var(--border)]">
                    <p className="whitespace-pre-line text-[var(--foreground)] leading-relaxed">
                      {job.notes}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[var(--border)]">
            <Link href={`/job/${job.id}/edit`}>
              <Button>
                <span className="mr-2">✏️</span>
                <span>Edit Application</span>
              </Button>
            </Link>
            <DeleteJobButton jobId={job.id} />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}
