import { TypeOf, object, string } from 'zod';

export const updateUserSchema = object({
  fullname: string().min(1, 'Full name is required').max(100),
  email: string().min(1, 'Email address is required').email('Email Address is invalid'),
  studentId: string(),
});

export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
