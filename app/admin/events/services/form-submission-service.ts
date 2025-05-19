import { createClient } from '@/lib/supabase/client';
import {
  FormSubmission,
  FormSubmissionTable,
} from '../models/form-submission-schema';
import * as XLSX from 'xlsx';
import { recordError } from '@/app/services/error-service';

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
    recordError(error as Error, {
      component: 'FormSubmissionService',
      errorType: 'FormSubmissionError',
      metadata: {
        submission,
      },
    });
    throw new Error(`Error creating form submission: ${error.message}`);
  }

  return data as FormSubmissionTable;
}

export async function updateFormSubmissionStatus(
  id: string,
  status: FormSubmission['status']
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

  // First get the submission
  const { data: submission, error: submissionError } = await supabase
    .from('form_submissions')
    .select('*')
    .eq('id', id)
    .single();

  if (submissionError) {
    throw new Error(
      `Error fetching form submission: ${submissionError.message}`
    );
  }

  // Get event title
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('title')
    .eq('id', submission.event_id)
    .single();

  if (eventError) {
    console.error(`Error fetching event: ${eventError.message}`);
  }

  // Get form schema title
  const { data: formSchema, error: formSchemaError } = await supabase
    .from('form_schemas')
    .select('title')
    .eq('id', submission.form_schema_id)
    .single();

  if (formSchemaError) {
    console.error(`Error fetching form schema: ${formSchemaError.message}`);
  }

  // Combine the data
  const result = {
    ...submission,
    event: event || { title: 'Unknown Event' },
    form_schema: formSchema || { title: 'Unknown Form' },
  };

  return result as FormSubmissionTable;
}

export async function getEventFormSubmissions(eventId: string) {
  const supabase = createClient();

  // Get submissions for this event
  const { data: submissions, error: submissionsError } = await supabase
    .from('form_submissions')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false });

  if (submissionsError) {
    throw new Error(
      `Error fetching event form submissions: ${submissionsError.message}`
    );
  }

  // Get event title
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('title')
    .eq('id', eventId)
    .single();

  if (eventError) {
    console.error(`Error fetching event: ${eventError.message}`);
  }

  // Get all form schema IDs from submissions
  const formSchemaIds = Array.from(
    new Set(submissions.map((s) => s.form_schema_id))
  );

  // Get all form schemas in one query
  const { data: formSchemas, error: formSchemasError } = await supabase
    .from('form_schemas')
    .select('id, title')
    .in('id', formSchemaIds);

  if (formSchemasError) {
    console.error(`Error fetching form schemas: ${formSchemasError.message}`);
  }

  // Create a map for quick lookups
  const formSchemaMap = (formSchemas || []).reduce(
    (acc, schema) => {
      acc[schema.id] = schema;
      return acc;
    },
    {} as Record<string, any>
  );

  // Combine data
  const result = submissions.map((submission) => ({
    ...submission,
    event: event || { title: 'Unknown Event' },
    form_schema: formSchemaMap[submission.form_schema_id] || {
      title: 'Unknown Form',
    },
  }));

  return result as FormSubmissionTable[];
}

export async function getUserFormSubmissions(userId: string) {
  const supabase = createClient();

  // Get submissions for this user
  const { data: submissions, error: submissionsError } = await supabase
    .from('form_submissions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (submissionsError) {
    throw new Error(
      `Error fetching user form submissions: ${submissionsError.message}`
    );
  }

  // Get event IDs from submissions
  const eventIds = Array.from(new Set(submissions.map((s) => s.event_id)));

  // Get all events in one query
  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('id, title')
    .in('id', eventIds);

  if (eventsError) {
    console.error(`Error fetching events: ${eventsError.message}`);
  }

  // Get form schema IDs from submissions
  const formSchemaIds = Array.from(
    new Set(submissions.map((s) => s.form_schema_id))
  );

  // Get all form schemas in one query
  const { data: formSchemas, error: formSchemasError } = await supabase
    .from('form_schemas')
    .select('id, title')
    .in('id', formSchemaIds);

  if (formSchemasError) {
    console.error(`Error fetching form schemas: ${formSchemasError.message}`);
  }

  // Create maps for quick lookups
  const eventMap = (events || []).reduce(
    (acc, event) => {
      acc[event.id] = event;
      return acc;
    },
    {} as Record<string, any>
  );

  const formSchemaMap = (formSchemas || []).reduce(
    (acc, schema) => {
      acc[schema.id] = schema;
      return acc;
    },
    {} as Record<string, any>
  );

  // Combine data
  const result = submissions.map((submission) => ({
    ...submission,
    event: eventMap[submission.event_id] || { title: 'Unknown Event' },
    form_schema: formSchemaMap[submission.form_schema_id] || {
      title: 'Unknown Form',
    },
  }));

  return result as FormSubmissionTable[];
}

