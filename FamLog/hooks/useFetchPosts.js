import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            users (
              name,
              profile_image_url
            ),
            praises (
              created_at,
              users (
                name
              )
            ),
            comments (
              created_at,
              content,
              users (
                name
              )
            )
          `)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err);
        console.error('投稿の取得に失敗しました:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading:false, error };
};