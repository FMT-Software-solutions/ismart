import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EventConfirmationEmail } from '@/components/emails/event-confirmation-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {
      eventTitle,
      eventTheme,
      eventStartDate,
      eventEndDate,
      eventType,
      eventLocation,
      eventLink,
      recipientEmail,
      recipientName,
      whatsappGroupUrl,
      requireApproval,
    } = await request.json();

    const data = await resend.emails.send({
      from: 'iSMART <event@theismart.org>',
      to: recipientEmail,
      subject: `Registration Confirmed: ${eventTitle}`,
      react: EventConfirmationEmail({
        eventTitle,
        eventTheme,
        eventStartDate,
        eventEndDate,
        eventType,
        eventLocation,
        eventLink,
        recipientName,
        whatsappGroupUrl,
        requireApproval,
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
