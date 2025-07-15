import { getServerSession } from 'next-auth';
import Dashboard from '@/components/Dashboard';
import { authOptions } from '@/lib/auth';
import { getJobs } from '@/lib/services/jobsService';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)] shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--info)] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">�</span>
            </div>
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
              Welcome to Job Tracker
            </h2>
            <p className="text-[var(--foreground-muted)] mb-6 leading-relaxed">
              Track your job applications, organize interviews, and land your
              dream job with ease.
            </p>
            <p className="text-sm text-[var(--foreground-subtle)] mb-6">
              Sign in with GitHub to get started
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
              <span className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse" />
              <span>Ready to boost your career</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const jobs = await getJobs(session.user.email);

  return <Dashboard jobs={jobs} />;
}
