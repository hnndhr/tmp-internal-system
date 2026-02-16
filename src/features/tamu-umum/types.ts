export interface TamuUmumFormData {
  nama: string;
  tanggal_kunjungan: string;
  keperluan?: string;
}

export interface TamuUmumFilters {
  tanggal_dari?: string;
  tanggal_sampai?: string;
  search?: string;
}

