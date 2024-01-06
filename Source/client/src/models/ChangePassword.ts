import { TypeOf, object, string } from 'zod';

export const changePasswordSchema = object({
  oldPassword: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  newPassword: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().min(1, 'Please confirm your password'),
}).refine(data => data.newPassword === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export type ChangePasswordInput = TypeOf<typeof changePasswordSchema>;
