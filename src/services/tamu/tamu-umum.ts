'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth/session';
import { requireMaster } from '@/lib/auth/require-role';
import { validateCreateTamuUmum, validateUpdateTamuUmum } from '@/features/tamu-umum/validation';
import { calculatePagination } from '@/lib/utils/pagination';
import { revalidatePath } from 'next/cache';
import { ROUTES } from '@/lib/contants';

export async function getTamuUmumList(params: {
  page?: number;
  pageSize?: number;
  tanggal_dari?: string;
  tanggal_sampai?: string;
  search?: string;
}) {
  await requireAuth();

  const { page = 1, pageSize = 10, tanggal_dari, tanggal_sampai, search } = params;

  const supabase = await createClient();

  let query = supabase
    .from('tamu_umum')
    .select('*', { count: 'exact' })
    .order('tanggal_kunjungan', { ascending: false });

  // Apply filters
  if (tanggal_dari) {
    query = query.gte('tanggal_kunjungan', tanggal_dari);
  }
  if (tanggal_sampai) {
    query = query.lte('tanggal_kunjungan', tanggal_sampai);
  }
  if (search) {
    query = query.ilike('nama', `%${search}%`);
  }

  // Get total count
  const { count } = await supabase
    .from('tamu_umum')
    .select('*', { count: 'exact', head: true });

  // Apply pagination
  const { from, to } = calculatePagination(page, pageSize, count || 0);
  query = query.range(from, to);

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: data || [],
    total: count || 0,
    page,
    pageSize,
  };
}

export async function createTamuUmum(formData: FormData) {
  await requireAuth();

  const rawData = {
    nama: formData.get('nama') as string,
    tanggal_kunjungan: formData.get('tanggal_kunjungan') as string,
    keperluan: formData.get('keperluan') as string || undefined,
  };

  // Validate input
  const validation = validateCreateTamuUmum(rawData);
  if (!validation.success) {
    return {
      error: validation.error.errors[0].message,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('tamu_umum')
    .insert([validation.data]);

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath(ROUTES.TAMU_UMUM);

  return { success: true };
}

export async function updateTamuUmum(id: string, formData: FormData) {
  await requireAuth();

  const rawData: Record<string, any> = {};

  if (formData.has('nama')) {
    rawData.nama = formData.get('nama') as string;
  }
  if (formData.has('tanggal_kunjungan')) {
    rawData.tanggal_kunjungan = formData.get('tanggal_kunjungan') as string;
  }
  if (formData.has('keperluan')) {
    rawData.keperluan = formData.get('keperluan') as string || null;
  }

  // Validate input
  const validation = validateUpdateTamuUmum(rawData);
  if (!validation.success) {
    return {
      error: validation.error.errors[0].message,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('tamu_umum')
    .update(validation.data)
    .eq('id', id);

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath(ROUTES.TAMU_UMUM);

  return { success: true };
}

export async function deleteTamuUmum(id: string) {
  await requireMaster();

  const supabase = await createClient();

  const { error } = await supabase
    .from('tamu_umum')
    .delete()
    .eq('id', id);

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath(ROUTES.TAMU_UMUM);

  return { success: true };
}

