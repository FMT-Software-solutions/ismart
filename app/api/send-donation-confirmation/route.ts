import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import DonationConfirmationEmail from '@/components/emails/DonationConfirmationEmail';
import { saveDonationToDatabase } from '@/lib/db/donations';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      email,
      amount,
      donationId,
      date,
      paymentMethod,
      message,
      phone,
    } = await request.json();

    // Validate required fields
    if (!firstName || !email || !amount || !donationId) {
      return NextResponse.json(
        { error: 'Missing required donation information' },
        { status: 400 }
      );
    }

    // First, save donation to Supabase using the dedicated function
    const { success, data: donationData } = await saveDonationToDatabase({
      donation_reference: donationId,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone || undefined,
      amount: parseFloat(amount),
      payment_method: paymentMethod || 'Online Payment',
      message: message || undefined,
      payment_status: 'completed',
    }).catch((error) => {
      console.error('Error saving donation to database:', error);
      return { success: false, data: null };
    });

    // Then, send confirmation email
    const { data, error } = await resend.emails.send({
      from: 'iSMART <donations@theismart.org>',
      to: email,
      subject: 'Thank You for Your Donation to iSMART',
      react: DonationConfirmationEmail({
        firstName,
        amount,
        donationId,
        date: date || new Date().toLocaleDateString(),
        paymentMethod: paymentMethod || 'Online Payment',
        message: message || undefined,
      }),
      // Add BCC to organization email for record-keeping
      bcc: 'ismflrt.official@gmail.com',
    });

    if (error) {
      console.error('Error sending donation confirmation email:', error);
      return NextResponse.json(
        { error: 'Failed to send donation confirmation email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Donation confirmation email sent successfully',
        id: data?.id,
        donation: {
          id: donationId,
          saved: success,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error processing donation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
