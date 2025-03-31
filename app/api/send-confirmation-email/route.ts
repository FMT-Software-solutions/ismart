import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { format } from 'date-fns';
import { EventConfirmationEmail } from '@/components/emails/event-confirmation-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { event, recipientEmail, recipientName } = await request.json();

    const formattedDate = format(
      new Date(event.start_date),
      'EEEE, MMMM d, yyyy'
    );

    const data = await resend.emails.send({
      from: 'iSMART <event@theismart.org>',
      to: recipientEmail,
      subject: `Registration Confirmed: ${event.title}`,
      react: EventConfirmationEmail({
        eventTitle: event.title,
        eventDate: formattedDate,
        eventLocation: event.location,
        recipientName,
        whatsappGroupUrl: event.whatsapp_group_url,
        requireApproval: event.require_approval,
      }),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
