import { z } from 'zod';

export const createMakamSchema = z.object({
  blok_id: z.string().uuid('Blok tidak valid'),
  nomor_makam: z.string().min(1, 'Nomor makam wajib diisi').max(20, 'Nomor makam maksimal 20 karakter'),
  nama_almarhum: z.string().optional(),
  tanggal_wafat: z.string().optional(),
});

export const updateMakamSchema = z.object({
  blok_id: z.string().uuid('Blok tidak valid').optional(),
  nomor_makam: z.string().min(1, 'Nomor makam wajib diisi').max(20, 'Nomor makam maksimal 20 karakter').optional(),
  nama_almarhum: z.string().nullable().optional(),
  tanggal_wafat: z.string().nullable().optional(),
});

export type CreateMakamInput = z.infer<typeof createMakamSchema>;
export type UpdateMakamInput = z.infer<typeof updateMakamSchema>;

export function validateCreateMakam(data: unknown) {
  return createMakamSchema.safeParse(data);
}

export function validateUpdateMakam(data: unknown) {
  return updateMakamSchema.safeParse(data);
}

