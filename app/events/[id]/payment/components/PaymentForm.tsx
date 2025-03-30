'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { EventTable } from '@/app/admin/events/models/event-schema';
import { format } from 'date-fns';

interface PaymentFormProps {
  event: EventTable;
}

export function PaymentForm({ event }: PaymentFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      // TODO: Implement Stripe payment integration
      // For now, we'll just simulate a payment process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message
      toast({
        title: 'Payment Successful',
        description: 'Your payment has been processed successfully.',
      });

      // Redirect to WhatsApp group
      if (event.whatsapp_group_url) {
        window.location.href = event.whatsapp_group_url;
      } else {
        router.push(`/events/${event.id}/confirmation`);
      }
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

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

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
                  <span>
                    GHS
                    {(event.has_early_bird &&
                    event.early_bird_price &&
                    new Date() < new Date(event.early_bird_deadline as string)
                      ? event.early_bird_price
                      : event.price
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              className="w-full"
              size="lg"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                `Pay GHS${(event.has_early_bird &&
                event.early_bird_price &&
                new Date() < new Date(event.early_bird_deadline as string)
                  ? event.early_bird_price
                  : event.price
                ).toFixed(2)}`
              )}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              You will be redirected to our secure payment processor
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
