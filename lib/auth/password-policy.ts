import { z } from 'zod';

// Shared by the first-login and forgot-password flows so both enforce the
// same rules on the client (instant feedback) and the server (authoritative).
export const passwordRules = [
  {
    id: 'length',
    label: 'At least 8 characters',
    test: (v: string) => v.length >= 8,
  },
  {
    id: 'lower',
    label: 'A lowercase letter',
    test: (v: string) => /[a-z]/.test(v),
  },
  {
    id: 'upper',
    label: 'An uppercase letter',
    test: (v: string) => /[A-Z]/.test(v),
  },
  { id: 'number', label: 'A number', test: (v: string) => /\d/.test(v) },
] as const;

export const passwordSchema = z
  .string()
  // bcrypt (used by Supabase Auth) ignores anything past 72 bytes
  .max(72, 'Password must be 72 characters or fewer.')
  .refine((value) => passwordRules.every((rule) => rule.test(value)), {
    message:
      'Password must be at least 8 characters and include uppercase, lowercase and a number.',
  });

export const newPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });
