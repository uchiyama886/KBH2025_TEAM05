import { useState } from 'react';
import { supabase } from '../utils/supabase'; // utils/supabaseにパスを修正

export const usePraise = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addPraise = async (postId, userId) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('praises')
        .insert([
          { 
            post_id: postId, 
            praiser_id: userId // praises_idをpraiser_idに修正
          }
        ]);

      if (error) {
        throw error;
      }

      setError(null);
      return true;
    } catch (err) {
      setError(err);
      console.error('「いいね！」の保存に失敗しました:', err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addPraise, loading, error };
};