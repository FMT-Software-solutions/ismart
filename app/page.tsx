import { getUpcomingEvents } from '@/app/admin/events/services/events-data';
import { HomeContent } from './components/HomeContent';

export default async function Home() {
  const { events, error } = await getUpcomingEvents(3);

  return <HomeContent upcomingEvents={events} />;
}
