import { z } from 'zod';

export const ErrorSchema = z.object({
  id: z.string().uuid().optional(),
  created_at: z.string().datetime().optional(),
  error_message: z.string().min(1, 'Error message is required'),
  stack_trace: z.string().optional(),
  component: z.string().optional(),
  error_type: z.string().optional(), // API, Client, Database, etc.
  user_id: z.string().optional(), // To associate errors with specific users if logged in
  metadata: z.record(z.any()).optional(), // For additional context like browser info, URL, etc.
  status: z.enum(['new', 'investigating', 'resolved']).default('new'),
  is_resolved: z.boolean().default(false),
  severity: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
});

export type ErrorRecord = z.infer<typeof ErrorSchema>;

export type ErrorTable = ErrorRecord & {
  id: string;
  created_at: string;
};

export type CreateErrorPayload = Omit<ErrorRecord, 'id' | 'created_at'>;
