'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/contants';

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect(ROUTES.LOGIN);
}

