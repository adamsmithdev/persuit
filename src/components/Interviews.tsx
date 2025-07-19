'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EmptyState } from '@/components/ui';

type Interview = {
  id: string;
  date: Date | string;
  time: string | null;
  type: string;
  location: string | null;
  round: number | null;
  status: string;
  job: {
    id: string;
    company: string;
    position: string;
    status: string;
  };
};

type InterviewsProps = {
  interviews: Interview[];
};

export default function Interviews({ interviews }: Readonly<InterviewsProps>) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'today'>(
    'upcoming'
  );

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

  const getTypeIcon = (type: string | null) => {
    switch (type) {
      case 'PHONE':
        return '📞';
      case 'VIDEO':
        return '💻';
      case 'ONSITE':
        return '🏢';
      case 'VIRTUAL':
        return '🌐';
      case 'GROUP':
        return '👥';
      case 'TECHNICAL':
        return '⚙️';
      case 'BEHAVIORAL':
        return '🗣️';
      case 'FINAL':
        return '🎯';
      default:
        return '📅';
    }
  };

  const formatRelativeDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);

    const diffTime = compareDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '🔥 Today';
    if (diffDays === 1) return '⚡ Tomorrow';
    if (diffDays === -1) return '🕒 Yesterday';
    if (diffDays < -1) return `🕒 ${Math.abs(diffDays)} days ago`;
    if (diffDays <= 7) return `📅 In ${diffDays} days`;
    if (diffDays <= 14) return `📅 In ${Math.ceil(diffDays / 7)} week`;
    return `📅 ${date.toLocaleDateString()}`;
  };

  // Filter interviews based on selected filter
  const getFilteredInterviews = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return interviews
      .filter((interview) => {
        const interviewDate = parseInterviewDate(interview.date);
        interviewDate.setHours(0, 0, 0, 0);

        switch (filter) {
          case 'today':
            return interviewDate.getTime() === today.getTime();
          case 'upcoming':
            return interviewDate >= now;
          case 'all':
          default:
            return true;
        }
      })
      .sort((a, b) => {
        const dateA = parseInterviewDate(a.date);
        const dateB = parseInterviewDate(b.date);
        return dateA.getTime() - dateB.getTime();
      });
  };

  const filteredInterviews = getFilteredInterviews();
  const totalInterviews = interviews.length;
  const upcomingCount = interviews.filter((interview) => {
    const interviewDate = parseInterviewDate(interview.date);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return interviewDate >= now;
  }).length;
  const todayCount = interviews.filter((interview) => {
    const interviewDate = parseInterviewDate(interview.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    interviewDate.setHours(0, 0, 0, 0);
    return interviewDate.getTime() === today.getTime();
  }).length;

  return (
    <div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)] shadow-lg">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              Interview Schedule
            </h2>
            <p className="text-[var(--foreground-muted)]">
              Your upcoming interviews and appointments
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex bg-[var(--surface-variant)] rounded-lg p-1 border border-[var(--border)]">
          <button
            onClick={() => setFilter('today')}
            className={`px-3 py-1 rounded-l-md text-sm font-medium transition-all ${
              filter === 'today'
                ? 'bg-[var(--error)] text-white shadow-sm'
                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
            }`}
          >
            Today ({todayCount})
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-3 py-1 text-sm font-medium transition-all ${
              filter === 'upcoming'
                ? 'bg-[var(--primary)] text-white shadow-sm'
                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
            }`}
          >
            Upcoming ({upcomingCount})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-r-md text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-[var(--info)] text-white shadow-sm'
                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
            }`}
          >
            All ({totalInterviews})
          </button>
        </div>
      </div>

      {/* Interview List */}
      <div className="space-y-3">
        {filteredInterviews.length === 0
          ? (() => {
              const getEmptyStateProps = () => {
                switch (filter) {
                  case 'today':
                    return {
                      title: 'No interviews today',
                      description: 'Enjoy your day off!',
                    };
                  case 'upcoming':
                    return {
                      title: 'No upcoming interviews',
                      description:
                        'Add interview details to your job applications to see them here',
                    };
                  default:
                    return {
                      title: 'No interviews scheduled',
                      description:
                        'Add interview details to your job applications to see them here',
                    };
                }
              };

              const { title, description } = getEmptyStateProps();

              return (
                <EmptyState
                  icon="📅"
                  title={title}
                  description={description}
                  actionLabel="Schedule Interview"
                  actionHref="/interviews/new"
                />
              );
            })()
          : filteredInterviews.map((interview) => {
              const interviewDate = parseInterviewDate(interview.date);
              const isToday =
                interviewDate.toDateString() === new Date().toDateString();
              const isTomorrow =
                interviewDate.toDateString() ===
                new Date(Date.now() + 86400000).toDateString();
              const isPast = interviewDate < new Date();

              let cardStyle =
                'bg-[var(--surface-variant)] border-[var(--border)]';
              if (isToday) {
                cardStyle =
                  'bg-[var(--surface-variant)] border-[var(--error)] border-2';
              } else if (isTomorrow) {
                cardStyle =
                  'bg-[var(--surface-variant)] border-[var(--warning)] border-2';
              } else if (isPast) {
                cardStyle =
                  'bg-[var(--surface-variant)] border-[var(--border)] opacity-75';
              }

              return (
                <div
                  key={interview.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md ${cardStyle}`}
                >
                  {/* Interview Type Icon */}
                  <div className="flex-shrink-0">
                    <span className="text-2xl">
                      {getTypeIcon(interview.type)}
                    </span>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[var(--foreground)] truncate">
                        {interview.job.company}
                      </h3>
                      <span className="text-[var(--foreground-muted)]">•</span>
                      <span className="text-[var(--foreground-muted)] truncate">
                        {interview.job.position}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-[var(--foreground-muted)]">
                      <span className="font-medium">
                        {formatRelativeDate(interviewDate)}
                      </span>

                      {interview.time && (
                        <>
                          <span>•</span>
                          <span>{formatTime(interview.time)}</span>
                        </>
                      )}

                      {interview.round && (
                        <>
                          <span>•</span>
                          <span>Round {interview.round}</span>
                        </>
                      )}

                      {interview.type && (
                        <>
                          <span>•</span>
                          <span className="capitalize">
                            {interview.type.toLowerCase()}
                          </span>
                        </>
                      )}
                    </div>

                    {interview.location && (
                      <div className="mt-1 text-xs text-[var(--foreground-muted)] flex items-center gap-1">
                        <span>📍</span>
                        <span className="truncate">{interview.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/job/${interview.job.id}`}
                      className="px-3 py-1 text-xs rounded-md bg-[var(--primary)] bg-opacity-10 text-white hover:bg-opacity-20 transition-all"
                    >
                      View Job
                    </Link>

                    <Link
                      href={`/interviews/${interview.id}/edit`}
                      className="px-3 py-1 text-xs rounded-md bg-[var(--surface-variant)] text-[var(--foreground-muted)] hover:bg-[var(--border)] transition-all"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              );
            })}
      </div>

      {/* Quick Actions */}
      {filteredInterviews.length > 0 && (
        <div className="mt-6 pt-6 border-t border-[var(--border)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-[var(--foreground-muted)]">
              Showing {filteredInterviews.length} of {totalInterviews} total
              interviews
            </div>

            <div className="flex gap-2">
              <Link
                href="/interviews/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-opacity-90 transition-all text-sm font-medium"
              >
                <span>+</span>
                <span>Schedule Interview</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
