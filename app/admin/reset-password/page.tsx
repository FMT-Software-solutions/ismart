import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ResetPasswordForm from './ResetPasswordForm';

export default async function ResetPassword() {
  const supabase = await createServerSupabaseClient();

  // Check if user is logged in
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // If not logged in, redirect to login
    redirect('/admin/login');
  }

  // Check if user is on first login
  const { data: userData } = await supabase
    .from('users')
    .select('is_first_login')
    .eq('id', session.user.id)
    .single();

  if (!userData?.is_first_login) {
    // If not first login, redirect to admin dashboard
    redirect('/admin');
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ResetPasswordForm userId={session.user.id} />
    </div>
  );
}
