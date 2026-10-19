'use server';

import { after } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Resend } from 'resend';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { newPasswordSchema } from '@/lib/auth/password-policy';
import { getAppUrl } from '@/lib/auth/app-url';
import { PasswordChangedEmail } from '@/components/emails/PasswordChangedEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

// Set once the recovery token has been verified, so that if saving the
// password then fails (e.g. it matches the old one) the user can retry
// without the already-used token.
const VERIFIED_COOKIE = 'admin_pw_reset';

export interface ResetPasswordState {
  error?: string;
  linkExpired?: boolean;
}

export async function resetPasswordWithToken(
  _prev: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const tokenHash = String(formData.get('token_hash') || '');

  const parsed = newPasswordSchema.safeParse({
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });
  // Validate before touching the one-time token so a typo does not burn it
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || 'Invalid password.' };
  }

  const supabase = await createServerSupabaseClient();
  const cookieStore = await cookies();

  let userId: string | undefined;
  const { data: verified, error: verifyError } = await supabase.auth.verifyOtp({
    type: 'recovery',
    token_hash: tokenHash,
  });

  if (!verifyError && verified.user) {
    userId = verified.user.id;
    cookieStore.set(VERIFIED_COOKIE, userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/admin/forgot-password',
      maxAge: 10 * 60,
    });
  } else {
    // Token already used: allow a retry only within the session it created
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user && cookieStore.get(VERIFIED_COOKIE)?.value === user.id) {
      userId = user.id;
    }
  }

  if (!userId) {
    return {
      error:
        'This reset link is invalid or has expired. Please request a new one.',
      linkExpired: true,
    };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (updateError) {
    const samePassword = /different from the old password/i.test(
      updateError.message
    );
    return {
      error: samePassword
        ? 'Your new password must be different from your current password.'
        : updateError.message || 'Could not update your password.',
    };
  }

  cookieStore.delete({ name: VERIFIED_COOKIE, path: '/admin/forgot-password' });

  // Anyone else holding a session for this account is signed out
  await supabase.auth.signOut({ scope: 'others' });

  // A password chosen through reset also completes the first-login step
  const { data: profile } = await supabaseAdmin
    .from('users')
    .update({ is_first_login: false })
    .eq('id', userId)
    .select('email, full_name')
    .maybeSingle();

  if (profile?.email) {
    after(() => sendPasswordChangedEmail(profile.email, profile.full_name));
  }

  redirect('/admin');
}

async function sendPasswordChangedEmail(email: string, name?: string | null) {
  try {
    await resend.emails.send({
      from: 'iSMART <noreply@theismart.org>',
      to: [email],
      subject: 'Your iSMART admin password was changed',
      react: PasswordChangedEmail({
        userName: name || undefined,
        changedAt:
          new Date().toLocaleString('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
            timeZone: 'Africa/Accra',
          }) + ' GMT',
        appUrl: getAppUrl(),
      }),
    });
  } catch (error) {
    console.error('Password changed email failed:', error);
  }
}
