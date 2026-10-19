import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ResetWithTokenForm from './ResetWithTokenForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Reset Password | iSMART Admin',
  robots: { index: false, follow: false },
  // Keep the token in this URL from leaking to other sites via Referer
  referrer: 'no-referrer',
};

export default async function ResetPasswordWithTokenPage({
  searchParams,
}: {
  searchParams: Promise<{ token_hash?: string }>;
}) {
  const { token_hash: tokenHash } = await searchParams;

  return (
    <div className="flex items-center justify-center min-h-screen">
      {tokenHash ? (
        <ResetWithTokenForm tokenHash={tokenHash} />
      ) : (
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">
              Invalid reset link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              This password reset link is incomplete or invalid. Please request
              a new one.
            </p>
            <Button asChild className="w-full">
              <Link href="/admin/forgot-password">Request a new link</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
