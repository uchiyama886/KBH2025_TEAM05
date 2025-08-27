import { createClient } from '@supabase/supabase-js';
import { SupabaseSecureStore } from './storage'; // 新しいラッパーをインポート

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: SupabaseSecureStore,
  }
});