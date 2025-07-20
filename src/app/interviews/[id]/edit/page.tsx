import AuthWrapper from '@/components/AuthWrapper';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getInterviewById } from '@/lib/services/interviewsService';
import { getApplications } from '@/lib/services/applicationsService';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import InterviewForm from '@/components/InterviewForm';
import Button from '@/components/Button';

interface EditInterviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditInterviewPage({
  params,
}: EditInterviewPageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    notFound();
  }

  const [interview, applications] = await Promise.all([
    getInterviewById(id, session.user.email),
    getApplications(session.user.email),
  ]);

  if (!interview) {
    notFound();
  }

  return (
    <AuthWrapper>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">
              Edit Interview
            </h1>
            <p className="text-[var(--foreground-muted)] mt-2">
              Update your interview details
            </p>
          </div>
          <Link href={`/interviews/${id}`}>
            <Button variant="secondary">
              <span className="mr-2">←</span>
              <span>Back to Details</span>
            </Button>
          </Link>
        </div>

        <InterviewForm
          mode="edit"
          initialData={interview}
          applications={applications}
        />
      </div>
    </AuthWrapper>
  );
}
