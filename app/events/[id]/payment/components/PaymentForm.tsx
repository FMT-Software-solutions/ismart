'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { EventTable } from '@/app/admin/events/models/event-schema';
import { format } from 'date-fns';
import { createFormSubmission } from '@/app/admin/events/services/form-submission-service';
import { incrementRegistrationCount } from '@/app/admin/events/services/event-service';
import { PaystackPayment } from '@/components/PaystackPayment';
import { sendConfirmationEmail } from '@/app/admin/events/services/email-service';
import { recordError } from '@/app/services/error-service';
import { PaymentOptions, PaymentMethod } from './PaymentOptions';
import { ManualPaymentModal } from './ManualPaymentModal';
import { Button } from '@/components/ui/button';

interface PaymentFormProps {
  event: EventTable;
}

export function PaymentForm({ event }: PaymentFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('manual');
  const [isManualPaymentModalOpen, setIsManualPaymentModalOpen] =
    useState(false);

  const currentPrice =
    event.has_early_bird &&
    event.early_bird_price &&
    new Date() < new Date(event.early_bird_deadline as string)
      ? event.early_bird_price
      : event.price;

  // Load registration data from session storage
  useEffect(() => {
    const storedData = sessionStorage.getItem(`event_registration_${event.id}`);
    if (storedData) {
      setRegistrationData(JSON.parse(storedData));
    } else {
      // If no registration data found, redirect back to registration
      toast({
        title: 'Registration Required',
        description: 'Please complete the registration form first.',
        variant: 'destructive',
      });
      router.push(`/events/${event.id}/register`);
    }
  }, [event.id, router, toast]);

  const handlePaymentSuccess = async (reference: any) => {
    try {
      // Create form submission after successful payment
      await createFormSubmission({
        ...registrationData,
        status: 'approved', // Online payments are auto-approved
        responses: {
          ...registrationData.responses,
          payment_method: 'online',
        },
      });

      // Wait for email to be sent
      const result = await sendConfirmationEmail({
        event,
        recipientEmail: registrationData.responses['Email Address'],
        recipientName: registrationData.responses['Full Name'],
      });

      if (!result.success) {
        throw new Error('Failed to send confirmation email');
      }

      toast({
        title: 'Confirmation Email Sent',
        description: 'Please check your email for event details.',
      });

      // Increment registration count
      const { error: countError } = await incrementRegistrationCount(event.id);
      if (countError) {
        recordError(countError as Error, {
          component: 'PaymentForm | RegistrationCount',
          errorType: 'PaymentError',
          metadata: {
            eventId: event.id,
            eventName: event.title,
            registrationData: registrationData,
          },
        });

        console.error('Error updating registration count:', countError);
        throw new Error('Error updating registration count');
      }

      // Clear the stored registration data
      sessionStorage.removeItem(`event_registration_${event.id}`);

      // Set payment method in session for confirmation page to use
      sessionStorage.setItem(`payment_method_${event.id}`, 'online');

      // Show success message
      toast({
        title: 'Payment Successful',
        description: 'Your payment has been processed successfully.',
      });

      // Redirect to confirmation page
      router.push(`/events/${event.id}/confirmation`);
    } catch (error) {
      console.error('Payment error:', error);
      recordError(error as Error, {
        component: 'PaymentForm',
        errorType: 'PaymentError',
        metadata: {
          eventId: event.id,
          eventName: event.title,
          registrationData: registrationData,
        },
      });

      toast({
        title: 'Payment Failed',
        description:
          'There was an error processing your payment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentClose = () => {
    toast({
      title: 'Payment Cancelled',
      description: 'You have cancelled the payment process.',
      variant: 'destructive',
    });
    setIsProcessing(false);
  };

  const handleManualPayment = () => {
    setIsManualPaymentModalOpen(true);
  };

  const handleManualPaymentConfirm = async (
    transactionId: string,
    accountName: string
  ) => {
    setIsProcessing(true);
    try {
      // Create form submission with pending status for manual payments
      await createFormSubmission({
        ...registrationData,
        status: 'pending',
        payment_method: 'manual',
        payment_details: {
          transaction_id: transactionId,
          account_name: accountName,
          amount: currentPrice,
        },
        responses: {
          ...registrationData.responses,
          'Transaction ID': transactionId,
          'MoMo Account Name': accountName,
          payment_method: 'manual',
        },
      });

      // Increment registration count
      const { error: countError } = await incrementRegistrationCount(event.id);
      if (countError) {
        recordError(countError as Error, {
          component: 'PaymentForm | ManualPayment',
          errorType: 'PaymentError',
          metadata: {
            eventId: event.id,
            eventName: event.title,
            registrationData: registrationData,
          },
        });

        console.error('Error updating registration count:', countError);
        throw new Error('Error updating registration count');
      }

      // Clear the stored registration data
      sessionStorage.removeItem(`event_registration_${event.id}`);

      // Set payment method in session for confirmation page to use
      sessionStorage.setItem(`payment_method_${event.id}`, 'manual');

      // Show success message
      toast({
        title: 'Payment Details Submitted',
        description:
          'Your payment details have been submitted for verification.',
      });

      // Close the modal
      setIsManualPaymentModalOpen(false);

      // Redirect to confirmation page
      router.push(`/events/${event.id}/confirmation`);
    } catch (error) {
      console.error('Manual payment error:', error);
      recordError(error as Error, {
        component: 'PaymentForm',
        errorType: 'ManualPaymentError',
        metadata: {
          eventId: event.id,
          eventName: event.title,
          registrationData: registrationData,
          transactionId,
          accountName,
        },
      });

      toast({
        title: 'Submission Failed',
        description:
          'There was an error submitting your payment details. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  // Show loading state while checking registration data
  if (!registrationData) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">
            Loading registration details...
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Event Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Date:</span>{' '}
                {formatDate(event.start_date)}
              </p>
              <p>
                <span className="font-medium">Location:</span> {event.location}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Payment Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Registration Fee</span>
                <span className="font-medium">GHS{event.price.toFixed(2)}</span>
              </div>
              {event.has_early_bird &&
                event.early_bird_price &&
                new Date() < new Date(event.early_bird_deadline as string) && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>Early Bird Discount</span>
                    <span>
                      -GHS{(event.price - event.early_bird_price).toFixed(2)}
                    </span>
                  </div>
                )}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total</span>
                  <span>GHS{currentPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <PaymentOptions
              selected={paymentMethod}
              onSelect={setPaymentMethod}
              disabled={isProcessing}
            />
          </div>

          <div className="space-y-4">
            {paymentMethod === 'manual' ? (
              <div className="space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <h3 className="font-medium mb-2">
                    Mobile Money Payment Instructions
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>
                      Send payment to MTN MoMo number:{' '}
                      <span className="font-medium">0592185098</span>
                    </li>
                    <li>
                      The recipient name will appear as either{' '}
                      <span className="font-medium">ESTHER BOATENG</span> or{' '}
                      <span className="font-medium">
                        HE REIGNS ESTI-NASH ENT
                      </span>
                    </li>
                    <li>
                      Make sure to save your Transaction ID from the MoMo
                      message
                    </li>
                    <li>
                      Enter the Transaction ID and your MoMo registered name
                      below
                    </li>
                    <li>
                      Your registration will be pending until payment is
                      verified
                    </li>
                  </ol>
                </div>
                <Button
                  onClick={handleManualPayment}
                  disabled={isProcessing}
                  className="w-full py-6"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Enter Payment Details'
                  )}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Your registration will be pending until payment is verified
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <PaystackPayment
                  email={registrationData.responses['Email Address']}
                  amount={currentPrice}
                  metadata={{
                    name: registrationData.responses['Full Name'],
                    phone: registrationData.responses['Phone Number'],
                    custom_fields: [],
                  }}
                  onSuccess={(reference) => handlePaymentSuccess(reference)}
                  onClose={handlePaymentClose}
                  isProcessing={isProcessing}
                />
                <p className="text-sm text-muted-foreground text-center">
                  You will be redirected to our secure payment processor
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      <ManualPaymentModal
        isOpen={isManualPaymentModalOpen}
        onClose={() => setIsManualPaymentModalOpen(false)}
        onConfirm={handleManualPaymentConfirm}
        isProcessing={isProcessing}
      />
    </div>
  );
}
