# TMP Internal System

Internal web system untuk pengelolaan data makam, pengunjung, dan operasional Taman Makam Pahlawan.

## 🚀 Features

- **Authentication**: Username-based login dengan role-based access control
- **Makam Management**: CRUD untuk data makam dengan blok dan nomor
- **Tamu Umum**: Pencatatan pengunjung individual
- **Tamu Rombongan**: Pencatatan kunjungan rombongan dengan jumlah orang
- **Users Management**: Kelola user dan role (Master only)
- **Role-Based Access**: Operator (read + input tamu) dan Master (full access)

## 📋 Prerequisites

- Node.js 18+ dan npm
- Supabase account (gratis)
- Vercel account untuk deployment (opsional)

## 🛠️ Setup

### 1. Clone & Install

```bash
# Clone repository (atau extract zip)
cd tmp-internal-system

# Install dependencies
npm install
```

### 2. Supabase Setup

#### 2.1 Create Supabase Project
1. Buka https://supabase.com dan buat project baru
2. Tunggu database provisioning selesai (~2 menit)

#### 2.2 Configure Authentication
1. Buka project → Authentication → Providers
2. Enable "Email" provider
3. Scroll ke bawah ke "Email Auth"
4. **IMPORTANT**: Disable "Confirm email" (karena kita pakai email internal)

#### 2.3 Run Database Schema
1. Buka SQL Editor di Supabase dashboard
2. Buat new query
3. Copy seluruh isi file `database-schema.sql`
4. Paste dan Execute

#### 2.4 Get Credentials
1. Buka Settings → API
2. Copy "Project URL" dan "anon public" key
3. Simpan untuk langkah berikutnya

### 3. Environment Variables

```bash
# Create .env.local file
cp .env.example .env.local

# Edit .env.local dengan credentials Supabase Anda
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Create First Master User

Karena hanya Master yang bisa create users, kita perlu create master pertama secara manual:

#### Option A: Via Supabase Dashboard (Recommended)
1. Buka Authentication → Users di Supabase dashboard
2. Klik "Add user"
3. Isi:
   - Email: `admin@tmp.internal`
   - Password: `admin123` (ganti dengan password aman)
   - Centang "Auto Confirm User"
4. Klik "Create user"
5. Buka SQL Editor dan jalankan:

```sql
-- Link user auth ke profile
INSERT INTO public.profiles (id, username, email, role)
SELECT id, 'admin', 'admin@tmp.internal', 'master'
FROM auth.users
WHERE email = 'admin@tmp.internal';
```

#### Option B: Via SQL (Alternative)
Jalankan di SQL Editor:

```sql
-- This requires Supabase service_role key, lebih aman pakai Option A
```

### 5. Run Development Server

```bash
npm run dev
```

Buka http://localhost:3000

### 6. Login

- Username: `admin`
- Password: (password yang Anda set di step 4)

## 📁 Project Structure

```
tmp-internal-system/
├── database-schema.sql          # Database schema & RLS policies
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── auth/login/         # Login page
│   │   └── dashboard/          # Dashboard pages
│   ├── components/             # Reusable UI components
│   │   ├── ui/                # Base components (Button, Input, etc)
│   │   ├── layout/            # Layout components
│   │   └── feedback/          # Loading, Error components
│   ├── features/              # Feature modules
│   │   ├── auth/             # Auth feature
│   │   ├── makam/            # Makam management
│   │   ├── tamu-umum/        # Tamu umum
│   │   ├── tamu-rombongan/   # Tamu rombongan
│   │   └── users/            # User management
│   ├── lib/                   # Libraries & utilities
│   │   ├── supabase/         # Supabase clients
│   │   ├── auth/             # Auth utilities
│   │   └── utils/            # Helper functions
│   ├── services/             # Business logic layer
│   │   ├── auth/            # Auth services
│   │   ├── makam/           # Makam services
│   │   ├── tamu/            # Tamu services
│   │   └── users/           # User services
│   └── types/                # TypeScript types
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 🔐 Role Matrix

| Feature | Operator | Master |
|---------|----------|--------|
| Login | ✅ | ✅ |
| View Makam | ✅ | ✅ |
| Create/Edit/Delete Makam | ❌ | ✅ |
| Create/Edit Tamu | ✅ | ✅ |
| Delete Tamu | ❌ | ✅ |
| View Users | ❌ | ✅ |
| Create Users | ❌ | ✅ |

## 🎨 Design System

### Colors
- Background: `#F1F1F1`
- Primary: `#1C3F3A`
- Primary Hover: `#193733`
- Text: `#000000`
- Form Background: `#FFFFFF`

### Typography
- Font Family: Lato
- Imported from Google Fonts

## 🔧 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Deployment**: Vercel

## 📝 Development Notes

### Service Layer Pattern
Semua akses database melalui service layer di `src/services/`. UI components tidak pernah call Supabase directly.

```typescript
// ❌ DON'T: Call Supabase from component
const { data } = await supabase.from('makam').select('*')

// ✅ DO: Use service layer
import { getMakamList } from '@/services/makam/get-makam'
const { data } = await getMakamList({ page: 1, pageSize: 10 })
```

### Username to Email Mapping
Karena Supabase Auth require email, kita map username ke email internal:
- Username: `admin` → Email: `admin@tmp.internal`
- Username: `operator1` → Email: `operator1@tmp.internal`

User tidak perlu tahu email mereka, cukup username.

### Row Level Security (RLS)
Database dilindungi dengan RLS policies:
- Operator tidak bisa delete data
- Operator tidak bisa akses user management
- Master punya full access

## 🚀 Deployment ke Vercel

### 1. Push ke GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

### 2. Connect ke Vercel
1. Buka https://vercel.com
2. Import repository
3. Configure:
   - Framework Preset: Next.js
   - Root Directory: `./`
4. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

### 3. Update Supabase URL Authorization
1. Copy Vercel deployment URL
2. Buka Supabase → Authentication → URL Configuration
3. Add Vercel URL ke Redirect URLs

## 📚 Additional Documentation

- `IMPLEMENTATION_GUIDE.md` - Detailed technical documentation
- `database-schema.sql` - Complete database schema with comments

## 🐛 Troubleshooting

### Issue: "Invalid login credentials"
- Pastikan username mapping sudah benar (`username@tmp.internal`)
- Check di Supabase Authentication → Users apakah user exists
- Verify profile sudah di-create di table profiles

### Issue: "Row Level Security policy violation"
- Check role user di table profiles
- Verify RLS policies sudah ter-apply dengan benar
- Check apakah user sudah login (session valid)

### Issue: "Module not found"
- Run `npm install` lagi
- Check `tsconfig.json` paths configuration
- Restart dev server

## 📞 Support

Untuk pertanyaan atau issue, buat ticket atau hubungi tim development.

## 📄 License

Internal use only - Taman Makam Pahlawan
