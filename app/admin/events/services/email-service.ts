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
        event,
        recipientEmail,
        recipientName,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send confirmation email');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error };
  }
}
