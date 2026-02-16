export interface TamuRombonganFormData {
  nama_rombongan: string;
  jumlah: number;
  tanggal_kunjungan: string;
  keperluan?: string;
}

export interface TamuRombonganFilters {
  tanggal_dari?: string;
  tanggal_sampai?: string;
  search?: string;
}

