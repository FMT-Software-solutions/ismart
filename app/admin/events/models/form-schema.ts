import { z } from 'zod';

// Form field types
export const formFieldTypes = [
  'text',
  'email',
  'phone',
  'select',
  'checkbox',
  'textarea',
] as const;

// Zod schema for form fields
export const formFieldSchema = z.object({
  id: z.number(),
  type: z.enum(formFieldTypes),
  label: z.string().min(1, 'Label is required'),
  placeholder: z.string().optional(),
  required: z.boolean().default(false),
  options: z.array(z.string()).optional(),
});

// Zod schema for the form schema
export const formSchemaSchema = z.object({
  id: z.string().uuid().optional(),
  event_id: z.string().uuid(),
  title: z.string().min(1, 'Form title is required'),
  description: z.string().optional(),
  fields: z.array(formFieldSchema),
  is_active: z.boolean().default(true),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

// TypeScript types
export type FormFieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'textarea'
  | 'select'
  | 'checkbox';

export interface FormFieldCondition {
  fieldId: string;
  value: string;
}

export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  conditions?: FormFieldCondition[];
}

export interface FormSchema {
  id?: string;
  event_id?: string;
  title: string;
  description?: string;
  fields: FormField[];
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Supabase table schema
export interface FormSchemaTable {
  id: string;
  event_id: string;
  title: string;
  description: string | null;
  fields: FormField[];
  is_active: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// Form submission schema
export const formSubmissionSchema = z.object({
  id: z.string().uuid().optional(),
  form_schema_id: z.string().uuid(),
  event_id: z.string().uuid(),
  user_id: z.string().uuid(),
  responses: z.record(z.string(), z.any()),
  status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export type FormSubmission = z.infer<typeof formSubmissionSchema>;

// Supabase table schema for form submissions
export interface FormSubmissionTable {
  id: string;
  form_schema_id: string;
  event_id: string;
  user_id: string;
  responses: Record<string, any>;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
