import AuthWrapper from '@/components/AuthWrapper';
import InterviewForm from '@/components/InterviewForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getJobs } from '@/lib/services/jobsService';
import Link from 'next/link';
import Button from '@/components/Button';
import { notFound } from 'next/navigation';

export default async function NewInterviewPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    notFound();
  }

  const jobs = await getJobs(session.user.email);

  return (
    <AuthWrapper>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">
              Schedule New Interview
            </h1>
            <p className="text-[var(--foreground-muted)] mt-2">
              Add an interview for your job applications
            </p>
          </div>
          <Link href="/interviews">
            <Button variant="secondary">
              <span className="mr-2">←</span>
              <span>Back to Interviews</span>
            </Button>
          </Link>
        </div>

        <InterviewForm jobs={jobs} />
      </div>
    </AuthWrapper>
  );
}
