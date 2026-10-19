import { getUpcomingEvents } from '@/app/admin/events/services/events-data';
import { getSiteStats } from '@/lib/db/site-stats';
import { HomeContent } from './components/HomeContent';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [{ events }, stats] = await Promise.all([
    getUpcomingEvents(3),
    getSiteStats(),
  ]);

  return <HomeContent upcomingEvents={events} stats={stats} />;
}
