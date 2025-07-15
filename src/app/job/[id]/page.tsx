import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { getJob } from '@/lib/services/jobsService';
import { DeleteJobButton } from '@/components/DeleteJobButton';
import Button from '@/components/Button';
import { formatStatus } from '@/lib/statusUtils';
import AuthWrapper from '@/components/AuthWrapper';

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    notFound();
  }

  const job = await getJob(params.id, session.user.email);

  if (!job) {
    notFound();
  }

  const statusConfig = {
    WISHLIST: { emoji: '📝', color: 'bg-[var(--foreground-muted)]' },
    APPLIED: { emoji: '📤', color: 'bg-[var(--primary)]' },
    INTERVIEW: { emoji: '🎯', color: 'bg-[var(--warning)]' },
    OFFER: { emoji: '🎉', color: 'bg-[var(--success)]' },
    REJECTED: { emoji: '❌', color: 'bg-[var(--danger)]' },
    ACCEPTED: { emoji: '✅', color: 'bg-[var(--success)]' },
  } as const;

  const config =
    statusConfig[job.status as keyof typeof statusConfig] ||
    statusConfig.WISHLIST;

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
                  <span>{formatStatus(job.status)}</span>
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
            </div>

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
