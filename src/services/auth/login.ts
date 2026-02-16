'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { validateLogin } from '@/features/auth/validation';
import { ROUTES } from '@/lib/contants';

/**
 * REVISI: Tambahkan prevState sebagai parameter pertama.
 * Ini wajib agar formData tidak dianggap sebagai state lama.
 */
export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient();

  // Sekarang formData.get() akan berfungsi karena berada di posisi yang benar
  const rawData = {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  };

  // Validasi input menggunakan schema yang sudah ada
  const validation = validateLogin(rawData);
  if (!validation.success) {
    return {
      error: validation.error.errors[0].message,
    };
  }

  const { username, password } = validation.data;

  /**
   * Mapping username ke email internal (@tmp.internal)
   * agar sesuai dengan database Supabase Auth kita.
   */
  const email = `${username}@tmp.internal`;

  // Proses login ke Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: 'Username atau password salah',
    };
  }

  // Jika berhasil, arahkan ke Dashboard
  redirect(ROUTES.DASHBOARD);
}