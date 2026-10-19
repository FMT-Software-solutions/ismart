// Links in auth emails must come from configuration, never from the request's
// Host header (which an attacker can spoof to poison reset links).
export function getAppUrl() {
  const url = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/+$/, '');
  if (!url || !/^https?:\/\//.test(url)) {
    throw new Error('NEXT_PUBLIC_APP_URL must be set to the site origin');
  }
  return url;
}

// Must match "Email OTP Expiration" in Supabase Auth settings (default 1 hour).
export const PASSWORD_RESET_EXPIRY_MINUTES = Number(
  process.env.PASSWORD_RESET_EXPIRY_MINUTES || 60
);
