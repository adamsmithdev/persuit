import AuthWrapper from '@/components/AuthWrapper';
import Link from 'next/link';
import Button from '@/components/Button';

export default function CalendarPage() {
  return (
    <AuthWrapper>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">
              Interview Calendar
            </h1>
            <p className="text-[var(--foreground-muted)] mt-2">
              Keep track of upcoming interviews and important deadlines
            </p>
          </div>
          <Link href="/job/new">
            <Button>
              <span className="mr-2">+</span>
              <span>Schedule Interview</span>
            </Button>
          </Link>
        </div>

        {/* Coming Soon Content */}
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary)] to-[var(--info)] rounded-3xl flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">📅</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Calendar View Coming Soon
          </h2>
          <p className="text-[var(--foreground-muted)] mb-8 max-w-2xl mx-auto leading-relaxed">
            We&apos;re working on a beautiful calendar interface to help you
            visualize your interview schedules, application deadlines, and
            follow-up dates. This feature will include:
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">
                Interview Tracking
              </h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Schedule and manage all your interviews in one place
              </p>
            </div>

            <div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">
                Smart Reminders
              </h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Never miss an important deadline or follow-up
              </p>
            </div>

            <div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">
                Timeline View
              </h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Visualize your job search progress over time
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[var(--foreground-muted)]">
              In the meantime, you can manage your applications from the
              dashboard.
            </p>
            <Link href="/">
              <Button variant="secondary">
                <span className="mr-2">←</span>
                <span>Back to Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}
