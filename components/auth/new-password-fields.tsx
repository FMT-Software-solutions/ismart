'use client';

import { useState } from 'react';
import { Check, Eye, EyeOff, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { passwordRules } from '@/lib/auth/password-policy';
import { cn } from '@/lib/utils';

interface NewPasswordFieldsProps {
  password: string;
  confirmPassword: string;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  disabled?: boolean;
}

/** New password + confirmation inputs with a live checklist of the rules. */
export function NewPasswordFields({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  disabled,
}: NewPasswordFieldsProps) {
  const [visible, setVisible] = useState(false);
  const mismatch = confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium">
          New Password
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={visible ? 'text' : 'password'}
            autoComplete="new-password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            maxLength={72}
            disabled={disabled}
            className="w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <ul
          className="grid list-none grid-cols-2 gap-1 pt-1 text-xs"
          aria-live="polite"
        >
          {passwordRules.map((rule) => {
            const met = rule.test(password);
            return (
              <li
                key={rule.id}
                className={cn(
                  'flex items-center gap-1',
                  met
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-muted-foreground'
                )}
              >
                {met ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <X className="h-3 w-3" />
                )}
                {rule.label}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type={visible ? 'text' : 'password'}
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          required
          maxLength={72}
          disabled={disabled}
          aria-invalid={mismatch}
          className={cn('w-full', mismatch && 'border-red-500')}
        />
        {mismatch && (
          <p className="text-xs text-red-500">Passwords do not match.</p>
        )}
      </div>
    </>
  );
}
