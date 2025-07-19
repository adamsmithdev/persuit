import AuthWrapper from '@/components/AuthWrapper';
import InterviewForm from '@/components/InterviewForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getJobs } from '@/lib/services/jobsService';

export default async function NewInterviewPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <div>Please log in to create an interview</div>;
  }

  const jobs = await getJobs(session.user.email);

  return (
    <AuthWrapper>
      <div className="max-w-2xl mx-auto">
        <InterviewForm jobs={jobs} />
      </div>
    </AuthWrapper>
  );
}
