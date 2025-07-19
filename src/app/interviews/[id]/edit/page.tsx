import AuthWrapper from '@/components/AuthWrapper';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getInterviewById } from '@/lib/services/interviewsService';
import { getJobs } from '@/lib/services/jobsService';
import { notFound } from 'next/navigation';
import EditInterviewForm from '@/components/EditInterviewForm';

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
      <div className="max-w-2xl mx-auto">
        <EditInterviewForm interview={interview} jobs={jobs} />
      </div>
    </AuthWrapper>
  );
}
