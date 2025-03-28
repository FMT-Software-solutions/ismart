import { notFound } from 'next/navigation';
import { getEventById } from '../../services/event-service';
import EditEventForm from './EditEventForm';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { getEventFormSchema } from '../../services/form-schema-service';

export const dynamic = 'force-dynamic';

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Fetch the event data on the server
  const { event, error } = await getEventById(id);
  const formSchema = await getEventFormSchema(id);

  // If event doesn't exist or there was an error, show 404
  if (!event || error) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Event</h1>
        <p className="text-gray-500">
          Update your event details and registration form
        </p>
      </div>

      <Suspense
        fallback={
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        }
      >
        <EditEventForm event={event} formSchema={formSchema || undefined} />
      </Suspense>
    </div>
  );
}
