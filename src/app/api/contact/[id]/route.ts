import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
	getContact,
	updateContact,
	deleteContact,
} from '@/lib/services/contactsService';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;
	const session = await getServerSession(authOptions);

	if (!session?.user?.email) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const contact = await getContact(id, session.user.email);
		if (!contact) {
			return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
		}
		return NextResponse.json(contact);
	} catch (error) {
		console.error('Failed to fetch contact:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch contact' },
			{ status: 500 },
		);
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;
	const session = await getServerSession(authOptions);

	if (!session?.user?.email) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const data = await request.json();
		const contact = await updateContact(id, data, session.user.email);
		return NextResponse.json(contact);
	} catch (error) {
		console.error('Failed to update contact:', error);
		return NextResponse.json(
			{ error: 'Failed to update contact' },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;
	const session = await getServerSession(authOptions);

	if (!session?.user?.email) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		await deleteContact(id);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Failed to delete contact:', error);
		return NextResponse.json(
			{ error: 'Failed to delete contact' },
			{ status: 500 },
		);
	}
}
