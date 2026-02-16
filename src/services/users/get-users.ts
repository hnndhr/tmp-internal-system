'use server';

import { createClient } from '@/lib/supabase/server';
import { requireMaster } from '@/lib/auth/require-role';
import { calculatePagination } from '@/lib/utils/pagination';

export async function getUsersList(params: {
  page?: number;
  pageSize?: number;
  search?: string;
}) {
  await requireMaster();

  const { page = 1, pageSize = 10, search } = params;

  const supabase = await createClient();

  let query = supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  // Apply search filter
  if (search) {
    query = query.or(`username.ilike.%${search}%,email.ilike.%${search}%`);
  }

  // Get total count
  const { count } = await supabase
    .from('profiles')
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

