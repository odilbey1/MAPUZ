import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://alzlqdoruhrsvrqwcpuf.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsemxxZG9ydWhyc3ZycXdjcHVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxNjk0NDAsImV4cCI6MjEwNTc0NTQ0MH0.taeHGCjJlB1NFLc9C0dg-T8Pm-4xfs09pd_HSZagaHc';

export const isSupabaseConfigured = () => {
  return true;
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
