import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pmedffhaqpsvhwknozkc.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtZWRmZmhhcXBzdmh3a25vemtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMDM1NzksImV4cCI6MjEwMTU3OTU3OX0.DQ0Ehal60p_L8DW_ShgI3PD30TScnrFRQ8VfQCaPZAg';

export const isSupabaseConfigured = () => {
  return true;
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
