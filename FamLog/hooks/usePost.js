import { useState } from 'react';
import { supabase } from '../utils/supabase';

export const usePost = () => {
  const [loading, setLoading] = useState(false);

  // 変更: emojiを配列として受け取る
  const createPost = async (content, tags, emojis) => { 
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error('認証済みのユーザーが見つかりません');
      setLoading(false);
      return false;
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([
        { 
          content, 
          tags, 
          emojis, // 変更: emojiではなくemojisとして挿入（DBの列名もemojisにする必要があります）
          user_id: user.id
        }
      ]);
    setLoading(false);

    if (error) {
      console.error('投稿に失敗しました:', error);
      return false;
    }

    return true;
  };

  return { createPost, loading };
};