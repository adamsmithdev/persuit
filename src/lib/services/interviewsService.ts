import prisma from '@/lib/prisma';
import { InterviewType, InterviewStatus } from '@prisma/client';

// Helper function to create date in local timezone to avoid UTC conversion issues
const createLocalDate = (dateString: string): Date => {
	// If date string is in YYYY-MM-DD format, create date in local timezone
	const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
	if (dateRegex.exec(dateString)) {
		return new Date(dateString + 'T00:00:00');
	}
	return new Date(dateString);
};

export interface CreateInterviewData {
	date: string;
	time?: string;
	type: InterviewType;
	location?: string;
	notes?: string;
	duration?: number;
	round?: number;
	applicationId: string;
}

export interface UpdateInterviewData extends Partial<CreateInterviewData> {
	status?: InterviewStatus;
}

export async function getInterviews(userEmail: string) {
	return await prisma.interview.findMany({
		where: {
			application: {
				user: {
					email: userEmail,
				},
			},
		},
		include: {
			application: {
				select: {
					id: true,
					company: true,
					position: true,
					status: true,
				},
			},
		},
		orderBy: {
			date: 'asc',
		},
	});
}

export async function getInterviewById(id: string, userEmail: string) {
	return await prisma.interview.findFirst({
		where: {
			id,
			application: {
				user: {
					email: userEmail,
				},
			},
		},
		include: {
			application: {
				select: {
					id: true,
					company: true,
					position: true,
					status: true,
				},
			},
		},
	});
}

export async function createInterview(
	data: CreateInterviewData,
	userEmail: string,
) {
	// Verify the application belongs to the user
	const application = await prisma.application.findFirst({
		where: {
			id: data.applicationId,
			user: {
				email: userEmail,
			},
		},
	});

	if (!application) {
		throw new Error('Application not found or access denied');
	}

	return await prisma.interview.create({
		data: {
			date: createLocalDate(data.date),
			time: data.time,
			type: data.type,
			location: data.location,
			notes: data.notes,
			duration: data.duration,
			round: data.round || 1,
			applicationId: data.applicationId,
		},
		include: {
			application: {
				select: {
					id: true,
					company: true,
					position: true,
					status: true,
				},
			},
		},
	});
}

export async function updateInterview(
	id: string,
	data: UpdateInterviewData,
	userEmail: string,
) {
	// Verify the interview belongs to the user
	const interview = await prisma.interview.findFirst({
		where: {
			id,
			application: {
				user: {
					email: userEmail,
				},
			},
		},
	});

	if (!interview) {
		throw new Error('Interview not found or access denied');
	}

	return await prisma.interview.update({
		where: { id },
		data: {
			...(data.date && { date: createLocalDate(data.date) }),
			...(data.time !== undefined && { time: data.time }),
			...(data.type && { type: data.type }),
			...(data.location !== undefined && { location: data.location }),
			...(data.notes !== undefined && { notes: data.notes }),
			...(data.duration !== undefined && { duration: data.duration }),
			...(data.round !== undefined && { round: data.round }),
			...(data.status && { status: data.status }),
		},
		include: {
			application: {
				select: {
					id: true,
					company: true,
					position: true,
					status: true,
				},
			},
		},
	});
}

export async function deleteInterview(id: string, userEmail: string) {
	// Verify the interview belongs to the user
	const interview = await prisma.interview.findFirst({
		where: {
			id,
			application: {
				user: {
					email: userEmail,
				},
			},
		},
	});

	if (!interview) {
		throw new Error('Interview not found or access denied');
	}

	return await prisma.interview.delete({
		where: { id },
	});
}
