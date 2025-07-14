import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { getJob } from '@/lib/services/jobsService';
import JobForm from '@/components/JobForm';
import Button from '@/components/Button';

interface EditJobPageProps {
  params: {
    id: string;
  };
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) notFound();

  const job = await getJob(params.id, session.user.email);

  if (!job) notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Edit Job</h1>
          <p className="text-gray-400 mt-1">Update your job application details</p>
        </div>
        <Link href={`/job/${job.id}`}>
          <Button>
            ← Back to Job
          </Button>
        </Link>
      </div>
      
      <JobForm
        mode="edit"
        initialData={{
          id: job.id,
          company: job.company,
          position: job.position,
          location: job.location ?? undefined,
          notes: job.notes ?? undefined,
          status: job.status,
        }}
      />
    </div>
  );
}
