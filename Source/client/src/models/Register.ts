import { TypeOf, object, string } from 'zod';

export const registerSchema = object({
  username: string().min(1, 'Username is required').max(100),
  fullname: string().min(1, 'Fullname is required').max(100),
  email: string().min(1, 'Email address is required').email('Email address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().min(1, 'Please confirm your password'),
  role: string(),
}).refine(data => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export type RegisterInput = TypeOf<typeof registerSchema>;
