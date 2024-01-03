import { TypeOf, boolean, object, string } from 'zod';

export const loginSchema = object({
  username: string().min(1, 'User name is required').max(100),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  isGoogle: boolean().default(false),
});

export type LoginInput = TypeOf<typeof loginSchema>;
