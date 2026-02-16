export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          email: string;
          role: 'operator' | 'master';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          email: string;
          role: 'operator' | 'master';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          role?: 'operator' | 'master';
          updated_at?: string;
        };
      };
      blok_makam: {
        Row: {
          id: string;
          nama_blok: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nama_blok: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nama_blok?: string;
          updated_at?: string;
        };
      };
      makam: {
        Row: {
          id: string;
          blok_id: string;
          nomor_makam: string;
          nama_almarhum: string | null;
          tanggal_wafat: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          blok_id: string;
          nomor_makam: string;
          nama_almarhum?: string | null;
          tanggal_wafat?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          blok_id?: string;
          nomor_makam?: string;
          nama_almarhum?: string | null;
          tanggal_wafat?: string | null;
          updated_at?: string;
        };
      };
      tamu_umum: {
        Row: {
          id: string;
          nama: string;
          tanggal_kunjungan: string;
          keperluan: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nama: string;
          tanggal_kunjungan: string;
          keperluan?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nama?: string;
          tanggal_kunjungan?: string;
          keperluan?: string | null;
          updated_at?: string;
        };
      };
      tamu_rombongan: {
        Row: {
          id: string;
          nama_rombongan: string;
          jumlah: number;
          tanggal_kunjungan: string;
          keperluan: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nama_rombongan: string;
          jumlah: number;
          tanggal_kunjungan: string;
          keperluan?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nama_rombongan?: string;
          jumlah?: number;
          tanggal_kunjungan?: string;
          keperluan?: string | null;
          updated_at?: string;
        };
      };
    };
  };
};

export type UserRole = 'operator' | 'master';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type BlokMakam = Database['public']['Tables']['blok_makam']['Row'];
export type Makam = Database['public']['Tables']['makam']['Row'];
export type TamuUmum = Database['public']['Tables']['tamu_umum']['Row'];
export type TamuRombongan = Database['public']['Tables']['tamu_rombongan']['Row'];

