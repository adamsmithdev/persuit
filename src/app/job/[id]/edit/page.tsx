import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import JobForm from '@/components/JobForm';

interface EditJobPageProps {
  params: {
    id: string;
  };
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) notFound();

  const job = await prisma.job.findFirst({
    where: {
      id: params.id,
      user: { email: session.user.email },
    },
  });

  if (!job) notFound();

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>
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
