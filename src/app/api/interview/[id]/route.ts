import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  getInterviewById,
  updateInterview,
  deleteInterview,
} from '@/lib/services/interviewsService';
import { InterviewType, InterviewStatus } from '@prisma/client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const interview = await getInterviewById(id, session.user.email);

    if (!interview) {
      return NextResponse.json(
        { error: 'Interview not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(interview);
  } catch (error) {
    console.error('Error fetching interview:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interview' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();

    // Validate interview type if provided
    if (data.type && !Object.values(InterviewType).includes(data.type)) {
      return NextResponse.json(
        { error: 'Invalid interview type' },
        { status: 400 }
      );
    }

    // Validate interview status if provided
    if (data.status && !Object.values(InterviewStatus).includes(data.status)) {
      return NextResponse.json(
        { error: 'Invalid interview status' },
        { status: 400 }
      );
    }

    const interview = await updateInterview(id, data, session.user.email);
    return NextResponse.json(interview);
  } catch (error) {
    console.error('Error updating interview:', error);
    if (
      error instanceof Error &&
      error.message === 'Interview not found or access denied'
    ) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'Failed to update interview' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await deleteInterview(id, session.user.email);
    return NextResponse.json({ message: 'Interview deleted successfully' });
  } catch (error) {
    console.error('Error deleting interview:', error);
    if (
      error instanceof Error &&
      error.message === 'Interview not found or access denied'
    ) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'Failed to delete interview' },
      { status: 500 }
    );
  }
}
