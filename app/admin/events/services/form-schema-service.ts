import { createClient } from '@/lib/supabase/client';
import { FormSchema, FormSchemaTable } from '../models/form-schema';

export async function createFormSchema(
  formSchema: Omit<FormSchema, 'id' | 'created_at' | 'updated_at'>
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('form_schemas')
    .insert([formSchema])
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating form schema: ${error.message}`);
  }

  return data as FormSchemaTable;
}

export async function updateFormSchema(
  id: string,
  formSchema: Partial<FormSchema>
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('form_schemas')
    .update(formSchema)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating form schema: ${error.message}`);
  }

  return data as FormSchemaTable;
}

export async function getFormSchema(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('form_schemas')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Error fetching form schema: ${error.message}`);
  }

  return data as FormSchemaTable;
}

export async function getEventFormSchema(eventId: string) {
  const supabase = createClient();

  // An event can end up with several active schemas; use the newest one
  // instead of failing (.single() errors on more than one row).
  const { data, error } = await supabase
    .from('form_schemas')
    .select('*')
    .eq('event_id', eventId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Error fetching event form schema: ${error.message}`);
  }

  return data as FormSchemaTable | null;
}

export async function deleteFormSchema(id: string) {
  const supabase = createClient();

  const { error } = await supabase.from('form_schemas').delete().eq('id', id);

  if (error) {
    throw new Error(`Error deleting form schema: ${error.message}`);
  }
}
