-- ==============================================================================
-- MAPUZ DATABASE SCHEMA FOR SUPABASE POSTGRESQL (PRODUCTION CLEAN)
-- Supports multiple dynamic buttons / links per business profile
-- Project URL: https://pmedffhaqpsvhwknozkc.supabase.co
-- Copy and paste this SQL query into your Supabase SQL Editor and click RUN.
-- ==============================================================================

-- 1. Create businesses table
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

-- Ensure links column exists if table was created previously
ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS links JSONB DEFAULT '[]'::jsonb;

-- 2. Index for high-performance lookup by slug
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON public.businesses(slug);

-- 3. Row Level Security (RLS) Configuration
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON public.businesses;
DROP POLICY IF EXISTS "Allow public insert access" ON public.businesses;
DROP POLICY IF EXISTS "Allow public update access" ON public.businesses;
DROP POLICY IF EXISTS "Allow public delete access" ON public.businesses;

CREATE POLICY "Allow public read access" ON public.businesses
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON public.businesses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON public.businesses
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON public.businesses
  FOR DELETE USING (true);

-- 4. Setup Storage Bucket for Business Logos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Read Logos" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload Logos" ON storage.objects;
DROP POLICY IF EXISTS "Public Update Logos" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete Logos" ON storage.objects;

CREATE POLICY "Public Read Logos" ON storage.objects
  FOR SELECT USING (bucket_id = 'logos');

CREATE POLICY "Public Upload Logos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'logos');

CREATE POLICY "Public Update Logos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'logos');

CREATE POLICY "Public Delete Logos" ON storage.objects
  FOR DELETE USING (bucket_id = 'logos');

-- 5. Setup Admin Users Table (for dashboard login)
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read admin_users" ON public.admin_users;
CREATE POLICY "Allow public read admin_users" ON public.admin_users
  FOR SELECT USING (true);

-- Insert default admin user if not exists
INSERT INTO public.admin_users (username, password)
VALUES ('admin', 'admin123')
ON CONFLICT (username) DO NOTHING;

-- 6. Grant Permissions to API Roles (anon, authenticated, service_role)
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

