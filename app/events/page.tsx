import { getEvents } from '@/app/admin/events/services/events-data';
import { EventsGrid } from './components/EventsGrid';

export const metadata = {
  title: 'Events & Trainings | iSmart',
  description: 'Browse all our upcoming events and trainings',
};

export default async function EventsPage() {
  const { events, error } = await getEvents();

  if (error) {
    return (
      <div className="container-custom section-padding">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Error loading events: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12">
            <h1 className="heading-1 mb-4">Events & Trainings</h1>
            <p className="text-muted-foreground text-lg">
              Browse through our upcoming and past events and trainings. Join us
              in making a difference.
            </p>
          </div>
          <EventsGrid initialEvents={events} />
        </div>
      </section>
    </main>
  );
}
