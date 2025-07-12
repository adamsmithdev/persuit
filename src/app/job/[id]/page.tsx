import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DeleteJobButton } from '@/components/DeleteJobButton';

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

  const job = await prisma.job.findFirst({
    where: {
      id: params.id,
      user: { email: session.user.email },
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 space-y-4">
      <h1 className="text-2xl font-bold">{job.position}</h1>
      <p className="text-gray-700">
        <span className="font-semibold">Company:</span> {job.company}
      </p>
      {job.location && (
        <p className="text-gray-700">
          <span className="font-semibold">Location:</span> {job.location}
        </p>
      )}
      <p className="text-gray-700">
        <span className="font-semibold">Status:</span> {job.status}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Applied At:</span>{' '}
        {new Date(job.appliedAt).toLocaleDateString()}
      </p>
      {job.notes && (
        <div>
          <h2 className="mt-4 font-semibold">Notes</h2>
          <p className="whitespace-pre-line text-gray-800">{job.notes}</p>
        </div>
      )}
      <div className="flex gap-4 mt-6">
        <Link
          href={`/job/${job.id}/edit`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit Job
        </Link>
        <DeleteJobButton jobId={job.id} />
      </div>
      <Link href="/" className="inline-block text-blue-600 hover:underline">
        ← Back to Dashboard
      </Link>
    </div>
  );
}
