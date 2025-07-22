import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getContacts, createContact } from '@/lib/services/contactsService';

export async function GET() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.email) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const contacts = await getContacts(session.user.email);
		return NextResponse.json(contacts);
	} catch (error) {
		console.error('Failed to fetch contacts:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch contacts' },
			{ status: 500 },
		);
	}
}

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);

	if (!session?.user?.email) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const data = await request.json();
		const contact = await createContact(data, session.user.email);
		return NextResponse.json(contact, { status: 201 });
	} catch (error) {
		console.error('Failed to create contact:', error);
		return NextResponse.json(
			{ error: 'Failed to create contact' },
			{ status: 500 },
		);
	}
}
