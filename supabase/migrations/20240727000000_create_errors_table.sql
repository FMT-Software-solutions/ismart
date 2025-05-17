-- Create errors table for recording application errors
CREATE TABLE IF NOT EXISTS public.errors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  error_message TEXT NOT NULL,
  stack_trace TEXT,
  component TEXT,
  error_type TEXT,
  user_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'new',
  is_resolved BOOLEAN NOT NULL DEFAULT false,
  severity TEXT NOT NULL DEFAULT 'medium'
);

-- Enable RLS policies for the errors table
ALTER TABLE public.errors ENABLE ROW LEVEL SECURITY;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS errors_status_idx ON public.errors (status);
CREATE INDEX IF NOT EXISTS errors_is_resolved_idx ON public.errors (is_resolved);
CREATE INDEX IF NOT EXISTS errors_severity_idx ON public.errors (severity);
CREATE INDEX IF NOT EXISTS errors_created_at_idx ON public.errors (created_at);
CREATE INDEX IF NOT EXISTS errors_user_id_idx ON public.errors (user_id); 