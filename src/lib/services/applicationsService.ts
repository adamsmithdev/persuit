import prisma from '@/lib/prisma';

export async function getApplications(email: string) {
  return await prisma.application.findMany({
    where: { user: { email } },
    orderBy: { appliedAt: 'desc' },
  });
}

export async function getApplication(id: string, email: string) {
  return await prisma.application.findFirst({
    where: {
      id,
      user: { email },
    },
  });
}

export async function deleteApplication(applicationId: string) {
  return await prisma.application.delete({
    where: { id: applicationId },
  });
}
