import {
  continentsReached,
  countriesReached,
  siteStatsConfig,
  type SiteStats,
} from '@/const/site-stats';
import { programAreas } from '@/const/programs';

// Event statuses that represent trainings that actually ran / are running.
const HELD_EVENT_STATUSES = ['published', 'completed', 'archived'];

/**
 * Computes the home page impact stats. Server only: counts are read with the
 * service role so row level security does not hide registrations from
 * anonymous visitors. Falls back to configured values if the query fails.
 */
export async function getSiteStats(): Promise<SiteStats> {
  let registrations = 0;
  let heldEvents = 0;

  try {
    const { supabaseAdmin } = await import('@/lib/supabase/admin');

    const [submissionsResult, eventsResult] = await Promise.all([
      supabaseAdmin
        .from('form_submissions')
        .select('id', { count: 'exact', head: true })
        .neq('status', 'rejected'),
      supabaseAdmin
        .from('events')
        .select('id', { count: 'exact', head: true })
        .in('status', HELD_EVENT_STATUSES),
    ]);

    registrations = submissionsResult.count ?? 0;
    heldEvents = eventsResult.count ?? 0;
  } catch (error) {
    console.error('Error loading site stats:', error);
  }

  const { studentsEnrolled, trainingsAndWebinars, coursesOffered } =
    siteStatsConfig;

  return {
    studentsEnrolled:
      studentsEnrolled.override ?? studentsEnrolled.baseline + registrations,
    trainingsAndWebinars:
      trainingsAndWebinars.override ??
      trainingsAndWebinars.baseline + heldEvents,
    coursesOffered: coursesOffered.override ?? programAreas.length,
    countries: countriesReached.length,
    continents: continentsReached.length,
  };
}
