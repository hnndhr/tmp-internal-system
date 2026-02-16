import { z } from 'zod';

export const createTamuUmumSchema = z.object({
  nama: z.string().min(1, 'Nama wajib diisi').max(100, 'Nama maksimal 100 karakter'),
  tanggal_kunjungan: z.string().min(1, 'Tanggal kunjungan wajib diisi'),
  keperluan: z.string().optional(),
});

export const updateTamuUmumSchema = z.object({
  nama: z.string().min(1, 'Nama wajib diisi').max(100, 'Nama maksimal 100 karakter').optional(),
  tanggal_kunjungan: z.string().min(1, 'Tanggal kunjungan wajib diisi').optional(),
  keperluan: z.string().nullable().optional(),
});

export type CreateTamuUmumInput = z.infer<typeof createTamuUmumSchema>;
export type UpdateTamuUmumInput = z.infer<typeof updateTamuUmumSchema>;

export function validateCreateTamuUmum(data: unknown) {
  return createTamuUmumSchema.safeParse(data);
}

export function validateUpdateTamuUmum(data: unknown) {
  return updateTamuUmumSchema.safeParse(data);
}

