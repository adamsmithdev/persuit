import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Button from '@/components/Button';
import JobList from '@/components/JobList';
import { authOptions } from '@/lib/auth';
import { getJobs } from '@/lib/services/jobsService';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <p className="text-center mt-20">
        You must be signed in to view your jobs.
      </p>
    );
  }

  const jobs = await getJobs(session.user.email);

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-4">
      <h2 className="text-2xl font-bold">Your Job Applications</h2>

      <Link href="/job/new">
        <Button>Add Job</Button>
      </Link>

      <JobList jobs={jobs} />

      {jobs.length === 0 && (
        <p className="text-gray-500 mt-4">
          No jobs tracked yet. Start by adding one!
        </p>
      )}
    </div>
  );
}
