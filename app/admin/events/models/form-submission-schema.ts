export type FormSubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface FormSubmissionTable {
  id: string;
  event_id: string;
  form_schema_id: string;
  user_id: string;
  responses: Record<string, any>;
  status: FormSubmissionStatus;
  created_at: string;
  updated_at: string;
  event?: {
    title: string;
  };
  form_schema?: {
    title: string;
  };
  payment_method?: string;
  payment_details?: Record<string, any>;
}

export interface FormSubmission
  extends Omit<FormSubmissionTable, 'event' | 'form_schema'> {}
