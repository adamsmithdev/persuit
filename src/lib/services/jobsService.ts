import prisma from '@/lib/prisma';

export async function getJobs(email: string) {
  return await prisma.job.findMany({
    where: { user: { email } },
    orderBy: { appliedAt: 'desc' },
  });
}

export async function getJob(id: string, email: string) {
  return await prisma.job.findFirst({
    where: {
      id,
      user: { email },
    },
  });
}

export async function deleteJob(jobId: string) {
  return await prisma.job.delete({
    where: { id: jobId },
  });
}
