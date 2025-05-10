import { getUpcomingEvents } from '@/app/admin/events/services/events-data';
import { HomeContent } from './components/HomeContent';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { events, error } = await getUpcomingEvents(3);

  return <HomeContent upcomingEvents={events} />;
}
