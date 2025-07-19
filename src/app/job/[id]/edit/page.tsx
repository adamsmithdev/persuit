import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { getJob } from '@/lib/services/jobsService';
import JobForm from '@/components/JobForm';
import Button from '@/components/Button';
import AuthWrapper from '@/components/AuthWrapper';

interface EditJobPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) notFound();

  const job = await getJob(id, session.user.email);

  if (!job) notFound();

  return (
    <AuthWrapper>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">
              Edit Application
            </h1>
            <p className="text-[var(--foreground-muted)] mt-2">
              Update your job application details
            </p>
          </div>
          <Link href={`/job/${id}`}>
            <Button variant="secondary">
              <span className="mr-2">←</span>
              <span>Back to Details</span>
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
            salaryMin: job.salaryMin ?? undefined,
            salaryMax: job.salaryMax ?? undefined,
            jobUrl: job.jobUrl ?? undefined,
            contactName: job.contactName ?? undefined,
            contactEmail: job.contactEmail ?? undefined,
            contactPhone: job.contactPhone ?? undefined,
            companySize: job.companySize ?? undefined,
            industry: job.industry ?? undefined,
            applicationDeadline: job.applicationDeadline
              ? job.applicationDeadline.toISOString()
              : undefined,
          }}
        />
      </div>
    </AuthWrapper>
  );
}
