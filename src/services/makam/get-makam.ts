'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth/session';
import { MakamWithBlok } from '@/types/makam';
import { calculatePagination } from '@/lib/utils/pagination';

export async function getMakamList(params: {
  page?: number;
  pageSize?: number;
  blok_id?: string;
  search?: string;
}) {
  await requireAuth();

  const { page = 1, pageSize = 10, blok_id, search } = params;

  const supabase = await createClient();

  let query = supabase
    .from('makam')
    .select('*, blok_makam(*)', { count: 'exact' })
    .order('created_at', { ascending: false });

  // Apply filters
  if (blok_id) {
    query = query.eq('blok_id', blok_id);
  }

  if (search) {
    query = query.or(`nomor_makam.ilike.%${search}%,nama_almarhum.ilike.%${search}%`);
  }

  // Get total count
  const { count } = await supabase
    .from('makam')
    .select('*', { count: 'exact', head: true });

  // Apply pagination
  const { from, to } = calculatePagination(page, pageSize, count || 0);
  query = query.range(from, to);

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: data as MakamWithBlok[],
    total: count || 0,
    page,
    pageSize,
  };
}

export async function getMakamById(id: string) {
  await requireAuth();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('makam')
    .select('*, blok_makam(*)')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as MakamWithBlok;
}

export async function getBlokMakamList() {
  await requireAuth();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('blok_makam')
    .select('*')
    .order('nama_blok', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

