import { useState } from 'react';
import { supabase } from '../utils/supabase';

export const usePost = () => {
  const [loading, setLoading] = useState(false);

  // 投稿データをSupabaseに送信する非同期関数
  const createPost = async (content, tags, emoji) => {
    setLoading(true);
    // 認証済みのユーザーセッションから user_id を取得
    const { data: { user } } = await supabase.auth.getUser();

    // user が存在しない場合はエラーを返すか、処理を中断
    if (!user) {
      console.error('認証済みのユーザーが見つかりません');
      setLoading(false);
      return null;
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([
        { 
          content, 
          tags, 
          emoji,
          user_id: user.id // ここで取得した user.id を追加
        }
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