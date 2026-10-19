'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NewPasswordFields } from '@/components/auth/new-password-fields';
import { newPasswordSchema } from '@/lib/auth/password-policy';
import { resetPasswordWithToken, type ResetPasswordState } from '../actions';

export default function ResetWithTokenForm({
  tokenHash,
}: {
  tokenHash: string;
}) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [state, formAction, pending] = useActionState<
    ResetPasswordState,
    FormData
  >(resetPasswordWithToken, {});

  const isValid = newPasswordSchema.safeParse({
    password,
    confirmPassword,
  }).success;

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          Set a new password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="token_hash" value={tokenHash} />

          {state.error && (
            <div className="p-3 rounded-md bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-200 text-sm">
              {state.error}
              {state.linkExpired && (
                <>
                  {' '}
                  <Link
                    href="/admin/forgot-password"
                    className="font-medium underline"
                  >
                    Request a new link
                  </Link>
                </>
              )}
            </div>
          )}

          <NewPasswordFields
            password={password}
            confirmPassword={confirmPassword}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
            disabled={pending}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={pending || !isValid}
          >
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {pending ? 'Saving...' : 'Reset password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
