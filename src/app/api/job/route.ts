import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { getJobs } from '@/lib/services/jobsService';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const jobs = await getJobs(session.user.email);
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

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
