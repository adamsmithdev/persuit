import { getServerSession } from 'next-auth';
import Dashboard from '@/components/Dashboard';
import { authOptions } from '@/lib/auth';
import { getJobs } from '@/lib/services/jobsService';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className="max-w-3xl mx-auto mt-20 text-center">
        <div className="bg-[var(--elementBackground)] rounded-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Welcome to Job Tracker</h2>
          <p className="text-gray-400 mb-6">
            You must be signed in to view and manage your job applications.
          </p>
          <p className="text-sm text-gray-500">
            Please sign in using the header to get started.
          </p>
        </div>
      </div>
    );
  }

  const jobs = await getJobs(session.user.email);

  return <Dashboard jobs={jobs} />;
}
