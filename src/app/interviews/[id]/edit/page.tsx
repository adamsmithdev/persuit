import AuthWrapper from '@/components/AuthWrapper';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getInterviewById } from '@/lib/services/interviewsService';
import { getJobs } from '@/lib/services/jobsService';
import { notFound } from 'next/navigation';
import InterviewForm from '@/components/InterviewForm';
import { DeleteInterviewButton } from '@/components/DeleteInterviewButton';

interface EditInterviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditInterviewPage({
  params,
}: EditInterviewPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <div>Please log in to edit interviews</div>;
  }

  const { id } = await params;
  const [interview, jobs] = await Promise.all([
    getInterviewById(id, session.user.email),
    getJobs(session.user.email),
  ]);

  if (!interview) {
    notFound();
  }

  return (
    <AuthWrapper>
      <div className="max-w-2xl mx-auto space-y-6">
        <InterviewForm mode="edit" initialData={interview} jobs={jobs} />

        <div className="flex justify-center">
          <DeleteInterviewButton interviewId={interview.id} />
        </div>
      </div>
    </AuthWrapper>
  );
}
