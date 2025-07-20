import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { getApplication } from '@/lib/services/applicationsService';
import ApplicationForm from '@/components/ApplicationForm';
import Button from '@/components/Button';
import AuthWrapper from '@/components/AuthWrapper';

interface EditApplicationPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditApplicationPage({
  params,
}: EditApplicationPageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) notFound();

  const application = await getApplication(id, session.user.email);

  if (!application) notFound();

  return (
    <AuthWrapper>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">
              Edit Application
            </h1>
            <p className="text-[var(--foreground-muted)] mt-2">
              Update your application details
            </p>
          </div>
          <Link href={`/application/${id}`}>
            <Button variant="secondary">
              <span className="mr-2">←</span>
              <span>Back to Details</span>
            </Button>
          </Link>
        </div>

        <ApplicationForm
          mode="edit"
          initialData={{
            id: application.id,
            company: application.company,
            position: application.position,
            location: application.location ?? undefined,
            notes: application.notes ?? undefined,
            status: application.status,
            salaryMin: application.salaryMin ?? undefined,
            salaryMax: application.salaryMax ?? undefined,
            applicationUrl: application.applicationUrl ?? undefined,
            contactName: application.contactName ?? undefined,
            contactEmail: application.contactEmail ?? undefined,
            contactPhone: application.contactPhone ?? undefined,
            companySize: application.companySize ?? undefined,
            industry: application.industry ?? undefined,
            applicationDeadline: application.applicationDeadline
              ? application.applicationDeadline.toISOString()
              : undefined,
          }}
        />
      </div>
    </AuthWrapper>
  );
}
