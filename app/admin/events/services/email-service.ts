import { recordError } from '@/app/services/error-service';
import { EventTable } from '../models/event-schema';

interface SendConfirmationEmailParams {
  event: EventTable;
  recipientEmail: string;
  recipientName: string;
}

export async function sendConfirmationEmail({
  event,
  recipientEmail,
  recipientName,
}: SendConfirmationEmailParams) {
  try {
    const response = await fetch('/api/send-confirmation-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventTitle: event.title,
        eventTheme: event.theme,
        eventStartDate: event.start_date,
        eventEndDate: event.end_date,
        eventType: event.event_type,
        eventLocation: event.location,
        eventLink: event.event_link,
        recipientEmail,
        recipientName,
        whatsappGroupUrl: event.whatsapp_group_url,
        requireApproval: event.require_approval,
      }),
    });

    if (!response.ok) {
      recordError(new Error('Failed to send confirmation email'), {
        component: 'EmailService',
        errorType: 'EmailError',
        metadata: {
          eventId: event.id,
          recipientEmail,
          recipientName,
          eventDetails: event,
        },
      });

      throw new Error('Failed to send confirmation email');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    recordError(error as Error, {
      component: 'EmailService',
      errorType: 'EmailError',
      metadata: {
        eventId: event.id,
        recipientEmail,
        recipientName,
        eventDetails: event,
      },
    });

    return { success: false, error };
  }
}
