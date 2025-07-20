import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  createInterview,
  getInterviews,
} from '@/lib/services/interviewsService';
import { InterviewType } from '@prisma/client';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const interviews = await getInterviews(session.user.email);
    return NextResponse.json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interviews' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.date || !data.type || !data.applicationId) {
      return NextResponse.json(
        { error: 'Date, type, and applicationId are required' },
        { status: 400 }
      );
    }

    // Validate interview type
    if (!Object.values(InterviewType).includes(data.type)) {
      return NextResponse.json(
        { error: 'Invalid interview type' },
        { status: 400 }
      );
    }

    const interview = await createInterview(data, session.user.email);
    return NextResponse.json(interview, { status: 201 });
  } catch (error) {
    console.error('Error creating interview:', error);
    if (
      error instanceof Error &&
      error.message === 'Application not found or access denied'
    ) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'Failed to create interview' },
      { status: 500 }
    );
  }
}
