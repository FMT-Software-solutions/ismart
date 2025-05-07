import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import LoginForm from './LoginForm';

export default async function AdminLogin() {
  const supabase = await createServerSupabaseClient();

  // Check if user is already logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // If logged in, redirect to admin dashboard
    redirect('/admin');
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm />
    </div>
  );
}
