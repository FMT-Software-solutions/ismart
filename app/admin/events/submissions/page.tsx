'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

import SubmissionTable from '../components/submission-table';
import { FormSubmissionTable } from '../models/form-schema';
import { getEventFormSubmissions } from '../services/form-submission-service';

export default function SubmissionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const { toast } = useToast();

  const [submissions, setSubmissions] = useState<FormSubmissionTable[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<
    FormSubmissionTable[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (!eventId) {
      toast({
        title: 'Error',
        description: 'No event ID provided',
        variant: 'destructive',
      });
      router.push('/admin/events');
      return;
    }

    const loadSubmissions = async () => {
      try {
        setIsLoading(true);
        const data = await getEventFormSubmissions(eventId);
        setSubmissions(data);
        setFilteredSubmissions(data);
      } catch (error) {
        console.error('Error loading submissions:', error);
        toast({
          title: 'Error',
          description: 'Failed to load submissions',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSubmissions();
  }, [eventId, router, toast]);

  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredSubmissions(submissions);
    } else {
      setFilteredSubmissions(
        submissions.filter((sub) => sub.status === activeTab)
      );
    }
  }, [activeTab, submissions]);

  const handleStatusChange = async () => {
    // Reload submissions after status change
    if (!eventId) return;

    try {
      const data = await getEventFormSubmissions(eventId);
      setSubmissions(data);

      // Maintain the current tab filter
      if (activeTab === 'all') {
        setFilteredSubmissions(data);
      } else {
        setFilteredSubmissions(data.filter((sub) => sub.status === activeTab));
      }

      toast({
        title: 'Success',
        description: 'Submissions updated successfully',
      });
    } catch (error) {
      console.error('Error reloading submissions:', error);
      toast({
        title: 'Error',
        description: 'Failed to reload submissions',
        variant: 'destructive',
      });
    }
  };

  const getSubmissionCounts = () => {
    const counts = {
      all: submissions.length,
      pending: submissions.filter((sub) => sub.status === 'pending').length,
      approved: submissions.filter((sub) => sub.status === 'approved').length,
      rejected: submissions.filter((sub) => sub.status === 'rejected').length,
    };
    return counts;
  };

  const counts = getSubmissionCounts();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Event Submissions</h1>
          <p className="text-muted-foreground">
            Review and manage registration submissions
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push(`/admin/events/edit?id=${eventId}`)}
        >
          Back to Event
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registration Submissions</CardTitle>
          <CardDescription>
            View and manage all registrations for this event
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
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
                <SubmissionTable
                  submissions={filteredSubmissions}
                  onStatusChange={handleStatusChange}
                />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
