import { cookies } from 'next/headers';
import { Event } from '../models/event-schema';
import { createClient } from '@/lib/supabase/client';

/**
 * Fetches all events from Supabase
 * This function is designed to be called from server components
 */
export async function getEvents(): Promise<{
  events: Event[];
  error: string | null;
}> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Map database field names to client-side field names
    const events = data.map((event: any) => ({
      id: event.id,
      title: event.title,
      theme: event.theme,
      description: event.description,
      startDate: event.start_date,
      endDate: event.end_date,
      location: event.location,
      eventType: event.event_type,
      price: event.price,
      hasEarlyBird: event.has_early_bird,
      earlyBirdPrice: event.early_bird_price,
      earlyBirdDeadline: event.early_bird_deadline,
      registrationDeadline: event.registration_deadline,
      capacity: event.capacity,
      isFree: event.is_free,
      requireApproval: event.require_approval,
      additionalInfo: event.additional_info,
      formSchemaId: event.form_schema_id,
      created_at: event.created_at,
      updated_at: event.updated_at,
      status: event.status,
      is_active: event.is_active,
      registrations_count: event.registrations_count,
    }));

    return { events, error: null };
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return {
      events: [],
      error: error.message || 'Failed to load events',
    };
  }
}
