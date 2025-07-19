import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { getInterviewById } from '@/lib/services/interviewsService';
import { DeleteInterviewButton } from '@/components/DeleteInterviewButton';
import Button from '@/components/Button';
import { getInterviewStatusConfig } from '@/lib/constants';
import AuthWrapper from '@/components/AuthWrapper';

interface InterviewDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function InterviewDetailPage({
  params,
}: InterviewDetailPageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    notFound();
  }

  const interview = await getInterviewById(id, session.user.email);

  if (!interview) {
    notFound();
  }

  const config = getInterviewStatusConfig(interview.status);

  // Helper function to parse interview date consistently
  const parseInterviewDate = (interviewDate: Date | string): Date => {
    if (interviewDate instanceof Date) {
      return interviewDate;
    }
    // Handle string date from database - create date in local timezone
    const dateStr = interviewDate.split('T')[0]; // Get just the date part (YYYY-MM-DD)
    return new Date(dateStr + 'T00:00:00'); // Add time to avoid UTC interpretation
  };

  const formatTime = (time: string | null) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const interviewDate = parseInterviewDate(interview.date);

  return (
    <AuthWrapper>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">
              Interview Details
            </h1>
            <p className="text-[var(--foreground-muted)] mt-2">
              View and manage this interview
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/interviews">
              <Button variant="secondary">
                <span className="mr-2">←</span>
                <span>Back to Interviews</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)] shadow-sm">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="space-y-4 flex-1">
              <div>
                <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                  {interview.job.company}
                </h2>
                <p className="text-xl text-[var(--primary)] font-semibold">
                  {interview.job.position}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white ${config.color}`}
                >
                  <span>{config.emoji}</span>
                  <span>{config.label}</span>
                </div>
                {interview.type && (
                  <div className="flex items-center gap-2 text-[var(--foreground-muted)]">
                    <span>💼</span>
                    <span className="capitalize">
                      {interview.type.toLowerCase()}
                    </span>
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
                  Schedule
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-[var(--foreground-muted)] mb-1">
                      Date
                    </p>
                    <p className="text-[var(--foreground)] font-medium">
                      {interviewDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  {interview.time && (
                    <div>
                      <p className="text-sm text-[var(--foreground-muted)] mb-1">
                        Time
                      </p>
                      <p className="text-[var(--foreground)] font-medium">
                        {formatTime(interview.time)}
                      </p>
                    </div>
                  )}

                  {interview.duration && (
                    <div>
                      <p className="text-sm text-[var(--foreground-muted)] mb-1">
                        Duration
                      </p>
                      <p className="text-[var(--foreground)] font-medium">
                        {interview.duration} minutes
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {interview.location && (
                <div className="bg-[var(--surface-variant)] rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide mb-3">
                    Location
                  </h3>
                  <p className="text-[var(--foreground)] font-medium">
                    {interview.location}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {interview.round && (
                <div className="bg-[var(--surface-variant)] rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide mb-3">
                    Interview Round
                  </h3>
                  <p className="text-[var(--foreground)] font-medium">
                    Round {interview.round}
                  </p>
                </div>
              )}

              <div className="bg-[var(--surface-variant)] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide mb-3">
                  Related Job Application
                </h3>
                <div>
                  <Link href={`/job/${interview.job.id}`}>
                    <Button variant="secondary">
                      <span className="mr-2">🔗</span>
                      <span>View Job Application</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {interview.notes && (
            <div className="mb-8">
              <div className="bg-[var(--surface-variant)] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide mb-3">
                  Notes
                </h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-[var(--foreground)] whitespace-pre-wrap">
                    {interview.notes}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[var(--border)]">
            <Link
              href={`/interviews/${interview.id}/edit`}
              className="flex-1 sm:flex-none"
            >
              <Button fullWidth>
                <span className="mr-2">✏️</span>
                <span>Edit Interview</span>
              </Button>
            </Link>
            <div className="flex-1 sm:flex-none">
              <DeleteInterviewButton interviewId={interview.id} />
            </div>
          </div>

          {/* Metadata */}
          {/* <div className="pt-6 border-t border-[var(--border)]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-[var(--foreground-muted)]">
              <div>
                <span>Interview created on </span>
                <span className="font-medium">
                  {new Date(interview.createdAt).toLocaleDateString()}
                </span>
              </div>
              {interview.updatedAt !== interview.createdAt && (
                <div>
                  <span>Last updated on </span>
                  <span className="font-medium">
                    {new Date(interview.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </AuthWrapper>
  );
}
