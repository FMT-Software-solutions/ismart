import { getEventById } from '@/app/admin/events/services/event-service';
import { notFound } from 'next/navigation';
import { ConfirmationContent } from './components/ConfirmationContent';

export default async function EventConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { event, error } = await getEventById(id);

  if (error || !event) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <ConfirmationContent event={event} />
    </div>
  );
}
