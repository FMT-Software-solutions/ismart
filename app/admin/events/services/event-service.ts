import { createClient } from '@/lib/supabase/client';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { EventFormValues, EventTable } from '../models/event-schema';
import { FormSchemaTable } from '../models/form-schema';

// Create a new event
export async function createEvent(
  data: EventFormValues
): Promise<{ success: boolean; error?: string; eventId?: string }> {
  try {
    const supabase = createClient();

    const eventData = {
      banner_image_url: data.bannerImageUrl,
      title: data.title,
      theme: data.theme || null,
      description: data.description,
      start_date: data.startDate.toISOString(),
      end_date: data.endDate.toISOString(),
      location: data.location,
      event_type: data.eventType,
      price: data.isFree ? 0 : data.price,
      has_early_bird: data.hasEarlyBird,
      early_bird_price: data.hasEarlyBird ? data.earlyBirdPrice : null,
      early_bird_deadline:
        data.hasEarlyBird && data.earlyBirdDeadline
          ? data.earlyBirdDeadline.toISOString()
          : null,
      registration_deadline: data.registrationDeadline.toISOString(),
      capacity: data.capacity || null,
      is_free: data.isFree,
      require_approval: data.requireApproval,
      additional_info: data.additionalInfo || null,
      form_schema_id: data.formSchemaId || null,
      status: 'draft',
      registrations_count: 0,
      gallery_images: data.galleryImages || [],
      video_url: data.videoUrl || null,
    };

    const { data: event, error } = await supabase
      .from('events')
      .insert(eventData)
      .select('id')
      .single();

    if (error) {
      console.error('Error creating event:', error);
      return { success: false, error: error.message };
    }

    return { success: true, eventId: event.id };
  } catch (error) {
    console.error('Error creating event:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// Get an event by ID
export async function getEventById(
  id: string
): Promise<{ event?: EventTable; error?: string }> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching event:', error);
      return { error: error.message };
    }

    return { event: data as EventTable };
  } catch (error) {
    console.error('Error fetching event:', error);
    return { error: 'An unexpected error occurred' };
  }
}

// Update an existing event
export async function updateEvent(
  id: string,
  data: Partial<EventFormValues>
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();

    // Prepare the data for update
    const updateData: any = {};

    // Only include fields that are present in the data object
    if (data.title) updateData.title = data.title;
    if (data.bannerImageUrl) updateData.banner_image_url = data.bannerImageUrl;
    if (data.galleryImages) updateData.gallery_images = data.galleryImages;
    if (data.videoUrl !== undefined)
      updateData.video_url = data.videoUrl || null;
    if (data.theme !== undefined) updateData.theme = data.theme || null;
    if (data.description) updateData.description = data.description;
    if (data.startDate) updateData.start_date = data.startDate.toISOString();
    if (data.endDate) updateData.end_date = data.endDate.toISOString();
    if (data.location) updateData.location = data.location;
    if (data.eventType) updateData.event_type = data.eventType;
    if (data.price !== undefined)
      updateData.price = data.isFree ? 0 : data.price;
    if (data.hasEarlyBird !== undefined)
      updateData.has_early_bird = data.hasEarlyBird;
    if (data.earlyBirdPrice !== undefined) {
      updateData.early_bird_price = data.hasEarlyBird
        ? data.earlyBirdPrice
        : null;
    }
    if (data.earlyBirdDeadline !== undefined) {
      updateData.early_bird_deadline =
        data.hasEarlyBird && data.earlyBirdDeadline
          ? data.earlyBirdDeadline.toISOString()
          : null;
    }
    if (data.registrationDeadline) {
      updateData.registration_deadline =
        data.registrationDeadline.toISOString();
    }
    if (data.capacity !== undefined)
      updateData.capacity = data.capacity || null;
    if (data.isFree !== undefined) updateData.is_free = data.isFree;
    if (data.requireApproval !== undefined)
      updateData.require_approval = data.requireApproval;
    if (data.additionalInfo !== undefined) {
      updateData.additional_info = data.additionalInfo || null;
    }
    if (data.formSchemaId !== undefined) {
      updateData.form_schema_id = data.formSchemaId || null;
    }

    // Add updated_at timestamp
    updateData.updated_at = new Date().toISOString();

    const { error } = await supabase
      .from('events')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error updating event:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating event:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// Delete an event
export async function deleteEvent(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();

    const { error } = await supabase.from('events').delete().eq('id', id);

    if (error) {
      console.error('Error deleting event:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting event:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// Publish an event
export async function publishEvent(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from('events')
      .update({ status: 'published', updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error publishing event:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error publishing event:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// Update event status
export async function updateEventStatus(
  id: string,
  status: 'draft' | 'published' | 'cancelled' | 'archived'
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from('events')
      .update({
        status,
        updated_at: new Date().toISOString(),
        is_active:
          status === 'published' ? true : status === 'draft' ? true : false,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating event status:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating event status:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function incrementRegistrationCount(eventId: string) {
  const supabase = createClient();

  // First get the current count
  const { data: currentData, error: fetchError } = await supabase
    .from('events')
    .select('registrations_count')
    .eq('id', eventId)
    .single();

  if (fetchError) {
    console.error('Error fetching registration count:', fetchError);
    return { error: fetchError };
  }

  const currentCount = currentData?.registrations_count || 0;

  // Then update with the incremented count
  const { data, error } = await supabase
    .from('events')
    .update({ registrations_count: Number(currentCount) + 1 })
    .eq('id', eventId)
    .select('registrations_count')
    .single();

  if (error) {
    console.error('Error incrementing registration count:', error);
    return { error };
  }

  return { data };
}
