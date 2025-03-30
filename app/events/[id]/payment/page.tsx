import { getEventById } from '@/app/admin/events/services/event-service';
import { notFound } from 'next/navigation';
import { PaymentForm } from './components/PaymentForm';

export default async function EventPaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { event, error } = await getEventById(id);

  if (error || !event) {
    notFound();
  }

  // Redirect to registration if event is free
  if (event.is_free) {
    return {
      redirect: {
        destination: `/events/${id}/register`,
        permanent: false,
      },
    };
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Payment for {event.title}</h1>
      <PaymentForm event={event} />
    </div>
  );
}
