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

interface PaymentFormProps {
  event: EventTable;
}

export function PaymentForm({ event }: PaymentFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>(null);

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

  const handlePaymentSuccess = async () => {
    try {
      // Create form submission after successful payment
      await createFormSubmission(registrationData);

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
        console.error('Error updating registration count:', countError);
      }

      // Clear the stored registration data
      sessionStorage.removeItem(`event_registration_${event.id}`);

      // Show success message
      toast({
        title: 'Payment Successful',
        description: 'Your payment has been processed successfully.',
      });

      // Redirect to WhatsApp group or confirmation page
      router.push(`/events/${event.id}/confirmation`);
    } catch (error) {
      console.error('Payment error:', error);
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

  const currentPrice =
    event.has_early_bird &&
    event.early_bird_price &&
    new Date() < new Date(event.early_bird_deadline as string)
      ? event.early_bird_price
      : event.price;

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

          <div className="space-y-4">
            <PaystackPayment
              email={registrationData.responses['Email Address']}
              amount={currentPrice}
              metadata={{
                name: registrationData.responses['Full Name'],
                phone: registrationData.responses['Phone Number'],
                custom_fields: [],
              }}
              onSuccess={handlePaymentSuccess}
              onClose={handlePaymentClose}
              isProcessing={isProcessing}
            />
            <p className="text-sm text-muted-foreground text-center">
              You will be redirected to our secure payment processor
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
