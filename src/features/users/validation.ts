import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter').max(50, 'Username maksimal 50 karakter'),
  password: z.string().min(6, 'Password minimal 6 karakter').max(100, 'Password maksimal 100 karakter'),
  role: z.enum(['operator', 'master'], {
    errorMap: () => ({ message: 'Role harus operator atau master' }),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export function validateCreateUser(data: unknown) {
  return createUserSchema.safeParse(data);
}

