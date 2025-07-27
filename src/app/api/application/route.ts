import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { getApplications } from '@/lib/services/applicationsService';

export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session?.user?.email) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const applications = await getApplications(session.user.email);
		return NextResponse.json(applications);
	} catch (error) {
		console.error('Error fetching applications:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch applications' },
			{ status: 500 },
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
		applicationUrl,
		contactId,
		companySize,
		industry,
		applicationDeadline,
	} = body;

	try {
		const application = await prisma.application.create({
			data: {
				company,
				position,
				location,
				notes,
				status,
				salaryMin,
				salaryMax,
				applicationUrl,
				contactId,
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

		return NextResponse.json(application);
	} catch (error) {
		console.error('Error creating application:', error);
		return NextResponse.json(
			{ error: 'Failed to create application' },
			{ status: 500 },
		);
	}
}
