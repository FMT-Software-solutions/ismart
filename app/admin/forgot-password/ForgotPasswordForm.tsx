'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RESEND_COOLDOWN_SECONDS = 60;

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const requestLink = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error || 'Something went wrong. Please try again.'
        );
      }

      setSent(true);
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestLink();
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          {sent ? 'Check your email' : 'Forgot your password?'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sent ? (
          <>
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-3">
                <MailCheck className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              If an admin account exists for{' '}
              <span className="font-medium text-foreground">{email}</span>,
              we&apos;ve sent a link to reset your password. The link expires in
              1 hour. Check your spam folder if you don&apos;t see it.
            </p>
            {error && (
              <div className="p-3 rounded-md bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-200 text-sm">
                {error}
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={requestLink}
              disabled={loading || cooldown > 0}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {cooldown > 0 ? `Resend link in ${cooldown}s` : 'Resend link'}
            </Button>
            <button
              type="button"
              className="w-full text-sm text-muted-foreground hover:text-foreground"
              onClick={() => {
                setSent(false);
                setError('');
              }}
            >
              Use a different email
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Enter your admin email address and we&apos;ll send you a link to
              reset your password.
            </p>
            {error && (
              <div className="p-3 rounded-md bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-200 text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                placeholder="you@theismart.org"
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Sending...' : 'Send reset link'}
            </Button>
          </form>
        )}

        <Link
          href="/admin/login"
          className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </CardContent>
    </Card>
  );
}
