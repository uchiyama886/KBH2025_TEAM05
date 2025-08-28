import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export const useAuth = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(session);
      } catch (err) {
        console.error("セッションの取得に失敗しました:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    // 修正: onAuthStateChangeの戻り値を正しく受け取る
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => subscription?.unsubscribe(); // 修正: subscriptionを呼び出す
  }, []);

  return { session, loading };
};