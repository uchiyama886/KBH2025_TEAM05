import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // クエリをシンプルに修正
        const { data, error } = await supabase
          .from('posts')
          .select('id, user_id, content, tags, emoji, created_at, users(name, profile_image_url)')
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
  }, []);

  return { posts, loading, error };
};