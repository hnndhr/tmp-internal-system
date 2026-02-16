import { z } from 'zod';

export const createTamuRombonganSchema = z.object({
  nama_rombongan: z.string().min(1, 'Nama rombongan wajib diisi').max(100, 'Nama rombongan maksimal 100 karakter'),
  jumlah: z.number().int('Jumlah harus bilangan bulat').positive('Jumlah harus lebih dari 0'),
  tanggal_kunjungan: z.string().min(1, 'Tanggal kunjungan wajib diisi'),
  keperluan: z.string().optional(),
});

export const updateTamuRombonganSchema = z.object({
  nama_rombongan: z.string().min(1, 'Nama rombongan wajib diisi').max(100, 'Nama rombongan maksimal 100 karakter').optional(),
  jumlah: z.number().int('Jumlah harus bilangan bulat').positive('Jumlah harus lebih dari 0').optional(),
  tanggal_kunjungan: z.string().min(1, 'Tanggal kunjungan wajib diisi').optional(),
  keperluan: z.string().nullable().optional(),
});

export type CreateTamuRombonganInput = z.infer<typeof createTamuRombonganSchema>;
export type UpdateTamuRombonganInput = z.infer<typeof updateTamuRombonganSchema>;

export function validateCreateTamuRombongan(data: unknown) {
  return createTamuRombonganSchema.safeParse(data);
}

export function validateUpdateTamuRombongan(data: unknown) {
  return updateTamuRombonganSchema.safeParse(data);
}

