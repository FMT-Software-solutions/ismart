import { EventTable } from '../models/event-schema';
import { FormSubmissionTable } from '../models/form-submission-schema';
import { getEvents } from '../services/event-service';
import { getFormSubmissions } from '../services/form-submission-service';
import { SubmissionsClient } from './components/submissions-client';
import { Suspense } from 'react';

interface SubmissionsPageProps {
  searchParams: Promise<{
    eventId?: string;
  }>;
}

export default async function SubmissionsPage({
  searchParams,
}: SubmissionsPageProps) {
  const { eventId } = await searchParams;

  // Get submissions with filters - only filter by eventId on the server
  // If eventId is 'all-events' or undefined, fetch all submissions
  const { submissions, error } = await getFormSubmissions(
    eventId === 'all-events' ? undefined : eventId
  );

  const { events, error: eventsError } = await getEvents();

  if (error || eventsError) {
    console.error('Error fetching submissions:', error);
    return (
      <div className="container mx-auto py-10">
        <div className="text-center p-4 border rounded-md bg-red-50 text-red-600">
          Error loading data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<div>Loading submissions...</div>}>
        <SubmissionsClient
          submissions={
            submissions as (FormSubmissionTable & { event: EventTable })[] | []
          }
          events={events || []}
        />
      </Suspense>
    </div>
  );
}
