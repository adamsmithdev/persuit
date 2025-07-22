import prisma from '@/lib/prisma';

export async function getContacts(email: string) {
	return await prisma.contact.findMany({
		where: { user: { email } },
		orderBy: { firstName: 'asc' },
	});
}

export async function getContact(id: string, email: string) {
	return await prisma.contact.findFirst({
		where: {
			id,
			user: { email },
		},
	});
}

export async function createContact(
	data: {
		firstName: string;
		lastName?: string;
		email?: string;
		phone?: string;
		jobTitle?: string;
		company?: string;
		linkedIn?: string;
		notes?: string;
	},
	userEmail: string,
) {
	const user = await prisma.user.findUnique({
		where: { email: userEmail },
	});

	if (!user) {
		throw new Error('User not found');
	}

	return await prisma.contact.create({
		data: {
			...data,
			userId: user.id,
		},
	});
}

export async function updateContact(
	id: string,
	data: {
		firstName?: string;
		lastName?: string;
		email?: string;
		phone?: string;
		jobTitle?: string;
		company?: string;
		linkedIn?: string;
		notes?: string;
	},
	userEmail: string,
) {
	return await prisma.contact.update({
		where: {
			id,
			user: { email: userEmail },
		},
		data,
	});
}

export async function deleteContact(contactId: string) {
	return await prisma.contact.delete({
		where: { id: contactId },
	});
}
