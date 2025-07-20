import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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
    applicationUrl,
    contactName,
    contactEmail,
    contactPhone,
    companySize,
    industry,
    applicationDeadline,
  } = body;

  try {
    const updatedApplication = await prisma.application.update({
      where: {
        id,
      },
      data: {
        company,
        position,
        location,
        notes,
        status,
        salaryMin,
        salaryMax,
        applicationUrl,
        contactName,
        contactEmail,
        contactPhone,
        companySize,
        industry,
        applicationDeadline: applicationDeadline
          ? new Date(applicationDeadline)
          : null,
      },
    });

    return NextResponse.json(updatedApplication);
  } catch (err) {
    console.error('Failed to update application:', err);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const application = await prisma.application.findUnique({
    where: { id },
  });

  if (!application || application.userId !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await prisma.application.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Application deleted' });
}
