'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, ChevronLeft, Home, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';

export default async function RegistrationConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        const supabase = createClient();

        const { data, error } = await supabase
          .from('events')
          .select('title, start_date, location')
          .eq('id', id)
          .single();

        if (error) throw error;
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="animate-pulse space-y-4 max-w-lg mx-auto">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-lg mx-auto">
        <Card className="border-green-100">
          <CardContent className="pt-6 px-6 pb-8 flex flex-col items-center text-center">
            <div className="bg-green-50 p-3 rounded-full mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold mb-2">Registration Confirmed</h1>
            <p className="text-gray-600 mb-6">
              Your registration has been submitted successfully and is pending
              review.
            </p>

            {event && (
              <div className="w-full bg-gray-50 rounded-lg p-4 mb-6">
                <h2 className="font-semibold text-lg mb-2">{event.title}</h2>
                <div className="text-sm text-gray-600 space-y-1">
                  {event.start_date && (
                    <div className="flex items-center justify-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        {new Date(event.start_date).toLocaleDateString(
                          'en-US',
                          {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </span>
                    </div>
                  )}
                  {event.location && <p>Location: {event.location}</p>}
                </div>
              </div>
            )}

            <p className="text-sm text-gray-500 mb-8">
              You will receive an email with further details and confirmation
              status. Check your registration status in your account dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button asChild className="flex-1" variant="outline">
                <Link href={`/events/${id}`}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Event
                </Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href="/dashboard/registrations">
                  View My Registrations
                </Link>
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
    </div>
  );
}
