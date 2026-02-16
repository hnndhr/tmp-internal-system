export interface MakamWithBlok {
  id: string;
  blok_id: string;
  nomor_makam: string;
  nama_almarhum: string | null;
  tanggal_wafat: string | null;
  created_at: string;
  updated_at: string;
  blok_makam: {
    id: string;
    nama_blok: string;
  };
}

export interface CreateMakamInput {
  blok_id: string;
  nomor_makam: string;
  nama_almarhum?: string;
  tanggal_wafat?: string;
}

export interface UpdateMakamInput {
  blok_id?: string;
  nomor_makam?: string;
  nama_almarhum?: string | null;
  tanggal_wafat?: string | null;
}

