// 投稿データを取得するフック
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 'posts' テーブルから全ての投稿データを取得し、投稿日時の降順で並び替える
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setPosts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // コンポーネントがマウントされた時に一度だけ実行

  return { posts, loading, error };
};