'use server';

import { createClient } from '@/lib/supabase/server';
import { requireMaster } from '@/lib/auth/require-role';
import { revalidatePath } from 'next/cache';
import { ROUTES } from '@/lib/contants';

export async function deleteMakam(id: string) {
  await requireMaster();

  const supabase = await createClient();

  const { error } = await supabase
    .from('makam')
    .delete()
    .eq('id', id);

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath(ROUTES.MAKAM);

  return { success: true };
}