export async function getFormSubmissions(eventId?: string) {
  const supabase = createClient();

  // Get submissions, filtered by event if provided
  let query = supabase
    .from('form_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (eventId) {
    query = query.eq('event_id', eventId);
  }

  const { data: submissions, error: submissionsError } = await query;

  if (submissionsError) {
    return { submissions: null, error: submissionsError.message };
  }

  if (submissions.length === 0) {
    return { submissions: [], error: null };
  }

  // Get unique event IDs
  const eventIds = Array.from(new Set(submissions.map((s) => s.event_id)));

  // Get all events in one query
  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('id, title')
    .in('id', eventIds);

  if (eventsError) {
    console.error(`Error fetching events: ${eventsError.message}`);
  }

  // Get unique form schema IDs
  const formSchemaIds = Array.from(
    new Set(submissions.map((s) => s.form_schema_id).filter(Boolean))
  );

  // Get all form schemas in one query if there are any IDs
  let formSchemas: any[] = [];
  if (formSchemaIds.length > 0) {
    const { data, error: formSchemasError } = await supabase
      .from('form_schemas')
      .select('id, title')
      .in('id', formSchemaIds);

    if (formSchemasError) {
      console.error(`Error fetching form schemas: ${formSchemasError.message}`);
    } else {
      formSchemas = data || [];
    }
  }

  // Create maps for quick lookups
  const eventMap = (events || []).reduce(
    (acc, event) => {
      acc[event.id] = { title: event.title };
      return acc;
    },
    {} as Record<string, { title: string }>
  );

  const formSchemaMap = formSchemas.reduce(
    (acc, schema) => {
      acc[schema.id] = { title: schema.title };
      return acc;
    },
    {} as Record<string, { title: string }>
  );

  // Combine data
  const result = submissions.map((submission) => ({
    ...submission,
    event: eventMap[submission.event_id] || { title: 'Unknown Event' },
    form_schema: submission.form_schema_id
      ? formSchemaMap[submission.form_schema_id] || { title: 'Unknown Form' }
      : { title: 'No Form' },
  }));

  return { submissions: result as FormSubmissionTable[], error: null };
}

export async function deleteFormSubmission(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('form_submissions')
    .delete()
    .eq('id', id);

  if (error) {
    recordError(error as Error, {
      component: 'FormSubmissionService',
      errorType: 'FormSubmissionDeleteError',
      metadata: {
        submissionId: id,
      },
    });
    throw new Error(`Error deleting form submission: ${error.message}`);
  }

  return true;
}

export async function exportToExcel(submissions: FormSubmissionTable[]) {
  // Transform submissions into a format suitable for Excel
  const excelData = submissions.map((submission) => {
    const baseData: Record<string, any> = {
      'Submission ID': submission.id,
      Event: submission.event?.title || 'N/A',
      Form: submission.form_schema?.title || 'N/A',
      Status: submission.status,
      'Created At': new Date(submission.created_at).toLocaleString(),
      'Updated At': new Date(submission.updated_at).toLocaleString(),
    };

    // Add form responses
    const responses = submission.responses;
    Object.entries(responses).forEach(([key, value]) => {
      baseData[key] = value;
    });

    return baseData;
  });

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(excelData);

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Submissions');

  // Generate Excel file
  XLSX.writeFile(wb, 'form_submissions.xlsx');
}
