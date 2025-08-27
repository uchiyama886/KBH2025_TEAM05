import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

console.log(supabaseUrl);
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: 'expo-secure-store' // Expoで認証情報を安全に保存するため
    }
});