import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { company, position, location, notes, status } = body;

  try {
    const updatedJob = await prisma.job.update({
      where: {
        id: params.id,
      },
      data: {
        company,
        position,
        location,
        notes,
        status,
      },
    });

    return NextResponse.json(updatedJob);
  } catch (err) {
    console.error('Failed to update job:', err);
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
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

  const job = await prisma.job.findUnique({
    where: { id: params.id },
  });

  if (!job || job.userId !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await prisma.job.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: 'Job deleted' });
}
