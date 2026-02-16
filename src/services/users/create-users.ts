'use server';

import { createClient } from '@/lib/supabase/server';
import { requireMaster } from '@/lib/auth/require-role';
import { validateCreateUser } from '@/features/users/validation';
import { revalidatePath } from 'next/cache';
import { ROUTES } from '@/lib/contants';

export async function createUser(formData: FormData) {
  await requireMaster();

  const rawData = {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
    role: formData.get('role') as string,
  };

  // Validate input
  const validation = validateCreateUser(rawData);
  if (!validation.success) {
    return {
      error: validation.error.errors[0].message,
    };
  }

  const { username, password, role } = validation.data;

  // Map username to email format for Supabase Auth
  const email = `${username}@tmp.internal`;

  const supabase = await createClient();

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError) {
    if (authError.message.includes('already registered')) {
      return {
        error: 'Username sudah terdaftar',
      };
    }
    return {
      error: authError.message,
    };
  }

  // Create profile
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: authData.user.id,
        username,
        email,
        role,
      },
    ]);

  if (profileError) {
    // Rollback auth user if profile creation fails
    await supabase.auth.admin.deleteUser(authData.user.id);

    if (profileError.code === '23505') {
      return {
        error: 'Username sudah terdaftar',
      };
    }

    return {
      error: profileError.message,
    };
  }

  revalidatePath(ROUTES.USERS);

  return { success: true };
}

