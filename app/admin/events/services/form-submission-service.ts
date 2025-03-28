import { createClient } from '@/lib/supabase/client';
import {
  FormSubmission,
  FormSubmissionTable,
  formSubmissionSchema,
} from '../models/form-schema';

export async function createFormSubmission(
  submission: Omit<FormSubmission, 'id' | 'created_at' | 'updated_at'>
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('form_submissions')
    .insert([submission])
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating form submission: ${error.message}`);
  }

  return data as FormSubmissionTable;
}

export async function updateFormSubmissionStatus(
  id: string,
  status: 'pending' | 'approved' | 'rejected'
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('form_submissions')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating form submission status: ${error.message}`);
  }

  return data as FormSubmissionTable;
}

export async function getFormSubmission(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('form_submissions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Error fetching form submission: ${error.message}`);
  }

  return data as FormSubmissionTable;
}

export async function getEventFormSubmissions(eventId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('form_submissions')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error fetching event form submissions: ${error.message}`);
  }

  return data as FormSubmissionTable[];
}

export async function getUserFormSubmissions(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('form_submissions')
    .select('*, form_schemas(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error fetching user form submissions: ${error.message}`);
  }

  return data as (FormSubmissionTable & { form_schemas: any })[];
}

export async function deleteFormSubmission(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('form_submissions')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Error deleting form submission: ${error.message}`);
  }
}
