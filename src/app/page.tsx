import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <p className="text-center mt-20">
        You must be signed in to view your jobs.
      </p>
    );
  }

  const jobs = await prisma.job.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { appliedAt: 'desc' },
  });

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-4">
      <h2 className="text-2xl font-bold">Your Job Applications</h2>

      <Link
        href="/job/new"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Job
      </Link>

      <ul className="divide-y border rounded mt-4">
        {jobs.map((job) => (
          <li key={job.id} className="p-4 hover:bg-gray-50 transition">
            <Link href={`/job/${job.id}`} className="block">
              <p className="font-semibold">
                {job.position} @ {job.company}
              </p>
              <p className="text-sm text-gray-600">{job.status}</p>
            </Link>
          </li>
        ))}
      </ul>

      {jobs.length === 0 && (
        <p className="text-gray-500 mt-4">
          No jobs tracked yet. Start by adding one!
        </p>
      )}
    </div>
  );
}
