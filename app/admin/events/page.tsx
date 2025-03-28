import { Suspense } from 'react';
import PageHeader from './components/PageHeader';
import EventsTable from './components/EventsTable';
import { getEvents } from './services/events-data';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  // Fetch events on the server
  const { events, error } = await getEvents();

  return (
    <div className="space-y-6">
      <PageHeader />

      <Suspense
        fallback={<EventsTable events={[]} isLoading={true} error={null} />}
      >
        <EventsTable events={events} isLoading={false} error={error} />
      </Suspense>
    </div>
  );
}
