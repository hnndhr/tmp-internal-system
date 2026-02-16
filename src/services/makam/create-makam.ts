'use server';

import { createClient } from '@/lib/supabase/server';
import { requireMaster } from '@/lib/auth/require-role';
import { validateCreateMakam } from '@/features/makam/validation';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/contants';

export async function createMakam(formData: FormData) {
  await requireMaster();

  const rawData = {
    blok_id: formData.get('blok_id') as string,
    nomor_makam: formData.get('nomor_makam') as string,
    nama_almarhum: formData.get('nama_almarhum') as string || undefined,
    tanggal_wafat: formData.get('tanggal_wafat') as string || undefined,
  };

  // Validate input
  const validation = validateCreateMakam(rawData);
  if (!validation.success) {
    return {
      error: validation.error.errors[0].message,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('makam')
    .insert([validation.data]);

  if (error) {
    if (error.code === '23505') {
      return {
        error: 'Nomor makam sudah ada di blok ini',
      };
    }
    return {
      error: error.message,
    };
  }

  redirect(ROUTES.MAKAM);
}

