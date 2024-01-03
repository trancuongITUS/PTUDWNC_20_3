import { TypeOf, object, string } from 'zod';

export const forgotPasswordSchema = object({
  email: string().min(1, 'Email address is required').email('Email Address is invalid'),
});

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>;
