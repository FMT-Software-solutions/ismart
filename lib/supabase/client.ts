import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/lib/database.types';

export function createClientSupabaseClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Alias for backward compatibility
export function createClient() {
  return createClientSupabaseClient();
}
