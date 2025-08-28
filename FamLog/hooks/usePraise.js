import { useState } from 'react';
import { supabase } from '../utils/supabase'; // あなたのプロジェクトのパスに合わせて調整してください

export const usePraise = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addPraise = async (praiserId, postId) => {
    setLoading(true);
    try {
      // 'praises' テーブルに新しい「いいね！」データを挿入
      const { data, error } = await supabase
        .from('praises')
        .insert([
          { praiser_id: praiserId, post_id: postId }
        ]);

      if (error) {
        throw error;
      }

      setError(null);
      return data; // 挿入されたデータを返す
    } catch (err) {
      setError(err);
      console.error('「いいね！」の保存に失敗しました:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { addPraise, loading, error };
};