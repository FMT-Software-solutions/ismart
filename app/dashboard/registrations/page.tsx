'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import {
  CalendarIcon,
  ExternalLink,
  Clock,
  CheckCircle,
  XCircle,
  HourglassIcon,
  Loader2,
} from 'lucide-react';

import { createClient } from '@/lib/supabase/client';
import { getUserFormSubmissions } from '@/app/admin/events/services/form-submission-service';

export default function UserRegistrationsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      try {
        setIsLoading(true);
        const supabase = createClient();

        // Check if user is logged in
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          toast({
            title: 'Authentication required',
            description: 'Please log in to view your registrations',
            variant: 'destructive',
          });
          router.push('/login?redirect=/dashboard/registrations');
          return;
        }

        // Load user's registrations
        const submissions = await getUserFormSubmissions(user.id);

        // Fetch event details for each submission
        const submissionsWithEvents = await Promise.all(
          submissions.map(async (submission) => {
            const { data: event, error: eventError } = await supabase
              .from('events')
              .select('title, start_date, end_date, location, event_type')
              .eq('id', submission.event_id)
              .single();

            return {
              ...submission,
              event: eventError ? null : event,
            };
          })
        );

        setRegistrations(submissionsWithEvents);
        setFilteredRegistrations(submissionsWithEvents);
      } catch (error) {
        console.error('Error loading registrations:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your registrations',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndLoadData();
  }, [router, toast]);

  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredRegistrations(registrations);
    } else {
      setFilteredRegistrations(
        registrations.filter((reg) => reg.status === activeTab)
      );
    }
  }, [activeTab, registrations]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Date not set';

    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case 'pending':
      default:
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            <HourglassIcon className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  const getRegistrationCounts = () => {
    const counts = {
      all: registrations.length,
      pending: registrations.filter((reg) => reg.status === 'pending').length,
      approved: registrations.filter((reg) => reg.status === 'approved').length,
      rejected: registrations.filter((reg) => reg.status === 'rejected').length,
    };
    return counts;
  };

  const counts = getRegistrationCounts();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">My Registrations</h1>
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">My Registrations</h1>
      <p className="text-muted-foreground mb-6">
        View and manage your event registrations
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Event Registrations</CardTitle>
          <CardDescription>
            See the status of your event registrations
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({counts.pending})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({counts.approved})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({counts.rejected})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {filteredRegistrations.length === 0 ? (
                <div className="text-center py-8 border rounded-md">
                  <p className="text-gray-500">No registrations found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRegistrations.map((registration) => (
                    <Card key={registration.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 md:w-60 flex flex-col justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Status
                            </p>
                            {getStatusBadge(registration.status)}
                          </div>

                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground mb-1">
                              Registered On
                            </p>
                            <p className="text-sm font-medium">
                              {formatDate(registration.created_at)}
                            </p>
                          </div>
                        </div>

                        <CardContent className="p-4 flex-1">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <h3 className="font-bold text-lg">
                                {registration.event?.title || 'Event'}
                              </h3>

                              {registration.event && (
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <CalendarIcon className="h-4 w-4 mr-1" />
                                  <span>
                                    {formatDate(registration.event.start_date)}
                                  </span>

                                  {registration.event.location && (
                                    <>
                                      <span className="mx-2">•</span>
                                      <span>{registration.event.location}</span>
                                    </>
                                  )}
                                </div>
                              )}

                              <div className="mt-4">
                                <h4 className="text-sm font-medium mb-1">
                                  Registration Details
                                </h4>
                                <div className="text-sm space-y-1">
                                  {registration.responses &&
                                    Object.entries(registration.responses)
                                      .slice(0, 3) // Show only first few fields
                                      .map(([key, value]) => {
                                        const fieldName = key.replace(
                                          'field_',
                                          ''
                                        );
                                        return (
                                          <div
                                            key={key}
                                            className="grid grid-cols-3"
                                          >
                                            <span className="col-span-1 text-muted-foreground">
                                              {fieldName}:
                                            </span>
                                            <span className="col-span-2 truncate">
                                              {typeof value === 'boolean'
                                                ? value
                                                  ? 'Yes'
                                                  : 'No'
                                                : String(value) ||
                                                  'Not provided'}
                                            </span>
                                          </div>
                                        );
                                      })}

                                  {registration.responses &&
                                    Object.keys(registration.responses).length >
                                      3 && (
                                      <p className="text-xs text-muted-foreground">
                                        +
                                        {Object.keys(registration.responses)
                                          .length - 3}{' '}
                                        more fields
                                      </p>
                                    )}
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/events/${registration.event_id}`}>
                                  View Event
                                  <ExternalLink className="ml-1 h-3 w-3" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <Button asChild>
          <Link href="/events">Browse More Events</Link>
        </Button>
      </div>
    </div>
  );
}
