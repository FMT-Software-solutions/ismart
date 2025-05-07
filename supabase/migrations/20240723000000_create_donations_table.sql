-- Create donations table
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donation_reference TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method TEXT NOT NULL,
    message TEXT,
    payment_status TEXT NOT NULL DEFAULT 'completed', -- 'pending', 'completed', 'failed'
    payment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Only allow admins to select donations
CREATE POLICY "Allow admins to select donations" ON public.donations
    FOR SELECT 
    USING (
        auth.uid() IN (
            SELECT auth.uid() FROM auth.users
            WHERE auth.email() IN (
                SELECT email FROM public.admin_users
            )
        )
    );

-- Only allow admins to insert donations
CREATE POLICY "Allow admins to insert donations" ON public.donations
    FOR INSERT
    WITH CHECK (
        auth.uid() IN (
            SELECT auth.uid() FROM auth.users
            WHERE auth.email() IN (
                SELECT email FROM public.admin_users
            )
        )
    );

-- Allow service role to do all operations (for API routes)
CREATE POLICY "Allow service role full access to donations" ON public.donations
    USING (auth.jwt() ->> 'role' = 'service_role');

-- Add indexes
CREATE INDEX IF NOT EXISTS donations_email_idx ON public.donations (email);
CREATE INDEX IF NOT EXISTS donations_payment_date_idx ON public.donations (payment_date);

-- Add function for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for updated_at
CREATE TRIGGER set_donations_updated_at
BEFORE UPDATE ON public.donations
FOR EACH ROW
EXECUTE PROCEDURE public.handle_updated_at(); 