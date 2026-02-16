'use server';

import { createClient } from '@/lib/supabase/server';
import { requireMaster } from '@/lib/auth/require-role';
import { validateUpdateMakam } from '@/features/makam/validation';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/contants';

export async function updateMakam(id: string, formData: FormData) {
  await requireMaster();

  const rawData: Record<string, any> = {};

  if (formData.has('blok_id')) {
    rawData.blok_id = formData.get('blok_id') as string;
  }
  if (formData.has('nomor_makam')) {
    rawData.nomor_makam = formData.get('nomor_makam') as string;
  }
  if (formData.has('nama_almarhum')) {
    rawData.nama_almarhum = formData.get('nama_almarhum') as string || null;
  }
  if (formData.has('tanggal_wafat')) {
    rawData.tanggal_wafat = formData.get('tanggal_wafat') as string || null;
  }

  // Validate input
  const validation = validateUpdateMakam(rawData);
  if (!validation.success) {
    return {
      error: validation.error.errors[0].message,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('makam')
    .update(validation.data)
    .eq('id', id);

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

