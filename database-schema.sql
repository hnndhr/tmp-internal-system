-- TMP Internal System Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('operator', 'master')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blok Makam table
CREATE TABLE IF NOT EXISTS public.blok_makam (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nama_blok TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Makam table
CREATE TABLE IF NOT EXISTS public.makam (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    blok_id UUID REFERENCES public.blok_makam(id) ON DELETE CASCADE NOT NULL,
    nomor_makam TEXT NOT NULL,
    nama_almarhum TEXT,
    tanggal_wafat DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(blok_id, nomor_makam)
);

-- Tamu Umum table
CREATE TABLE IF NOT EXISTS public.tamu_umum (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nama TEXT NOT NULL,
    tanggal_kunjungan DATE NOT NULL,
    keperluan TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tamu Rombongan table
CREATE TABLE IF NOT EXISTS public.tamu_rombongan (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nama_rombongan TEXT NOT NULL,
    jumlah INTEGER NOT NULL CHECK (jumlah > 0),
    tanggal_kunjungan DATE NOT NULL,
    keperluan TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_makam_blok_id ON public.makam(blok_id);
CREATE INDEX IF NOT EXISTS idx_makam_nomor ON public.makam(nomor_makam);
CREATE INDEX IF NOT EXISTS idx_tamu_umum_tanggal ON public.tamu_umum(tanggal_kunjungan);
CREATE INDEX IF NOT EXISTS idx_tamu_rombongan_tanggal ON public.tamu_rombongan(tanggal_kunjungan);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blok_makam ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.makam ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tamu_umum ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tamu_rombongan ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES POLICIES
-- ============================================

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

-- Users can update their own profile (limited fields)
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Masters can read all profiles
CREATE POLICY "Masters can read all profiles"
    ON public.profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'master'
        )
    );

-- Masters can insert profiles
CREATE POLICY "Masters can insert profiles"
    ON public.profiles FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'master'
        )
    );

-- Masters can delete profiles
CREATE POLICY "Masters can delete profiles"
    ON public.profiles FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'master'
        )
    );

-- ============================================
-- BLOK_MAKAM POLICIES
-- ============================================

-- All authenticated users can read blok_makam
CREATE POLICY "Authenticated users can read blok_makam"
    ON public.blok_makam FOR SELECT
    TO authenticated
    USING (true);

-- Only masters can insert blok_makam
CREATE POLICY "Masters can insert blok_makam"
    ON public.blok_makam FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'master'
        )
    );

-- Only masters can update blok_makam
CREATE POLICY "Masters can update blok_makam"
    ON public.blok_makam FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'master'
        )
    );

-- Only masters can delete blok_makam
CREATE POLICY "Masters can delete blok_makam"
    ON public.blok_makam FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'master'
        )
    );

-- ============================================
-- MAKAM POLICIES
-- ============================================

-- All authenticated users can read makam
CREATE POLICY "Authenticated users can read makam"
    ON public.makam FOR SELECT
    TO authenticated
    USING (true);

-- Only masters can insert makam
CREATE POLICY "Masters can insert makam"
    ON public.makam FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'master'
        )
    );

-- Only masters can update makam
CREATE POLICY "Masters can update makam"
    ON public.makam FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'master'
        )
    );

-- Only masters can delete makam
CREATE POLICY "Masters can delete makam"
    ON public.makam FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'master'
        )
    );

-- ============================================
-- TAMU_UMUM POLICIES
-- ============================================

-- All authenticated users can read tamu_umum
CREATE POLICY "Authenticated users can read tamu_umum"
    ON public.tamu_umum FOR SELECT
    TO authenticated
    USING (true);

-- All authenticated users can insert tamu_umum
CREATE POLICY "Authenticated users can insert tamu_umum"
    ON public.tamu_umum FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- All authenticated users can update tamu_umum
CREATE POLICY "Authenticated users can update tamu_umum"
    ON public.tamu_umum FOR UPDATE
    TO authenticated
    USING (true);

-- Only masters can delete tamu_umum
CREATE POLICY "Masters can delete tamu_umum"
    ON public.tamu_umum FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'master'
        )
    );

-- ============================================
-- TAMU_ROMBONGAN POLICIES
-- ============================================

-- All authenticated users can read tamu_rombongan
CREATE POLICY "Authenticated users can read tamu_rombongan"
    ON public.tamu_rombongan FOR SELECT
    TO authenticated
    USING (true);

-- All authenticated users can insert tamu_rombongan
CREATE POLICY "Authenticated users can insert tamu_rombongan"
    ON public.tamu_rombongan FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- All authenticated users can update tamu_rombongan
CREATE POLICY "Authenticated users can update tamu_rombongan"
    ON public.tamu_rombongan FOR UPDATE
    TO authenticated
    USING (true);

-- Only masters can delete tamu_rombongan
CREATE POLICY "Masters can delete tamu_rombongan"
    ON public.tamu_rombongan FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'master'
        )
    );

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blok_makam_updated_at BEFORE UPDATE ON public.blok_makam
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_makam_updated_at BEFORE UPDATE ON public.makam
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tamu_umum_updated_at BEFORE UPDATE ON public.tamu_umum
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tamu_rombongan_updated_at BEFORE UPDATE ON public.tamu_rombongan
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA (OPTIONAL)
-- ============================================

-- Insert sample blok makam
INSERT INTO public.blok_makam (nama_blok) VALUES
    ('Blok A'),
    ('Blok B'),
    ('Blok C')
ON CONFLICT (nama_blok) DO NOTHING;
