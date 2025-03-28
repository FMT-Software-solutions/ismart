import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// For client-side requests (auth, etc.)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For admin/server-side operations (with service role key)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
