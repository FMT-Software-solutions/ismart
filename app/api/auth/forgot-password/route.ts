import { after, NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { PasswordResetEmail } from '@/components/emails/PasswordResetEmail';
import { getAppUrl, PASSWORD_RESET_EXPIRY_MINUTES } from '@/lib/auth/app-url';
import { rateLimit } from '@/lib/auth/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

const requestSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
});

// Same response whether or not the account exists, so the endpoint cannot be
// used to discover which emails belong to admins.
const GENERIC_MESSAGE =
  'If an admin account exists for that email, a password reset link is on its way.';

const WINDOW_MS = 15 * 60 * 1000;

function getClientIp(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  const { email } = parsed.data;

  // Per-IP limit is safe to surface: it says nothing about any account
  const ipLimit = rateLimit(`reset:ip:${getClientIp(request)}`, 10, WINDOW_MS);
  if (!ipLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(ipLimit.retryAfterMs / 1000)),
        },
      }
    );
  }

  // Per-email limit is applied silently to avoid flooding an inbox
  const emailLimit = rateLimit(`reset:email:${email}`, 3, WINDOW_MS);

  if (emailLimit.allowed) {
    // Do the lookup and send after responding so response time is the same
    // for existing and unknown emails.
    after(() => sendResetEmail(email));
  }

  return NextResponse.json({ message: GENERIC_MESSAGE });
}

async function sendResetEmail(email: string) {
  try {
    const appUrl = getAppUrl();

    // Only admin users (rows in public.users) can reset through this flow
    const { data: admin, error: lookupError } = await supabaseAdmin
      .from('users')
      .select('email, full_name')
      .ilike('email', email.replace(/[\\%_]/g, '\\$&'))
      .maybeSingle();

    if (lookupError) throw lookupError;
    if (!admin) return;

    // generateLink creates the one-time recovery token without sending
    // Supabase's default email, so we can send our own branded one.
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: admin.email,
    });
    if (error) throw error;

    const tokenHash = data.properties?.hashed_token;
    if (!tokenHash) throw new Error('No recovery token returned');

    // Only the token hash goes in the link. It is verified server-side when
    // the new password is submitted, so email link scanners that pre-open
    // links cannot use up the token.
    const resetUrl = `${appUrl}/admin/forgot-password/reset?token_hash=${encodeURIComponent(
      tokenHash
    )}`;

    const { error: sendError } = await resend.emails.send({
      from: 'iSMART <noreply@theismart.org>',
      to: [admin.email],
      subject: 'Reset your iSMART admin password',
      react: PasswordResetEmail({
        userName: admin.full_name || undefined,
        resetUrl,
        expiresInMinutes: PASSWORD_RESET_EXPIRY_MINUTES,
        appUrl,
      }),
    });
    if (sendError) throw sendError;
  } catch (error) {
    // Never surface this to the requester; log for the team instead
    console.error('Password reset email failed:', error);
  }
}
