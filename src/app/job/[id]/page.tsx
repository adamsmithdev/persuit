import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { getJob } from '@/lib/services/jobsService';
import { DeleteJobButton } from '@/components/DeleteJobButton';
import Button from '@/components/Button';
import { getStatusColor, formatStatus } from '@/lib/statusUtils';

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

  const statusColor = getStatusColor(job.status);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Job Details</h1>
          <p className="text-gray-400 mt-1">View and manage this job application</p>
        </div>
        <Link href="/">
          <Button>
            ← Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="bg-[var(--elementBackground)] rounded-lg p-6 border border-gray-200 dark:border-gray-700 space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-4 flex-1">
            <div>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">{job.position}</h2>
              <p className="text-xl text-[var(--accent)] font-semibold">{job.company}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${statusColor}`}>
                {formatStatus(job.status)}
              </span>
              {job.location && (
                <span className="text-gray-400 flex items-center">
                  <span className="mr-1">📍</span>
                  {job.location}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Applied Date</h3>
              <p className="text-[var(--foreground)] font-medium">
                {new Date(job.appliedAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Last Updated</h3>
              <p className="text-[var(--foreground)] font-medium">
                {new Date(job.updatedAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {job.notes && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Notes</h3>
              <div className="bg-[var(--background)] rounded-lg p-4 border border-gray-300 dark:border-gray-600">
                <p className="whitespace-pre-line text-[var(--foreground)]">{job.notes}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link href={`/job/${job.id}/edit`}>
            <Button>Edit Job</Button>
          </Link>
          <DeleteJobButton jobId={job.id} />
        </div>
      </div>
    </div>
  );
}
