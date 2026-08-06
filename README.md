# MAPUZ - Business Profile Pages SaaS

MAPUZ — Mijozlar uchun zamonaviy, tezkor va Apple minimalist uslubidagi biznes profil sahifalarini yaratish va boshqarish tizimi.

---

## ⚡ Texnologiyalar Steki

- **Framework**: Next.js 15 (App Router with TypeScript)
- **Styling**: Tailwind CSS
- **Icons**: Custom SVG & Lucide React
- **Backend & Database**: Supabase (PostgreSQL & Supabase Storage)

---

## 🚀 Vercel Bilan Bir Bosishda Deploy Qilish (Vercel Deployment)

MAPUZ loyihasini Vercel platformasiga bepul joylashtirish (Deploy qilish):

### 1. GitHub Repository Yaratish va Kodni Yuklash
```bash
git init
git add .
git commit -m "Initial MAPUZ production release"
git remote add origin https://github.com/USERNAME/mapuz.git
git push -u origin main
```

### 2. Vercel'ga Ulash
1. [Vercel Dashboard](https://vercel.com/dashboard) sahifasiga kiring.
2. **"Add New" -> "Project"** tugmasini bosing va GitHub reponi tanlang.
3. **Environment Variables** bo'limida quyidagi 2 ta o'zgaruvchini kiriting:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://pmedffhaqpsvhwknozkc.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1...` |

4. **"Deploy"** tugmasini bosing. Loyihangiz 1 daqiqada tayyor bo'ladi!

---

## 🗄 Supabase SQL Bazani Sozlash

Supabase loyihangizdagi **SQL Editor** bo'limiga kirib, `supabase/schema.sql` ichidagi SQL query'ni bitta RUN qilib yuboring:

```sql
-- 1. Businesses jadvalini yaratish va links ustunini qo'shish
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo TEXT,
  telegram TEXT,
  instagram TEXT,
  phone TEXT,
  google_maps TEXT,
  links JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS links JSONB DEFAULT '[]'::jsonb;

-- 2. RLS xavfsizlik qoidalarini faollashtirish
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.businesses FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.businesses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON public.businesses FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON public.businesses FOR DELETE USING (true);

-- 3. Logotiplar uchun Storage Bucket yaratish
INSERT INTO storage.buckets (id, name, public) VALUES ('logos', 'logos', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Logos" ON storage.objects FOR SELECT USING (bucket_id = 'logos');
CREATE POLICY "Public Upload Logos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'logos');
CREATE POLICY "Public Update Logos" ON storage.objects FOR UPDATE USING (bucket_id = 'logos');
CREATE POLICY "Public Delete Logos" ON storage.objects FOR DELETE USING (bucket_id = 'logos');
```
