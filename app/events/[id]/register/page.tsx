import { getEventById } from '@/app/admin/events/services/event-service';
import { notFound } from 'next/navigation';
import { RegistrationForm } from './components/RegistrationForm';

export default async function EventRegistrationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { event, error } = await getEventById(id);

  if (error || !event) {
    notFound();
  }

  // Check if registration is closed
  const now = new Date();
  const registrationDeadline = new Date(event.registration_deadline);
  const isRegistrationClosed = now > registrationDeadline;

  // Check if event is at capacity
  const isAtCapacity =
    event.capacity !== null &&
    event.capacity !== 0 &&
    event.registrations_count >= event.capacity;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Register for {event.title}</h1>

      {isRegistrationClosed ? (
        <div className="text-center py-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">
            Registration Closed
          </h2>
          <p className="text-muted-foreground">
            The registration deadline for this event has passed.
          </p>
        </div>
      ) : isAtCapacity ? (
        <div className="text-center py-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">
            Event Full
          </h2>
          <p className="text-muted-foreground">
            This event has reached its maximum capacity.
          </p>
        </div>
      ) : (
        <RegistrationForm event={event} />
      )}
    </div>
  );
}
