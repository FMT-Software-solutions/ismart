'use client';

import { EventTable } from '@/app/admin/events/models/event-schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  Home,
  Loader2,
  MapPin,
  MessageCircle,
  ClockIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ConfirmationContentProps {
  event: EventTable;
}

export function ConfirmationContent({ event }: ConfirmationContentProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(15);
  const [showCountdown, setShowCountdown] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    'manual' | 'online' | null
  >(null);

  useEffect(() => {
    // Check payment method from session storage
    const method = sessionStorage.getItem(`payment_method_${event.id}`);
    setPaymentMethod(method as 'manual' | 'online');

    // Only start redirect for online payments
    if (method === 'online') {
      let timer: NodeJS.Timeout;
      let initialDelay: NodeJS.Timeout;

      const startRedirectProcess = () => {
        if (event.whatsapp_group_url) {
          // Wait for 5 seconds before showing the overlay and starting countdown
          initialDelay = setTimeout(() => {
            setIsRedirecting(true);
            setShowCountdown(true);

            // Start the countdown
            timer = setInterval(() => {
              setRedirectCountdown((prev) => {
                if (prev <= 1) {
                  clearInterval(timer);
                  window.location.href = event.whatsapp_group_url!;
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);
          }, 5000);
        }
      };

      startRedirectProcess();

      return () => {
        clearInterval(timer);
        clearTimeout(initialDelay);
      };
    }
  }, [event.id, event.whatsapp_group_url]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'EEEE, MMMM d, yyyy');
  };

  // Show appropriate content based on payment method
  const renderContent = () => {
    // If payment method is not yet determined, show loading
    if (paymentMethod === null && !event.is_free) {
      return (
        <div className="text-center p-6">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading confirmation details...</p>
        </div>
      );
    }

    if (paymentMethod === 'manual') {
      return (
        <ManualPaymentConfirmation event={event} formatDate={formatDate} />
      );
    } else {
      return (
        <OnlinePaymentConfirmation
          event={event}
          isRedirecting={isRedirecting}
          redirectCountdown={redirectCountdown}
          showCountdown={showCountdown}
        />
      );
    }
  };

  return renderContent();
}

// Component for manual payment confirmation
function ManualPaymentConfirmation({
  event,
  formatDate,
}: {
  event: EventTable;
  formatDate: (dateString: string) => string;
}) {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Registration done.{' '}
        <span className="text-amber-600">Pending Confirmation</span>
      </h1>
      <Card className="border-gray-200 shadow-md">
        <CardContent className="pt-6 px-6 pb-8 flex flex-col items-center text-center">
          <div className="bg-amber-50 p-3 rounded-full mb-6">
            <ClockIcon className="h-12 w-12 text-amber-600" />
          </div>

          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-muted-foreground mb-6">
            Your registration has been submitted successfully and is pending
            approval.
          </p>

          <div className="w-full bg-muted/50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-center justify-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(event.start_date)}</span>
              </div>
              {event.location && (
                <div className="flex items-center justify-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full mb-6">
            <div className="bg-amber-50/50 border border-amber-200 rounded-lg p-4 text-left">
              <h4 className="font-medium text-amber-800 mb-2">Next Steps:</h4>
              <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                <li>Our team will verify your payment details</li>
                <li>You'll receive a confirmation email once approved</li>
                <li>
                  The email will contain all event details and WhatsApp group
                  link
                </li>
                <li>This process usually takes less than 24 hours</li>
              </ul>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-8">
            If you have any questions, please contact our support team.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button asChild className="flex-1" variant="outline">
              <Link href={`/events/${event.id}`}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Event
              </Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/events">View other events</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <Button asChild variant="ghost">
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

// Component for online payment confirmation
function OnlinePaymentConfirmation({
  event,
  isRedirecting,
  redirectCountdown,
  showCountdown,
}: {
  event: EventTable;
  isRedirecting: boolean;
  redirectCountdown: number;
  showCountdown: boolean;
}) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'EEEE, MMMM d, yyyy');
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Loading Overlay */}
      {isRedirecting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center max-w-sm mx-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">
              Redirecting to WhatsApp Group
            </h3>

            <>
              {showCountdown ? (
                <p className="text-muted-foreground mb-4">
                  You will be redirected in {redirectCountdown} seconds...
                </p>
              ) : (
                <p className="text-muted-foreground mb-4">
                  Preparing redirect...
                </p>
              )}
              <Button
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white gap-2 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() =>
                  (window.location.href = event.whatsapp_group_url!)
                }
              >
                Join WhatsApp Group Now
              </Button>
            </>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-8 text-center">
        Registration Confirmed
      </h1>

      <Card className="border-gray-200 shadow-md">
        <CardContent className="pt-6 px-6 pb-8 flex flex-col items-center text-center">
          <div className="bg-green-50 p-3 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-muted-foreground mb-6">
            Your registration has been confirmed.
          </p>

          <div className="w-full mb-6">
            <Button
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white gap-2 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => (window.location.href = event.whatsapp_group_url!)}
            >
              <MessageCircle className="h-6 w-6" />
              Join our WhatsApp Group
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Connect with other participants and stay updated!
            </p>
          </div>

          <div className="w-full bg-muted/50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-center justify-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(event.start_date)}</span>
              </div>
              {event.location && (
                <div className="flex items-center justify-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-8">
            You will receive an email with further details and instructions.
            Save the date in your calendar!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button asChild className="flex-1" variant="outline">
              <Link href={`/events/${event.id}`}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Event
              </Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/events">View other events</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <Button asChild variant="ghost">
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
