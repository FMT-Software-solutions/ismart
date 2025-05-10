import { getEventById } from '@/app/admin/events/services/event-service';
import { EventDetails } from './components/EventDetails';
import { notFound } from 'next/navigation';

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { event, error } = await getEventById(id);

  if (error || !event || event.status !== 'published') {
    notFound();
  }

  return <EventDetails event={event} />;
}
