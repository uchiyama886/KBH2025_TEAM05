import { useState } from 'react';
import { supabase } from '../supabaseClient'; // supabaseClient.js が別途必要になります

export const usePost = () => {
  const [loading, setLoading] = useState(false);

  // 投稿データをSupabaseに送信する非同期関数
  const createPost = async (content, tags, emoji) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .insert([
        { content, tags, emoji }
      ]);
    setLoading(false);

    if (error) {
      console.error('投稿に失敗しました:', error);
      return null;
    }

    return data;
  };

  return { createPost, loading };
};