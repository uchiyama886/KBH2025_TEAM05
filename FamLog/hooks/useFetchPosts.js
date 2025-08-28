import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../utils/supabase';

export const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users (
            id,
            name,
            profile_image_url
          ),
          praises (*, users (name)),
          comments (*, users (name))
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("投稿の取得中にエラーが発生しました:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, fetchPosts };
};