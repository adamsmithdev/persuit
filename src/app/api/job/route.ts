import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const {
    company,
    position,
    location,
    notes,
    status,
    salaryMin,
    salaryMax,
    jobUrl,
    contactName,
    contactEmail,
    contactPhone,
    companySize,
    industry,
    applicationDeadline,
    interviewDate,
    interviewTime,
    interviewType,
    interviewLocation,
    interviewNotes,
    interviewDuration,
    interviewRound,
  } = body;

  try {
    const job = await prisma.job.create({
      data: {
        company,
        position,
        location,
        notes,
        status,
        salaryMin,
        salaryMax,
        jobUrl,
        contactName,
        contactEmail,
        contactPhone,
        companySize,
        industry,
        applicationDeadline: applicationDeadline
          ? new Date(applicationDeadline)
          : null,
        interviewDate: interviewDate ? new Date(interviewDate) : null,
        interviewTime,
        interviewType,
        interviewLocation,
        interviewNotes,
        interviewDuration,
        interviewRound,
        user: {
          connect: {
            email: session.user.email,
          },
        },
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}
