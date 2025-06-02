import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import DonationConfirmationEmail from '@/components/emails/DonationConfirmationEmail';
import {
  saveDonationToDatabase,
  updateDonationStatus,
} from '@/lib/db/donations';
import { recordError } from '@/app/services/error-service';

const resend = new Resend(process.env.RESEND_API_KEY);

type DonationStatus = 'pending' | 'confirmed';
type DonationType = 'submit' | 'confirm';

export async function POST(request: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      amount,
      donationId,
      donationReference,
      date,
      paymentMethod,
      message,
      status = 'pending' as DonationStatus,
      type = 'submit' as DonationType,
      paymentDetails,
    } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !amount || !donationReference) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Handle initial submission
    if (type === 'submit') {
      const { success } = await saveDonationToDatabase({
        donation_reference: donationReference,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone || undefined,
        amount: parseFloat(amount),
        payment_method: paymentMethod || 'Online Payment',
        message: message || undefined,
        payment_status: 'pending',
        payment_details: paymentDetails || undefined,
      }).catch((error: Error) => {
        recordError(error, {
          component: 'send-donation-confirmation',
          errorType: 'DonationError',
          metadata: {
            donationId,
            firstName,
            lastName,
            email,
            amount,
          },
        });

        console.error('Error saving donation to database:', error);
        return { success: false };
      });

      return NextResponse.json(
        {
          message: 'Donation submitted successfully',
          donation: {
            id: donationId,
            reference: donationReference,
            saved: success,
            status: 'pending',
          },
        },
        { status: 200 }
      );
    }

    // Handle confirmation and email sending
    if (type === 'confirm' && status === 'confirmed') {
      // Update donation status to confirmed
      const { success } = await updateDonationStatus(
        donationId,
        'confirmed'
      ).catch((error: Error) => {
        recordError(error, {
          component: 'send-donation-confirmation',
          errorType: 'StatusUpdateError',
          metadata: { donationId },
        });
        return { success: false };
      });

      if (!success) {
        return NextResponse.json(
          { error: 'Failed to update donation status' },
          { status: 500 }
        );
      }

      // Send confirmation email
      const { data, error } = await resend.emails.send({
        from: 'iSMART <donations@theismart.org>',
        to: email,
        subject: 'Thank You for Your Donation to iSMART',
        react: DonationConfirmationEmail({
          firstName,
          amount,
          donationId: donationReference,
          date: date || new Date().toLocaleDateString(),
          paymentMethod: paymentMethod || 'Online Payment',
          message: message || undefined,
        }),
      });

      if (error) {
        console.error('Error sending donation confirmation email:', error);
        recordError(error, {
          component: 'send-donation-confirmation',
          errorType: 'EmailError',
          metadata: {
            donationId,
            firstName,
            lastName,
            email,
            amount,
          },
        });

        return NextResponse.json(
          { error: 'Failed to send confirmation email' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          message: 'Donation confirmed and email sent successfully',
          id: data?.id,
          donation: {
            id: donationId,
            saved: true,
            status: 'confirmed',
          },
        },
        { status: 200 }
      );
    }

    // If we get here, it means type is confirm but status isn't confirmed
    return NextResponse.json(
      {
        error: 'Invalid confirmation request',
        message: 'Cannot confirm donation without confirmed status',
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Unexpected error processing donation:', error);
    recordError(error as Error, {
      component: 'send-donation-confirmation',
      errorType: 'DonationError',
    });

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
