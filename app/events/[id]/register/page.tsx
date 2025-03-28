'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, CalendarIcon, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

import RegistrationFormRenderer from '@/app/admin/events/components/registration-form-renderer';
import { createFormSubmission } from '@/app/admin/events/services/form-submission-service';
import { createClient } from '@/lib/supabase/client';

export default function EventRegisterPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventAndUser = async () => {
      try {
        setIsLoading(true);
        const supabase = createClient();

        // Get event details
        const { data: eventData, error: eventError } = await supabase
          .from('events')
          .select('*')
          .eq('id', params.id)
          .single();

        if (eventError) throw eventError;
        setEvent(eventData);

        // Get current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (user) {
          setUserId(user.id);
        } else {
          // Redirect to login if no user is logged in
          toast({
            title: 'Authentication required',
            description: 'Please log in to register for this event',
            variant: 'destructive',
          });
          router.push(`/login?redirect=/events/${params.id}/register`);
        }
      } catch (error) {
        console.error('Error loading event or user:', error);
        toast({
          title: 'Error',
          description: 'Failed to load event details',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventAndUser();
  }, [params.id, router, toast]);

  const handleFormSubmit = async (data: Record<string, any>) => {
    if (!userId) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to register for this event',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Ensure we have all required fields for the submission
      const submissionData = {
        ...data,
        user_id: userId,
        // Add any missing required fields from data
        event_id: params.id,
        form_schema_id: data.form_schema_id,
        responses: data.responses,
        status: 'pending' as const,
      };

      await createFormSubmission(submissionData);

      // Show success message
      toast({
        title: 'Registration complete',
        description: 'Your registration has been submitted successfully',
      });

      // Redirect to confirmation page
      router.push(`/events/${params.id}/confirmation`);
    } catch (error) {
      console.error('Error submitting registration:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit registration',
        variant: 'destructive',
      });
    }
  };

  const formatEventDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'EEEE, MMMM dd, yyyy');
    } catch (error) {
      return 'Date not set';
    }
  };

  const formatEventTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'h:mm a');
    } catch (error) {
      return 'Time not set';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <div className="animate-pulse flex flex-col w-full max-w-3xl">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="mb-6">
            The event you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="pl-0">
          <Link href={`/events/${params.id}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Event
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div>
              <h2 className="text-xl font-bold">{event.title}</h2>
              <p className="text-muted-foreground">{event.theme}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">
                    {formatEventDate(event.start_date)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatEventTime(event.start_date)} -{' '}
                    {formatEventTime(event.end_date)}
                  </p>
                </div>
              </div>

              {event.location && (
                <div className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p>{event.location}</p>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Event Type</h3>
              <p>{event.event_type}</p>
            </div>

            {event.price && (
              <div>
                <h3 className="font-medium mb-2">Registration Fee</h3>
                <p>
                  {typeof event.price === 'number'
                    ? `$${event.price.toFixed(2)}`
                    : event.price}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-6">Register for Event</h1>

          <RegistrationFormRenderer
            eventId={params.id}
            onSubmit={handleFormSubmit}
          />
        </div>
      </div>
    </div>
  );
}
